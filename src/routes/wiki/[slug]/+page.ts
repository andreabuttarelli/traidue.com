import { getArticleBySlug } from '$lib/utils/wiki';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const article = getArticleBySlug(params.slug);
	if (!article) {
		error(404, 'Articolo non trovato');
	}
	return {
		metadata: article.metadata,
		Content: article.default
	};
}
