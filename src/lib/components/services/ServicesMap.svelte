<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import type { Map as LeafletMap, LayerGroup, CircleMarker } from 'leaflet';
	import type { ServicesCountry, ServiceType } from '$lib/data/services';
	import * as m from '$lib/paraglide/messages';

	let { data }: { data: ServicesCountry } = $props();

	const typeLabels: Record<ServiceType, () => string> = {
		clinic: m.services_type_clinic,
		consultorio: m.services_type_consultorio,
		association: m.services_type_association,
		legal: m.services_type_legal,
		helpline: m.services_type_helpline,
		'support-group': m.services_type_support_group
	};
	const types = $derived([...new Set(data.services.map((s) => s.type))]);

	let query = $state('');
	let activeType = $state<ServiceType | null>(null);

	const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

	const filtered = $derived.by(() => {
		const q = normalize(query.trim());
		return data.services.filter(
			(s) =>
				(!activeType || s.type === activeType) &&
				(!q || normalize(`${s.name} ${s.city} ${s.region} ${s.description}`).includes(q))
		);
	});

	let mapEl: HTMLDivElement;
	let map: LeafletMap | undefined = $state();
	let layer: LayerGroup | undefined;
	const markers = new Map<string, CircleMarker>();

	const escape = (s: string) =>
		s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

	onMount(() => {
		let disposed = false;
		import('leaflet').then((L) => {
			if (disposed) return;
			const lmap = L.map(mapEl, { scrollWheelZoom: false }).setView(data.center, data.zoom);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(lmap);
			layer = L.layerGroup().addTo(lmap);
			for (const s of data.services) {
				if (s.lat == null || s.lng == null) continue;
				const marker = L.circleMarker([s.lat, s.lng], {
					radius: 7,
					color: '#fff',
					weight: 2,
					fillColor: '#d6457a', // trans-flag pink, readable on light and inverted dark tiles
					fillOpacity: 0.9
				}).bindPopup(
					`<strong>${escape(s.name)}</strong><br>${escape(typeLabels[s.type]())} · ${escape(s.city)}` +
						(s.address ? `<br>${escape(s.address)}` : '') +
						(s.website ? `<br><a href="${escape(s.website)}" target="_blank" rel="noopener">${escape(m.services_website())}</a>` : '')
				);
				markers.set(s.id, marker);
			}
			map = lmap; // last: the filter effect below needs layer and markers ready
		});
		return () => {
			disposed = true;
			map?.remove();
		};
	});

	// Show only the markers that match the filters, and frame them.
	$effect(() => {
		if (!map || !layer) return;
		layer.clearLayers();
		const visible = filtered.map((s) => markers.get(s.id)).filter((mk) => mk != null);
		for (const mk of visible) layer.addLayer(mk);
		if (visible.length > 0 && (query || activeType)) {
			map.fitBounds(
				visible.map((mk) => mk.getLatLng()),
				{ padding: [32, 32], maxZoom: 12 }
			);
		} else {
			map.setView(data.center, data.zoom);
		}
	});

	function focus(id: string) {
		const mk = markers.get(id);
		if (!map || !mk) return;
		map.flyTo(mk.getLatLng(), 13, { duration: 0.6 });
		mk.openPopup();
		if (window.matchMedia('(max-width: 1023px)').matches) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
	<div class="flex flex-col">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3 sm:mb-4">
			{data.country === 'IT' ? m.services_title_it() : m.services_title_uk()}
		</h1>
		<p class="text-sm sm:text-base text-muted leading-relaxed mb-5 sm:mb-6 max-w-xl">{m.services_desc()}</p>

		<label class="sr-only" for="services-search">{m.services_search_placeholder()}</label>
		<input
			id="services-search"
			type="search"
			bind:value={query}
			placeholder={m.services_search_placeholder()}
			autocomplete="off"
			class="w-full rounded-full border border-border bg-surface px-5 py-3 text-sm sm:text-base text-primary placeholder:text-muted focus:outline-none focus:border-primary transition"
		/>

		<div class="flex flex-wrap gap-2 mt-3" role="group" aria-label={m.services_filter_label()}>
			<button
				type="button"
				aria-pressed={activeType === null}
				onclick={() => (activeType = null)}
				class="text-xs sm:text-sm px-3 py-1.5 rounded-full border transition {activeType === null ? 'bg-primary text-bg border-primary' : 'border-border text-muted hover:text-primary'}"
			>
				{m.services_all()}
			</button>
			{#each types as t}
				<button
					type="button"
					aria-pressed={activeType === t}
					onclick={() => (activeType = activeType === t ? null : t)}
					class="text-xs sm:text-sm px-3 py-1.5 rounded-full border transition {activeType === t ? 'bg-primary text-bg border-primary' : 'border-border text-muted hover:text-primary'}"
				>
					{typeLabels[t]()}
				</button>
			{/each}
		</div>
	</div>

	<div
		bind:this={mapEl}
		class="services-map lg:col-start-2 lg:row-start-1 lg:row-span-2 h-[320px] sm:h-[420px] lg:h-full lg:min-h-[560px] rounded-2xl overflow-hidden border border-border z-0"
		role="region"
		aria-label={m.services_map_label()}
	></div>

	<div class="flex flex-col min-h-0">
		<p class="text-xs text-muted mb-2" aria-live="polite">{m.services_count({ count: filtered.length })}</p>
		{#if filtered.length === 0}
			<p class="text-sm text-muted py-6">{m.services_empty()}</p>
		{:else}
			<ul class="divide-y divide-border border-y border-border lg:max-h-[320px] lg:overflow-y-auto">
				{#each filtered as s (s.id)}
					<li class="py-3">
						<div class="flex items-start justify-between gap-3">
							<div class="min-w-0">
								{#if s.lat != null}
									<button type="button" onclick={() => focus(s.id)} class="text-left text-sm sm:text-base font-medium text-primary hover:underline">
										{s.name}
									</button>
								{:else}
									<span class="text-sm sm:text-base font-medium text-primary">{s.name}</span>
								{/if}
								<p class="text-xs text-muted mt-0.5">
									{typeLabels[s.type]()} · {s.address ? s.city : m.services_national()}
								</p>
								<p class="text-xs sm:text-sm text-muted-text mt-1 leading-relaxed">{s.description}</p>
							</div>
							<div class="flex flex-col items-end gap-1 shrink-0 text-xs">
								{#if s.website}
									<a href={s.website} target="_blank" rel="noopener" class="text-primary hover:underline">{m.services_website()} &rarr;</a>
								{/if}
								{#if s.phone}
									<a href={`tel:${s.phone.replace(/\s/g, '')}`} class="text-muted hover:text-primary">{s.phone}</a>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
		<p class="text-xs text-muted mt-3 leading-relaxed">{m.services_disclaimer()}</p>
	</div>
</div>

<style>
	/* OSM tiles are light-only: invert them in dark mode, keep markers/popups untouched. */
	:global(.dark) .services-map :global(.leaflet-tile-pane) {
		filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9);
	}
</style>
