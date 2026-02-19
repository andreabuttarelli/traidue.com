<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { onMount } from 'svelte';

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
	title="Newsletter"
	description="Iscriviti alla newsletter di Tra i Due: nuovi articoli, aggiornamenti e approfondimenti sulle tematiche trans. Niente spam, solo fatti."
	url="https://www.traidue.com/newsletter"
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Newsletter' }]} />

	<header class="mb-10 sm:mb-16 max-w-xl">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Resta aggiornato</h1>
		<p class="text-lg text-muted leading-relaxed">
			Nuovi articoli e aggiornamenti sulle tematiche trans. Niente spam, solo fatti.
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
			title="Tra i Due"
		></iframe>
	</div>
</div>
