import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';

const RELEVANT_SLUGS = [
	'esplorare-identita-di-genere',
	'coming-out-trans',
	'identita-di-genere',
	'famiglie-e-persone-trans',
	'salute-mentale-persone-trans'
];

export function load() {
	const lang = getLocale();
	const articles = getAllArticles(lang);
	const quizzes = getAllQuizzes(lang);

	const filteredArticles = RELEVANT_SLUGS.map((slug) => articles.find((a) => a.translationKey === slug || a.slug === slug)).filter((a): a is NonNullable<typeof a> => a != null);

	return {
		articles: filteredArticles,
		featuredQuiz: quizzes[0] ?? null
	};
}
