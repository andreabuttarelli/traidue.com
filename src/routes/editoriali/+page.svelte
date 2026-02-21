<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';

	let { data } = $props();

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.traidue.com' },
			{ '@type': 'ListItem', position: 2, name: 'Opinioni', item: 'https://www.traidue.com/editoriali' }
		]
	};

	let collectionSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Opinioni',
		description: 'Opinioni e approfondimenti su diritti civili, identità di genere e fine vita.',
		url: 'https://www.traidue.com/editoriali',
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: data.articles.map((a, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				url: `https://www.traidue.com/editoriali/${a.slug}`
			}))
		}
	});

	let action = $derived($page.url.searchParams.get('action'));
	let toastMessage = $derived(
		action === 'approved'
			? 'Articolo approvato e pubblicato.'
			: action === 'rejected'
				? 'Articolo scartato.'
				: action === 'invalid'
					? 'Link non valido o già utilizzato.'
					: null
	);

	let showToast = $state(false);

	$effect(() => {
		if (toastMessage) {
			showToast = true;
			const timer = setTimeout(() => {
				showToast = false;
				// Clean action from URL
				const url = new URL($page.url);
				url.searchParams.delete('action');
				url.searchParams.delete('slug');
				goto(url.toString(), { replaceState: true });
			}, 4000);
			return () => clearTimeout(timer);
		}
	});

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('it-IT', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function selectTag(tag: string | null) {
		const url = new URL($page.url);
		url.searchParams.delete('page');
		if (tag) {
			url.searchParams.set('tag', tag);
		} else {
			url.searchParams.delete('tag');
		}
		goto(url.toString(), { replaceState: true });
	}
</script>

<SEO
	title="Opinioni"
	description="Opinioni e approfondimenti su diritti civili, identità di genere e fine vita."
	url="https://www.traidue.com/editoriali"
/>
<StructuredData schema={breadcrumbSchema} />
<StructuredData schema={collectionSchema} />

<div class="w-full px-4 sm:px-6 lg:px-12">
	{#if showToast && toastMessage}
		<div class="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-bg px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
			{toastMessage}
		</div>
	{/if}

	<div class="py-10 sm:py-16 lg:py-20 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3">
			Opinioni
		</h1>
		<p class="text-muted mb-6 sm:mb-8 max-w-xl">
			Opinioni e approfondimenti su diritti civili e identità di genere
		</p>

		{#if data.tags.length > 0}
			<div class="flex gap-4 flex-wrap justify-center">
				<button
					class="text-sm transition {!data.currentTag
						? 'text-primary font-medium'
						: 'text-muted hover:text-primary'}"
					onclick={() => selectTag(null)}
				>
					Tutti
				</button>
				{#each data.tags as tag}
					<button
						class="text-sm transition {data.currentTag === tag
							? 'text-primary font-medium'
							: 'text-muted hover:text-primary'}"
						onclick={() => selectTag(tag)}
					>
						{tag}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
		{#each data.articles as article}
			<a href="/editoriali/{article.slug}" class="group block">
				{#if article.thumb}
					<div class="aspect-[16/9] overflow-hidden rounded-xl mb-4">
						<img
							src={article.thumb}
							alt={article.title}
							width="672"
							height="378"
							decoding="async"
							loading="lazy"
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
				{/if}
				<h2 class="text-lg font-heading font-semibold text-primary group-hover:underline underline-offset-4 mb-2">
					{article.title}
				</h2>
				<p class="text-sm text-muted mb-2 line-clamp-3">{article.summary}</p>
				<div class="flex items-center gap-3 text-xs text-muted">
					{#if article.published_at}
						<time datetime={article.published_at}>{formatDate(article.published_at)}</time>
					{/if}
					<span>·</span>
					<span>{article.source_title}</span>
				</div>
			</a>
		{:else}
			<p class="text-muted">Nessun articolo pubblicato.</p>
		{/each}
	</div>

	{#if data.totalPages > 1}
		<nav class="flex justify-center gap-4 py-12">
			{#if data.currentPage > 1}
				<a
					href="/editoriali?page={data.currentPage - 1}{data.currentTag ? `&tag=${data.currentTag}` : ''}"
					class="text-sm text-muted hover:text-primary transition"
				>
					Precedente
				</a>
			{/if}
			<span class="text-sm text-muted">
				{data.currentPage} / {data.totalPages}
			</span>
			{#if data.currentPage < data.totalPages}
				<a
					href="/editoriali?page={data.currentPage + 1}{data.currentTag ? `&tag=${data.currentTag}` : ''}"
					class="text-sm text-muted hover:text-primary transition"
				>
					Successiva
				</a>
			{/if}
		</nav>
	{/if}
</div>
