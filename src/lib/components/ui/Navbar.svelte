<script lang="ts">
	import { page } from '$app/state';

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

<nav class="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
	<div class="max-w-5xl mx-auto px-4 sm:px-6">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="font-heading text-xl font-bold text-primary tracking-tight hover:text-accent transition-colors" onclick={closeMenu}>
				Tra i Due
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden sm:flex items-center gap-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-sm font-medium transition-colors {isActive(link.href)
							? 'text-primary border-b-2 border-accent pb-0.5'
							: 'text-muted hover:text-primary'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Hamburger Button -->
			<button
				class="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-border/50 transition-colors"
				onclick={toggleMenu}
				aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
				aria-expanded={mobileMenuOpen}
			>
				<span
					class="block w-5 h-0.5 bg-text transition-all duration-300 origin-center {mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}"
				></span>
				<span
					class="block w-5 h-0.5 bg-text transition-all duration-300 {mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}"
				></span>
				<span
					class="block w-5 h-0.5 bg-text transition-all duration-300 origin-center {mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}"
				></span>
			</button>
		</div>

		<!-- Mobile Menu -->
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
						class="px-3 py-2.5 rounded-md text-sm font-medium transition-colors {isActive(link.href)
							? 'text-primary bg-accent/10 border-l-2 border-accent'
							: 'text-muted hover:text-primary hover:bg-border/30'}"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>
