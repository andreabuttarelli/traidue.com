<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import QuizCard from '$lib/components/quiz/QuizCard.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	let { data } = $props();

	const alternateUrls = Object.fromEntries(
		locales.map((l) => [l, `https://www.traidue.com${localizeHref('/quiz', { locale: l })}`])
	);
</script>

<SEO
	title={m.quiz_page_title()}
	description={m.quiz_page_desc()}
	url="https://www.traidue.com{localizeHref('/quiz')}"
	{alternateUrls}
/>

<div class="w-full px-4 sm:px-6 lg:px-12">
	<div class="py-10 sm:py-16 lg:py-20 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-3">{m.quiz_page_title()}</h1>
		<p class="text-muted mb-0 max-w-md">
			{m.quiz_page_subtitle()}
		</p>
	</div>

	{#if data.quizzes.length > 0}
		<div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
			{#each data.quizzes as quiz}
				<QuizCard {quiz} />
			{/each}
		</div>
	{:else}
		<p class="text-muted py-12">{m.quiz_no_quizzes()}</p>
	{/if}
</div>
