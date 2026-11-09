<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import type { ServiceType } from '$lib/data/services';

	let { data } = $props();
	const s = $derived(data.service);

	const typeLabels: Record<ServiceType, () => string> = {
		clinic: m.services_type_clinic,
		consultorio: m.services_type_consultorio,
		association: m.services_type_association,
		legal: m.services_type_legal,
		helpline: m.services_type_helpline,
		'support-group': m.services_type_support_group
	};

	const verified = $derived(
		new Date(s.verified).toLocaleDateString(getLocale() === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
	);
	const days = Array.from({ length: 7 }, (_, i) =>
		new Date(2024, 0, 1 + i).toLocaleDateString(getLocale() === 'it' ? 'it-IT' : 'en-GB', { weekday: 'long' })
	);
	const osmUrl = $derived(
		s.lat != null ? `https://www.openstreetmap.org/?mlat=${s.lat}&mlon=${s.lng}#map=17/${s.lat}/${s.lng}` : null
	);

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': s.type === 'clinic' ? 'MedicalClinic' : 'Organization',
		name: s.name,
		description: s.description,
		...(s.website ? { url: s.website } : {}),
		...(s.phone ? { telephone: s.phone } : {}),
		...(s.email ? { email: s.email } : {}),
		...(s.address
			? {
					address: { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: s.city, addressRegion: s.region, addressCountry: data.country === 'IT' ? 'IT' : 'GB' },
					geo: { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lng }
				}
			: {})
	});
</script>

<SEO
	title={`${s.name} – ${s.address ? s.city : m.services_national()} | ${SITE.brand}`}
	description={s.description}
	url={`${SITE.url}/servizi/${s.id}`}
/>
<StructuredData {schema} />

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.nav_services(), href: '/servizi' }, { label: s.name }]} />

	<article class="max-w-3xl">
		<p class="text-sm text-muted mb-2">{typeLabels[s.type]()} · {s.address ? `${s.city}, ${s.region}` : m.services_national()}</p>
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{s.name}</h1>
		<p class="text-base sm:text-lg text-muted-text leading-relaxed mb-8">{s.description}</p>

		<dl class="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-4 border-y border-border py-6 text-sm sm:text-base">
			{#if s.address}
				<dt class="text-muted">{m.services_address()}</dt>
				<dd class="text-primary">
					{s.address}
					{#if osmUrl}<br /><a href={osmUrl} target="_blank" rel="noopener" class="text-sm text-muted hover:text-primary underline">{m.services_open_map()}</a>{/if}
				</dd>
			{/if}
			{#if s.website || s.phone || s.email}
				<dt class="text-muted">{m.services_contacts()}</dt>
				<dd class="flex flex-col gap-1">
					{#if s.website}<a href={s.website} target="_blank" rel="noopener" class="text-primary hover:underline break-all">{s.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>{/if}
					{#if s.phone}<a href={`tel:${s.phone.replace(/\s/g, '')}`} class="text-primary hover:underline">{s.phone}</a>{/if}
					{#if s.email}<a href={`mailto:${s.email}`} class="text-primary hover:underline break-all">{s.email}</a>{/if}
				</dd>
			{/if}
			{#if s.hours}
				<dt class="text-muted">{m.services_hours()}</dt>
				<dd>
					<ul class="grid grid-cols-[7rem_1fr] gap-y-0.5 text-sm">
						{#each s.hours as h, i}
							<li class="contents"><span class="capitalize text-muted">{days[i]}</span><span class={h ? 'text-primary' : 'text-muted'}>{h ?? m.services_closed()}</span></li>
						{/each}
					</ul>
				</dd>
			{/if}
			<dt class="text-muted">{m.services_source()}</dt>
			<dd>
				<a href={s.source} target="_blank" rel="noopener" class="text-primary hover:underline break-all">{s.origin === 'infotrans' ? 'InfoTrans (ISS/UNAR)' : new URL(s.source).host}</a>
				<span class="block text-sm text-muted">{s.origin === 'infotrans' ? m.services_consulted({ date: verified }) : m.services_verified({ date: verified })}</span>
				{#if s.infotrans}<a href={s.infotrans} target="_blank" rel="noopener" class="block text-sm text-muted hover:text-primary underline">{m.services_infotrans_page()}</a>{/if}
			</dd>
		</dl>

		<p class="text-xs text-muted mt-4 leading-relaxed">{m.services_disclaimer()}</p>

		{#if data.sourceUrl}
			<aside class="mt-8 rounded-2xl border border-border p-5 sm:p-6">
				<h2 class="text-base font-semibold text-primary mb-1">{m.services_edit_title()}</h2>
				<p class="text-sm text-muted leading-relaxed mb-3">{m.services_edit_desc()}</p>
				<a href={data.sourceUrl} target="_blank" rel="noopener" class="inline-block text-sm font-medium text-primary border border-border rounded-full px-4 py-2 hover:border-primary transition">{m.services_edit_cta()} &rarr;</a>
			</aside>
		{/if}

		<a href={localizeHref('/servizi')} class="inline-block mt-8 text-sm text-primary font-medium hover:underline">&larr; {m.services_back()}</a>
	</article>
</div>
