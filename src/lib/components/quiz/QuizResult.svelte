<script lang="ts">
	import type { QuizLevel } from '$lib/utils/quiz';
	import ShareButtons from '$lib/components/ui/ShareButtons.svelte';

	let {
		score,
		level,
		totalQuestions,
		correctAnswers,
		onRetry,
		quizTitle,
		quizSlug
	}: {
		score: number;
		level: QuizLevel;
		totalQuestions: number;
		correctAnswers: number;
		onRetry: () => void;
		quizTitle: string;
		quizSlug: string;
	} = $props();

	let shareText = $derived(
		`Ho fatto ${correctAnswers}/${totalQuestions} al quiz "${quizTitle}" su traidue.com — E tu?`
	);
</script>

<div class="text-center max-w-md mx-auto">
	<div class="mb-8">
		<div class="text-4xl sm:text-6xl font-heading font-semibold tracking-tight text-primary mb-2">{score}%</div>
		<div class="text-lg sm:text-xl font-heading font-semibold text-primary mb-2">{level.label}</div>
		<p class="text-muted">{level.message}</p>
	</div>

	<div class="border-t border-b border-border py-6 mb-8">
		<div class="text-sm text-muted mb-1">Risposte corrette</div>
		<div class="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-primary">
			{correctAnswers} / {totalQuestions}
		</div>
	</div>

	<div class="mb-8">
		<p class="text-sm text-muted mb-3">Condividi il tuo risultato</p>
		<div class="flex justify-center">
			<ShareButtons url="https://www.traidue.com/quiz/{quizSlug}" text={shareText} />
		</div>
	</div>

	<div class="flex flex-col sm:flex-row gap-3 justify-center">
		<button
			class="px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
			onclick={onRetry}
		>
			Riprova
		</button>
		<a
			href="/wiki"
			class="px-6 py-2.5 rounded-full border border-primary text-sm font-medium text-primary hover:bg-primary hover:text-bg transition"
		>
			Esplora la Wiki
		</a>
	</div>
</div>
