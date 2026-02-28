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
	let isFilterOpen = $state(false);

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

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isFilterOpen) {
			isFilterOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

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
			<div class="relative w-full max-w-xl mx-auto flex flex-col items-center">
				<button 
					class="flex items-center gap-2 px-6 py-2 border border-border text-primary rounded-full text-sm font-medium hover:border-primary transition-colors bg-surface shadow-sm"
					onclick={() => isFilterOpen = !isFilterOpen}
					aria-expanded={isFilterOpen}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
					</svg>
					Filtra per argomento
					{#if data.currentTag}
						<span class="ml-1 px-2 py-0.5 bg-primary text-bg rounded-full text-xs">{data.currentTag}</span>
					{/if}
				</button>
				
				{#if isFilterOpen}
					<div 
						class="fixed inset-0 z-10" 
						onclick={() => isFilterOpen = false}
						onkeydown={(e) => e.key === 'Enter' && (isFilterOpen = false)}
						role="button"
						tabindex="0"
						aria-label="Chiudi filtro"
					></div>
					<div class="absolute top-full mt-2 w-[90vw] sm:w-[400px] max-w-full p-5 bg-card border border-border rounded-xl shadow-lg z-20 text-left">
						<div class="flex items-center justify-between mb-4">
							<h3 class="font-heading font-semibold text-primary text-sm">Seleziona un argomento</h3>
							{#if data.currentTag}
								<button 
									class="text-xs text-muted hover:text-primary transition-colors"
									onclick={() => { selectTag(null); isFilterOpen = false; }}
								>
									Rimuovi filtro
								</button>
							{/if}
						</div>
						<div class="flex gap-2 flex-wrap max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
							<button
								class="px-3 py-1.5 rounded-full text-xs border transition-colors {!data.currentTag
									? 'bg-primary text-bg border-primary font-medium'
									: 'bg-surface border-border text-muted hover:border-primary hover:text-primary'}"
								onclick={() => { selectTag(null); isFilterOpen = false; }}
							>
								Tutti
							</button>
							{#each data.tags as tag}
								<button
									class="px-3 py-1.5 rounded-full text-xs border transition-colors {data.currentTag === tag
										? 'bg-primary text-bg border-primary font-medium'
										: 'bg-surface border-border text-muted hover:border-primary hover:text-primary'}"
									onclick={() => { selectTag(tag); isFilterOpen = false; }}
								>
									{tag}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Layout testata giornalistica adattata -->
	<div class="pb-12 border-t border-border pt-8">
		{#if data.articles.length > 0}
			<!-- Layout per la prima pagina senza filtri: articolo in evidenza + articoli spalla -->
			{#if data.currentPage === 1 && !data.currentTag && data.articles[0]}
				<div class="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-12 border-b border-border pb-12">
					<!-- Articolo in evidenza (Occupa 2 colonne su schermi grandi) -->
					<div class="lg:col-span-2 group block">
						<a href="/editoriali/{data.articles[0].slug}" class="block h-full flex flex-col">
							{#if data.articles[0].thumb}
								<div class="aspect-[16/9] overflow-hidden rounded-xl mb-5 bg-surface">
									<img
										src={data.articles[0].thumb}
										alt={data.articles[0].title}
										width="1200"
										height="675"
										decoding="async"
										loading="eager"
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
							{/if}
							<div class="flex flex-col flex-grow">
								<h2 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-primary mb-3 leading-tight group-hover:underline underline-offset-4">
									{data.articles[0].title}
								</h2>
								<p class="text-base text-muted mb-4 line-clamp-3 leading-relaxed">
									{data.articles[0].summary}
								</p>
								<div class="flex items-center gap-3 text-sm text-muted mt-auto pt-2 border-t border-border">
									{#if data.articles[0].published_at}
										<time datetime={data.articles[0].published_at}>{formatDate(data.articles[0].published_at)}</time>
									{/if}
									<span>·</span>
									<span class="font-medium">{data.articles[0].source_title}</span>
								</div>
							</div>
						</a>
					</div>
					
					<!-- Articoli "spalla" -->
					<div class="lg:col-span-1 flex flex-col gap-8">
						{#each data.articles.slice(1, 4) as article}
							<a href="/editoriali/{article.slug}" class="group block border-b border-border border-opacity-50 pb-8 last:border-0 last:pb-0">
								<h3 class="text-lg sm:text-xl font-heading font-semibold text-primary mb-2 leading-snug group-hover:underline underline-offset-4">
									{article.title}
								</h3>
								<p class="text-sm text-muted mb-3 line-clamp-2">
									{article.summary}
								</p>
								<div class="flex items-center gap-2 text-xs text-muted">
									{#if article.published_at}
										<time datetime={article.published_at}>{formatDate(article.published_at)}</time>
									{/if}
									<span>·</span>
									<span class="font-medium">{article.source_title}</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
				
				<!-- Griglia per i restanti articoli -->
				{#if data.articles.length > 4}
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
						{#each data.articles.slice(4) as article}
							<a href="/editoriali/{article.slug}" class="group block flex flex-col h-full">
								{#if article.thumb}
									<div class="aspect-[16/9] overflow-hidden rounded-xl mb-4 bg-surface">
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
								<h3 class="text-lg font-heading font-semibold text-primary group-hover:underline underline-offset-4 mb-2 leading-snug">
									{article.title}
								</h3>
								<p class="text-sm text-muted mb-3 line-clamp-3 flex-grow">
									{article.summary}
								</p>
								<div class="flex items-center gap-2 text-xs text-muted mt-auto pt-3 border-t border-border border-opacity-50">
									{#if article.published_at}
										<time datetime={article.published_at}>{formatDate(article.published_at)}</time>
									{/if}
									<span>·</span>
									<span class="font-medium">{article.source_title}</span>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			{:else}
				<!-- Griglia standard per pagine successive o con filtri attivi -->
				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
					{#each data.articles as article}
						<a href="/editoriali/{article.slug}" class="group block flex flex-col h-full">
							{#if article.thumb}
								<div class="aspect-[16/9] overflow-hidden rounded-xl mb-4 bg-surface">
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
							<h3 class="text-lg font-heading font-semibold text-primary group-hover:underline underline-offset-4 mb-2 leading-snug">
								{article.title}
							</h3>
							<p class="text-sm text-muted mb-3 line-clamp-3 flex-grow">
								{article.summary}
							</p>
							<div class="flex items-center gap-2 text-xs text-muted mt-auto pt-3 border-t border-border border-opacity-50">
								{#if article.published_at}
									<time datetime={article.published_at}>{formatDate(article.published_at)}</time>
								{/if}
								<span>·</span>
								<span class="font-medium">{article.source_title}</span>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		{:else}
			<div class="py-12 text-center">
				<p class="text-muted text-lg">Nessun articolo trovato.</p>
			</div>
		{/if}
	</div>

	{#if data.totalPages > 1}
		<nav class="flex justify-center gap-4 py-8 mb-4 border-t border-border">
			{#if data.currentPage > 1}
				<a
					href="/editoriali?page={data.currentPage - 1}{data.currentTag ? `&tag=${data.currentTag}` : ''}"
					class="text-sm text-muted hover:text-primary transition font-medium"
				>
					&larr; Precedente
				</a>
			{/if}
			<span class="text-sm text-muted">
				{data.currentPage} di {data.totalPages}
			</span>
			{#if data.currentPage < data.totalPages}
				<a
					href="/editoriali?page={data.currentPage + 1}{data.currentTag ? `&tag=${data.currentTag}` : ''}"
					class="text-sm text-muted hover:text-primary transition font-medium"
				>
					Successiva &rarr;
				</a>
			{/if}
		</nav>
	{/if}
</div>
