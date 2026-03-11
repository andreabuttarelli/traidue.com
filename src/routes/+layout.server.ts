import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';

export function load() {
	const lang = getLocale();
	const articles = getAllArticles(lang);
	const quizzes = getAllQuizzes(lang);
	return {
		allArticles: articles,
		allQuizzes: quizzes,
		lang
	};
}
