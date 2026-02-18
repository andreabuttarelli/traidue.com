import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export const prerender = false;

export function load() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();
	const categories = [...new Set(articles.map((a) => a.category))];
	const tags = [...new Set(articles.flatMap((a) => a.tags))];
	return { articles, quizzes, categories, tags };
}
