<script lang="ts">
	let { current, total }: { current: number; total: number } = $props();
	let percentage = $derived(Math.round((current / total) * 100));
</script>

<div class="w-full">
	<div class="flex justify-between text-sm text-muted mb-1.5">
		<span>Domanda {current} di {total}</span>
		<span>{percentage}%</span>
	</div>
	<div class="w-full h-2 bg-border rounded-full overflow-hidden">
		<div
			class="h-full bg-accent rounded-full transition-all duration-500 ease-out"
			style="width: {percentage}%"
		></div>
	</div>
</div>
