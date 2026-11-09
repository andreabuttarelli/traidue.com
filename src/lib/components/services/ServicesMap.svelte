<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import { onMount } from 'svelte';
	import type { Map as LeafletMap, MarkerClusterGroup, CircleMarker } from 'leaflet';
	import type { ServicesCountry, ServiceType } from '$lib/data/services';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	// list=false: compact hero (map + filters), the full list lives on /servizi.
	let { data, list = true }: { data: ServicesCountry; list?: boolean } = $props();

	const detailHref = (id: string) => localizeHref(`/servizi/${id}`);

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
	let layer: MarkerClusterGroup | undefined;
	const markers = new Map<string, CircleMarker>();

	// Natural Earth (public domain), simplified: land, region borders, neighbouring countries.
	const basemaps = {
		IT: () => import('$lib/data/services/basemap-it.json'),
		UK: () => import('$lib/data/services/basemap-uk.json')
	};

	const escape = (s: string) =>
		s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

	// Count-up on the title; SSR keeps the real number for crawlers and no-JS.
	let shownTotal = $state(data.services.length);
	onMount(() => {
		const total = data.services.length;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const start = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const t = Math.min((now - start) / 1200, 1);
			shownTotal = Math.round(total * (1 - Math.pow(1 - t, 3)));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	onMount(() => {
		let disposed = false;
		Promise.all([import('leaflet'), basemaps[data.country]()]).then(async ([leaflet, basemap]) => {
			const L = leaflet.default;
			// markercluster is a UMD plugin: it patches the global L.
			(window as unknown as { L: typeof L }).L = L;
			await import('leaflet.markercluster');
			if (disposed) return;
			// zoomSnap 0: pinch zooms smoothly instead of jumping a whole level.
			const lmap = L.map(mapEl, { scrollWheelZoom: false, attributionControl: false, minZoom: 2, maxZoom: 10, zoomSnap: 0 }).setView(
				data.center,
				data.zoom
			);
			pinchZoom(lmap, mapEl);
			// Vector basemap, no tiles: colours come from the theme tokens (styles at the bottom).
			L.geoJSON(basemap.default as GeoJSON.FeatureCollection, {
				interactive: false,
				style: (f) => ({ className: `basemap-${f?.properties.k}` })
			}).addTo(lmap);
			// Airbnb-style: nearby points merge into a counter; click zooms in, same-spot points fan out at max zoom.
			layer = L.markerClusterGroup({
				maxClusterRadius: 40,
				showCoverageOnHover: false,
				spiderLegPolylineOptions: { className: 'cluster-leg' },
				iconCreateFunction: (c) => {
					const n = c.getChildCount();
					const size = n < 10 ? 30 : n < 100 ? 36 : 44;
					return L.divIcon({ html: `<span>${n > 99 ? '99+' : n}</span>`, className: 'service-cluster', iconSize: L.point(size, size) });
				}
			}).addTo(lmap);
			for (const s of data.services) {
				if (s.lat == null || s.lng == null) continue;
				const marker = L.circleMarker([s.lat, s.lng], { radius: 6, className: 'service-marker' }).bindPopup(
					`<strong>${escape(s.name)}</strong><br>${escape(typeLabels[s.type]())} · ${escape(s.city)}` +
						(s.address ? `<br>${escape(s.address)}` : '') +
						(s.website ? `<br><a href="${escape(s.website)}" target="_blank" rel="noopener">${escape(m.services_website())}</a>` : '') +
						`<br><a href="${escape(detailHref(s.id))}">${escape(m.services_details())} &rarr;</a>`
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
		layer.addLayers(visible);
		if (visible.length > 0 && (query || activeType)) {
			map.fitBounds(
				visible.map((mk) => mk.getLatLng()),
				{ padding: [32, 32], maxZoom: 8 }
			);
		} else {
			map.setView(data.center, data.zoom);
		}
	});

	// Trackpad pinch zooms the map; a plain two-finger scroll still scrolls the page.
	// Chrome/Firefox/Edge report a pinch as wheel + ctrlKey, Safari as gesture* events.
	// Touch pinch on mobile is Leaflet's own touchZoom.
	function pinchZoom(lmap: LeafletMap, el: HTMLElement) {
		el.addEventListener(
			'wheel',
			(e) => {
				if (!e.ctrlKey) return;
				e.preventDefault(); // otherwise the browser zooms the whole page
				lmap.setZoomAround(lmap.mouseEventToContainerPoint(e), lmap.getZoom() - e.deltaY * 0.02, { animate: false });
			},
			{ passive: false }
		);
		let startZoom = 0;
		type GestureEvent = UIEvent & { scale: number; clientX: number; clientY: number };
		el.addEventListener('gesturestart', (e) => {
			e.preventDefault();
			startZoom = lmap.getZoom();
		});
		el.addEventListener('gesturechange', (e) => {
			e.preventDefault();
			const g = e as GestureEvent;
			lmap.setZoomAround(lmap.mouseEventToContainerPoint(g as unknown as MouseEvent), startZoom + Math.log2(g.scale), { animate: false });
		});
	}

	function focus(id: string) {
		const mk = markers.get(id);
		if (!map || !layer || !mk) return;
		layer.zoomToShowLayer(mk, () => mk.openPopup()); // opens its cluster if it's inside one
		if (window.matchMedia('(max-width: 1023px)').matches) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
	<div class="flex flex-col">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3 sm:mb-4">
			<span class="tabular-nums">{shownTotal}</span>
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
		{#if !list}
			<a href={localizeHref('/servizi')} class="text-sm text-primary font-medium hover:underline">{m.services_view_all()} &rarr;</a>
		{:else if filtered.length === 0}
			<p class="text-sm text-muted py-6">{m.services_empty()}</p>
		{:else}
			<ul class="divide-y divide-border border-y border-border lg:max-h-[440px] lg:overflow-y-auto">
				{#each filtered as s (s.id)}
					<li class="py-3">
						<div class="flex items-start justify-between gap-3">
							<div class="min-w-0">
								<a href={detailHref(s.id)} class="text-sm sm:text-base font-medium text-primary hover:underline">{s.name}</a>
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
								{#if s.lat != null}
									<button type="button" onclick={() => focus(s.id)} class="text-muted hover:text-primary">{m.services_show_on_map()}</button>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
		<p class="text-xs text-muted mt-3 leading-relaxed">{m.services_disclaimer()}</p>
		{#if data.country === 'IT'}
			<p class="text-xs text-muted mt-1 leading-relaxed">
				{m.services_attribution()} <a href="https://www.infotrans.it" target="_blank" rel="noopener" class="underline hover:text-primary">InfoTrans (ISS/UNAR)</a>.
			</p>
		{/if}
	</div>
</div>

<style>
	/* Minimal monochrome basemap derived from the theme tokens, so it follows light/dark. */
	.services-map {
		--map-sea: var(--color-bg);
		--map-land: color-mix(in srgb, var(--color-primary) 7%, var(--color-bg));
		--map-neighbour: color-mix(in srgb, var(--color-primary) 3%, var(--color-bg));
		--map-line: color-mix(in srgb, var(--color-primary) 18%, var(--color-bg));
		background: var(--map-sea);
	}
	.services-map :global(.basemap-land) {
		fill: var(--map-land);
		fill-opacity: 1;
		stroke: var(--map-line);
		stroke-width: 1;
	}
	.services-map :global(.basemap-neighbour) {
		fill: var(--map-neighbour);
		fill-opacity: 1;
		stroke: var(--map-line);
		stroke-opacity: 0.5;
		stroke-width: 0.75;
	}
	.services-map :global(.basemap-border) {
		fill: none;
		stroke: var(--map-line);
		stroke-width: 0.75;
		stroke-dasharray: 2 3;
	}
	.services-map :global(.service-marker) {
		fill: var(--color-primary);
		fill-opacity: 1;
		stroke: var(--color-bg);
		stroke-width: 2;
	}
	.services-map :global(.service-marker:hover) {
		fill-opacity: 0.75;
	}
	.services-map :global(.service-cluster) {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: var(--color-primary);
		color: var(--color-bg);
		box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 6px color-mix(in srgb, var(--color-primary) 15%, transparent);
		font-size: 12px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		cursor: pointer;
		transition: transform 0.15s;
	}
	.services-map :global(.service-cluster:hover) {
		transform: scale(1.08);
	}
	.services-map :global(.cluster-leg) {
		stroke: var(--map-line);
		stroke-width: 1.5;
	}
	.services-map :global(.leaflet-popup-content-wrapper),
	.services-map :global(.leaflet-popup-tip) {
		background: var(--color-bg);
		color: var(--color-text);
		box-shadow: 0 0 0 1px var(--color-border), 0 8px 24px rgb(0 0 0 / 0.15);
	}
	.services-map :global(.leaflet-popup-content a) {
		color: var(--color-primary);
		text-decoration: underline;
	}
	.services-map :global(.leaflet-bar a) {
		background: var(--color-bg);
		color: var(--color-primary);
		border-color: var(--color-border);
	}
</style>
