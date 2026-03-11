import { getAllArticles, getTranslations } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { supabase } from '$lib/server/supabase';
import regioni from '$lib/data/regioni.json';
import { regioniDettaglio } from '$lib/data/regioni-dettaglio';
import comuni from '$lib/data/comuni.json';
import { cittaDettaglio } from '$lib/data/citta-dettaglio';

export const prerender = false;

const langs = ['it', 'en', 'es', 'pt'] as const;
const BASE = 'https://www.traidue.com';

function localizeUrl(path: string, lang: string): string {
	if (lang === 'it') return `${BASE}${path}`;
	return `${BASE}/${lang}${path}`;
}

function xhtmlLinks(path: string): string {
	return langs
		.map(
			(l) =>
				`    <xhtml:link rel="alternate" hreflang="${l}" href="${localizeUrl(path, l)}" />`
		)
		.join('\n');
}

interface SitemapUrl {
	url: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
}

function renderUrlEntries(urls: SitemapUrl[]): string {
	const entries: string[] = [];

	for (const u of urls) {
		for (const lang of langs) {
			const loc = localizeUrl(u.url, lang);
			entries.push(`  <url>
    <loc>${loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
${xhtmlLinks(u.url)}
  </url>`);
		}
	}

	return entries.join('\n');
}

function renderArticleEntries(articles: { slug: string; translationKey?: string; updated?: string; date: string }[]): string {
	const entries: string[] = [];

	for (const a of articles) {
		const translationKey = a.translationKey;
		let translatedSlugs: Record<string, string> = {};

		if (translationKey) {
			const translations = getTranslations(translationKey);
			for (const lang of langs) {
				if (translations[lang]) {
					translatedSlugs[lang] = translations[lang].slug;
				}
			}
		}

		for (const lang of langs) {
			const slug = translatedSlugs[lang] ?? a.slug;
			const loc = localizeUrl(`/wiki/${slug}`, lang);
			const lastmod = a.updated || a.date;

			// Build xhtml:link entries with correct slugs per language
			const altLinks = langs
				.map((l) => {
					const altSlug = translatedSlugs[l] ?? a.slug;
					return `    <xhtml:link rel="alternate" hreflang="${l}" href="${localizeUrl(`/wiki/${altSlug}`, l)}" />`;
				})
				.join('\n');

			entries.push(`  <url>
    <loc>${loc}</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
${altLinks}
  </url>`);
		}
	}

	return entries.join('\n');
}

export async function GET() {
	const articles = getAllArticles();
	const quizzes = getAllQuizzes();

	const today = new Date().toISOString().split('T')[0];

	const staticPages: SitemapUrl[] = [
		{ url: '', priority: '1.0', changefreq: 'weekly', lastmod: today },
		{ url: '/wiki', priority: '0.9', changefreq: 'weekly', lastmod: today },
		{ url: '/editoriali', priority: '0.8', changefreq: 'daily', lastmod: today },
		{ url: '/giovani', priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-25' },
		{ url: '/famiglie', priority: '0.8', changefreq: 'monthly', lastmod: today },
		{ url: '/quiz', priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-20' },
		{ url: '/glossario', priority: '0.7', changefreq: 'monthly', lastmod: '2026-02-20' },
		{ url: '/regioni', priority: '0.7', changefreq: 'monthly', lastmod: '2026-02-25' },
		{ url: '/chi-siamo', priority: '0.5', changefreq: 'monthly', lastmod: today },
		{ url: '/perche-ai', priority: '0.5', changefreq: 'monthly', lastmod: '2026-02-20' },
		{ url: '/newsletter', priority: '0.5', changefreq: 'monthly', lastmod: '2026-02-20' },
		{ url: '/cookie', priority: '0.3', changefreq: 'yearly', lastmod: '2026-02-18' },
		{ url: '/privacy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-02-18' },
		{ url: '/termini', priority: '0.3', changefreq: 'yearly', lastmod: '2026-02-18' }
	];

	const quizUrls: SitemapUrl[] = quizzes.map((q) => ({
		url: `/quiz/${q.slug}`,
		priority: '0.7',
		changefreq: 'monthly'
	}));

	// News articles from Supabase (Italian only, no multi-language)
	const { data: newsArticles } = await supabase
		.from('news_articles')
		.select('slug, published_at')
		.eq('status', 'published')
		.order('published_at', { ascending: false });

	const newsUrls: SitemapUrl[] = (newsArticles ?? []).map((n) => ({
		url: `/editoriali/${n.slug}`,
		priority: '0.6',
		changefreq: 'daily',
		lastmod: n.published_at?.split('T')[0]
	}));

	// Region and city pages (Italian only for now — no xhtml alternates)
	const regionUrls = regioni
		.filter((r) => regioniDettaglio.has(r.slug))
		.map((r) => ({
			url: `/regione/${r.slug}`,
			priority: '0.7',
			changefreq: 'monthly' as const,
			lastmod: regioniDettaglio.get(r.slug)!.ultimoAggiornamento
		}));

	const cittaUrls = comuni
		.filter((c) => cittaDettaglio.has(c.slug))
		.map((c) => ({
			url: `/citta/${c.slug}`,
			priority: '0.7',
			changefreq: 'monthly' as const,
			lastmod: cittaDettaglio.get(c.slug)!.ultimoAggiornamento
		}));

	// Italian-only URLs (regioni, citta, news) — no language alternates
	const italianOnlyUrls = [...newsUrls, ...regionUrls, ...cittaUrls];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${renderUrlEntries([...staticPages, ...quizUrls])}
${renderArticleEntries(articles)}
${italianOnlyUrls
	.map(
		(u) => `  <url>
    <loc>${BASE}${u.url}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
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
