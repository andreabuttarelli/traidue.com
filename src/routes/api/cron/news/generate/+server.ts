import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { generateSingleEditorial } from '$lib/server/news-generator';
import type { RSSItem } from '$lib/server/rss';
import { sendNewsDigest } from '$lib/server/news-email';
import { generateAndProcessNewsImage } from '$lib/server/news-image';

const BASE_URL = 'https://www.traidue.com';

export const config = { maxDuration: 300 };

export const POST: RequestHandler = async ({ request, platform }) => {
	const auth = request.headers.get('authorization');
	if (auth !== `Bearer ${CRON_SECRET}`) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	let item: RSSItem;
	try {
		const body = await request.json();
		if (!body?.title || !body?.link) {
			return json({ error: 'Invalid item' }, { status: 400 });
		}
		item = body as RSSItem;
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const work = async () => {
		const t0 = Date.now();
		const elapsed = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;

		try {
			// 1. Generate editorial
			console.log(`[Generate] Starting editorial for "${item.title}"`);
			const article = await generateSingleEditorial(item);
			if (!article) {
				console.log(`[Generate] Filtered "${item.title}" at ${elapsed()}`);
				return;
			}
			console.log(`[Generate] Editorial done at ${elapsed()}: "${article.title}"`);

			// 2. Save draft to DB with slug collision handling
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

			let slug = article.slug;
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
					.select('id, title, summary, content, tags, source_url, source_title, approval_token')
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
				console.error(`[Generate] DB insert failed for "${article.title}":`, error?.message);
				return;
			}

			if (!draft) {
				console.error(`[Generate] Slug collision for "${article.title}"`);
				return;
			}
			console.log(`[Generate] DB saved at ${elapsed()}: id=${draft.id}`);

			// 3. Generate image (non-blocking — email sent even if this fails)
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
					console.log(`[Generate] Image done at ${elapsed()}`);
				} else {
					console.log(`[Generate] Image skipped (no result) at ${elapsed()}`);
				}
			} catch (e) {
				console.error(`[Generate] Image failed at ${elapsed()} for "${draft.title}":`, e);
			}

			// 4. Send email
			try {
				await sendNewsDigest([draft], BASE_URL);
				console.log(`[Generate] Email sent at ${elapsed()} for "${draft.title}"`);
			} catch (e) {
				console.error(`[Generate] Email failed at ${elapsed()} for "${draft.title}":`, e);
			}

			console.log(`[Generate] Complete at ${elapsed()}: "${draft.title}"`);
		} catch (e) {
			console.error(`[Generate] Error at ${elapsed()} for "${item.title}":`, e);
		}
	};

	// Use Vercel's waitUntil to keep the function alive for background work
	const ctx = (platform as Record<string, unknown>)?.context as
		| { waitUntil?: (p: Promise<unknown>) => void }
		| undefined;
	if (ctx?.waitUntil) {
		ctx.waitUntil(work());
	} else {
		// Fallback: await directly (for local dev)
		await work();
	}

	return new Response(JSON.stringify({ ok: true, accepted: item.title }), {
		status: 202,
		headers: { 'Content-Type': 'application/json' }
	});
};
