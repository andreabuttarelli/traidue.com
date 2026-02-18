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
		{
			name: 'Terminologia',
			description: 'Definizioni, glossario e linguaggio inclusivo',
			href: '/wiki?category=terminologia',
			icon: '📖'
		},
		{
			name: 'Scienza',
			description: 'Neurologia, genetica, biologia e ricerca',
			href: '/wiki?category=scienza',
			icon: '🔬'
		},
		{
			name: 'Percorsi',
			description: 'Iter legali, medici e di transizione',
			href: '/wiki?category=percorsi',
			icon: '🗺️'
		},
		{
			name: 'Cultura',
			description: 'Storia, rappresentazione e società',
			href: '/wiki?category=cultura',
			icon: '🎭'
		}
	];
</script>

<SEO
	title="Informazione sulle tematiche trans"
	description="Tra i Due è una risorsa informativa sulle tematiche trans: terminologia, basi scientifiche, percorsi legali e cultura. Articoli basati su fonti peer-reviewed."
	url="https://traidue.com"
/>

<StructuredData schema={websiteSchema} />

<!-- Hero -->
<section class="bg-primary text-white">
	<div class="max-w-4xl mx-auto px-4 py-20 text-center">
		<h1 class="text-4xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">Tra i Due</h1>
		<p class="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
			Informazione chiara e basata sulla scienza sulle tematiche trans. Una risorsa per
			<strong class="text-accent">tutte le persone</strong>.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/wiki"
				class="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition"
			>
				Esplora la Wiki
			</a>
			<a
				href="/quiz"
				class="px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition"
			>
				Fai un Quiz
			</a>
		</div>
	</div>
</section>

<!-- Categorie -->
<section class="max-w-4xl mx-auto px-4 py-16">
	<h2 class="text-2xl font-heading font-bold text-primary mb-8">Esplora per categoria</h2>
	<div class="grid gap-4 sm:grid-cols-2">
		{#each categories as cat}
			<a
				href={cat.href}
				class="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:shadow-md transition"
			>
				<span class="text-2xl">{cat.icon}</span>
				<div>
					<h3 class="font-heading font-semibold text-primary">{cat.name}</h3>
					<p class="text-sm text-muted mt-1">{cat.description}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- Articoli in evidenza -->
{#if data.featuredArticles.length > 0}
	<section class="bg-primary/[0.02]">
		<div class="max-w-4xl mx-auto px-4 py-16">
			<div class="flex items-center justify-between mb-8">
				<h2 class="text-2xl font-heading font-bold text-primary">Articoli in evidenza</h2>
				<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Vedi tutti →</a>
			</div>
			<div class="grid gap-6 sm:grid-cols-2">
				{#each data.featuredArticles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Quiz -->
{#if data.featuredQuizzes.length > 0}
	<section class="max-w-4xl mx-auto px-4 py-16">
		<div class="flex items-center justify-between mb-8">
			<h2 class="text-2xl font-heading font-bold text-primary">Mettiti alla prova</h2>
			<a href="/quiz" class="text-sm text-muted hover:text-primary transition">Tutti i quiz →</a>
		</div>
		<div class="grid gap-6 sm:grid-cols-2">
			{#each data.featuredQuizzes as quiz}
				<QuizCard {quiz} />
			{/each}
		</div>
	</section>
{/if}

<!-- CTA -->
<section class="bg-primary text-white">
	<div class="max-w-4xl mx-auto px-4 py-16 text-center">
		<h2 class="text-2xl font-heading font-bold mb-3">Vuoi saperne di più?</h2>
		<p class="text-white/70 mb-8 max-w-xl mx-auto">
			Esplora tutti i nostri articoli, ciascuno basato su fonti scientifiche e aggiornato
			regolarmente.
		</p>
		<a
			href="/wiki"
			class="inline-block px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition"
		>
			Vai alla Wiki
		</a>
	</div>
</section>
