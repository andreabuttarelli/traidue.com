import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export function load() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();
	return {
		featuredArticles: articles.slice(0, 4),
		featuredQuizzes: quizzes.slice(0, 2)
	};
}
