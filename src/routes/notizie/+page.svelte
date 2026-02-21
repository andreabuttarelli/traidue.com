<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/seo/SEO.svelte';

	let { data } = $props();

	let action = $derived($page.url.searchParams.get('action'));
	let toastMessage = $derived(
		action === 'approved'
			? 'Notizia approvata e pubblicata.'
			: action === 'rejected'
				? 'Notizia scartata.'
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
	title="Notizie"
	description="Editoriali e approfondimenti su diritti civili, tematiche LGBTQ+, identità di genere e fine vita."
	url="https://www.traidue.com/notizie"
/>

<div class="w-full px-4 sm:px-6 lg:px-12">
	{#if showToast && toastMessage}
		<div class="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-bg px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
			{toastMessage}
		</div>
	{/if}

	<div class="py-10 sm:py-16 lg:py-20 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3">
			Notizie
		</h1>
		<p class="text-muted mb-6 sm:mb-8 max-w-md">
			Editoriali e commenti sulle notizie che ci riguardano
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
			<a href="/notizie/{article.slug}" class="group block">
				<div class="flex flex-wrap gap-2 mb-2">
					{#each article.tags as tag}
						<span class="text-xs px-2.5 py-1 rounded-full border border-border text-muted">
							{tag}
						</span>
					{/each}
				</div>
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
			<p class="text-muted">Nessuna notizia pubblicata.</p>
		{/each}
	</div>

	{#if data.totalPages > 1}
		<nav class="flex justify-center gap-4 py-12">
			{#if data.currentPage > 1}
				<a
					href="/notizie?page={data.currentPage - 1}{data.currentTag ? `&tag=${data.currentTag}` : ''}"
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
					href="/notizie?page={data.currentPage + 1}{data.currentTag ? `&tag=${data.currentTag}` : ''}"
					class="text-sm text-muted hover:text-primary transition"
				>
					Successiva
				</a>
			{/if}
		</nav>
	{/if}
</div>
