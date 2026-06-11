import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';

export const prerender = true;

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
	const categories = [...new Set(articles.map((a) => a.category))];
	const tags = [...new Set(articles.flatMap((a) => a.tags))];
	// Note: with prerendering the shuffle happens at build time, so the order
	// is fixed per deploy (not per visit).
	return { articles: shuffle(articles), quizzes, categories, tags };
}
