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

	const styles = {
		info: { border: 'border-l-info', bg: 'bg-info/5', icon: '\u2139' },
		warning: { border: 'border-l-warning', bg: 'bg-warning/5', icon: '\u26A0' },
		success: { border: 'border-l-success', bg: 'bg-success/5', icon: '\u2713' },
		error: { border: 'border-l-error', bg: 'bg-error/5', icon: '\u2717' }
	};

	const style = $derived(styles[type]);
</script>

<div class="my-6 rounded-r-lg border-l-4 {style.border} {style.bg} p-4">
	<div class="flex gap-3">
		<span class="text-lg shrink-0">{style.icon}</span>
		<div>
			{#if title}
				<p class="font-semibold text-text mb-1">{title}</p>
			{/if}
			<div class="text-text/80">
				{@render children()}
			</div>
		</div>
	</div>
</div>
