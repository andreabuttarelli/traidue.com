import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';

function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function load() {
	const lang = getLocale();
	const articles = getAllArticles(lang);
	const quizzes = getAllQuizzes(lang);
	const totalSources = articles.reduce((sum, a) => sum + (a.sources?.length ?? 0), 0);
	return {
		featuredArticles: shuffle(articles).slice(0, 6),
		personArticles: articles.filter((a) => a.category === 'persone'),
		stats: {
			articles: articles.length,
			sources: totalSources,
			quizzes: quizzes.length
		}
	};
}
