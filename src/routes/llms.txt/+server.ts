import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { supabase } from '$lib/server/supabase';

export const prerender = false;

export async function GET() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const { data: editorials } = await supabase
		.from('news_articles')
		.select('title, slug, summary')
		.eq('status', 'published')
		.order('published_at', { ascending: false });

	const categoryLabels: Record<string, string> = {
		terminologia: 'Terminologia',
		scienza: 'Scienza',
		percorsi: 'Percorsi e Diritti',
		cultura: 'Cultura e Societa',
		persone: 'Persone'
	};

	const grouped = new Map<string, typeof articles>();
	for (const a of articles) {
		const cat = a.category ?? 'altro';
		if (!grouped.has(cat)) grouped.set(cat, []);
		grouped.get(cat)!.push(a);
	}

	const lines = [
		'# Tra i Due',
		'',
		'> Informazione evidence-based sulle tematiche trans: terminologia, scienza, percorsi e cultura.',
		`> ${articles.length} articoli wiki, curati da Andrea Buttarelli.`,
		''
	];

	for (const [cat, items] of grouped) {
		lines.push(`## ${categoryLabels[cat] ?? cat}`);
		lines.push('');
		for (const a of items) {
			lines.push(
				`- [${a.title}](https://www.traidue.com/wiki/${a.slug}): ${a.description} [Markdown](https://www.traidue.com/wiki/${a.slug}/raw)`
			);
		}
		lines.push('');
	}

	if (editorials && editorials.length > 0) {
		lines.push('## Editoriali');
		lines.push('');
		for (const e of editorials) {
			lines.push(
				`- [${e.title}](https://www.traidue.com/editoriali/${e.slug}): ${e.summary}`
			);
		}
		lines.push('');
	}

	lines.push('## Quiz');
	lines.push('');
	for (const q of quizzes) {
		lines.push(`- [${q.title}](https://www.traidue.com/quiz/${q.slug}): ${q.description}`);
	}
	lines.push('');

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
