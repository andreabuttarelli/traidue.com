import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export function load() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();
	return {
		allArticles: articles,
		allQuizzes: quizzes
	};
}
