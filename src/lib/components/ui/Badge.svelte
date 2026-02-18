<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'default',
		href,
		children
	}: {
		variant?: 'default' | 'category' | 'tag';
		href?: string;
		children: Snippet;
	} = $props();
</script>

{#if href}
	<a {href} class="text-xs text-muted uppercase tracking-wide hover:text-primary transition">{@render children()}</a>
{:else}
	<span class="text-xs text-muted uppercase tracking-wide">{@render children()}</span>
{/if}
