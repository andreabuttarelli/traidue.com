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

<div class="max-w-5xl mx-auto px-4 py-12">
	<h1 class="text-4xl font-heading font-bold text-primary mb-2">Wiki</h1>
	<p class="text-muted mb-8">Esplora i nostri articoli su tematiche trans</p>

	<!-- Search and Filters -->
	<div class="flex flex-col sm:flex-row gap-4 mb-8">
		<input
			type="text"
			placeholder="Cerca articoli..."
			bind:value={search}
			class="flex-1 px-4 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-accent"
		/>
		<div class="flex gap-2 flex-wrap">
			<button
				class="px-3 py-1.5 rounded-full text-sm transition {selectedCategory === ''
					? 'bg-primary text-white'
					: 'bg-card border border-border text-muted hover:text-primary'}"
				onclick={() => (selectedCategory = '')}
			>
				Tutti
			</button>
			{#each data.categories as category}
				<button
					class="px-3 py-1.5 rounded-full text-sm capitalize transition {selectedCategory ===
					category
						? 'bg-primary text-white'
						: 'bg-card border border-border text-muted hover:text-primary'}"
					onclick={() => (selectedCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<!-- Articles Grid -->
	<div class="grid gap-6 md:grid-cols-2">
		{#each filteredArticles as article}
			<ArticleCard {article} />
		{:else}
			<p class="text-muted col-span-2">Nessun articolo trovato.</p>
		{/each}
	</div>
</div>
