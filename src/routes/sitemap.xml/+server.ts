import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export const prerender = true;

export async function GET() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const pages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/wiki', priority: '0.9', changefreq: 'weekly' },
		{ url: '/quiz', priority: '0.8', changefreq: 'monthly' },
		{ url: '/chi-siamo', priority: '0.5', changefreq: 'monthly' }
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

	const allUrls = [...pages, ...articleUrls, ...quizUrls];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
	.map(
		(u) => `  <url>
    <loc>https://traidue.com${u.url}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>${'lastmod' in u ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
