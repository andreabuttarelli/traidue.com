<script lang="ts">
	let { schema }: { schema: any } = $props();
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
