<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import SearchInput from '$lib/components/ui/SearchInput.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { getLocale, locales, localizeHref } from '$lib/paraglide/runtime';

	let { data } = $props();

	let heroSearch = $state('');

	function handleSearch() {
		const q = heroSearch.trim();
		if (q) {
			goto(localizeHref('/wiki') + `?q=${encodeURIComponent(q)}`);
		}
	}

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `${SITE.url}${localizeHref('/', { locale: l })}`])
	);

	const categories = $derived([
		{ name: m.cat_terminologia(), href: '/wiki?category=terminologia' },
		{ name: m.cat_scienza(), href: '/wiki?category=scienza' },
		{ name: m.cat_percorsi(), href: '/wiki?category=percorsi' },
		{ name: m.cat_cultura(), href: '/wiki?category=cultura' },
		{ name: m.cat_persone(), href: '/wiki?category=persone' }
	]);

	const myths = $derived([
		{ claim: m.myth_1_claim(), truth: m.myth_1_truth() },
		{ claim: m.myth_2_claim(), truth: m.myth_2_truth() },
		{ claim: m.myth_3_claim(), truth: m.myth_3_truth() }
	]);

	const websiteSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE.brand,
		url: SITE.url,
		description: m.home_seo_desc({ articles: data.stats.articles, sources: data.stats.sources, brand: SITE.brand }),
		inLanguage: getLocale(),
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE.url}/wiki?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	});

	const organizationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SITE.brand,
		url: SITE.url,
		logo: {
			'@type': 'ImageObject',
			url: `${SITE.url}/favicon.png`
		},
		description: m.home_seo_desc({ articles: data.stats.articles, sources: data.stats.sources, brand: SITE.brand }),
		email: 'andrea@teta.so',
		founder: {
			'@type': 'Person',
			name: 'Andrea Buttarelli',
			url: `${SITE.url}/chi-siamo`
		},
		sameAs: [
			SITE.repo,
			SITE.instagram
		],
		inLanguage: getLocale()
	});

	const homeFaqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: myths.map((myth) => ({
			'@type': 'Question',
			name: myth.claim,
			acceptedAnswer: {
				'@type': 'Answer',
				text: myth.truth
			}
		}))
	});
</script>

<SEO
	title={m.home_seo_title({ brand: SITE.brand })}
	description={m.home_seo_desc({ articles: data.stats.articles, sources: data.stats.sources, brand: SITE.brand })}
	url={SITE.url}
	{alternateUrls}
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
			{m.home_hero_subtitle()}
		</p>
		<p class="text-sm sm:text-base text-muted mb-6 sm:mb-8 max-w-xl leading-relaxed">
			{m.home_hero_desc({ articles: data.stats.articles, sources: data.stats.sources })}
		</p>
		<div class="mb-6 sm:mb-8 w-full max-w-xl">
			<SearchInput
				bind:value={heroSearch}
				articles={data.allArticles}
				quizzes={data.allQuizzes}
				variant="filled"
				placeholder={m.search_placeholder_hero()}
				onsubmit={handleSearch}
			/>
		</div>
		<div class="flex gap-6 text-sm">
			<a href={localizeHref('/wiki')} class="text-primary font-medium hover:underline transition">{m.home_cta_articles()} &rarr;</a>
			<a href={localizeHref('/quiz')} class="text-muted hover:text-primary transition">{m.home_cta_quiz()} &rarr;</a>
		</div>
	</div>
</section>


<!-- Personas -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
			<a href={localizeHref('/famiglie')} class="group relative rounded-2xl overflow-hidden aspect-[2/1] sm:aspect-[4/3]">
				<img
					src="/images/wiki/mio-figlio-trans-thumb.webp"
					alt={m.home_persona_family_alt()}
					width="672"
					height="378"
					loading="lazy"
					decoding="async"
					class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
					<h3 class="text-white text-base sm:text-xl font-heading font-semibold mb-0.5 sm:mb-1">{m.home_persona_family_title()}</h3>
					<p class="text-white/80 text-xs sm:text-sm leading-relaxed">{m.home_persona_family_desc()}</p>
				</div>
			</a>
			<a href={localizeHref('/giovani')} class="group relative rounded-2xl overflow-hidden aspect-[2/1] sm:aspect-[4/3]">
				<img
					src="/images/wiki/bambini-trans-thumb.webp"
					alt={m.home_persona_youth_alt()}
					width="672"
					height="378"
					loading="lazy"
					decoding="async"
					class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
					<h3 class="text-white text-base sm:text-xl font-heading font-semibold mb-0.5 sm:mb-1">{m.home_persona_youth_title()}</h3>
					<p class="text-white/80 text-xs sm:text-sm leading-relaxed">{m.home_persona_youth_desc()}</p>
				</div>
			</a>
			<a href={localizeHref('/wiki') + '?category=scienza'} class="group relative rounded-2xl overflow-hidden aspect-[2/1] sm:aspect-[4/3]">
				<img
					src="/images/wiki/basi-biologiche-identita-di-genere-thumb.webp"
					alt={m.home_persona_pro_alt()}
					width="672"
					height="378"
					loading="lazy"
					decoding="async"
					class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
					<h3 class="text-white text-base sm:text-xl font-heading font-semibold mb-0.5 sm:mb-1">{m.home_persona_pro_title()}</h3>
					<p class="text-white/80 text-xs sm:text-sm leading-relaxed">{m.home_persona_pro_desc()}</p>
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
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">{m.home_section_featured()}</h2>
			</div>
			<div class="hidden sm:flex gap-4 flex-wrap mb-8 sm:mb-12">
				<a href={localizeHref('/wiki')} class="text-sm text-primary font-medium transition">{m.wiki_filter_all()}</a>
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
				<a href={localizeHref('/wiki')} class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-bg hover:opacity-90 transition">
					{m.home_section_all_articles()} &rarr;
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
					<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-1">{m.home_section_people_title()}</h2>
					<p class="text-muted text-sm sm:text-base">
						{m.home_section_people_desc()}
					</p>
				</div>
			</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.personArticles.slice(0, 6) as article}
					<ArticleCard {article} />
				{/each}
			</div>
			<div class="flex justify-center mt-10 sm:mt-14">
				<a href={localizeHref('/wiki') + '?category=persone'} class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-bg hover:opacity-90 transition">
					{m.home_section_all_stories()} &rarr;
				</a>
			</div>
		</div>
	</section>
{/if}
