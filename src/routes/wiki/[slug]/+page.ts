import { getAllArticles, getArticleBySlug, getTranslations } from '$lib/utils/wiki';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export function entries() {
	const allLangs = ['it', 'en', 'es', 'pt'];
	const entries: { slug: string }[] = [];
	for (const lang of allLangs) {
		for (const a of getAllArticles(lang)) {
			entries.push({ slug: a.slug });
		}
	}
	return entries;
}

export const prerender = true;

export function load({ params }) {
	const lang = getLocale();
	const article = getArticleBySlug(params.slug, lang);
	if (!article) {
		error(404, 'Article not found');
	}

	const allArticles = getAllArticles(lang);
	const relatedArticles = (article.metadata.related ?? [])
		.map((slug: string) => allArticles.find((a) => a.slug === slug))
		.filter((a): a is NonNullable<typeof a> => a != null)
		.map(({ slug, title, description, category, image, sources }) => ({ slug, title, description, category, image, sources }));

	const translations = article.metadata.translationKey
		? getTranslations(article.metadata.translationKey)
		: {};

	return {
		metadata: article.metadata,
		Content: article.default,
		relatedArticles,
		translations
	};
}
