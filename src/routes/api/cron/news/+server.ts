import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchAllFeeds, deduplicateItems } from '$lib/server/rss';
import { rankNewsItems, generateSingleEditorial } from '$lib/server/news-generator';
import { supabase } from '$lib/server/supabase';
import { sendNewsDigest } from '$lib/server/news-email';
import { generateAndProcessNewsImage } from '$lib/server/news-image';

const BASE_URL = 'https://www.traidue.com';

export const config = { maxDuration: 300 };

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

		// 3. Gemini ranks
		const ranked = await rankNewsItems(newItems);
		if (!ranked.length) return json({ ok: true, message: 'No relevant news' });

		// 4. Process all articles in parallel
		const settledResults = await Promise.allSettled(
			ranked.map(async (r) => {
				const item = newItems[r.originalIndex];
				if (!item) return 'SKIP: no item';

				const info = `#${r.originalIndex} (score ${r.score}): ${r.reason}`;
				const t0 = Date.now();
				const elapsed = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;

				// Generate editorial
				console.log(`[News] Generating editorial for "${item.title}"`);
				const article = await generateSingleEditorial(item);
				if (!article) {
					console.log(`[News] Filtered "${item.title}" at ${elapsed()}`);
					return `FILTERED: ${info}`;
				}
				console.log(`[News] Editorial done at ${elapsed()}: "${article.title}"`);

				// Save draft to DB with slug collision handling
				let draft: {
					id: string;
					title: string;
					summary: string;
					content: string;
					tags: string[];
					sourceUrl: string;
					sourceTitle: string;
					approvalToken: string;
					image?: string;
					thumb?: string;
				} | null = null;

				const slug = article.slug;
				for (let attempt = 0; attempt < 3; attempt++) {
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
						.select(
							'id, title, summary, content, tags, source_url, source_title, approval_token'
						)
						.single();

					if (!error && data) {
						draft = {
							id: data.id,
							title: data.title,
							summary: data.summary,
							content: data.content,
							tags: data.tags,
							sourceUrl: data.source_url,
							sourceTitle: data.source_title,
							approvalToken: data.approval_token
						};
						break;
					}

					if (error?.code === '23505' && error.message.includes('slug')) continue;
					console.error(`[News] DB insert failed for "${article.title}":`, error?.message);
					return `DB_ERROR: ${info}`;
				}

				if (!draft) {
					console.error(`[News] Slug collision for "${article.title}"`);
					return `SLUG_COLLISION: ${info}`;
				}
				console.log(`[News] DB saved at ${elapsed()}: id=${draft.id}`);

				// Generate image
				try {
					const imageResult = await generateAndProcessNewsImage(
						draft.title,
						article.tags,
						draft.id
					);
					if (imageResult) {
						await supabase
							.from('news_articles')
							.update({ image: imageResult.image, thumb: imageResult.thumb })
							.eq('id', draft.id);
						draft.image = imageResult.image;
						draft.thumb = imageResult.thumb;
						console.log(`[News] Image done at ${elapsed()}`);
					}
				} catch (e) {
					console.error(`[News] Image failed at ${elapsed()} for "${draft.title}":`, e);
				}

				// Send email
				try {
					await sendNewsDigest([draft], BASE_URL);
					console.log(`[News] Email sent at ${elapsed()} for "${draft.title}"`);
				} catch (e) {
					console.error(`[News] Email failed at ${elapsed()} for "${draft.title}":`, e);
				}

				console.log(`[News] Complete at ${elapsed()}: "${draft.title}"`);
				return `OK at ${elapsed()}: ${info}`;
			})
		);

		const results = settledResults.map((r) =>
			r.status === 'fulfilled' ? r.value : `ERROR: ${r.reason}`
		);

		return json({ ok: true, processed: results.length, results });
	} catch (e) {
		console.error('News cron error:', e);
		return json({ error: 'Internal error' }, { status: 500 });
	}
};
