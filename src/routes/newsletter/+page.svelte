<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { SITE } from '$lib/site';
	import { onMount } from 'svelte';

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `${SITE.url}${localizeHref('/newsletter', { locale: l })}`])
	);

	onMount(() => {
		if (typeof (window as any).Tally !== 'undefined') {
			(window as any).Tally.loadEmbeds();
		}
	});
</script>

<svelte:head>
	<script src="https://tally.so/widgets/embed.js"></script>
</svelte:head>

<SEO
	title={m.newsletter_page_title()}
	description={m.newsletter_seo_desc({ brand: SITE.brand })}
	url={`${SITE.url}/newsletter`}
	{alternateUrls}
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.newsletter_page_title() }]} />

	<header class="mb-10 sm:mb-16 max-w-xl">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{m.newsletter_title()}</h1>
		<p class="text-lg text-muted leading-relaxed">
			{m.newsletter_desc()}
		</p>
	</header>

	<div class="max-w-xl overflow-hidden rounded-xl p-6" style="background-color: #222222;">
		<iframe
			data-tally-src="https://tally.so/embed/Y556PN?alignLeft=1&hideTitle=1&dynamicHeight=1"
			loading="lazy"
			width="100%"
			height="952"
			frameborder="0"
			marginheight="0"
			marginwidth="0"
			title={SITE.brand}
		></iframe>
	</div>
</div>
