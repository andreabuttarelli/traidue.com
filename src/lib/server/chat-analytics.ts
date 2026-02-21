import { supabase } from './supabase';

interface ChatInteraction {
	question: string;
	response?: string;
	currentSlug?: string;
	cacheHit: boolean;
	responseTimeMs: number;
}

export function logChatInteraction(interaction: ChatInteraction): void {
	supabase
		.from('chat_analytics')
		.insert({
			question: interaction.question,
			response: interaction.response ?? null,
			current_slug: interaction.currentSlug ?? null,
			cache_hit: interaction.cacheHit,
			response_time_ms: interaction.responseTimeMs
		})
		.then(({ error }) => {
			if (error) console.error('Analytics log error:', error.message);
		});
}
