<script lang="ts">
	let theme = $state<'light' | 'dark' | 'system'>('system');

	function getSystemTheme(): 'light' | 'dark' {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(t: 'light' | 'dark' | 'system') {
		const resolved = t === 'system' ? getSystemTheme() : t;
		document.documentElement.classList.toggle('dark', resolved === 'dark');
	}

	function cycle() {
		const order: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
		const next = order[(order.indexOf(theme) + 1) % order.length];
		theme = next;
		localStorage.setItem('theme', next);
		applyTheme(next);
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
		return () => mq.removeEventListener('change', handler);
	});

	const icons = { light: '☀', dark: '●', system: '◐' };
</script>

<button
	onclick={cycle}
	class="w-8 h-8 flex items-center justify-center text-muted hover:text-primary transition text-sm"
	aria-label="Cambia tema: {theme}"
	title={theme === 'light' ? 'Tema chiaro' : theme === 'dark' ? 'Tema scuro' : 'Tema di sistema'}
>
	{icons[theme]}
</button>
