<script lang="ts">
	let { variant = 'dropdown' }: { variant?: 'dropdown' | 'segmented' } = $props();

	let theme = $state<'light' | 'dark' | 'system'>('system');
	let open = $state(false);

	function getSystemTheme(): 'light' | 'dark' {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(t: 'light' | 'dark' | 'system') {
		const resolved = t === 'system' ? getSystemTheme() : t;
		document.documentElement.classList.toggle('dark', resolved === 'dark');
	}

	function select(t: 'light' | 'dark' | 'system') {
		theme = t;
		localStorage.setItem('theme', t);
		applyTheme(t);
		open = false;
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.theme-toggle')) open = false;
	}

	$effect(() => {
		const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
		theme = saved ?? 'system';
		applyTheme(theme);

		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => {
			if (theme === 'system') applyTheme('system');
		};
		mq.addEventListener('change', handler);
		document.addEventListener('click', handleClickOutside);
		return () => {
			mq.removeEventListener('change', handler);
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const icons = { light: '☀', dark: '●', system: '◐' };
	const labels = { light: 'Chiaro', dark: 'Scuro', system: 'Sistema' };
	const options: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
</script>

{#if variant === 'segmented'}
	<div class="flex rounded-full border border-border overflow-hidden w-full">
		{#each options as opt}
			<button
				onclick={() => select(opt)}
				class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm transition {theme === opt ? 'bg-primary text-bg' : 'text-muted hover:text-primary'}"
			>
				<span>{icons[opt]}</span>
				<span>{labels[opt]}</span>
			</button>
		{/each}
	</div>
{:else}
	<div class="relative theme-toggle">
		<button
			onclick={() => (open = !open)}
			class="w-8 h-8 flex items-center justify-center text-muted hover:text-primary transition text-sm"
			aria-label="Cambia tema: {theme}"
			aria-expanded={open}
		>
			{icons[theme]}
		</button>

		{#if open}
			<div class="absolute right-0 top-full mt-2 py-1 rounded-xl border border-border bg-bg shadow-md min-w-32 z-50">
				{#each options as opt}
					<button
						onclick={() => select(opt)}
						class="w-full flex items-center gap-3 px-4 py-2 text-sm transition {theme === opt ? 'text-primary' : 'text-muted hover:text-primary'}"
					>
						<span class="w-5 text-center">{icons[opt]}</span>
						<span>{labels[opt]}</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
