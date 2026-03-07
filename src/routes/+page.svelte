<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import SearchInput from '$lib/components/ui/SearchInput.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';

	let { data } = $props();

	let heroSearch = $state('');

	function handleSearch() {
		const q = heroSearch.trim();
		if (q) {
			goto(`/wiki?q=${encodeURIComponent(q)}`);
		}
	}

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Tra i Due',
		url: 'https://www.traidue.com',
		description: 'Informazione sulle tematiche trans: terminologia, scienza, percorsi e cultura.',
		inLanguage: 'it',
		potentialAction: {
			'@type': 'SearchAction',
			target: 'https://www.traidue.com/wiki?q={search_term_string}',
			'query-input': 'required name=search_term_string'
		}
	};

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Tra i Due',
		url: 'https://www.traidue.com',
		logo: {
			'@type': 'ImageObject',
			url: 'https://www.traidue.com/favicon.png'
		},
		description: 'Informazione evidence-based sulle tematiche trans: identità di genere, scienza, percorsi e cultura.',
		email: 'andrea@teta.so',
		founder: {
			'@type': 'Person',
			name: 'Andrea Buttarelli',
			url: 'https://www.traidue.com/chi-siamo'
		},
		sameAs: [
			'https://github.com/andreabuttarelli/traidue.com',
			'https://www.instagram.com/tra.i.due'
		],
		inLanguage: 'it'
	};

	const categories = [
		{ name: 'Terminologia', href: '/wiki?category=terminologia' },
		{ name: 'Scienza', href: '/wiki?category=scienza' },
		{ name: 'Percorsi', href: '/wiki?category=percorsi' },
		{ name: 'Cultura', href: '/wiki?category=cultura' },
		{ name: 'Persone', href: '/wiki?category=persone' }
	];

	const myths = [
		{ claim: 'L\'identità di genere è una moda recente', truth: 'Documentata da secoli in culture di tutto il mondo. La scienza moderna la studia dagli anni \'60.' },
		{ claim: 'I bambini sono troppo piccoli per sapere chi sono', truth: 'L\'identità di genere si consolida tra i 3 e i 5 anni. Nessun protocollo medico prevede interventi prima della pubertà.' },
		{ claim: 'Le persone trans se ne pentono', truth: 'Il tasso di rimpianto post-transizione è inferiore al 2% secondo le meta-analisi più recenti.' }
	];

	const homeFaqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: myths.map((m) => ({
			'@type': 'Question',
			name: `È vero che ${m.claim.toLowerCase()}?`,
			acceptedAnswer: {
				'@type': 'Answer',
				text: m.truth
			}
		}))
	};
</script>

<SEO
	title="Tra i Due — Scienza, storie e cultura trans"
	description="Tra i Due è la risorsa in italiano più completa sulle tematiche trans: fatti scientifici, storie di successo e cultura. {data.stats.articles} articoli, {data.stats.sources} fonti peer-reviewed."
	url="https://www.traidue.com"
/>

