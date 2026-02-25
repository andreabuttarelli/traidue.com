import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { regioniDettaglio } from '$lib/data/regioni-dettaglio';
import { cittaDettaglio } from '$lib/data/citta-dettaglio';

export function load() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();
	const totalSources = articles.reduce((sum, a) => sum + (a.sources?.length ?? 0), 0);
	const totalContent = articles.length + regioniDettaglio.size + cittaDettaglio.size;
	return {
		featuredArticles: articles.slice(0, 6),
		personArticles: articles.filter((a) => a.category === 'persone'),
		featuredQuizzes: quizzes.slice(0, 2),
		stats: {
			articles: totalContent,
			sources: totalSources,
			quizzes: quizzes.length
		}
	};
}
