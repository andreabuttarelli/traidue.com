import { getAllArticles, getArticleBySlug } from '$lib/utils/wiki';
import { error } from '@sveltejs/kit';

export function entries() {
	return getAllArticles().map((a) => ({ slug: a.slug }));
}

export const prerender = true;

export function load({ params }) {
	const article = getArticleBySlug(params.slug);
	if (!article) {
		error(404, 'Articolo non trovato');
	}

	const allArticles = getAllArticles();
	const relatedArticles = (article.metadata.related ?? [])
		.map((slug: string) => allArticles.find((a) => a.slug === slug))
		.filter((a): a is NonNullable<typeof a> => a != null)
		.map(({ slug, title, description, category, image, sources }) => ({ slug, title, description, category, image, sources }));

	return {
		metadata: article.metadata,
		Content: article.default,
		relatedArticles
	};
}
