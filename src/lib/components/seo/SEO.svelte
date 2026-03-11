<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';

	let {
		title,
		description,
		url,
		image = 'https://www.traidue.com/images/wiki/identita-di-genere.webp',
		type = 'website',
		noindex = false,
		article,
		alternateUrls = {}
	}: {
		title: string;
		description: string;
		url: string;
		image?: string;
		type?: string;
		noindex?: boolean;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			section?: string;
			tags?: string[];
		};
		alternateUrls?: Record<string, string>;
	} = $props();

	const locale = getLocale();
	const ogLocaleMap: Record<string, string> = {
		it: 'it_IT',
		en: 'en_US',
		es: 'es_ES',
		pt: 'pt_BR'
	};
	const ogLocale = ogLocaleMap[locale] ?? 'it_IT';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{:else}
		<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	{/if}
	<link rel="canonical" href={url} />

	{#if Object.keys(alternateUrls).length > 0}
		{#each Object.entries(alternateUrls) as [lang, href]}
			<link rel="alternate" hreflang={lang} href={href} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={alternateUrls['it'] ?? url} />
	{:else}
		<link rel="alternate" hreflang={locale} href={url} />
		<link rel="alternate" hreflang="x-default" href={url} />
	{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:site_name" content="Tra i Due" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#if article}
		{#if article.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		{#if article.section}
			<meta property="article:section" content={article.section} />
		{/if}
		{#if article.tags}
			{#each article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}
</svelte:head>
