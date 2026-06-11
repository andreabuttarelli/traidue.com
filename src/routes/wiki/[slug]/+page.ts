import { getAllArticles, getArticleBySlug, getTranslations } from '$lib/utils/wiki';
import { getLocale, localizeHref } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export function entries() {
	// Only Italian slugs: URLs without a locale prefix are Italian. The
	// localized variants (/en/wiki/<translated-slug>, ...) are enumerated in
	// svelte.config.js (kit.prerender.entries) and discovered by the crawler.
	return getAllArticles('it').map((a) => ({ slug: a.slug }));
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
		.map((key: string) => allArticles.find((a) => a.translationKey === key || a.slug === key))
		.filter((a): a is NonNullable<typeof a> => a != null)
		.map(({ slug, title, description, category, image, sources }) => ({ slug, title, description, category, image, sources }));

	const translations = article.metadata.translationKey
		? getTranslations(article.metadata.translationKey)
		: {};

	// Localized paths with the TRANSLATED slug per locale, e.g.
	// { it: '/wiki/identita-di-genere', en: '/en/wiki/gender-identity', ... }.
	// Used by the LanguageSwitcher (via page.data) and for the hreflang tags.
	const alternates = Object.fromEntries(
		Object.entries(translations).map(([l, a]) => [
			l,
			localizeHref('/wiki/' + a.slug, { locale: l as 'it' | 'en' | 'es' | 'pt' })
		])
	) as Record<string, string>;

	return {
		metadata: article.metadata,
		Content: article.default,
		relatedArticles,
		translations,
		alternates
	};
}
