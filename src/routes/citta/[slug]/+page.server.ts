import { error } from '@sveltejs/kit';
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import comuni from '$lib/data/comuni.json';

export const prerender = false;

export function load({ params }) {
	const comune = comuni.find((c) => c.slug === params.slug);

	if (!comune) {
		error(404, 'Comune non trovato');
	}

	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	return {
		comune,
		articles: articles.slice(0, 6),
		featuredQuiz: quizzes[0] ?? null
	};
}
