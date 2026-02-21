import { supabase } from '$lib/server/supabase';

export const prerender = false;

export async function load({ url }) {
	const rawPage = Number(url.searchParams.get('page') ?? '1');
	const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
	const tag = url.searchParams.get('tag');
	const perPage = 10;
	const offset = (page - 1) * perPage;

	let query = supabase
		.from('news_articles')
		.select('id, title, slug, summary, thumb, tags, source_url, source_title, published_at', {
			count: 'exact'
		})
		.eq('status', 'published')
		.order('published_at', { ascending: false })
		.range(offset, offset + perPage - 1);

	if (tag) {
		query = query.contains('tags', [tag]);
	}

	const { data: articles, count } = await query;

	const { data: allTags } = await supabase
		.from('news_articles')
		.select('tags')
		.eq('status', 'published');

	const uniqueTags = [...new Set((allTags ?? []).flatMap((a) => a.tags))].sort();

	return {
		articles: articles ?? [],
		totalPages: Math.ceil((count ?? 0) / perPage),
		currentPage: page,
		currentTag: tag,
		tags: uniqueTags
	};
}
