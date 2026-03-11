<script lang="ts">
	import { locales, getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/state';

	const localeLabels: Record<string, string> = {
		it: 'IT',
		en: 'EN',
		es: 'ES',
		pt: 'PT'
	};

	let open = $state(false);

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}
</script>

<div class="relative">
	<button
		onclick={toggle}
		class="flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors"
		aria-label="Change language"
		aria-expanded={open}
	>
		{localeLabels[getLocale()] ?? getLocale().toUpperCase()}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
			<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
		</svg>
	</button>
	{#if open}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fixed inset-0 z-40" onclick={close} onkeydown={(e) => e.key === 'Escape' && close()}></div>
		<div class="absolute right-0 top-full mt-1 z-50 bg-bg border border-border rounded-lg shadow-md py-1 min-w-[80px]">
			{#each locales as locale}
				<a
					href={localizeHref(page.url.pathname, { locale })}
					data-sveltekit-reload
					onclick={close}
					class="block px-3 py-1.5 text-sm transition-colors {locale === getLocale() ? 'text-primary font-medium' : 'text-muted hover:text-primary'}"
				>
					{localeLabels[locale] ?? locale.toUpperCase()}
				</a>
			{/each}
		</div>
	{/if}
</div>
