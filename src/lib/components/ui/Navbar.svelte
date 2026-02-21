<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { WikiArticle } from '$lib/utils/wiki';
	import Logo from './Logo.svelte';
	import SearchInput from './SearchInput.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let {
		articles = [],
		quizzes = []
	}: {
		articles?: WikiArticle[];
		quizzes?: { slug: string; title: string; description: string; category: string }[];
	} = $props();

	let mobileMenuOpen = $state(false);
	let navSearch = $state('');

	const navLinks = [
		{ href: '/wiki', label: 'Wiki' },
		{ href: '/editoriali', label: 'Opinioni' },
		{ href: '/quiz', label: 'Quiz' },
		{ href: '/chi-siamo', label: 'Chi Siamo' }
	];

	function isActive(href: string): boolean {
		const pathname = page.url.pathname;
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}

	function handleSearch() {
		const q = navSearch.trim();
		if (q) {
			goto(`/wiki?q=${encodeURIComponent(q)}`);
			navSearch = '';
			closeMenu();
		}
	}

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 bg-bg">
	<div class="w-full px-4 sm:px-6 lg:px-12">
		<!-- Mobile header -->
		<div class="flex sm:hidden items-center justify-between h-14">
			<a href="/" class="text-xl text-primary" onclick={closeMenu}>
				<Logo />
			</a>
			<button
				class="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
				onclick={toggleMenu}
				aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
				aria-expanded={mobileMenuOpen}
			>
				<span
					class="block w-5 h-0.5 bg-primary transition-all duration-300 origin-center {mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}"
				></span>
				<span
					class="block w-5 h-0.5 bg-primary transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : ''}"
				></span>
				<span
					class="block w-5 h-0.5 bg-primary transition-all duration-300 origin-center {mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}"
				></span>
			</button>
		</div>

		<!-- Desktop header -->
		<div class="hidden sm:grid sm:grid-cols-3 items-center h-14">
			<a href="/" class="text-xl text-primary justify-self-start" onclick={closeMenu}>
				<Logo />
			</a>

			<div class="justify-self-center w-full max-w-sm">
				<SearchInput
					bind:value={navSearch}
					{articles}
					{quizzes}
					placeholder="Cerca nel sito..."
					size="sm"
					onsubmit={handleSearch}
				/>
			</div>

			<div class="flex items-center gap-6 justify-self-end">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-sm transition-colors {isActive(link.href)
							? 'text-primary'
							: 'text-muted hover:text-primary'}"
					>
						{link.label}
					</a>
				{/each}
				<ThemeToggle />
			</div>
		</div>

	</div>

	<!-- Mobile dropdown overlay -->
	{#if mobileMenuOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="sm:hidden fixed inset-0 top-14 z-40 bg-black/20"
			onclick={closeMenu}
			onkeydown={(e) => e.key === 'Escape' && closeMenu()}
		></div>
		<div class="sm:hidden absolute left-0 right-0 top-14 z-50 bg-bg border-b border-border shadow-md">
			<div class="flex flex-col gap-1 px-4 py-4">
				<div class="py-2">
					<SearchInput
						bind:value={navSearch}
						{articles}
						{quizzes}
						placeholder="Cerca nel sito..."
						size="base"
						onsubmit={handleSearch}
					/>
				</div>
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={closeMenu}
						class="px-1 py-3 text-xl transition-colors {isActive(link.href)
							? 'text-primary font-medium'
							: 'text-muted hover:text-primary'}"
					>
						{link.label}
					</a>
				{/each}
				<div class="pt-3">
					<ThemeToggle variant="segmented" />
				</div>
			</div>
		</div>
	{/if}
</nav>
