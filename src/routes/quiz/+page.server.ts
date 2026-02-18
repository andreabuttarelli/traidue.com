import { getAllQuizzes } from '$lib/utils/quiz';

export function load() {
	const quizzes = getAllQuizzes();
	return { quizzes };
}
