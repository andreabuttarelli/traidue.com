<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import ShareButtons from '$lib/components/ui/ShareButtons.svelte';

	let { data } = $props();
	let article = $derived(data.article);

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('it-IT', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<SEO
	title={article.title}
	description={article.summary}
	url="https://www.traidue.com/notizie/{article.slug}"
/>

<article class="w-full px-4 sm:px-6 lg:px-12">
	<div class="max-w-3xl mx-auto py-10 sm:py-16">
		<!-- Breadcrumb -->
		<nav class="flex items-center gap-2 text-sm text-muted mb-8">
			<a href="/" class="hover:text-primary transition">Home</a>
			<span>/</span>
			<a href="/notizie" class="hover:text-primary transition">Notizie</a>
			<span>/</span>
			<span class="text-primary truncate">{article.title}</span>
		</nav>

		<!-- Header -->
		<header class="mb-8 sm:mb-10">
			<div class="flex flex-wrap gap-2 mb-4">
				{#each article.tags as tag}
					<a
						href="/notizie?tag={tag}"
						class="text-xs px-2.5 py-1 rounded-full border border-border text-muted hover:text-primary hover:border-primary transition"
					>
						{tag}
					</a>
				{/each}
			</div>

			<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">
				{article.title}
			</h1>

			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3 text-sm text-muted">
					{#if article.published_at}
						<time datetime={article.published_at}>{formatDate(article.published_at)}</time>
					{/if}
				</div>
				<ShareButtons
					url="https://www.traidue.com/notizie/{article.slug}"
					text={article.title}
				/>
			</div>
		</header>

		<!-- Content -->
		<div class="prose prose-lg max-w-none">
			{@html article.contentHtml}
		</div>

		<!-- Source -->
		<div class="mt-10 pt-6 border-t border-border">
			<p class="text-sm text-muted">
				Fonte:
				<a
					href={article.source_url}
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-primary transition"
				>
					{article.source_title}
				</a>
				{#if article.source_date}
					· {formatDate(article.source_date)}
				{/if}
			</p>
		</div>

		<!-- Share + CTA -->
		<div class="mt-10 pt-6 border-t border-border">
			<div class="flex items-center justify-between mb-8">
				<span class="text-sm text-muted">Condividi</span>
				<ShareButtons
					url="https://www.traidue.com/notizie/{article.slug}"
					text={article.title}
				/>
			</div>

			<div class="bg-surface rounded-xl p-6 sm:p-8 text-center">
				<h3 class="text-lg font-heading font-semibold text-primary mb-2">Resta aggiornato</h3>
				<p class="text-sm text-muted mb-4">
					Ricevi le notizie più importanti su diritti civili e identità di genere.
				</p>
				<a
					href="/#newsletter"
					class="inline-block px-6 py-2.5 bg-primary text-bg text-sm font-medium rounded-lg hover:opacity-90 transition"
				>
					Iscriviti alla newsletter
				</a>
			</div>
		</div>
	</div>
</article>
