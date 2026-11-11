<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import Vaginoplasty3D from '$lib/components/procedures/Vaginoplasty3D.svelte';
	import Procedure3D from '$lib/components/procedures/Procedure3D.svelte';
	import { procedures3d } from '$lib/components/procedures/procedures-3d';
	import { PROCEDURES_PUBLIC, PROCEDURES_3D } from '$lib/data/procedures';

	let { data } = $props();
	const p = $derived(data.procedure);
	const categoryLabel = $derived(
		{ femminilizzante: m.procedures_cat_fem, mascolinizzante: m.procedures_cat_masc, altro: m.procedures_cat_other }[p.category]()
	);
	const host = (u: string) => new URL(u).host.replace(/^www\./, '');

	// page index: only the sections this procedure has
	const toc = $derived(
		[
			p.techniques?.length && { id: 'tecniche', label: m.procedures_techniques() },
			p.eligibility && { id: 'requisiti', label: m.procedures_eligibility() },
			(p.hospitalStay || p.recovery) && { id: 'recupero', label: m.procedures_recovery() },
			p.risks?.length && { id: 'rischi', label: m.procedures_risks() },
			p.fears?.length && { id: 'paure', label: m.procedures_fears() },
			p.evidence?.length && { id: 'ricerca', label: m.procedures_evidence() },
			{ id: 'costi', label: m.procedures_costs() },
			p.providers?.length && { id: 'dove', label: m.procedures_where() },
			data.surgeons.length && { id: 'chirurghi', label: m.procedures_surgeons() },
			{ id: 'fonti', label: m.procedures_sources() }
		].filter((x): x is { id: string; label: string } => !!x)
	);

	// highlight the section being read
	let active = $state('');
	$effect(() => {
		const els = toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => !!e);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = e.target.id;
			},
			{ rootMargin: '-30% 0px -60% 0px' }
		);
		els.forEach((e) => io.observe(e));
		return () => io.disconnect();
	});

	// keep the active chip visible in the scrolling bar on small screens
	let chipsEl = $state<HTMLElement>();
	$effect(() => {
		const chip = chipsEl?.querySelector<HTMLElement>(`[data-id="${active}"]`);
		if (chip && chipsEl) chipsEl.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
	});
</script>

<SEO title={`${p.name}: tecniche, requisiti, recupero e costi | ${SITE.brand}`} description={p.summary} url={`${SITE.url}/operazioni/${p.slug}`} noindex={!PROCEDURES_PUBLIC} />
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

