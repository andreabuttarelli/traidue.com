import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export const prerender = true;

export function GET() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const lines = [
		'# Tra i Due',
		'',
		'> Informazione sulle tematiche trans: terminologia, scienza, percorsi e cultura.',
		'',
		'## Articoli Wiki',
		'',
		...articles.map(
			(a) => `- [${a.title}](https://traidue.com/wiki/${a.slug}): ${a.description} [Markdown](https://traidue.com/wiki/${a.slug}/raw)`
		),
		'',
		'## Quiz',
		'',
		...quizzes.map(
			(q) => `- [${q.title}](https://traidue.com/quiz/${q.slug}): ${q.description}`
		),
		''
	];

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
