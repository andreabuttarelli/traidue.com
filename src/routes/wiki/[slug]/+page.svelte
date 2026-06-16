<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import TOC from '$lib/components/wiki/TOC.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { getLocale, localizeHref, locales } from '$lib/paraglide/runtime';

	let { data } = $props();

	const lang = $derived(getLocale());
	const localeMap: Record<string, string> = { it: 'it-IT', en: 'en-US', es: 'es-ES', pt: 'pt-BR' };

	const alternateUrls = $derived(
		Object.fromEntries(
			Object.entries(data.alternates ?? {}).map(([l, path]) => [
				l,
				`${SITE.url}${path}`
			])
		)
	);

	function extractCitations(sources: { title: string; url: string; year?: number }[]) {
		return sources.filter((s) => s.title.includes(' - ')).map((s) => {
			const [rawAuthor, ...rest] = s.title.split(' - ');
			const author = rawAuthor.replace(/\s+et al\.?$/, '').trim();
			const name = rest.join(' - ').trim();
			return { author, name, url: s.url, year: s.year };
		}).filter((c) => c.author.length > 3 && c.author.length < 60);
	}

	let citations = $derived(extractCitations(data.metadata.sources ?? []));

	let ogImage = $derived(
		`${SITE.url}${data.metadata.image ?? `/images/wiki/${data.metadata.translationKey ?? data.metadata.slug}.webp`}`
	);

	let articleSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.metadata.title,
		description: data.metadata.description,
		url: `${SITE.url}${localizeHref('/wiki/' + data.metadata.slug)}`,
		image: ogImage,
		inLanguage: localeMap[lang] ?? 'it-IT',
		datePublished: data.metadata.date,
		dateModified: data.metadata.updated || data.metadata.date,
		author: {
			'@type': 'Person',
			name: 'Andrea Buttarelli',
			url: `${SITE.url}/chi-siamo`,
			jobTitle: 'Founder',
			sameAs: [
				'https://www.instagram.com/andrea_buttarelli',
				'https://www.linkedin.com/in/andreabuttarelli/',
				'https://github.com/andreabuttarelli'
			]
		},
		publisher: {
			'@type': 'Organization',
			name: SITE.brand,
			url: SITE.url,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE.url}/favicon.png`
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE.url}${localizeHref('/wiki/' + data.metadata.slug)}`
		},
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: ['article header h1', '.prose > p:first-of-type']
		},
		about: data.metadata.tags?.length
			? data.metadata.tags.map((t: string) => ({ '@type': 'Thing', name: t }))
			: undefined,
		...(citations.length > 0 && {
			citation: citations.map((c) => ({
				'@type': 'ScholarlyArticle',
				name: c.name,
				url: c.url,
				...(c.year && { datePublished: String(c.year) }),
				author: { '@type': 'Person', name: c.author }
			}))
		})
	});

	let faqSchema = $derived(
		data.metadata.faq?.length
			? {
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity: data.metadata.faq.map((item: { question: string; answer: string }) => ({
						'@type': 'Question',
						name: item.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: item.answer
						}
					}))
				}
			: null
	);
</script>

<SEO
	title={data.metadata.seoTitle || data.metadata.title}
	description={data.metadata.description}
	url={`${SITE.url}${localizeHref('/wiki/' + data.metadata.slug)}`}
	image={ogImage}
	type="article"
	article={{
		publishedTime: data.metadata.date,
		modifiedTime: data.metadata.updated,
		section: data.metadata.category,
		tags: data.metadata.tags
	}}
	{alternateUrls}
/>

<StructuredData schema={articleSchema} />

<StructuredData schema={{
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: m.common_home(), item: `${SITE.url}${localizeHref('/')}` },
		{ '@type': 'ListItem', position: 2, name: 'Wiki', item: `${SITE.url}${localizeHref('/wiki')}` },
		{ '@type': 'ListItem', position: 3, name: data.metadata.title }
	]
}} />

{#if faqSchema}
	<StructuredData schema={faqSchema} />
{/if}

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
	<TOC />
	<div class="flex-1 min-w-0">
		<data.Content />

		{#if data.relatedArticles.length > 0}
			<nav class="mt-12 pt-8 border-t border-border" aria-label={m.wiki_related_aria()}>
				<h2 class="text-xl font-heading font-semibold text-primary mb-6">{m.wiki_related_title()}</h2>
				<div class="grid sm:grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
					{#each data.relatedArticles as article}
						<ArticleCard {article} />
					{/each}
				</div>
			</nav>
		{/if}
	</div>
</div>
