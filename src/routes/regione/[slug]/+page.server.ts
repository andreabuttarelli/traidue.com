import { error } from '@sveltejs/kit';
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import regioni from '$lib/data/regioni.json';

export const prerender = true;

export function entries() {
	return regioni.map((r) => ({ slug: r.slug }));
}

export function load({ params }) {
	const regione = regioni.find((r) => r.slug === params.slug);

	if (!regione) {
		error(404, 'Regione non trovata');
	}

	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	return {
		regione,
		articles: articles.slice(0, 6),
		featuredQuiz: quizzes[0] ?? null
	};
}
