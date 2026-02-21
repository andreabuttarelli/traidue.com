<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import CookieBanner from '$lib/components/ui/CookieBanner.svelte';
	import ChatWidget from '$lib/components/ui/ChatWidget.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-bg text-text font-sans">
	<Navbar articles={data.allArticles} quizzes={data.allQuizzes} />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
<CookieBanner />
<ChatWidget />
