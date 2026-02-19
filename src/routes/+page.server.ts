import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export function load() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();
	const totalSources = articles.reduce((sum, a) => sum + (a.sources?.length ?? 0), 0);
	return {
		featuredArticles: articles.slice(0, 4),
		featuredQuizzes: quizzes.slice(0, 2),
		stats: {
			articles: articles.length,
			sources: totalSources,
			quizzes: quizzes.length
		}
	};
}
