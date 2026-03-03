import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchAllFeeds, deduplicateItems } from '$lib/server/rss';
import { rankNewsItems } from '$lib/server/news-generator';

export const config = { maxDuration: 300 };

export const GET: RequestHandler = async ({ request, url, platform }) => {
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

		// 4. Dispatch each article to /generate in background
		const generateUrl = `${url.origin}/api/cron/news/generate`;
		const dispatched: string[] = [];
		const itemsToDispatch: { item: typeof newItems[0]; info: string }[] = [];

		for (const r of ranked) {
			const item = newItems[r.originalIndex];
			if (!item) continue;
			const info = `#${r.originalIndex} (score ${r.score}): ${r.reason}`;
			dispatched.push(info);
			itemsToDispatch.push({ item, info });
		}

		// Dispatch all articles in parallel for faster execution
		const dispatchWork = async () => {
			const results = await Promise.allSettled(
				itemsToDispatch.map(async ({ item, info }) => {
					try {
						const resp = await fetch(generateUrl, {
							method: 'POST',
							headers: {
								'Authorization': `Bearer ${CRON_SECRET}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(item),
							signal: AbortSignal.timeout(10_000)
						});
						console.log(`[News] Dispatched ${info}: ${resp.status}`);
					} catch (e) {
						console.error(`[News] Dispatch failed for ${info}:`, e);
					}
				})
			);
			const failed = results.filter((r) => r.status === 'rejected').length;
			if (failed) console.error(`[News] ${failed}/${results.length} dispatches failed`);
		};

		const ctx = (platform as Record<string, unknown>)?.context as
			| { waitUntil?: (p: Promise<unknown>) => void }
			| undefined;
		if (ctx?.waitUntil) {
			ctx.waitUntil(dispatchWork());
		} else {
			// Fallback for local dev: fire-and-forget
			dispatchWork().catch((e) => console.error('[News] Dispatch error:', e));
		}

		return json({ ok: true, dispatched: dispatched.length, items: dispatched });
	} catch (e) {
		console.error('News cron error:', e);
		return json({ error: 'Internal error' }, { status: 500 });
	}
};
