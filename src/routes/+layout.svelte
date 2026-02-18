<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-bg text-text font-sans">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
