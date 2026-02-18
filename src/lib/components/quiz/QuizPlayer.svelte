<script lang="ts">
	import type { Quiz, QuizLevel } from '$lib/utils/quiz';
	import { calculateScore, getLevel } from '$lib/utils/quiz';
	import ProgressBar from './ProgressBar.svelte';
	import QuizQuestion from './QuizQuestion.svelte';
	import QuizResult from './QuizResult.svelte';

	let { quiz }: { quiz: Quiz } = $props();

	let phase: 'intro' | 'playing' | 'result' = $state('intro');
	let currentQuestion = $state(0);
	let answers: (number | null)[] = $state([]);
	let score = $state(0);
	let level: QuizLevel = $state(quiz.levels[0]);

	function start() {
		phase = 'playing';
		currentQuestion = 0;
		answers = [];
	}

	function handleAnswer(selected: number) {
		answers = [...answers, selected];
		if (currentQuestion < quiz.questions.length - 1) {
			currentQuestion++;
		} else {
			score = calculateScore(answers, quiz.questions);
			level = getLevel(score, quiz.levels);
			phase = 'result';
		}
	}

	function retry() {
		phase = 'intro';
		currentQuestion = 0;
		answers = [];
		score = 0;
	}

	let correctAnswers = $derived(
		answers.filter((a, i) => a === quiz.questions[i]?.correct).length
	);
</script>

<div class="max-w-2xl mx-auto">
	{#if phase === 'intro'}
		<div class="py-16">
			<h1 class="text-3xl font-heading font-semibold tracking-tight text-primary mb-3">{quiz.title}</h1>
			<p class="text-muted mb-2">{quiz.description}</p>
			<p class="text-sm text-muted mb-8">{quiz.questions.length} domande</p>
			<button
				class="px-8 py-3 bg-primary text-white text-sm font-medium hover:bg-primary/80 transition"
				onclick={start}
			>
				Inizia il quiz
			</button>
		</div>
	{:else if phase === 'playing'}
		<div class="py-8">
			<ProgressBar current={currentQuestion + 1} total={quiz.questions.length} />
			<div class="mt-8">
				{#key currentQuestion}
					<QuizQuestion
						question={quiz.questions[currentQuestion]}
						questionNumber={currentQuestion + 1}
						onAnswer={handleAnswer}
					/>
				{/key}
			</div>
		</div>
	{:else}
		<div class="py-12">
			<QuizResult
				{score}
				{level}
				totalQuestions={quiz.questions.length}
				{correctAnswers}
				onRetry={retry}
			/>
		</div>
	{/if}
</div>
