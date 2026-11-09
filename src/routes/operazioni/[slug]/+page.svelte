<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { data } = $props();
	const p = $derived(data.procedure);
	const categoryLabel = $derived(
		{ femminilizzante: m.procedures_cat_fem, mascolinizzante: m.procedures_cat_masc, altro: m.procedures_cat_other }[p.category]()
	);
	const host = (u: string) => new URL(u).host.replace(/^www\./, '');
</script>

<SEO title={`${p.name}: tecniche, requisiti, recupero e costi | ${SITE.brand}`} description={p.summary} url={`${SITE.url}/operazioni/${p.slug}`} />
<StructuredData
	schema={{
		'@context': 'https://schema.org',
		'@type': 'MedicalProcedure',
		name: p.name,
		alternateName: p.aka,
		description: p.summary,
		procedureType: 'https://schema.org/SurgicalProcedure',
		...(p.techniques?.length ? { howPerformed: p.techniques.map((t) => `${t.name}: ${t.description}`).join(' ') } : {}),
		...(p.eligibility ? { preparation: p.eligibility } : {}),
		...(p.recovery ? { followup: p.recovery } : {}),
		citation: p.sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url }))
	}}
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.nav_procedures(), href: '/operazioni' }, { label: p.name }]} />

	<article class="max-w-3xl">
		<p class="text-sm text-muted mb-2">{categoryLabel} · <span class="capitalize">{p.area}</span></p>
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-2">{p.name}</h1>
		{#if p.aka?.length}<p class="text-sm text-muted mb-4">{m.procedures_aka()}: {p.aka.join(', ')}</p>{/if}
		<p class="text-base sm:text-lg text-muted-text leading-relaxed mb-10">{p.summary}</p>

		{#if p.techniques?.length}
			<section class="mb-10">
				<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_techniques()}</h2>
				<dl class="space-y-4">
					{#each p.techniques as t}
						<div><dt class="font-medium text-primary">{t.name}</dt><dd class="text-sm text-muted-text leading-relaxed mt-0.5">{t.description}</dd></div>
					{/each}
				</dl>
			</section>
		{/if}

		{#if p.eligibility}
			<section class="mb-10">
				<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_eligibility()}</h2>
				<p class="text-sm text-muted-text leading-relaxed">{p.eligibility}</p>
			</section>
		{/if}

		{#if p.hospitalStay || p.recovery}
			<section class="mb-10">
				<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_recovery()}</h2>
				<dl class="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-3 text-sm">
					{#if p.hospitalStay}<dt class="text-muted">{m.procedures_stay()}</dt><dd class="text-muted-text leading-relaxed">{p.hospitalStay}</dd>{/if}
					{#if p.recovery}<dt class="text-muted">{m.procedures_after()}</dt><dd class="text-muted-text leading-relaxed">{p.recovery}</dd>{/if}
				</dl>
			</section>
		{/if}

		{#if p.risks?.length}
			<section class="mb-10">
				<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_risks()}</h2>
				<ul class="list-disc pl-5 space-y-1.5 text-sm text-muted-text leading-relaxed">
					{#each p.risks as r}<li>{r}</li>{/each}
				</ul>
			</section>
		{/if}

		{#if p.evidence?.length}
			<section class="mb-10">
				<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_evidence()}</h2>
				<ul class="space-y-3">
					{#each p.evidence as e}
						<li class="text-sm text-muted-text leading-relaxed border-l-2 border-border pl-4">
							{e.claim}
							<a href={e.url} target="_blank" rel="noopener" class="ml-1 text-xs text-muted hover:text-primary underline whitespace-nowrap">PubMed{e.year ? `, ${e.year}` : ''}</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<section class="mb-10">
			<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_costs()}</h2>
			<dl class="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-3 text-sm">
				<dt class="text-muted">{m.procedures_ssn()}</dt>
				<dd class="text-muted-text leading-relaxed">{p.costs.ssn ?? m.procedures_unknown()}</dd>
				<dt class="text-muted">{m.procedures_private()}</dt>
				<dd class="text-muted-text leading-relaxed">{p.costs.private ?? m.procedures_unknown()}</dd>
			</dl>
		</section>

		{#if p.providers?.length}
			<section class="mb-10">
				<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_where()}</h2>
				<ul class="list-disc pl-5 space-y-1 text-sm text-muted-text">
					{#each p.providers as pr}<li>{pr}</li>{/each}
				</ul>
				<a href={localizeHref('/servizi')} class="inline-block mt-3 text-sm text-primary hover:underline">{m.procedures_see_services()} &rarr;</a>
			</section>
		{/if}

		{#if data.surgeons.length}
			<section class="mb-10">
				<h2 class="text-lg font-semibold text-primary mb-1">{m.procedures_surgeons()}</h2>
				<p class="text-xs text-muted mb-3 leading-relaxed">{m.procedures_surgeons_note()}</p>
				<ul class="divide-y divide-border border-y border-border">
					{#each data.surgeons as s}
						<li class="py-3 flex items-start justify-between gap-4">
							<div class="min-w-0">
								<p class="text-sm font-medium text-primary">{s.name}</p>
								<p class="text-xs text-muted">{s.institution} · {s.city}{s.country !== 'IT' ? ` (${s.country})` : ''}</p>
							</div>
							<a href={s.url} target="_blank" rel="noopener" class="shrink-0 text-xs text-primary hover:underline">{m.procedures_official_page()} &rarr;</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<section class="mb-10">
			<h2 class="text-lg font-semibold text-primary mb-3">{m.procedures_sources()}</h2>
			<ol class="list-decimal pl-5 space-y-1 text-xs text-muted leading-relaxed">
				{#each p.sources as s}
					<li><a href={s.url} target="_blank" rel="noopener" class="hover:text-primary underline">{s.title}</a> <span class="text-muted">({host(s.url)}{s.year ? `, ${s.year}` : ''})</span></li>
				{/each}
			</ol>
		</section>

		<p class="text-xs text-muted leading-relaxed">{m.procedures_disclaimer()}</p>

		<aside class="mt-8 rounded-2xl border border-border p-5 sm:p-6">
			<h2 class="text-base font-semibold text-primary mb-1">{m.services_edit_title()}</h2>
			<p class="text-sm text-muted leading-relaxed mb-3">{m.procedures_edit_desc()}</p>
			<a href={data.editUrl} target="_blank" rel="noopener" class="inline-block text-sm font-medium text-primary border border-border rounded-full px-4 py-2 hover:border-primary transition">{m.services_edit_cta()} &rarr;</a>
		</aside>

		<a href={localizeHref('/operazioni')} class="inline-block mt-8 text-sm text-primary font-medium hover:underline">&larr; {m.procedures_back()}</a>
	</article>
</div>
