import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { submitUrlForIndexing } from '$lib/server/indexing';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params;

	if (!UUID_RE.test(token)) {
		redirect(303, '/editoriali?action=invalid');
	}

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
		redirect(303, '/editoriali?action=invalid');
	}

	// Fire-and-forget: notify search engines about the new page
	submitUrlForIndexing(`https://www.traidue.com/editoriali/${data.slug}`).catch(() => {});

	redirect(303, `/editoriali?action=approved&slug=${encodeURIComponent(data.slug)}`);
};
