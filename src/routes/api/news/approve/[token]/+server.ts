import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params;

	const { data, error } = await supabase
		.from('news_articles')
		.update({
			status: 'published',
			published_at: new Date().toISOString(),
			approval_token: null
		})
		.eq('approval_token', token)
		.eq('status', 'draft')
		.select('slug')
		.single();

	if (error || !data) {
		redirect(303, '/notizie?action=invalid');
	}

	redirect(303, `/notizie?action=approved&slug=${data.slug}`);
};