<StructuredData schema={websiteSchema} />
<StructuredData schema={organizationSchema} />
<StructuredData schema={homeFaqSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-5xl lg:text-7xl text-primary mb-4 sm:mb-6">
			<Logo animated />
		</h1>
		<p class="text-base sm:text-lg lg:text-xl text-primary/80 mb-3 max-w-2xl leading-relaxed font-medium">
			Fatti scientifici e storie di chi sta cambiando il mondo.
		</p>
		<p class="text-sm sm:text-base text-muted mb-6 sm:mb-8 max-w-xl leading-relaxed">
			{data.stats.articles} articoli, {data.stats.sources}+ fonti scientifiche. La risorsa in italiano più completa sulle tematiche trans.
		</p>
		<div class="mb-6 sm:mb-8 w-full max-w-xl">
			<SearchInput
				bind:value={heroSearch}
				articles={data.allArticles}
				quizzes={data.allQuizzes}
				variant="filled"
				placeholder="Cos'è la disforia? Chi è Laverne Cox?"
				onsubmit={handleSearch}
			/>
		</div>
		<div class="flex gap-6 text-sm">
			<a href="/wiki" class="text-primary font-medium hover:underline transition">Esplora gli articoli &rarr;</a>
			<a href="/quiz" class="text-muted hover:text-primary transition">Mettiti alla prova &rarr;</a>
		</div>
	</div>
</section>


<!-- Personas -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
			<a href="/famiglie" class="group relative rounded-2xl overflow-hidden aspect-[2/1] sm:aspect-[4/3]">
				<img
					src="/images/wiki/mio-figlio-trans-thumb.webp"
					alt="Genitore o familiare"
					width="672"
					height="378"
					loading="lazy"
					decoding="async"
					class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
					<h3 class="text-white text-base sm:text-xl font-heading font-semibold mb-0.5 sm:mb-1">Sei un genitore o familiare</h3>
					<p class="text-white/80 text-xs sm:text-sm leading-relaxed">Come supportare tuo figlio o una persona cara nel suo percorso.</p>
				</div>
			</a>
			<a href="/giovani" class="group relative rounded-2xl overflow-hidden aspect-[2/1] sm:aspect-[4/3]">
				<img
					src="/images/wiki/bambini-trans-thumb.webp"
					alt="Adolescente"
					width="672"
					height="378"
					loading="lazy"
					decoding="async"
					class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
					<h3 class="text-white text-base sm:text-xl font-heading font-semibold mb-0.5 sm:mb-1">Sei un/a adolescente</h3>
					<p class="text-white/80 text-xs sm:text-sm leading-relaxed">Risorse pensate per te: informazioni chiare, senza giudizio.</p>
				</div>
			</a>
			<a href="/wiki?category=scienza" class="group relative rounded-2xl overflow-hidden aspect-[2/1] sm:aspect-[4/3]">
				<img
					src="/images/wiki/basi-biologiche-identita-di-genere-thumb.webp"
					alt="Professionista"
					width="672"
					height="378"
					loading="lazy"
					decoding="async"
					class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
					<h3 class="text-white text-base sm:text-xl font-heading font-semibold mb-0.5 sm:mb-1">Sei un/a professionista</h3>
					<p class="text-white/80 text-xs sm:text-sm leading-relaxed">Evidenze scientifiche e fonti peer-reviewed per il tuo lavoro.</p>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- Da leggere -->
{#if data.featuredArticles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="flex items-center justify-between mb-4 sm:mb-6">
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Da leggere</h2>
			</div>
			<div class="hidden sm:flex gap-4 flex-wrap mb-8 sm:mb-12">
				<a href="/wiki" class="text-sm text-primary font-medium transition">Tutti</a>
				{#each categories as cat}
					<a href={cat.href} class="text-sm text-muted hover:text-primary capitalize transition">{cat.name}</a>
				{/each}
			</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.featuredArticles as article}
					<ArticleCard {article} />
				{/each}
			</div>
			<div class="flex justify-center mt-10 sm:mt-14">
				<a href="/wiki" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-bg hover:opacity-90 transition">
					Tutti gli articoli &rarr;
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- Persone -->
{#if data.personArticles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="flex items-center justify-between mb-4 sm:mb-6">
				<div>
					<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-1">Imprenditori, artisti, avvocati, scienziati. E molto altro.</h2>
					<p class="text-muted text-sm sm:text-base">
						Le persone trans stanno ricoprendo ruoli chiave nella società. Noi raccontiamo le loro storie, con i fatti.
					</p>
				</div>
			</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.personArticles.slice(0, 6) as article}
					<ArticleCard {article} />
				{/each}
			</div>
			<div class="flex justify-center mt-10 sm:mt-14">
				<a href="/wiki?category=persone" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-bg hover:opacity-90 transition">
					Tutte le storie &rarr;
				</a>
			</div>
		</div>
	</section>
{/if}
