<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import QuizCard from '$lib/components/quiz/QuizCard.svelte';

	let { data } = $props();
</script>

<SEO
	title="Quiz"
	description="Metti alla prova le tue conoscenze sulle tematiche trans con i nostri quiz interattivi."
	url="https://traidue.com/quiz"
/>

<div class="max-w-4xl mx-auto px-4 py-10">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Quiz' }]} />

	<h1 class="text-3xl font-heading font-bold text-primary mb-3">Quiz</h1>
	<p class="text-muted mb-10 max-w-2xl">
		Metti alla prova le tue conoscenze sulle tematiche trans. Ogni quiz ti darà un punteggio e
		suggerimenti per approfondire.
	</p>

	{#if data.quizzes.length > 0}
		<div class="grid gap-6 sm:grid-cols-2">
			{#each data.quizzes as quiz}
				<QuizCard {quiz} />
			{/each}
		</div>
	{:else}
		<p class="text-muted text-center py-12">Nessun quiz disponibile al momento.</p>
	{/if}
</div>
