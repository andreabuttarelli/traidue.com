<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
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
		url: 'https://traidue.com',
		description: 'Informazione sulle tematiche trans: terminologia, scienza, percorsi e cultura.',
		inLanguage: 'it',
		potentialAction: {
			'@type': 'SearchAction',
			target: 'https://traidue.com/wiki?q={search_term_string}',
			'query-input': 'required name=search_term_string'
		}
	};

	const categories = [
		{ name: 'Terminologia', description: 'Le parole giuste per capire e farsi capire', href: '/wiki?category=terminologia' },
		{ name: 'Scienza', description: 'Cosa dice davvero la ricerca, con le fonti', href: '/wiki?category=scienza' },
		{ name: 'Percorsi', description: 'Leggi, diritti e iter in Italia e nel mondo', href: '/wiki?category=percorsi' },
		{ name: 'Cultura', description: 'Storia, miti da sfatare e realtà quotidiana', href: '/wiki?category=cultura' }
	];

	const myths = [
		{ claim: 'L\'identità di genere è una moda recente', truth: 'Documentata da secoli in culture di tutto il mondo. La scienza moderna la studia dagli anni \'60.' },
		{ claim: 'I bambini sono troppo piccoli per sapere chi sono', truth: 'L\'identità di genere si consolida tra i 3 e i 5 anni. Nessun protocollo medico prevede interventi prima della pubertà.' },
		{ claim: 'Le persone trans se ne pentono', truth: 'Il tasso di rimpianto post-transizione è inferiore al 2% secondo le meta-analisi più recenti.' }
	];
</script>

<SEO
	title="Quello che non ti dicono sulle tematiche trans"
	description="Tra i Due è una risorsa informativa sulle tematiche trans: terminologia, basi scientifiche, percorsi legali e cultura. {data.stats.articles} articoli, {data.stats.sources} fonti peer-reviewed."
	url="https://traidue.com"
/>

<StructuredData schema={websiteSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-5xl lg:text-7xl text-primary mb-4 sm:mb-6">
			<Logo />
		</h1>
		<p class="text-base sm:text-lg lg:text-xl text-primary/80 mb-3 max-w-2xl leading-relaxed font-medium">
			La disinformazione sulle persone trans si combatte con i fatti.
		</p>
		<p class="text-sm sm:text-base text-muted mb-6 sm:mb-8 max-w-xl leading-relaxed">
			{data.stats.articles} articoli, {data.stats.sources}+ fonti scientifiche. Ogni affermazione verificabile.
		</p>
		<form onsubmit={handleSearch} class="mb-6 sm:mb-8 w-full max-w-xl">
			<input
				type="text"
				placeholder="Cerca un argomento..."
				bind:value={heroSearch}
				class="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-border bg-transparent dark:bg-white/5 text-text shadow-sm focus:outline-none focus:border-primary text-base sm:text-lg"
			/>
		</form>
		<div class="flex gap-6 text-sm">
			<a href="/wiki" class="text-primary font-medium hover:underline transition">Esplora gli articoli &rarr;</a>
			<a href="/quiz" class="text-muted hover:text-primary transition">Mettiti alla prova &rarr;</a>
		</div>
	</div>
</section>

<!-- Miti e realtà -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">Ecco cosa dicono. Ecco cosa dice la scienza.</h2>
		<p class="text-muted text-sm mb-6 sm:mb-8">I miti più diffusi, smontati con le evidenze.</p>
		<div class="grid gap-3 sm:gap-4 lg:grid-cols-3">
			{#each myths as myth}
				<div class="p-5 rounded-xl border border-border">
					<p class="text-sm font-medium text-muted line-through mb-3">&laquo;{myth.claim}&raquo;</p>
					<p class="text-sm text-primary leading-relaxed">{myth.truth}</p>
				</div>
			{/each}
		</div>
		<div class="mt-4 sm:mt-6">
			<a href="/wiki/miti-comuni-persone-trans" class="text-sm text-muted hover:text-primary transition">Leggi tutti i falsi miti smontati &rarr;</a>
		</div>
	</div>
</section>

<!-- Categorie -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6">Vai dritto al punto</h2>
		<div class="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
			{#each categories as cat}
				<a
					href={cat.href}
					class="block p-5 rounded-xl border border-border hover:border-primary/30 transition-all"
				>
					<h3 class="font-heading font-semibold tracking-tight text-primary mb-1">{cat.name}</h3>
					<p class="text-sm text-muted">{cat.description}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Articoli in evidenza -->
{#if data.featuredArticles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="flex items-center justify-between mb-4 sm:mb-6">
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Da leggere</h2>
				<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Tutti gli articoli &rarr;</a>
			</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.featuredArticles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Quiz -->
{#if data.featuredQuizzes.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="flex items-center justify-between mb-4 sm:mb-6">
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Quanto ne sai davvero?</h2>
				<a href="/quiz" class="text-sm text-muted hover:text-primary transition">Tutti i quiz &rarr;</a>
			</div>
			<div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
				{#each data.featuredQuizzes as quiz}
					<a
						href="/quiz/{quiz.slug}"
						class="block p-5 rounded-xl border border-border hover:border-primary/30 transition-all"
					>
						<div class="flex items-center gap-3 mb-1.5">
							<span class="text-xs text-muted uppercase tracking-wide">{quiz.category}</span>
							<span class="text-xs text-muted">{quiz.questions.length} domande</span>
						</div>
						<h3 class="text-lg font-heading font-semibold tracking-tight text-primary mb-1">{quiz.title}</h3>
						<p class="text-muted text-sm line-clamp-2">{quiz.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 text-center flex flex-col items-center">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Anche tu hai diritto di sapere.</h2>
		<p class="text-muted mb-6 max-w-lg">
			Ogni articolo cita le fonti. Ogni dato è verificabile. Non chiediamo di crederci: chiediamo di leggere.
		</p>
		<a href="/wiki" class="text-sm text-primary font-medium hover:underline transition">Inizia dalla Wiki &rarr;</a>
	</div>
</section>
