import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

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
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const primiPassi = PRIMI_PASSI.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);
	const approfondimenti = APPROFONDIMENTI.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

	return {
		primiPassi,
		approfondimenti,
		featuredQuiz: quizzes[0] ?? null
	};
}
