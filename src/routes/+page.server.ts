import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { regioniDettaglio } from '$lib/data/regioni-dettaglio';
import { cittaDettaglio } from '$lib/data/citta-dettaglio';
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
	const quizzes = getAllQuizzes();
	const totalSources = articles.reduce((sum, a) => sum + (a.sources?.length ?? 0), 0);
	const totalContent = articles.length + regioniDettaglio.size + cittaDettaglio.size;
	return {
		featuredArticles: shuffle(articles).slice(0, 6),
		personArticles: articles.filter((a) => a.category === 'persone'),
		stats: {
			articles: totalContent,
			sources: totalSources,
			quizzes: quizzes.length
		}
	};
}
