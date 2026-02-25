import { error } from '@sveltejs/kit';
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import comuni from '$lib/data/comuni.json';
import { cittaDettaglio } from '$lib/data/citta-dettaglio';

export const prerender = false;

export function load({ params }) {
	const comune = comuni.find((c) => c.slug === params.slug);

	if (!comune) {
		error(404, 'Comune non trovato');
	}

	const dettaglio = cittaDettaglio.get(params.slug);
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const comuneArticles = dettaglio
		? dettaglio.articoli_correlati
				.map((slug) => articles.find((a) => a.slug === slug))
				.filter((a): a is NonNullable<typeof a> => !!a)
		: articles.slice(0, 6);

	const altreCitta = comuni.filter(
		(c) => c.slug !== params.slug && cittaDettaglio.has(c.slug)
	);

	return {
		comune,
		dettaglio: dettaglio ?? null,
		articles: comuneArticles,
		altreCitta,
		featuredQuiz: quizzes[0] ?? null,
		isRich: !!dettaglio
	};
}
