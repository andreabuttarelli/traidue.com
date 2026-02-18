import { getQuizBySlug } from '$lib/utils/quiz';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const quiz = getQuizBySlug(params.slug);
	if (!quiz) {
		throw error(404, 'Quiz non trovato');
	}
	return { quiz };
}
