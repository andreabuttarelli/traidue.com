<script lang="ts">
	let {
		title,
		description,
		url,
		image = 'https://traidue.com/og-image.png',
		type = 'website',
		article
	}: {
		title: string;
		description: string;
		url: string;
		image?: string;
		type?: string;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			section?: string;
			tags?: string[];
		};
	} = $props();
</script>

<svelte:head>
	<title>{title} | Tra i Due</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content="it_IT" />
	<meta property="og:site_name" content="Tra i Due" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Article meta tags -->
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
