<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { glossaryTerms as terms } from '$lib/data/glossary';

	const definedTermsSchema = {
		'@context': 'https://schema.org',
		'@type': 'DefinedTermSet',
		name: 'Glossario sulle tematiche trans',
		description: 'Definizioni dei termini principali relativi a identità di genere, transizione e diritti delle persone trans.',
		inLanguage: 'it',
		hasDefinedTerm: terms.map((t) => ({
			'@type': 'DefinedTerm',
			name: t.term,
			description: t.definition
		}))
	};
</script>

<SEO
	title="Glossario"
	description="Glossario completo con 35 termini sulle tematiche trans: identità di genere, disforia, AMAB/AFAB, deadnaming, transizione, non binario e altri. Definizioni chiare basate sulle fonti scientifiche."
	url="https://www.traidue.com/glossario"
/>

<StructuredData schema={definedTermsSchema} />

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Glossario' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Glossario</h1>
		<p class="text-muted leading-relaxed max-w-xl">
			Le parole contano. Ecco i termini principali, definiti a partire dalle fonti scientifiche.
		</p>
	</header>

	<div class="overflow-x-auto">
		<table class="w-full border-collapse text-sm sm:text-base">
			<thead>
				<tr>
					<th class="border border-border px-4 py-3 text-left font-heading font-semibold text-primary bg-card">Termine</th>
					<th class="border border-border px-4 py-3 text-left font-heading font-semibold text-primary bg-card">Definizione</th>
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
								<a href={link} class="text-primary text-sm ml-1 hover:underline transition">Approfondisci&nbsp;&rarr;</a>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
