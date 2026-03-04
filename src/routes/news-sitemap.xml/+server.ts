import { supabase } from '$lib/server/supabase';

export const prerender = false;

export async function GET() {
	const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

	const { data: articles } = await supabase
		.from('news_articles')
		.select('title, slug, tags, published_at')
		.eq('status', 'published')
		.gte('published_at', twoDaysAgo)
		.order('published_at', { ascending: false });

	const items = articles ?? [];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items
	.map(
		(a) => `  <url>
    <loc>https://www.traidue.com/editoriali/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>TraiDue</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${a.published_at}</news:publication_date>
      <news:title>${escapeXml(a.title)}</news:title>${a.tags?.length ? `\n      <news:keywords>${a.tags.join(', ')}</news:keywords>` : ''}
    </news:news>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=900'
		}
	});
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
