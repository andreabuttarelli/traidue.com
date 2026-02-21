<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import SearchInput from '$lib/components/ui/SearchInput.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';

	let { data } = $props();

	let heroSearch = $state('');
	let trackEl: HTMLDivElement | undefined;
	let paused = false;
	let offset = 0;
	let totalWidth = 0;

	function initAutoScroll(node: HTMLDivElement) {
		trackEl = node;
		let raf: number;
		function measure() {
			totalWidth = node.scrollWidth / 2;
		}
		measure();
		function tick() {
			if (!paused && totalWidth > 0) {
				offset -= 0.5;
				if (Math.abs(offset) >= totalWidth) offset += totalWidth;
				node.style.transform = `translateX(${offset}px)`;
			}
			raf = requestAnimationFrame(tick);
		}
		raf = requestAnimationFrame(tick);
		const ro = new ResizeObserver(measure);
		ro.observe(node);
		return { destroy() { cancelAnimationFrame(raf); ro.disconnect(); } };
	}

	function scrollCarousel(dir: number) {
		paused = true;
		if (!trackEl || totalWidth <= 0) return;
		offset += dir * 400;
		if (Math.abs(offset) >= totalWidth) offset += totalWidth;
		if (offset > 0) offset -= totalWidth;
		trackEl.style.transition = 'transform 0.4s ease';
		trackEl.style.transform = `translateX(${offset}px)`;
		setTimeout(() => { if (trackEl) trackEl.style.transition = ''; }, 400);
	}

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
	title="Scienza, storie e cultura trans"
	description="Tra i Due è la risorsa in italiano più completa sulle tematiche trans: fatti scientifici, storie di successo e cultura. {data.stats.articles} articoli, {data.stats.sources} fonti peer-reviewed."
	url="https://www.traidue.com"
/>

<StructuredData schema={websiteSchema} />
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

<!-- Miti e Quiz -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">Ecco cosa dicono. Ecco cosa dice la scienza.</h2>
		<p class="text-muted text-sm mb-6 sm:mb-8">I miti più diffusi, smontati con le evidenze.</p>
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Colonna miti -->
			<div class="grid gap-3 sm:gap-4 content-start">
				{#each myths as myth}
					<div class="p-5 rounded-xl border border-border">
						<p class="text-sm font-medium text-muted line-through mb-3">&laquo;{myth.claim}&raquo;</p>
						<p class="text-sm text-primary leading-relaxed">{myth.truth}</p>
					</div>
				{/each}
				<a href="/wiki/miti-comuni-persone-trans" class="text-sm text-muted hover:text-primary transition mt-1">Leggi tutti i falsi miti smontati &rarr;</a>
			</div>
			<!-- Colonna quiz -->
			{#if data.featuredQuizzes.length > 0}
				<div class="flex flex-col justify-center p-6 sm:p-8 rounded-xl border border-border">
					<p class="text-sm text-muted uppercase tracking-wide mb-2">Mettiti alla prova</p>
					<h3 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">E tu quanto ne sai?</h3>
					<p class="text-muted text-sm mb-6">
						{data.featuredQuizzes[0].questions.length} domande, risposte basate sulla ricerca scientifica. Scopri se sai distinguere i fatti dai miti.
					</p>
					<a
						href="/quiz/{data.featuredQuizzes[0].slug}"
						class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition self-start"
					>
						Inizia il quiz &rarr;
					</a>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Da leggere -->
{#if data.featuredArticles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="flex items-center justify-between mb-4 sm:mb-6">
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Da leggere</h2>
				<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Tutti gli articoli &rarr;</a>
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
		</div>
	</section>
{/if}

<!-- Persone -->
{#if data.personArticles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<div class="text-center mb-8 sm:mb-10">
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Imprenditori, artisti, avvocati, scienziati. E molto altro.</h2>
				<p class="text-muted max-w-lg mx-auto mb-4">
					Le persone trans stanno ricoprendo ruoli chiave nella società. Noi raccontiamo le loro storie, con i fatti.
				</p>
				<a href="/wiki?category=persone" class="text-sm text-primary font-medium hover:underline transition">Inizia dalla Wiki &rarr;</a>
			</div>
			<div
				class="relative overflow-hidden"
				onmouseenter={() => { paused = true; }}
				onmouseleave={() => { paused = false; }}
			>
				<button
					onclick={() => scrollCarousel(1)}
					class="absolute left-2 top-[37%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-bg/80 backdrop-blur border border-border shadow-sm hover:border-primary/30 transition text-primary text-lg"
					aria-label="Scorri a sinistra"
				>
					&lsaquo;
				</button>
				<button
					onclick={() => scrollCarousel(-1)}
					class="absolute right-2 top-[37%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-bg/80 backdrop-blur border border-border shadow-sm hover:border-primary/30 transition text-primary text-lg"
					aria-label="Scorri a destra"
				>
					&rsaquo;
				</button>
				<div
					use:initAutoScroll
					class="flex gap-6 pb-4 will-change-transform"
				>
					{#each [...data.personArticles, ...data.personArticles] as article}
						<a
							href="/wiki/{article.slug}"
							class="group flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[540px] lg:w-[640px]"
						>
							{#if article.image}
								<div class="aspect-[16/9] overflow-hidden rounded-xl mb-3">
									<img
										src={article.image.replace(/\.webp$/, '-thumb.webp')}
										alt={article.title}
										width="672"
										height="378"
										decoding="async"
										loading="lazy"
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
							{/if}
							<h3 class="text-base font-heading font-semibold text-primary mb-1.5 group-hover:underline">{article.title}</h3>
							<p class="text-muted text-sm leading-relaxed line-clamp-2">{article.description}</p>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}
