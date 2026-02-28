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

		// 4. Fire-and-forget: dispatch each article to /generate
		const generateUrl = `${url.origin}/api/cron/news/generate`;
		const dispatched: string[] = [];

		for (const r of ranked) {
			const item = newItems[r.originalIndex];
			if (!item) continue;

			fetch(generateUrl, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${CRON_SECRET}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(item)
			}).catch((e) => console.error(`Dispatch failed for "${item.title}":`, e));

			dispatched.push(`#${r.originalIndex} (score ${r.score}): ${r.reason}`);
		}

		return json({ ok: true, dispatched: dispatched.length, items: dispatched });
	} catch (e) {
		console.error('News cron error:', e);
		return json({ error: 'Internal error' }, { status: 500 });
	}
};
