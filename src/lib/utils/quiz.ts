export interface QuizQuestion {
	text: string;
	options: string[];
	correct: number;
	explanation: string;
}

export interface QuizLevel {
	min: number;
	max: number;
	label: string;
	message: string;
}

export interface Quiz {
	slug: string;
	title: string;
	description: string;
	category: string;
	questions: QuizQuestion[];
	levels: QuizLevel[];
}

export function getAllQuizzes(): Quiz[] {
	const modules = import.meta.glob<{ default: Quiz }>('/src/lib/data/quiz/*.json', { eager: true });
	return Object.values(modules).map(m => m.default);
}

export function getQuizBySlug(slug: string): Quiz | null {
	const quizzes = getAllQuizzes();
	return quizzes.find(q => q.slug === slug) ?? null;
}

export function calculateScore(answers: (number | null)[], questions: QuizQuestion[]): number {
	const correct = answers.filter((a, i) => a === questions[i].correct).length;
	return Math.round((correct / questions.length) * 100);
}

export function getLevel(score: number, levels: QuizLevel[]): QuizLevel {
	return levels.find(l => score >= l.min && score <= l.max) ?? levels[0];
}
