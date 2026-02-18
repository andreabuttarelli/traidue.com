<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

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
		{ name: 'Terminologia', description: 'Definizioni, glossario e linguaggio inclusivo', href: '/wiki?category=terminologia' },
		{ name: 'Scienza', description: 'Neurologia, genetica, biologia e ricerca', href: '/wiki?category=scienza' },
		{ name: 'Percorsi', description: 'Iter legali, medici e di transizione', href: '/wiki?category=percorsi' },
		{ name: 'Cultura', description: 'Storia, rappresentazione e società', href: '/wiki?category=cultura' }
	];
</script>

<SEO
	title="Informazione sulle tematiche trans"
	description="Tra i Due è una risorsa informativa sulle tematiche trans: terminologia, basi scientifiche, percorsi legali e cultura. Articoli basati su fonti peer-reviewed."
	url="https://traidue.com"
/>

<StructuredData schema={websiteSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-5xl lg:text-7xl text-primary mb-4 sm:mb-6">
			<Logo />
		</h1>
		<p class="text-base sm:text-lg lg:text-xl text-muted mb-6 sm:mb-8 max-w-xl leading-relaxed">
			Informazione chiara e basata sulla scienza sulle tematiche trans. Una risorsa per tutte le persone.
		</p>
		<form onsubmit={handleSearch} class="mb-6 sm:mb-8 w-full max-w-xl">
			<input
				type="text"
				placeholder="Cerca articoli e quiz..."
				bind:value={heroSearch}
				class="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-border bg-transparent dark:bg-white/5 text-text shadow-sm focus:outline-none focus:border-primary text-base sm:text-lg"
			/>
		</form>
		<div class="flex gap-6 text-sm text-muted">
			<a href="/wiki" class="hover:text-primary transition">Esplora la Wiki &rarr;</a>
			<a href="/quiz" class="hover:text-primary transition">Fai un Quiz &rarr;</a>
		</div>
	</div>
</section>

<!-- Categorie -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6">Esplora per categoria</h2>
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
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Articoli in evidenza</h2>
				<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Vedi tutti &rarr;</a>
			</div>
			<div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
				{#each data.featuredArticles as article}
					<a
						href="/wiki/{article.slug}"
						class="block p-5 rounded-xl border border-border hover:border-primary/30 transition-all"
					>
						<div class="flex items-center gap-3 mb-1.5">
							<span class="text-xs text-muted uppercase tracking-wide">{article.category}</span>
						</div>
						<h3 class="text-lg font-heading font-semibold tracking-tight text-primary mb-1">{article.title}</h3>
						<p class="text-muted text-sm line-clamp-2">{article.description}</p>
					</a>
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
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Mettiti alla prova</h2>
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
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Vuoi saperne di più?</h2>
		<p class="text-muted mb-6 max-w-lg">
			Esplora tutti i nostri articoli, ciascuno basato su fonti scientifiche e aggiornato
			regolarmente.
		</p>
		<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Vai alla Wiki &rarr;</a>
	</div>
</section>
