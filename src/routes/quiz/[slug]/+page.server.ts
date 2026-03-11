import { getQuizBySlug } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const lang = getLocale();
	const quiz = getQuizBySlug(params.slug, lang);
	if (!quiz) {
		throw error(404, 'Quiz non trovato');
	}
	return { quiz };
}
