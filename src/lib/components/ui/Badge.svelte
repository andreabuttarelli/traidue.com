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

	const variantClasses = {
		default: 'bg-primary/5 text-primary',
		category: 'bg-accent/20 text-primary',
		tag: 'bg-border text-muted'
	};

	const classes = $derived(
		`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-medium ${variantClasses[variant]}`
	);
</script>

{#if href}
	<a {href} class="{classes} hover:opacity-80 transition">{@render children()}</a>
{:else}
	<span class={classes}>{@render children()}</span>
{/if}
