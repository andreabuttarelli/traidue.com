<script lang="ts">
	import StructuredData from '$lib/components/seo/StructuredData.svelte';

	let { items }: { items: { label: string; href?: string }[] } = $props();

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.label,
			...(item.href ? { item: `https://www.traidue.com${item.href}` } : {})
		}))
	};
</script>

<StructuredData schema={breadcrumbSchema} />

<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm text-muted mb-6">
	{#each items as item, i}
		{#if i > 0}
			<span class="text-border">›</span>
		{/if}
		{#if item.href && i < items.length - 1}
			<a href={item.href} class="hover:text-primary transition">{item.label}</a>
		{:else}
			<span class="text-text/60">{item.label}</span>
		{/if}
	{/each}
</nav>
