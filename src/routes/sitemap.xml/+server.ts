import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import comuni from '$lib/data/comuni.json';
import regioni from '$lib/data/regioni.json';

export const prerender = true;

export async function GET() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const pages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/wiki', priority: '0.9', changefreq: 'weekly' },
		{ url: '/giovani', priority: '0.8', changefreq: 'monthly' },
		{ url: '/quiz', priority: '0.8', changefreq: 'monthly' },
		{ url: '/glossario', priority: '0.7', changefreq: 'monthly' },
		{ url: '/chi-siamo', priority: '0.5', changefreq: 'monthly' },
		{ url: '/privacy', priority: '0.3', changefreq: 'yearly' },
		{ url: '/termini', priority: '0.3', changefreq: 'yearly' }
	];

	const articleUrls = articles.map((a) => ({
		url: `/wiki/${a.slug}`,
		priority: '0.8',
		changefreq: 'monthly' as const,
		lastmod: a.updated || a.date
	}));

	const quizUrls = quizzes.map((q) => ({
		url: `/quiz/${q.slug}`,
		priority: '0.7',
		changefreq: 'monthly' as const
	}));

	const comuniUrls = comuni.map((c) => ({
		url: `/citta/${c.slug}`,
		priority: '0.3',
		changefreq: 'monthly' as const
	}));

	const regioniUrls = regioni.map((r) => ({
		url: `/regione/${r.slug}`,
		priority: '0.4',
		changefreq: 'monthly' as const
	}));

	const allUrls = [...pages, ...articleUrls, ...quizUrls, ...regioniUrls, ...comuniUrls];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
	.map(
		(u) => `  <url>
    <loc>https://www.traidue.com${u.url}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>${'lastmod' in u ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
