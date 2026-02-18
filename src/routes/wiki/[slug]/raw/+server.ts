import { getRawArticleBySlug } from '$lib/utils/wiki';
import { error } from '@sveltejs/kit';

export function GET({ params }) {
	const raw = getRawArticleBySlug(params.slug);
	if (!raw) {
		error(404, 'Articolo non trovato');
	}

	return new Response(raw, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
}
