<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import QuizPlayer from '$lib/components/quiz/QuizPlayer.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	let { data } = $props();

	const alternateUrls = $derived(
		Object.fromEntries(
			locales.map((l) => [
				l,
				`${SITE.url}${localizeHref('/quiz/' + data.quiz.slug, { locale: l })}`
			])
		)
	);

	const quizSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Quiz',
		name: data.quiz.title,
		description: data.quiz.description,
		about: {
			'@type': 'Thing',
			name: data.quiz.category
		},
		educationalAlignment: {
			'@type': 'AlignmentObject',
			alignmentType: 'educationalSubject',
			targetName: data.quiz.category
		}
	});
</script>

<SEO
	title={data.quiz.title}
	description={data.quiz.description}
	url={`${SITE.url}${localizeHref('/quiz/' + data.quiz.slug)}`}
	{alternateUrls}
/>

<StructuredData schema={quizSchema} />

<div class="w-full px-6 lg:px-12 py-12">
	<Breadcrumb
		items={[
			{ label: m.common_home(), href: localizeHref('/') },
			{ label: m.quiz_page_title(), href: localizeHref('/quiz') },
			{ label: data.quiz.title }
		]}
	/>

	<QuizPlayer quiz={data.quiz} />
</div>
