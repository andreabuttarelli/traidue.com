<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';

	let { data } = $props();

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Risorse trans per giovani',
		description:
			'Informazioni scientifiche su identità di genere, coming out e transizione per giovani trans o in esplorazione.',
		url: 'https://www.traidue.com/giovani',
		inLanguage: 'it',
		isPartOf: {
			'@type': 'WebSite',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		}
	};
</script>

<SEO
	title="Risorse trans per giovani"
	description="Stai esplorando la tua identità di genere? Informazioni scientifiche, articoli e risorse per giovani trans o in esplorazione. Ogni dato è verificabile."
	url="https://www.traidue.com/giovani"
/>

<StructuredData schema={pageSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6 max-w-3xl">
			Stai esplorando la tua identità? Sei nel posto giusto.
		</h1>
		<p class="text-base sm:text-lg text-primary/80 mb-3 max-w-2xl leading-relaxed">
			Non serve avere le idee chiare. Serve avere informazioni chiare.
		</p>
		<p class="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
			Articoli basati su ricerca scientifica, scritti per chi si sta facendo delle domande. Niente giudizi, solo fatti verificabili.
		</p>
	</div>
</section>

<!-- Articoli -->
{#if data.articles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">Da dove partire</h2>
			<p class="text-muted text-sm mb-6 sm:mb-8">Articoli selezionati per chi si sta facendo le prime domande.</p>
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
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Quanto ne sai davvero?</h2>
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
			Nuovi articoli, aggiornamenti scientifici e risorse. Niente spam, solo contenuti utili.
		</p>
		<a href="/newsletter" class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition">
			Iscriviti alla newsletter &rarr;
		</a>
	</div>
</section>

<!-- Esplora tutto -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16 text-center">
		<p class="text-muted mb-4">Vuoi esplorare tutti gli argomenti?</p>
		<a href="/wiki" class="text-sm text-primary font-medium hover:underline transition">Vai alla Wiki &rarr;</a>
	</div>
</section>
