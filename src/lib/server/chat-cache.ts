import { supabase } from './supabase';

const CACHE_TTL_DAYS = 180;

export function normalizeQuestion(q: string): string {
	return q
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // strip accents
		.replace(/[^\w\s]/g, '') // remove punctuation
		.replace(/\s+/g, ' ') // collapse whitespace
		.trim();
}

export async function getCachedResponse(
	normalizedQ: string,
	slug: string | undefined
): Promise<string | null> {
	const lookupSlug = slug ?? '__none__';

	const { data, error } = await supabase
		.from('chat_cache')
		.select('id, response, hit_count')
		.eq('normalized_question', normalizedQ)
		.eq('current_slug', lookupSlug)
		.gt('expires_at', new Date().toISOString())
		.single();

	if (error || !data) return null;

	// Increment hit count fire-and-forget
	supabase
		.from('chat_cache')
		.update({ hit_count: data.hit_count + 1 })
		.eq('id', data.id)
		.then(() => {});

	return data.response;
}

export async function setCachedResponse(
	normalizedQ: string,
	originalQ: string,
	slug: string | undefined,
	response: string
): Promise<void> {
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + CACHE_TTL_DAYS);

	await supabase.from('chat_cache').upsert(
		{
			normalized_question: normalizedQ,
			current_slug: slug ?? '__none__',
			original_question: originalQ,
			response,
			expires_at: expiresAt.toISOString(),
			hit_count: 0
		},
		{ onConflict: 'normalized_question,current_slug' }
	);
}
