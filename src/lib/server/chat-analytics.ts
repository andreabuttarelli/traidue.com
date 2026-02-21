import { supabase } from './supabase';

// Gemini 2.5 Flash pricing (USD per token)
const INPUT_COST_PER_TOKEN = 0.30 / 1_000_000;
const OUTPUT_COST_PER_TOKEN = 2.50 / 1_000_000;

interface ChatInteraction {
	question: string;
	response?: string;
	currentSlug?: string;
	cacheHit: boolean;
	responseTimeMs: number;
	promptTokens?: number;
	completionTokens?: number;
	totalTokens?: number;
}

export function logChatInteraction(interaction: ChatInteraction): void {
	let estimatedCost: number | null = null;
	if (interaction.promptTokens != null && interaction.completionTokens != null) {
		estimatedCost =
			interaction.promptTokens * INPUT_COST_PER_TOKEN +
			interaction.completionTokens * OUTPUT_COST_PER_TOKEN;
	}

	supabase
		.from('chat_analytics')
		.insert({
			question: interaction.question,
			response: interaction.response ?? null,
			current_slug: interaction.currentSlug ?? null,
			cache_hit: interaction.cacheHit,
			response_time_ms: interaction.responseTimeMs,
			prompt_tokens: interaction.promptTokens ?? null,
			completion_tokens: interaction.completionTokens ?? null,
			total_tokens: interaction.totalTokens ?? null,
			estimated_cost_usd: estimatedCost
		})
		.then(({ error }) => {
			if (error) console.error('Analytics log error:', error.message);
		});
}
