import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { fetchAllFeeds, deduplicateItems } from '$lib/server/rss';
import { processNewsItems } from '$lib/server/news-generator';
import { sendNewsDigest } from '$lib/server/news-email';

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
					.select('id, title, summary, source_url, approval_token')
					.single();

				if (!error && data) {
					drafts.push({
						id: data.id,
						title: data.title,
						summary: data.summary,
						sourceUrl: data.source_url,
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

		// 5. Email digest (failure doesn't lose saved drafts)
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
