import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';

const PRIMI_PASSI = [
	'figlio-trans-cosa-fare',
	'coming-out-figlio-trans',
	'famiglie-e-persone-trans',
	'bambini-trans'
];

const APPROFONDIMENTI = [
	'genitorialita-trans',
	'salute-mentale-persone-trans',
	'identita-di-genere',
	'sicurezza-transizione',
	'contagio-sociale-trans',
	'detransizione'
];

export function load() {
	const lang = getLocale();
	const articles = getAllArticles(lang);
	const quizzes = getAllQuizzes(lang);

	const primiPassi = PRIMI_PASSI.map((slug) => articles.find((a) => a.translationKey === slug || a.slug === slug)).filter((a): a is NonNullable<typeof a> => a != null);
	const approfondimenti = APPROFONDIMENTI.map((slug) => articles.find((a) => a.translationKey === slug || a.slug === slug)).filter((a): a is NonNullable<typeof a> => a != null);

	return {
		primiPassi,
		approfondimenti,
		featuredQuiz: quizzes[0] ?? null
	};
}
