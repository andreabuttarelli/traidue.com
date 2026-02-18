<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<span class="inline-flex items-center gap-[0.3em] font-sans font-semibold tracking-tight {className}">
	<span class="inline-block w-[0.7em] h-[0.9em] rounded-[0.1em] bg-[#5BCEFA]"></span>
	<span>Tra i Due</span>
	<span class="inline-block w-[0.7em] h-[0.9em] rounded-[0.1em] bg-[#F5A9B8]"></span>
</span>
