<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { SITE } from '$lib/site';

	let { data } = $props();

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `${SITE.url}${localizeHref('/giovani', { locale: l })}`])
	);

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: m.youth_seo_title(),
		description: m.youth_seo_desc(),
		url: `${SITE.url}/giovani`,
		inLanguage: 'it',
		isPartOf: {
			'@type': 'WebSite',
			name: SITE.brand,
			url: SITE.url
		}
	};
</script>

<SEO
	title={m.youth_seo_title()}
	description={m.youth_seo_desc()}
	url={`${SITE.url}/giovani`}
	{alternateUrls}
/>

<StructuredData schema={pageSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6 max-w-3xl">
			{m.youth_hero_title()}
		</h1>
		<p class="text-base sm:text-lg text-primary/80 mb-3 max-w-2xl leading-relaxed">
			{m.youth_hero_subtitle()}
		</p>
		<p class="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
			{m.youth_hero_desc()}
		</p>
	</div>
</section>

<!-- Articoli -->
{#if data.articles.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">{m.youth_first_steps_title()}</h2>
			<p class="text-muted text-sm mb-6 sm:mb-8">{m.youth_first_steps_desc()}</p>
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
				<p class="text-sm text-muted uppercase tracking-wide mb-2">{m.quiz_cta_label()}</p>
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">{m.quiz_cta_title()}</h2>
				<p class="text-muted text-sm mb-6 max-w-lg">
					{m.quiz_cta_desc({ count: data.featuredQuiz.questions.length })}
				</p>
				<a
					href={localizeHref('/quiz/' + data.featuredQuiz.slug)}
					class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
				>
					{m.quiz_cta_start()} &rarr;
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- CTA Newsletter -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 text-center flex flex-col items-center">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">{m.youth_cta_title()}</h2>
		<p class="text-muted mb-6 max-w-lg">
			{m.youth_cta_desc()}
		</p>
		<a href={localizeHref('/newsletter')} class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition">
			{m.youth_cta_newsletter()} &rarr;
		</a>
	</div>
</section>

<!-- Esplora tutto -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16 text-center">
		<p class="text-muted mb-4">{m.youth_explore_all()}</p>
		<a href={localizeHref('/wiki')} class="text-sm text-primary font-medium hover:underline transition">{m.youth_explore_wiki()} &rarr;</a>
	</div>
</section>
