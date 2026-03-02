import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { generateSingleEditorial } from '$lib/server/news-generator';
import type { RSSItem } from '$lib/server/rss';
import { sendNewsDigest } from '$lib/server/news-email';
import { generateAndProcessNewsImage } from '$lib/server/news-image';

const BASE_URL = 'https://www.traidue.com';

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
		try {
			// 1. Generate editorial
			const article = await generateSingleEditorial(item);
			if (!article) {
				console.log(`Generation filtered for "${item.title}"`);
				return;
			}

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
				console.error(`Failed to insert article "${article.title}":`, error?.message);
				return;
			}

			if (!draft) {
				console.error(`Slug collision for "${article.title}"`);
				return;
			}

			// 3. Generate image
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
				}
			} catch (e) {
				console.error(`Image generation failed for "${draft.title}":`, e);
			}

			// 4. Send email
			try {
				await sendNewsDigest([draft], BASE_URL);
			} catch (e) {
				console.error(`Email failed for "${draft.title}":`, e);
			}

			console.log(`Generated editorial: "${draft.title}"`);
		} catch (e) {
			console.error(`Generate error for "${item.title}":`, e);
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
