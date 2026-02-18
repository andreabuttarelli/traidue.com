<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import QuizPlayer from '$lib/components/quiz/QuizPlayer.svelte';

	let { data } = $props();

	const quizSchema = {
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
	};
</script>

<SEO
	title={data.quiz.title}
	description={data.quiz.description}
	url="https://traidue.com/quiz/{data.quiz.slug}"
/>

<StructuredData schema={quizSchema} />

<div class="w-full px-6 lg:px-12 py-12">
	<Breadcrumb
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Quiz', href: '/quiz' },
			{ label: data.quiz.title }
		]}
	/>

	<QuizPlayer quiz={data.quiz} />
</div>
