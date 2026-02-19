import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

const RELEVANT_SLUGS = [
	'esplorare-identita-di-genere',
	'coming-out-trans',
	'identita-di-genere',
	'famiglie-e-persone-trans',
	'salute-mentale-persone-trans'
];

export function load() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const filteredArticles = RELEVANT_SLUGS.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean);

	return {
		articles: filteredArticles,
		featuredQuiz: quizzes[0] ?? null
	};
}
