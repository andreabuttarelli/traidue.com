<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { Procedure } from '$lib/data/procedures';

	let { data } = $props();

	const groups: { key: Procedure['category']; label: () => string }[] = [
		{ key: 'femminilizzante', label: m.procedures_cat_fem },
		{ key: 'mascolinizzante', label: m.procedures_cat_masc },
		{ key: 'altro', label: m.procedures_cat_other }
	];
	const nameOf = (slug: string) => data.procedures.find((p) => p.slug === slug)?.name ?? slug;
</script>

<SEO title={m.procedures_seo_title({ brand: SITE.brand })} description={m.procedures_seo_desc({ count: data.procedures.length })} url={`${SITE.url}/operazioni`} />
<StructuredData
	schema={{
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: m.procedures_title(),
		itemListElement: data.procedures.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}${localizeHref(`/operazioni/${p.slug}`)}`, name: p.name }))
	}}
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.nav_procedures() }]} />

	<header class="mb-10 max-w-3xl">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-3">{m.procedures_title()}</h1>
		<p class="text-sm sm:text-base text-muted leading-relaxed">{m.procedures_intro()}</p>
	</header>

	{#each groups as g}
		{@const items = data.procedures.filter((p) => p.category === g.key)}
		{#if items.length}
			<section class="mb-12">
				<h2 class="text-lg sm:text-xl font-heading font-semibold text-primary mb-4">{g.label()}</h2>
				<ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
					{#each items as p}
						<li>
							<a href={localizeHref(`/operazioni/${p.slug}`)} class="block h-full rounded-2xl border border-border p-5 hover:border-primary transition">
								<p class="text-xs text-muted mb-1 capitalize">{p.area}</p>
								<p class="text-base font-semibold text-primary mb-1.5">{p.name}</p>
								<p class="text-sm text-muted leading-relaxed line-clamp-3">{p.summary}</p>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	{/each}

	<section id="chirurghi" class="mb-12 max-w-4xl">
		<h2 class="text-lg sm:text-xl font-heading font-semibold text-primary mb-1">{m.procedures_surgeons()}</h2>
		<p class="text-sm text-muted mb-4 leading-relaxed">{m.procedures_surgeons_note()}</p>
		<ul class="divide-y divide-border border-y border-border">
			{#each data.surgeons as s}
				<li class="py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-6">
					<div class="min-w-0">
						<p class="text-sm sm:text-base font-medium text-primary">{s.name}</p>
						<p class="text-xs text-muted">{s.institution} · {s.city}{s.country !== 'IT' ? ` (${s.country})` : ''}</p>
						<p class="text-xs text-muted-text mt-1">
							{#each s.procedures as slug, i}<a href={localizeHref(`/operazioni/${slug}`)} class="hover:text-primary underline">{nameOf(slug)}</a>{i < s.procedures.length - 1 ? ', ' : ''}{/each}
						</p>
					</div>
					<a href={s.url} target="_blank" rel="noopener" class="shrink-0 text-xs text-primary hover:underline">{m.procedures_official_page()} &rarr;</a>
				</li>
			{/each}
		</ul>
	</section>

	<p class="text-xs text-muted max-w-3xl leading-relaxed">{m.procedures_disclaimer()}</p>
</div>
