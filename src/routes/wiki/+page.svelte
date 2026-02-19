<script lang="ts">
	import { page } from '$app/stores';
	import SEO from '$lib/components/seo/SEO.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import QuizCard from '$lib/components/quiz/QuizCard.svelte';

	let { data } = $props();

	let search = $state($page.url.searchParams.get('q') ?? '');
	let selectedCategory = $state($page.url.searchParams.get('category') ?? '');

	let filteredArticles = $derived(
		data.articles.filter((a) => {
			const q = search.toLowerCase();
			const matchesSearch =
				search === '' ||
				a.title.toLowerCase().includes(q) ||
				a.description.toLowerCase().includes(q) ||
				a.tags.some((t) => t.toLowerCase().includes(q));
			const matchesCategory = selectedCategory === '' || a.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
	);

	let filteredQuizzes = $derived(
		data.quizzes.filter((quiz) => {
			if (search === '') return false;
			const q = search.toLowerCase();
			return (
				quiz.title.toLowerCase().includes(q) ||
				quiz.description.toLowerCase().includes(q) ||
				quiz.category.toLowerCase().includes(q)
			);
		})
	);
</script>

<SEO
	title="Wiki"
	description="Esplora la nostra wiki: articoli su identità di genere, scienza, percorsi e cultura trans."
	url="https://www.traidue.com/wiki"
/>

<div class="w-full px-4 sm:px-6 lg:px-12">
	<div class="py-10 sm:py-16 lg:py-20 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3">Wiki</h1>
		<p class="text-muted mb-6 sm:mb-8 max-w-md">Esplora i nostri articoli su tematiche trans</p>
		<input
			type="text"
			placeholder="Cerca articoli e quiz..."
			bind:value={search}
			class="w-full max-w-xl px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-border bg-transparent dark:bg-white/5 text-text shadow-sm focus:outline-none focus:border-primary text-base sm:text-lg"
		/>
		<div class="flex gap-4 flex-wrap justify-center mt-6">
			<button
				class="text-sm transition {selectedCategory === ''
					? 'text-primary font-medium'
					: 'text-muted hover:text-primary'}"
				onclick={() => (selectedCategory = '')}
			>
				Tutti
			</button>
			{#each data.categories as category}
				<button
					class="text-sm capitalize transition {selectedCategory === category
						? 'text-primary font-medium'
						: 'text-muted hover:text-primary'}"
					onclick={() => (selectedCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
		{#each filteredArticles as article}
			<ArticleCard {article} />
		{:else}
			{#if filteredQuizzes.length === 0}
				<p class="text-muted">Nessun risultato trovato.</p>
			{/if}
		{/each}
	</div>

	{#if filteredQuizzes.length > 0}
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mt-8 sm:mt-12 mb-4 sm:mb-6">Quiz</h2>
		<div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
			{#each filteredQuizzes as quiz}
				<QuizCard {quiz} />
			{/each}
		</div>
	{/if}
</div>