{#if p.fears?.length}
	<StructuredData
		schema={{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: p.fears.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
		}}
	/>
{/if}

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.nav_procedures(), href: '/operazioni' }, { label: p.name }]} />

	<header class="max-w-3xl">
		<p class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-text rounded-full border border-border px-2.5 py-1 mb-4">
			<span class="inline-block size-2 rounded-full {p.category === 'femminilizzante' ? 'bg-brand-pink' : p.category === 'mascolinizzante' ? 'bg-brand-blue' : 'bg-border'}" aria-hidden="true"></span>{categoryLabel} · <span class="capitalize">{p.area}</span>
		</p>
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3">{p.name}</h1>
		{#if p.aka?.length}<p class="text-sm text-muted mb-5">{m.procedures_aka()}: {p.aka.join(', ')}</p>{/if}
		<p class="text-base sm:text-lg text-muted-text leading-relaxed">{p.summary}</p>
	</header>

	{#if PROCEDURES_3D && (p.slug === 'vaginoplastica' || procedures3d[p.slug])}
		<!-- wider than the text column on desktop: the diagram has a step list beside it -->
		<div class="mt-8 sm:mt-10 -mx-4 sm:mx-0 xl:w-[66rem] xl:max-w-full">
			{#if p.slug === 'vaginoplastica'}<Vaginoplasty3D />{:else}<Procedure3D config={procedures3d[p.slug]} />{/if}
		</div>
	{/if}

	<!-- small screens: section chips under the navbar -->
	<nav aria-label={m.procedures_on_page()} class="xl:hidden sticky top-14 z-40 -mx-4 sm:-mx-6 lg:-mx-12 mt-8 bg-bg/90 backdrop-blur border-y border-border">
		<div bind:this={chipsEl} class="flex gap-1.5 overflow-x-auto px-4 sm:px-6 lg:px-12 py-2 no-scrollbar">
			{#each toc as t}
				<a href="#{t.id}" data-id={t.id} class="shrink-0 rounded-full px-3 py-1.5 text-xs transition {active === t.id ? 'bg-primary text-bg' : 'text-muted-text hover:text-primary bg-surface'}">{t.label}</a>
			{/each}
		</div>
	</nav>

	<div class="xl:grid xl:grid-cols-[minmax(0,48rem)_14rem] xl:gap-16 xl:mt-4">
		<article class="max-w-3xl">
			{#if p.techniques?.length}
				<section id="tecniche" class="sec">
					<h2 class="sec-title">{m.procedures_techniques()}</h2>
					<div class="grid gap-3 {p.techniques.length > 1 ? 'sm:grid-cols-2' : ''}">
						{#each p.techniques as t, i}
							<div class="card {p.techniques.length % 2 && i === p.techniques.length - 1 && i > 0 ? 'sm:col-span-2' : ''}">
								<h3 class="font-semibold text-primary leading-snug">{t.name}</h3>
								<p class="text-sm text-muted-text leading-relaxed mt-1.5">{t.description}</p>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			{#if p.eligibility}
				<section id="requisiti" class="sec">
					<h2 class="sec-title">{m.procedures_eligibility()}</h2>
					<p class="text-sm sm:text-[15px] text-muted-text leading-relaxed">{p.eligibility}</p>
				</section>
			{/if}

			{#if p.hospitalStay || p.recovery}
				<section id="recupero" class="sec">
					<h2 class="sec-title">{m.procedures_recovery()}</h2>
					<div class="grid gap-3 {p.hospitalStay && p.recovery ? 'sm:grid-cols-[1fr_2fr]' : ''}">
						{#if p.hospitalStay}<div class="card"><p class="label">{m.procedures_stay()}</p><p class="text-sm text-primary leading-relaxed">{p.hospitalStay}</p></div>{/if}
						{#if p.recovery}<div class="card"><p class="label">{m.procedures_after()}</p><p class="text-sm text-muted-text leading-relaxed">{p.recovery}</p></div>{/if}
					</div>
				</section>
			{/if}

			{#if p.risks?.length}
				<section id="rischi" class="sec">
					<h2 class="sec-title">{m.procedures_risks()}</h2>
					<ul class="space-y-2.5 text-sm text-muted-text leading-relaxed">
						{#each p.risks as r}
							<li class="flex gap-3"><span class="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-muted" aria-hidden="true"></span><span>{r}</span></li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if p.fears?.length}
				<section id="paure" class="sec">
					<h2 class="sec-title !mb-1.5">{m.procedures_fears()}</h2>
					<p class="text-sm text-muted mb-5 leading-relaxed">{m.procedures_fears_intro()}</p>
					<div class="rounded-2xl border border-border divide-y divide-border">
						{#each p.fears as f}
							<details class="fear group">
								<summary class="flex items-start justify-between gap-4 cursor-pointer px-4 sm:px-5 py-4 text-[15px] font-semibold text-primary leading-snug hover:bg-surface transition rounded-2xl">
									<span>{f.q}</span>
									<span class="mt-0.5 shrink-0 text-muted transition-transform group-open:rotate-45 text-lg leading-none" aria-hidden="true">+</span>
								</summary>
								<div class="px-4 sm:px-5 pb-5 -mt-1">
									<p class="text-sm text-muted-text leading-relaxed">{f.a}</p>
									{#if f.reddit.length || f.sources.length}
										<div class="flex flex-wrap gap-1.5 mt-3">
											{#each f.reddit as r}<a href={r.url} target="_blank" rel="noopener nofollow" class="link-chip" title={r.title}><span class="font-medium">{r.subreddit}</span> <span class="truncate max-w-[14rem]">{r.title}</span> ↗</a>{/each}
											{#each f.sources as s}<a href={s.url} target="_blank" rel="noopener" class="link-chip">{m.procedures_sources()}{s.year ? ` ${s.year}` : ''} ↗</a>{/each}
										</div>
									{/if}
								</div>
							</details>
						{/each}
					</div>
					{#if p.redditQuery}
						<a href={`https://www.reddit.com/search/?q=${encodeURIComponent(`${p.redditQuery} trans`)}`} target="_blank" rel="noopener nofollow" class="inline-block mt-4 text-sm text-primary underline hover:text-brand-blue">{m.procedures_fears_search()} →</a>
					{/if}
				</section>
			{/if}

			{#if p.evidence?.length}
				<section id="ricerca" class="sec">
					<h2 class="sec-title">{m.procedures_evidence()}</h2>
					<ul class="space-y-3">
						{#each p.evidence as e}
							<li class="text-sm text-muted-text leading-relaxed border-l-2 border-brand-blue pl-4 py-0.5">
								{e.claim}
								<a href={e.url} target="_blank" rel="noopener" class="ml-1 text-xs text-muted hover:text-primary underline whitespace-nowrap">PubMed{e.year ? `, ${e.year}` : ''}</a>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			<section id="costi" class="sec">
				<h2 class="sec-title">{m.procedures_costs()}</h2>
				<div class="grid gap-3 sm:grid-cols-2 items-start">
					<div class="card"><p class="label">{m.procedures_ssn()}</p><p class="text-sm leading-relaxed {p.costs.ssn ? 'text-muted-text' : 'text-muted italic'}">{p.costs.ssn ?? m.procedures_unknown()}</p></div>
					<div class="card"><p class="label">{m.procedures_private()}</p><p class="text-sm leading-relaxed {p.costs.private ? 'text-muted-text' : 'text-muted italic'}">{p.costs.private ?? m.procedures_unknown()}</p></div>
				</div>
			</section>

			{#if p.providers?.length}
				<section id="dove" class="sec">
					<h2 class="sec-title">{m.procedures_where()}</h2>
					<ul class="grid gap-2 sm:grid-cols-2 text-sm text-muted-text">
						{#each p.providers as pr}<li class="rounded-xl bg-surface px-3.5 py-2.5 leading-snug">{pr}</li>{/each}
					</ul>
					<a href={localizeHref('/servizi')} class="inline-flex items-center mt-4 text-sm font-medium text-primary border border-border rounded-full px-4 py-2 hover:border-primary transition">{m.procedures_see_services()} &rarr;</a>
				</section>
			{/if}

			{#if data.surgeons.length}
				<section id="chirurghi" class="sec">
					<h2 class="sec-title !mb-1.5">{m.procedures_surgeons()}</h2>
					<p class="text-xs text-muted mb-4 leading-relaxed">{m.procedures_surgeons_note()}</p>
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

			<section id="fonti" class="sec">
				<h2 class="sec-title">{m.procedures_sources()}</h2>
				<ol class="list-decimal pl-5 space-y-1.5 text-xs text-muted leading-relaxed marker:tabular-nums">
					{#each p.sources as s}
						<li><a href={s.url} target="_blank" rel="noopener" class="hover:text-primary underline">{s.title}</a> <span class="text-muted">({host(s.url)}{s.year ? `, ${s.year}` : ''})</span></li>
					{/each}
				</ol>
			</section>

			<p class="mt-10 text-xs text-muted leading-relaxed">{m.procedures_disclaimer()}</p>

			<aside class="mt-6 rounded-2xl border border-border p-5 sm:p-6">
				<h2 class="text-base font-semibold text-primary mb-1">{m.services_edit_title()}</h2>
				<p class="text-sm text-muted leading-relaxed mb-3">{m.procedures_edit_desc()}</p>
				<a href={data.editUrl} target="_blank" rel="noopener" class="inline-block text-sm font-medium text-primary border border-border rounded-full px-4 py-2 hover:border-primary transition">{m.services_edit_cta()} &rarr;</a>
			</aside>

			<a href={localizeHref('/operazioni')} class="inline-block mt-8 text-sm text-primary font-medium hover:underline">&larr; {m.procedures_back()}</a>
		</article>

		<!-- desktop: page index beside the text -->
		<nav aria-label={m.procedures_on_page()} class="hidden xl:block">
			<div class="sticky top-24">
				<p class="text-xs font-medium uppercase tracking-wide text-muted mb-3">{m.procedures_on_page()}</p>
				<ul class="border-l border-border text-sm">
					{#each toc as t}
						<li>
							<a href="#{t.id}" aria-current={active === t.id ? 'location' : undefined} class="block -ml-px border-l-2 pl-3.5 py-1.5 transition {active === t.id ? 'border-brand-blue text-primary font-medium' : 'border-transparent text-muted hover:text-primary'}">{t.label}</a>
						</li>
					{/each}
				</ul>
			</div>
		</nav>
	</div>
</div>

<style>
	.sec {
		scroll-margin-top: 7.5rem;
		padding-top: 2.25rem;
	}
	.sec + .sec {
		margin-top: 2.25rem;
		border-top: 1px solid var(--color-border);
	}
	.sec-title {
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}
	.card {
		border-radius: 1rem;
		border: 1px solid var(--color-border);
		padding: 1rem 1.125rem;
	}
	.label {
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-muted);
		margin-bottom: 0.375rem;
	}
	.link-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		max-width: 100%;
		border-radius: 9999px;
		border: 1px solid var(--color-border);
		padding: 0.2rem 0.65rem;
		font-size: 0.75rem;
		color: var(--color-muted-text);
	}
	.link-chip:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.fear > summary {
		list-style: none;
	}
	.fear > summary::-webkit-details-marker {
		display: none;
	}
	.no-scrollbar {
		scrollbar-width: none;
	}
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 1280px) {
		.sec {
			scroll-margin-top: 6rem;
		}
	}
</style>
