import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchAllFeeds, deduplicateItems } from '$lib/server/rss';
import { rankNewsItems } from '$lib/server/news-generator';

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

		// 3. Gemini ranks
		const ranked = await rankNewsItems(newItems);
		if (!ranked.length) return json({ ok: true, message: 'No relevant news' });

		// 4. Dispatch each article to /generate in parallel and await results
		const generateUrl = `${url.origin}/api/cron/news/generate`;

		const promises = ranked.map(async (r) => {
			const item = newItems[r.originalIndex];
			if (!item) return { status: 'skipped' as const, reason: `#${r.originalIndex}: no item` };

			try {
				const resp = await fetch(generateUrl, {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${CRON_SECRET}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(item)
				});
				const body = await resp.json();
				return {
					status: resp.ok ? 'ok' as const : 'error' as const,
					index: r.originalIndex,
					score: r.score,
					title: item.title,
					body
				};
			} catch (e) {
				return {
					status: 'error' as const,
					index: r.originalIndex,
					title: item.title,
					error: String(e)
				};
			}
		});

		const results = await Promise.allSettled(promises);

		const summary = results.map((r) =>
			r.status === 'fulfilled' ? r.value : { status: 'rejected', error: String(r.reason) }
		);

		return json({ ok: true, dispatched: summary.length, results: summary });
	} catch (e) {
		console.error('News cron error:', e);
		return json({ error: 'Internal error' }, { status: 500 });
	}
};
