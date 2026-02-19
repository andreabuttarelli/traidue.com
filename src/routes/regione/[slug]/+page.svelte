<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';

	let { data } = $props();

	let pageSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: `Risorse trans in ${data.regione.nome}`,
		description: `Informazioni sulle tematiche trans per le persone in ${data.regione.nome}.`,
		url: `https://www.traidue.com/regione/${data.regione.slug}`,
		inLanguage: 'it',
		isPartOf: {
			'@type': 'WebSite',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		}
	});

	let faqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: `Dove trovare informazioni sulle tematiche trans in ${data.regione.nome}?`,
				acceptedAnswer: {
					'@type': 'Answer',
					text: `Tra i Due offre articoli scientifici su identità di genere, transizione, diritti e cultura trans, utili per le persone in ${data.regione.nome}. Ogni contenuto cita fonti peer-reviewed.`
				}
			},
			{
				'@type': 'Question',
				name: `Quali sono i diritti delle persone trans in ${data.regione.nome}?`,
				acceptedAnswer: {
					'@type': 'Answer',
					text: `In Italia la legge 164/1982 consente la rettificazione anagrafica del sesso. I diritti sono uniformi a livello nazionale, ma i tempi e le procedure possono variare da regione a regione.`
				}
			},
			{
				'@type': 'Question',
				name: `Esistono risorse per famiglie di persone trans in ${data.regione.nome}?`,
				acceptedAnswer: {
					'@type': 'Answer',
					text: `Sì, su Tra i Due trovi articoli dedicati alle famiglie: dal coming out al supporto psicologico, con indicazioni basate sulla ricerca scientifica.`
				}
			}
		]
	});
</script>

<SEO
	title="Risorse trans in {data.regione.nome}"
	description="Informazioni sulle tematiche trans per le persone in {data.regione.nome}. Articoli scientifici, risorse e supporto."
	url="https://www.traidue.com/regione/{data.regione.slug}"
/>

<StructuredData schema={pageSchema} />
<StructuredData schema={faqSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-2xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6 max-w-3xl">
			Informazione sulle tematiche trans in {data.regione.nome}
		</h1>
		<p class="text-base sm:text-lg text-primary/80 mb-3 max-w-2xl leading-relaxed">
			Articoli basati su ricerca scientifica, risorse e supporto per le persone trans e le loro famiglie in {data.regione.nome}.
		</p>
		<p class="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
			Ogni affermazione è accompagnata dalle fonti. Non chiediamo di crederci: chiediamo di leggere.
		</p>
	</div>
</section>

<!-- Articoli in evidenza -->
{#if data.articles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="flex items-center justify-between mb-4 sm:mb-6">
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Articoli in evidenza</h2>
				<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Tutti gli articoli &rarr;</a>
			</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.articles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Quiz CTA -->
{#if data.featuredQuiz}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="p-6 sm:p-8 rounded-xl border border-border">
				<p class="text-sm text-muted uppercase tracking-wide mb-2">Mettiti alla prova</p>
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Quanto ne sai di identità di genere?</h2>
				<p class="text-muted text-sm mb-6 max-w-lg">
					{data.featuredQuiz.questions.length} domande basate sulla ricerca scientifica. Scopri cosa sai e cosa credevi di sapere.
				</p>
				<a
					href="/quiz/{data.featuredQuiz.slug}"
					class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
				>
					Inizia il quiz &rarr;
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- CTA Newsletter -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 text-center flex flex-col items-center">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Resta aggiornato</h2>
		<p class="text-muted mb-6 max-w-lg">
			Nuovi articoli e risorse sulle tematiche trans. Niente spam, solo contenuti utili.
		</p>
		<a href="/newsletter" class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition">
			Iscriviti alla newsletter &rarr;
		</a>
	</div>
</section>
