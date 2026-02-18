<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import QuizCard from '$lib/components/quiz/QuizCard.svelte';

	let { data } = $props();
</script>

<SEO
	title="Quiz"
	description="Metti alla prova le tue conoscenze sulle tematiche trans con i nostri quiz interattivi."
	url="https://traidue.com/quiz"
/>

<div class="w-full px-4 sm:px-6 lg:px-12">
	<div class="py-10 sm:py-16 lg:py-20 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3">Quiz</h1>
		<p class="text-muted mb-0 max-w-md">
			Metti alla prova le tue conoscenze sulle tematiche trans. Ogni quiz ti darà un punteggio e
			suggerimenti per approfondire.
		</p>
	</div>

	{#if data.quizzes.length > 0}
		<div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
			{#each data.quizzes as quiz}
				<QuizCard {quiz} />
			{/each}
		</div>
	{:else}
		<p class="text-muted py-12">Nessun quiz disponibile al momento.</p>
	{/if}
</div>
