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

const allModules = import.meta.glob<{ default: Quiz }>('/src/lib/data/quiz/**/*.json', { eager: true });

function getLangFromQuizPath(path: string): string {
	// path: /src/lib/data/quiz/{lang}/{slug}.json
	const parts = path.split('/');
	return parts[5] ?? 'it';
}

export function getAllQuizzes(lang: string = 'it'): Quiz[] {
	return Object.entries(allModules)
		.filter(([path]) => getLangFromQuizPath(path) === lang)
		.map(([, m]) => m.default);
}

export function getQuizBySlug(slug: string, lang: string = 'it'): Quiz | null {
	const quizzes = getAllQuizzes(lang);
	return quizzes.find(q => q.slug === slug) ?? null;
}

export function calculateScore(answers: (number | null)[], questions: QuizQuestion[]): number {
	const correct = answers.filter((a, i) => a === questions[i].correct).length;
	return Math.round((correct / questions.length) * 100);
}

export function getLevel(score: number, levels: QuizLevel[]): QuizLevel {
	return levels.find(l => score >= l.min && score <= l.max) ?? levels[0];
}
