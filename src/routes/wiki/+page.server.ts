import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export const prerender = false;

function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function load() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();
	const categories = [...new Set(articles.map((a) => a.category))];
	const tags = [...new Set(articles.flatMap((a) => a.tags))];
	return { articles: shuffle(articles), quizzes, categories, tags };
}
