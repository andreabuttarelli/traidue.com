<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import SearchInput from '$lib/components/ui/SearchInput.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import QuizCard from '$lib/components/quiz/QuizCard.svelte';
	import * as m from '$lib/paraglide/messages';
	import { getLocale, locales, localizeHref } from '$lib/paraglide/runtime';

	let { data } = $props();

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `https://www.traidue.com${localizeHref('/wiki', { locale: l })}`])
	);

	const categoryLabels: Record<string, () => string> = {
		terminologia: m.cat_terminologia,
		scienza: m.cat_scienza,
		percorsi: m.cat_percorsi,
		cultura: m.cat_cultura,
		persone: m.cat_persone
	};

	// searchParams are not available during prerendering; the query string is
	// read client-side only (the static HTML shows the unfiltered list).
	let search = $state(browser ? ($page.url.searchParams.get('q') ?? '') : '');
	let selectedCategory = $state(browser ? ($page.url.searchParams.get('category') ?? '') : '');

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
	title={m.wiki_page_title({ count: data.articles.length })}
	description={m.wiki_page_desc()}
	url="https://www.traidue.com/wiki"
	{alternateUrls}
/>

<StructuredData schema={{
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	name: 'Wiki',
	description: m.wiki_page_desc(),
	url: `https://www.traidue.com${localizeHref('/wiki')}`,
	inLanguage: { it: 'it-IT', en: 'en-US', es: 'es-ES', pt: 'pt-BR' }[getLocale()] ?? 'it-IT',
	isPartOf: {
		'@type': 'WebSite',
		name: 'Tra i Due',
		url: 'https://www.traidue.com'
	},
	mainEntity: {
		'@type': 'ItemList',
		numberOfItems: data.articles.length,
		itemListElement: data.articles.slice(0, 30).map((a, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			url: `https://www.traidue.com${localizeHref('/wiki/' + a.slug)}`
		}))
	}
}} />

<StructuredData schema={{
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: m.common_home(), item: 'https://www.traidue.com' },
		{ '@type': 'ListItem', position: 2, name: 'Wiki' }
	]
}} />

<div class="w-full px-4 sm:px-6 lg:px-12">
	<div class="py-10 sm:py-16 lg:py-20 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3">Wiki</h1>
		<p class="text-muted mb-6 sm:mb-8 max-w-md">{m.wiki_page_subtitle()}</p>
		<div class="w-full max-w-xl">
			<SearchInput
				bind:value={search}
				articles={data.articles}
				quizzes={data.quizzes}
				placeholder={m.search_placeholder_wiki()}
			/>
		</div>
		<div class="flex gap-4 flex-wrap justify-center mt-6">
			<button
				class="text-sm transition {selectedCategory === ''
					? 'text-primary font-medium'
					: 'text-muted hover:text-primary'}"
				onclick={() => (selectedCategory = '')}
			>
				{m.wiki_filter_all()}
			</button>
			{#each data.categories as category}
				<button
					class="text-sm capitalize transition {selectedCategory === category
						? 'text-primary font-medium'
						: 'text-muted hover:text-primary'}"
					onclick={() => (selectedCategory = category)}
				>
					{categoryLabels[category]?.() ?? category}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
		{#each filteredArticles as article}
			<ArticleCard {article} />
		{:else}
			{#if filteredQuizzes.length === 0}
				<p class="text-muted">{m.wiki_no_results()}</p>
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
