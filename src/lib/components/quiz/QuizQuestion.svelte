<script lang="ts">
	import type { QuizQuestion } from '$lib/utils/quiz';

	let {
		question,
		questionNumber,
		onAnswer
	}: {
		question: QuizQuestion;
		questionNumber: number;
		onAnswer: (selected: number) => void;
	} = $props();

	let selectedAnswer: number | null = $state(null);
	let answered = $state(false);

	function selectAnswer(index: number) {
		if (answered) return;
		selectedAnswer = index;
		answered = true;
	}

	function getOptionClass(index: number): string {
		const base = 'w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200';
		if (!answered) {
			return `${base} border-border hover:border-accent hover:bg-accent/5 cursor-pointer`;
		}
		if (index === question.correct) {
			return `${base} border-success bg-success/5`;
		}
		if (index === selectedAnswer && index !== question.correct) {
			return `${base} border-error bg-error/5`;
		}
		return `${base} border-border opacity-50`;
	}

	function next() {
		if (selectedAnswer !== null) {
			onAnswer(selectedAnswer);
		}
	}
</script>

<div>
	<p class="text-sm text-muted mb-2">Domanda {questionNumber}</p>
	<h2 class="text-xl font-heading font-semibold text-primary mb-6">{question.text}</h2>

	<div class="space-y-3">
		{#each question.options as option, i}
			<button
				class={getOptionClass(i)}
				onclick={() => selectAnswer(i)}
				disabled={answered}
			>
				{option}
			</button>
		{/each}
	</div>

	{#if answered}
		<div class="mt-6 p-4 rounded-lg bg-card border border-border">
			<p class="text-sm font-medium mb-1 {selectedAnswer === question.correct ? 'text-success' : 'text-error'}">
				{selectedAnswer === question.correct ? 'Corretto!' : 'Sbagliato!'}
			</p>
			<p class="text-sm text-muted">{question.explanation}</p>
		</div>

		<button
			class="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
			onclick={next}
		>
			Prossima domanda →
		</button>
	{/if}
</div>
