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

<div class="w-full px-6 lg:px-12 py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Quiz' }]} />

	<h1 class="text-4xl font-heading font-bold text-primary mb-3">Quiz</h1>
	<p class="text-muted mb-10 max-w-lg">
		Metti alla prova le tue conoscenze sulle tematiche trans. Ogni quiz ti darà un punteggio e
		suggerimenti per approfondire.
	</p>

	{#if data.quizzes.length > 0}
		<div class="grid lg:grid-cols-2 gap-x-12">
			{#each data.quizzes as quiz}
				<QuizCard {quiz} />
			{/each}
		</div>
	{:else}
		<p class="text-muted py-12">Nessun quiz disponibile al momento.</p>
	{/if}
</div>
