import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ request }) => {
	const auth = request.headers.get('authorization');
	if (auth !== `Bearer ${CRON_SECRET}`) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { error } = await supabase
		.from('chat_analytics')
		.select('id')
		.limit(1)
		.single();

	if (error && error.code !== 'PGRST116') {
		console.error('Cron ping error:', error.message);
		return json({ error: 'DB ping failed' }, { status: 500 });
	}

	return json({ ok: true });
};
