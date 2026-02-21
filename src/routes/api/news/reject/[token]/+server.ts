import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params;

	const { error } = await supabase
		.from('news_articles')
		.update({
			status: 'rejected',
			approval_token: null
		})
		.eq('approval_token', token)
		.eq('status', 'draft');

	if (error) {
		redirect(303, '/notizie?action=invalid');
	}

	redirect(303, '/notizie?action=rejected');
};
