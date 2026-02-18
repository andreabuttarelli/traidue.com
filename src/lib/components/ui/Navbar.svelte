<script lang="ts">
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/wiki', label: 'Wiki' },
		{ href: '/quiz', label: 'Quiz' },
		{ href: '/chi-siamo', label: 'Chi Siamo' }
	];

	function isActive(href: string): boolean {
		const pathname = page.url.pathname;
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 bg-bg border-b border-border">
	<div class="w-full px-6 lg:px-12">
		<div class="flex items-center justify-between h-14">
			<a href="/" class="font-heading text-xl font-bold text-primary tracking-tight" onclick={closeMenu}>
				Tra i Due
			</a>

			<div class="hidden sm:flex items-center gap-8">
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

			<button
				class="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
				onclick={toggleMenu}
				aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
				aria-expanded={mobileMenuOpen}
			>
				<span
					class="block w-5 h-0.5 bg-primary transition-all duration-300 origin-center {mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}"
				></span>
				<span
					class="block w-5 h-0.5 bg-primary transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : ''}"
				></span>
				<span
					class="block w-5 h-0.5 bg-primary transition-all duration-300 origin-center {mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}"
				></span>
			</button>
		</div>

		<div
			class="sm:hidden overflow-hidden transition-all duration-300 ease-in-out {mobileMenuOpen
				? 'max-h-60 opacity-100 pb-4'
				: 'max-h-0 opacity-0'}"
		>
			<div class="flex flex-col gap-1 pt-2 border-t border-border">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={closeMenu}
						class="px-3 py-2.5 text-sm transition-colors {isActive(link.href)
							? 'text-primary'
							: 'text-muted hover:text-primary'}"
					>
						{link.label}
					</a>
				{/each}
				<div class="px-3 py-2">
					<ThemeToggle />
				</div>
			</div>
		</div>
	</div>
</nav>
