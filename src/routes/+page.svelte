<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import QuizCard from '$lib/components/quiz/QuizCard.svelte';

	let { data } = $props();

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
<section class="border-b border-border">
	<div class="w-full px-6 lg:px-12 py-24 lg:py-32">
		<h1 class="text-5xl lg:text-7xl font-heading font-bold text-primary mb-6 tracking-tight max-w-3xl">
			Tra i Due
		</h1>
		<p class="text-lg lg:text-xl text-muted mb-10 max-w-xl leading-relaxed">
			Informazione chiara e basata sulla scienza sulle tematiche trans. Una risorsa per tutte le persone.
		</p>
		<div class="flex gap-4">
			<a
				href="/wiki"
				class="px-6 py-3 bg-primary text-white text-sm font-medium hover:bg-primary/80 transition"
			>
				Esplora la Wiki
			</a>
			<a
				href="/quiz"
				class="px-6 py-3 border border-primary text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
			>
				Fai un Quiz
			</a>
		</div>
	</div>
</section>

<!-- Categorie -->
<section class="border-b border-border">
	<div class="w-full px-6 lg:px-12 py-16">
		<h2 class="text-2xl font-heading font-bold text-primary mb-8">Esplora per categoria</h2>
		<div class="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
			{#each categories as cat}
				<a
					href={cat.href}
					class="block py-4 pr-8 border-b sm:border-b-0 sm:border-r border-border last:border-0 hover:pl-2 transition-all"
				>
					<h3 class="font-heading font-semibold text-primary mb-1">{cat.name}</h3>
					<p class="text-sm text-muted">{cat.description}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Articoli in evidenza -->
{#if data.featuredArticles.length > 0}
	<section class="border-b border-border">
		<div class="w-full px-6 lg:px-12 py-16">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-2xl font-heading font-bold text-primary">Articoli in evidenza</h2>
				<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Vedi tutti</a>
			</div>
			<div class="grid lg:grid-cols-2 gap-x-12">
				{#each data.featuredArticles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Quiz -->
{#if data.featuredQuizzes.length > 0}
	<section class="border-b border-border">
		<div class="w-full px-6 lg:px-12 py-16">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-2xl font-heading font-bold text-primary">Mettiti alla prova</h2>
				<a href="/quiz" class="text-sm text-muted hover:text-primary transition">Tutti i quiz</a>
			</div>
			<div class="grid lg:grid-cols-2 gap-x-12">
				{#each data.featuredQuizzes as quiz}
					<QuizCard {quiz} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section>
	<div class="w-full px-6 lg:px-12 py-20 lg:py-24">
		<h2 class="text-2xl font-heading font-bold text-primary mb-3">Vuoi saperne di più?</h2>
		<p class="text-muted mb-8 max-w-lg">
			Esplora tutti i nostri articoli, ciascuno basato su fonti scientifiche e aggiornato
			regolarmente.
		</p>
		<a
			href="/wiki"
			class="px-6 py-3 bg-primary text-white text-sm font-medium hover:bg-primary/80 transition"
		>
			Vai alla Wiki
		</a>
	</div>
</section>
