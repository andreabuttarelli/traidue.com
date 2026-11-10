<script lang="ts">
	import { onMount } from 'svelte';
	import type { ServicesCountry } from '$lib/data/services';
	import ServicesMap from './ServicesMap.svelte';

	// The services map of a language with a Portugal / Brasil style switch when it has more than one country.
	// The choice is remembered in this browser; switching remounts the map with the other country's basemap.
	let { countries, list = true }: { countries: ServicesCountry[]; list?: boolean } = $props();

	const KEY = 'services-country';
	let current = $state(0);
	onMount(() => {
		try {
			const saved = countries.findIndex((c) => c.country === localStorage.getItem(KEY));
			if (saved > 0) current = saved;
		} catch {
			// storage unavailable: keep the default country
		}
	});
	function choose(i: number) {
		current = i;
		try {
			localStorage.setItem(KEY, countries[i].country);
		} catch {
			// not remembered, still switched
		}
	}
</script>

{#snippet switcher()}
	<div class="inline-flex w-fit rounded-full border border-border p-0.5 mb-4 text-sm" role="tablist" aria-label="País">
		{#each countries as c, i}
			<button
				type="button"
				role="tab"
				aria-selected={i === current}
				class="rounded-full px-3.5 py-1 transition {i === current ? 'bg-brand-blue text-on-brand font-medium' : 'text-muted hover:text-primary'}"
				onclick={() => choose(i)}>{c.name}</button
			>
		{/each}
	</div>
{/snippet}

{#key current}
	<ServicesMap data={countries[current]} {list} switcher={countries.length > 1 ? switcher : undefined} />
{/key}
