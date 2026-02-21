import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { fetchAllFeeds, deduplicateItems } from '$lib/server/rss';
import { processNewsItems } from '$lib/server/news-generator';
import { sendNewsDigest } from '$lib/server/news-email';
import { generateAndProcessNewsImage } from '$lib/server/news-image';

const BASE_URL = 'https://www.traidue.com';

export const GET: RequestHandler = async ({ request }) => {
	const auth = request.headers.get('authorization');
	if (auth !== `Bearer ${CRON_SECRET}`) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		// 1. Fetch RSS
		const allItems = await fetchAllFeeds();
		if (!allItems.length) return json({ ok: true, message: 'No RSS items' });

		// 2. Deduplica
		const newItems = await deduplicateItems(allItems);
		if (!newItems.length) return json({ ok: true, message: 'No new items' });

		// 3. Gemini filtra e genera
		const articles = await processNewsItems(newItems);
		if (!articles.length) return json({ ok: true, message: 'No relevant news' });

		// 4. Salva bozze in DB con slug collision handling
		const drafts = [];
		for (const article of articles) {
			let slug = article.slug;
			let attempt = 0;

			while (attempt < 3) {
				const insertSlug = attempt === 0 ? slug : `${slug}-${attempt}`;
				const { data, error } = await supabase
					.from('news_articles')
					.insert({
						title: article.title,
						slug: insertSlug,
						summary: article.summary,
						content: article.content,
						source_url: article.sourceUrl,
						source_title: article.sourceTitle,
						source_date: article.sourceDate || null,
						tags: article.tags
					})
					.select('id, title, summary, content, tags, source_url, source_title, approval_token')
					.single();

				if (!error && data) {
					drafts.push({
						id: data.id,
						title: data.title,
						summary: data.summary,
						content: data.content,
						tags: data.tags,
						sourceUrl: data.source_url,
						sourceTitle: data.source_title,
						approvalToken: data.approval_token
					});
					break;
				}

				if (error?.code === '23505' && error.message.includes('slug')) {
					attempt++;
					continue;
				}

				console.error(`Failed to insert article "${article.title}":`, error?.message);
				break;
			}
		}

		// 5. Generate images (fire-and-forget per article)
		for (const draft of drafts) {
			try {
				const matchingArticle = articles.find((a) => a.sourceUrl === draft.sourceUrl);
				if (!matchingArticle) continue;

				const imageResult = await generateAndProcessNewsImage(
					draft.title,
					matchingArticle.tags,
					draft.id
				);

				if (imageResult) {
					await supabase
						.from('news_articles')
						.update({ image: imageResult.image, thumb: imageResult.thumb })
						.eq('id', draft.id);
					draft.image = imageResult.image;
					draft.thumb = imageResult.thumb;
				}
			} catch (e) {
				console.error(`Image generation failed for "${draft.title}":`, e);
			}
		}

		// 6. Email digest (failure doesn't lose saved drafts)
		let emailSent = false;
		if (drafts.length) {
			try {
				await sendNewsDigest(drafts, BASE_URL);
				emailSent = true;
			} catch (e) {
				console.error('Failed to send news digest email:', e);
			}
		}

		return json({ ok: true, drafted: drafts.length, emailSent });
	} catch (e) {
		console.error('News cron error:', e);
		return json({ error: 'Internal error' }, { status: 500 });
	}
};
