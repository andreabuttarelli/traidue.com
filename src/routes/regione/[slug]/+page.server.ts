import { error } from '@sveltejs/kit';
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import regioni from '$lib/data/regioni.json';
import { regioniDettaglio } from '$lib/data/regioni-dettaglio';

export const prerender = true;

export function entries() {
	return regioni.map((r) => ({ slug: r.slug }));
}

export function load({ params }) {
	const regione = regioni.find((r) => r.slug === params.slug);

	if (!regione) {
		error(404, 'Regione non trovata');
	}

	const dettaglio = regioniDettaglio.get(params.slug);
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const regionArticles = dettaglio
		? dettaglio.articoli_correlati
				.map((slug) => articles.find((a) => a.slug === slug))
				.filter((a): a is NonNullable<typeof a> => !!a)
		: articles.slice(0, 6);

	const altreRegioni = regioni.filter(
		(r) => r.slug !== params.slug && regioniDettaglio.has(r.slug)
	);

	return {
		regione,
		dettaglio: dettaglio ?? null,
		articles: regionArticles,
		altreRegioni,
		featuredQuiz: quizzes[0] ?? null,
		isRich: !!dettaglio
	};
}
