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
		const base = 'w-full text-left px-4 py-3 border-b border-border transition-all duration-200';
		if (!answered) {
			return `${base} hover:pl-6 cursor-pointer`;
		}
		if (index === question.correct) {
			return `${base} font-medium`;
		}
		if (index === selectedAnswer && index !== question.correct) {
			return `${base} line-through text-muted`;
		}
		return `${base} text-muted`;
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

	<div>
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
		<div class="mt-6 border-l-2 border-primary pl-4">
			<p class="text-sm font-medium mb-1">
				{selectedAnswer === question.correct ? 'Corretto.' : 'Sbagliato.'}
			</p>
			<p class="text-sm text-muted">{question.explanation}</p>
		</div>

		<button
			class="mt-6 px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
			onclick={next}
		>
			Prossima domanda
		</button>
	{/if}
</div>
