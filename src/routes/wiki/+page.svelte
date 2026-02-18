<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';

	let { data } = $props();

	let search = $state('');
	let selectedCategory = $state('');

	let filteredArticles = $derived(
		data.articles.filter((a) => {
			const matchesSearch =
				search === '' ||
				a.title.toLowerCase().includes(search.toLowerCase()) ||
				a.description.toLowerCase().includes(search.toLowerCase());
			const matchesCategory = selectedCategory === '' || a.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
	);
</script>

<SEO
	title="Wiki"
	description="Esplora la nostra wiki: articoli su identità di genere, scienza, percorsi e cultura trans."
	url="https://traidue.com/wiki"
/>

<div class="w-full px-6 lg:px-12 py-12">
	<h1 class="text-4xl font-heading font-bold text-primary mb-2">Wiki</h1>
	<p class="text-muted mb-8">Esplora i nostri articoli su tematiche trans</p>

	<div class="flex flex-col sm:flex-row gap-4 mb-8">
		<input
			type="text"
			placeholder="Cerca articoli..."
			bind:value={search}
			class="flex-1 px-4 py-2 border-b border-border bg-transparent text-text focus:outline-none focus:border-primary"
		/>
		<div class="flex gap-4 flex-wrap">
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

	<div class="grid lg:grid-cols-2 gap-x-12">
		{#each filteredArticles as article}
			<ArticleCard {article} />
		{:else}
			<p class="text-muted">Nessun articolo trovato.</p>
		{/each}
	</div>
</div>
