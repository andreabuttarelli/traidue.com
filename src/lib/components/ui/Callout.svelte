<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		type = 'info',
		title,
		children
	}: {
		type?: 'info' | 'warning' | 'success' | 'error';
		title?: string;
		children: Snippet;
	} = $props();
</script>

<aside class="border-l-2 border-primary pl-4 my-6">
	{#if title}
		<p class="font-medium text-primary mb-1">{title}</p>
	{/if}
	<div class="text-sm text-muted leading-relaxed">
		{@render children()}
	</div>
</aside>
