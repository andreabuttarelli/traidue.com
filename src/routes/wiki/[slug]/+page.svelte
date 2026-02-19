<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import TOC from '$lib/components/wiki/TOC.svelte';

	let { data } = $props();

	let articleSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.metadata.title,
		description: data.metadata.description,
		datePublished: data.metadata.date,
		dateModified: data.metadata.updated || data.metadata.date,
		author: { '@type': 'Organization', name: 'Tra i Due' },
		publisher: { '@type': 'Organization', name: 'Tra i Due' }
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
	title={data.metadata.title}
	description={data.metadata.description}
	url="https://www.traidue.com/wiki/{data.metadata.slug}"
	image="https://www.traidue.com/images/wiki/{data.metadata.slug}.png"
	type="article"
	article={{
		publishedTime: data.metadata.date,
		modifiedTime: data.metadata.updated,
		section: data.metadata.category,
		tags: data.metadata.tags
	}}
/>

<StructuredData schema={articleSchema} />

{#if faqSchema}
	<StructuredData schema={faqSchema} />
{/if}

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
	<TOC />
	<div class="flex-1 min-w-0">
		<data.Content />
	</div>
</div>
