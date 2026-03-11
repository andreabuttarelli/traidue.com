import { getAllQuizzes } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';

export function load() {
	const lang = getLocale();
	const quizzes = getAllQuizzes(lang);
	return { quizzes };
}
