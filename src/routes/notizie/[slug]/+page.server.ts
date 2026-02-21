import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/utils/markdown';

export const prerender = false;

export async function load({ params }) {
	const { data: article } = await supabase
		.from('news_articles')
		.select('*')
		.eq('slug', params.slug)
		.eq('status', 'published')
		.single();

	if (!article) error(404, 'Notizia non trovata');

	return {
		article: {
			...article,
			contentHtml: renderMarkdown(article.content)
		}
	};
}
