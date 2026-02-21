import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { supabase } from '$lib/server/supabase';
import comuni from '$lib/data/comuni.json';
import regioni from '$lib/data/regioni.json';

export const prerender = false;

export async function GET() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const pages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/wiki', priority: '0.9', changefreq: 'weekly' },
		{ url: '/editoriali', priority: '0.8', changefreq: 'daily' },
		{ url: '/giovani', priority: '0.8', changefreq: 'monthly' },
		{ url: '/quiz', priority: '0.8', changefreq: 'monthly' },
		{ url: '/glossario', priority: '0.7', changefreq: 'monthly' },
		{ url: '/chi-siamo', priority: '0.5', changefreq: 'monthly' },
		{ url: '/cookie', priority: '0.3', changefreq: 'yearly' },
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

	// News articles from Supabase
	const { data: newsArticles } = await supabase
		.from('news_articles')
		.select('slug, published_at')
		.eq('status', 'published')
		.order('published_at', { ascending: false });

	const newsUrls = (newsArticles ?? []).map((n) => ({
		url: `/editoriali/${n.slug}`,
		priority: '0.6',
		changefreq: 'daily' as const,
		lastmod: n.published_at?.split('T')[0]
	}));

	const allUrls = [
		...pages,
		...articleUrls,
		...quizUrls,
		...newsUrls,
		...regioniUrls,
		...comuniUrls
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
	.map(
		(u) => `  <url>
    <loc>https://www.traidue.com${u.url}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>${'lastmod' in u && u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
