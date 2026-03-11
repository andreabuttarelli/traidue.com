<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	let { data } = $props();

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `https://www.traidue.com${localizeHref('/famiglie', { locale: l })}`])
	);

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: m.family_seo_title(),
		description: m.family_seo_desc(),
		url: 'https://www.traidue.com/famiglie',
		inLanguage: 'it',
		isPartOf: {
			'@type': 'WebSite',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		}
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: m.family_faq_1_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_1_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_2_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_2_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_3_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_3_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_4_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_4_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_5_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_5_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_6_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_6_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_7_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_7_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_8_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_8_a() }
			},
			{
				'@type': 'Question',
				name: m.family_faq_9_q(),
				acceptedAnswer: { '@type': 'Answer', text: m.family_faq_9_a() }
			}
		]
	};
</script>

<SEO
	title={m.family_seo_title()}
	description={m.family_seo_desc()}
	url="https://www.traidue.com/famiglie"
	{alternateUrls}
/>

<StructuredData schema={pageSchema} />
<StructuredData schema={faqSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6 max-w-3xl">
			{m.family_hero_title()}
		</h1>
		<p class="text-base sm:text-lg text-primary/80 mb-3 max-w-2xl leading-relaxed">
			{m.family_hero_subtitle()}
		</p>
		<p class="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
			{m.family_hero_desc()}
		</p>
	</div>
</section>

<!-- Primi passi -->
{#if data.primiPassi.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">{m.family_first_steps_title()}</h2>
			<p class="text-muted text-sm mb-6 sm:mb-8">{m.family_first_steps_desc()}</p>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.primiPassi as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- FAQ -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">{m.family_faq_title()}</h2>
		<p class="text-muted text-sm mb-6 sm:mb-8">{m.family_faq_desc()}</p>
		<div class="grid sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-8">
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_1_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_1_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_2_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_2_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_3_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_3_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_4_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_4_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_5_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_5_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_6_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_6_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_7_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_7_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_8_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_8_a()}</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{m.family_faq_9_q()}</h3>
				<p class="text-muted text-sm leading-relaxed">{m.family_faq_9_a()}</p>
			</div>
		</div>
	</div>
</section>

<!-- Approfondimenti -->
{#if data.approfondimenti.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">{m.family_deep_dive_title()}</h2>
			<p class="text-muted text-sm mb-6 sm:mb-8">{m.family_deep_dive_desc()}</p>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.approfondimenti as article}
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
					href="/quiz/{data.featuredQuiz.slug}"
					class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
				>
					{m.quiz_cta_start()} &rarr;
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 text-center flex flex-col items-center">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">{m.family_cta_title()}</h2>
		<p class="text-muted mb-6 max-w-lg">
			{m.family_cta_desc()}
		</p>
		<a href="/newsletter" class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition">
			{m.family_cta_newsletter()} &rarr;
		</a>
	</div>
</section>

<!-- Esplora tutto -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16 text-center">
		<p class="text-muted mb-4">{m.family_explore_all()}</p>
		<a href="/wiki" class="text-sm text-primary font-medium hover:underline transition">{m.family_explore_wiki()} &rarr;</a>
	</div>
</section>
