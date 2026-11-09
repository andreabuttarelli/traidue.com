import { getRawArticleBySlug } from '$lib/utils/wiki';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

// Static files, discovered by the crawler via the article's "raw" link in every locale.
// Content-Type and noindex are set in vercel.json: prerendered responses lose their headers.
export const prerender = true;

export function GET({ params }) {
	const raw = getRawArticleBySlug(params.slug, getLocale());
	if (!raw) {
		error(404, 'Articolo non trovato');
	}

	return new Response(raw, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
}
