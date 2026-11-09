import { SITE } from '$lib/site';
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { localizeHref } from '$lib/paraglide/runtime';

export const prerender = true;

export async function GET() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

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
		`# ${SITE.brand}`,
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
				`- [${a.title}](${SITE.url}/wiki/${a.slug}): ${a.description} [Markdown](${SITE.url}/wiki/${a.slug}/raw)`
			);
		}
		lines.push('');
	}

	lines.push('## Quiz');
	lines.push('');
	for (const q of quizzes) {
		lines.push(`- [${q.title}](${SITE.url}/quiz/${q.slug}): ${q.description}`);
	}
	lines.push('');

	const otherLocales = { en: 'English', es: 'Español', pt: 'Português' } as const;
	for (const [locale, label] of Object.entries(otherLocales)) {
		lines.push(`## ${label}`);
		lines.push('');
		for (const a of getAllArticles(locale)) {
			const href = `${SITE.url}${localizeHref(`/wiki/${a.slug}`, { locale })}`;
			lines.push(`- [${a.title}](${href}): ${a.description} [Markdown](${href}/raw)`);
		}
		lines.push('');
	}

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
