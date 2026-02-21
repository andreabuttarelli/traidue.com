<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import ShareButtons from '$lib/components/ui/ShareButtons.svelte';

	let { data } = $props();
	let article = $derived(data.article);

	let breadcrumbSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.traidue.com' },
			{ '@type': 'ListItem', position: 2, name: 'Opinioni', item: 'https://www.traidue.com/editoriali' },
			{ '@type': 'ListItem', position: 3, name: article.title, item: `https://www.traidue.com/editoriali/${article.slug}` }
		]
	});

	let articleSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: article.summary,
		url: `https://www.traidue.com/editoriali/${article.slug}`,
		...(article.image && { image: article.image }),
		datePublished: article.published_at,
		author: {
			'@type': 'Organization',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Tra i Due',
			url: 'https://www.traidue.com',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.traidue.com/favicon.png'
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://www.traidue.com/editoriali/${article.slug}`
		}
	});

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
	url="https://www.traidue.com/editoriali/{article.slug}"
	image={article.image ?? undefined}
	type="article"
	article={{
		publishedTime: article.published_at,
		section: 'Opinioni',
		tags: article.tags
	}}
/>
<StructuredData schema={breadcrumbSchema} />
<StructuredData schema={articleSchema} />

<article class="w-full px-4 sm:px-6 lg:px-12">
	<div class="max-w-3xl mx-auto py-10 sm:py-16">
		<!-- Breadcrumb -->
		<nav class="flex items-center gap-2 text-sm text-muted mb-8">
			<a href="/" class="hover:text-primary transition">Home</a>
			<span>/</span>
			<a href="/editoriali" class="hover:text-primary transition">Opinioni</a>
			<span>/</span>
			<span class="text-primary truncate">{article.title}</span>
		</nav>

		<!-- Header -->
		<header class="mb-8 sm:mb-10">
			<div class="flex flex-wrap gap-2 mb-4">
				{#each article.tags as tag}
					<a
						href="/editoriali?tag={tag}"
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
					<span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface text-muted border border-border">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
							<path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.062ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.828 11.828a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 1 0 1.061 1.062l1.06-1.062ZM8 13.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V14a.75.75 0 0 1 .75-.75ZM4.172 11.828a.75.75 0 1 0 1.06-1.06l1.062 1.06a.75.75 0 1 0-1.061 1.062l-1.06-1.062ZM1 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 1 8ZM4.172 4.172a.75.75 0 0 0 1.06 1.06L4.17 4.17a.75.75 0 0 0-1.061-1.06l1.06 1.061Z" />
						</svg>
						Generato con AI
					</span>
				</div>
				<ShareButtons
					url="https://www.traidue.com/editoriali/{article.slug}"
					text={article.title}
				/>
			</div>
		</header>

		{#if article.image}
			<div class="rounded-xl overflow-hidden mb-8 sm:mb-10">
				<img
					src={article.image}
					alt={article.title}
					width="1344"
					height="768"
					decoding="async"
					class="w-full aspect-[16/9] object-cover"
				/>
			</div>
		{/if}

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

		<!-- AI Disclaimer -->
		<div class="mt-6 p-4 rounded-lg bg-surface border border-border">
			<p class="text-xs text-muted/80 leading-relaxed">
				Contenuto generato con AI a partire da fonti pubbliche. Rappresenta un'opinione, non attività giornalistica.
			</p>
		</div>

		<!-- Share + CTA -->
		<div class="mt-10 pt-6 border-t border-border">
			<div class="flex items-center justify-between mb-8">
				<span class="text-sm text-muted">Condividi</span>
				<ShareButtons
					url="https://www.traidue.com/editoriali/{article.slug}"
					text={article.title}
				/>
			</div>

			<div class="bg-surface rounded-xl p-6 sm:p-8 text-center">
				<h3 class="text-lg font-heading font-semibold text-primary mb-2">Resta aggiornato</h3>
				<p class="text-sm text-muted mb-4">
					Ricevi i nostri approfondimenti su diritti civili e identità di genere.
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
