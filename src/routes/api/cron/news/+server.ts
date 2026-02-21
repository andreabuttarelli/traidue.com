import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { fetchAllFeeds, deduplicateItems } from '$lib/server/rss';
import { processNewsItems } from '$lib/server/news-generator';
import { sendNewsDigest } from '$lib/server/news-email';

export const GET: RequestHandler = async ({ request, url }) => {
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

		// 4. Salva bozze in DB
		const drafts = [];
		for (const article of articles) {
			const { data, error } = await supabase
				.from('news_articles')
				.insert({
					title: article.title,
					slug: article.slug,
					summary: article.summary,
					content: article.content,
					source_url: article.sourceUrl,
					source_title: article.sourceTitle,
					source_date: article.sourceDate || null,
					tags: article.tags
				})
				.select('id, title, summary, source_url, approval_token')
				.single();

			if (error) {
				console.error(`Failed to insert article "${article.title}":`, error.message);
				continue;
			}

			drafts.push({
				id: data.id,
				title: data.title,
				summary: data.summary,
				sourceUrl: data.source_url,
				approvalToken: data.approval_token
			});
		}

		// 5. Email digest
		if (drafts.length) {
			const baseUrl = url.origin;
			await sendNewsDigest(drafts, baseUrl);
		}

		return json({ ok: true, drafted: drafts.length });
	} catch (e) {
		console.error('News cron error:', e);
		return json({ error: 'Internal error' }, { status: 500 });
	}
};
