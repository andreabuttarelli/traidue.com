<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import TOC from '$lib/components/wiki/TOC.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';

	let { data } = $props();

	function extractCitations(sources: { title: string; url: string; year?: number }[]) {
		return sources.filter((s) => s.title.includes(' - ')).map((s) => {
			const [rawAuthor, ...rest] = s.title.split(' - ');
			const author = rawAuthor.replace(/\s+et al\.?$/, '').trim();
			const name = rest.join(' - ').trim();
			return { author, name, url: s.url, year: s.year };
		}).filter((c) => c.author.length > 3 && c.author.length < 60);
	}

	let citations = $derived(extractCitations(data.metadata.sources ?? []));

	let articleSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.metadata.title,
		description: data.metadata.description,
		url: `https://www.traidue.com/wiki/${data.metadata.slug}`,
		image: `https://www.traidue.com/images/wiki/${data.metadata.slug}.webp`,
		inLanguage: 'it',
		datePublished: data.metadata.date,
		dateModified: data.metadata.updated || data.metadata.date,
		author: {
			'@type': 'Person',
			name: 'Andrea Buttarelli',
			url: 'https://www.traidue.com/chi-siamo',
			jobTitle: 'Founder',
			sameAs: [
				'https://www.instagram.com/andrea_buttarelli',
				'https://www.linkedin.com/in/andreabuttarelli/',
				'https://github.com/andreabuttarelli'
			]
		},
		publisher: {
			'@type': 'Organization',
			name: 'Tra i Due',
			url: 'https://www.traidue.com',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.traidue.com/favicon.png'
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://www.traidue.com/wiki/${data.metadata.slug}`
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
	url="https://www.traidue.com/wiki/{data.metadata.slug}"
	image="https://www.traidue.com/images/wiki/{data.metadata.slug}.webp"
	type="article"
	article={{
		publishedTime: data.metadata.date,
		modifiedTime: data.metadata.updated,
		section: data.metadata.category,
		tags: data.metadata.tags
	}}
/>

<StructuredData schema={articleSchema} />

<StructuredData schema={{
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.traidue.com' },
		{ '@type': 'ListItem', position: 2, name: 'Wiki', item: 'https://www.traidue.com/wiki' },
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
			<nav class="mt-12 pt-8 border-t border-border" aria-label="Articoli correlati">
				<h2 class="text-xl font-heading font-semibold text-primary mb-6">Continua a leggere</h2>
				<div class="grid sm:grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
					{#each data.relatedArticles as article}
						<ArticleCard {article} />
					{/each}
				</div>
			</nav>
		{/if}
	</div>
</div>
