<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { getGlossaryTerms } from '$lib/data/glossary';
	import { getTranslationSlugMap } from '$lib/utils/wiki';
	import * as m from '$lib/paraglide/messages';
	import { getLocale, locales, localizeHref } from '$lib/paraglide/runtime';

	const terms = $derived(getGlossaryTerms(getLocale()));

	const localeMap: Record<string, string> = { it: 'it-IT', en: 'en-US', es: 'es-ES', pt: 'pt-BR' };

	const alternateUrls = Object.fromEntries(
		locales.map((l) => [l, `https://www.traidue.com${localizeHref('/glossario', { locale: l })}`])
	);

	// Glossary links use the Italian wiki slug (= translationKey); resolve it
	// to the translated slug of the current locale, then localize the path.
	const slugMap = $derived(getTranslationSlugMap(getLocale()));
	function wikiLink(link: string): string {
		const match = link.match(/^\/wiki\/([^/#?]+)$/);
		if (!match) return localizeHref(link);
		const translatedSlug = slugMap[match[1]] ?? match[1];
		return localizeHref('/wiki/' + translatedSlug);
	}

	const definedTermsSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'DefinedTermSet',
		name: m.glossary_page_title(),
		description: m.glossary_seo_desc(),
		inLanguage: localeMap[getLocale()] ?? 'it-IT',
		hasDefinedTerm: terms.map((t) => ({
			'@type': 'DefinedTerm',
			name: t.term,
			description: t.definition
		}))
	});
</script>

<SEO
	title={m.glossary_page_title()}
	description={m.glossary_seo_desc()}
	url="https://www.traidue.com{localizeHref('/glossario')}"
	{alternateUrls}
/>

<StructuredData schema={definedTermsSchema} />

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: localizeHref('/') }, { label: m.glossary_page_title() }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{m.glossary_page_title()}</h1>
		<p class="text-muted leading-relaxed max-w-xl">
			{m.glossary_intro()}
		</p>
	</header>

	<div class="overflow-x-auto">
		<table class="w-full border-collapse text-sm sm:text-base">
			<thead>
				<tr>
					<th class="border border-border px-4 py-3 text-left font-heading font-semibold text-primary bg-card">{m.glossary_col_term()}</th>
					<th class="border border-border px-4 py-3 text-left font-heading font-semibold text-primary bg-card">{m.glossary_col_definition()}</th>
				</tr>
			</thead>
			<tbody>
				{#each terms as { term, definition, link }}
					<tr class="hover:bg-border/30 transition-colors" id={term.toLowerCase().replace(/[^a-zà-ú0-9]+/g, '-').replace(/-+$/, '')}>
						<td class="border border-border px-4 py-3 font-heading font-semibold text-primary whitespace-nowrap align-top">
							{term}
						</td>
						<td class="border border-border px-4 py-3 text-muted-text leading-relaxed align-top">
							{definition}
							{#if link}
								<a href={wikiLink(link)} class="text-primary text-sm ml-1 hover:underline transition">{m.glossary_read_more()}&nbsp;&rarr;</a>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
