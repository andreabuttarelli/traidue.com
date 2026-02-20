<script lang="ts">
	import { goto } from '$app/navigation';
	import type { WikiArticle } from '$lib/utils/wiki';

	let {
		value = $bindable(''),
		articles = [],
		quizzes = [],
		placeholder = 'Cerca...',
		size = 'base',
		onsubmit
	}: {
		value?: string;
		articles?: WikiArticle[];
		quizzes?: { slug: string; title: string; description: string; category: string }[];
		placeholder?: string;
		size?: 'sm' | 'base';
		onsubmit?: () => void;
	} = $props();

	let focused = $state(false);
	let selectedIndex = $state(-1);
	let inputEl: HTMLInputElement | undefined = $state();

	let suggestions = $derived.by(() => {
		const q = value.toLowerCase().trim();
		if (q.length < 2) return [];

		const articleResults = articles
			.filter(
				(a) =>
					a.title.toLowerCase().includes(q) ||
					a.description.toLowerCase().includes(q) ||
					a.tags.some((t) => t.toLowerCase().includes(q))
			)
			.slice(0, 5)
			.map((a) => ({ type: 'article' as const, slug: a.slug, title: a.title, category: a.category }));

		const quizResults = quizzes
			.filter(
				(qz) =>
					qz.title.toLowerCase().includes(q) ||
					qz.description.toLowerCase().includes(q)
			)
			.slice(0, 2)
			.map((qz) => ({ type: 'quiz' as const, slug: qz.slug, title: qz.title, category: qz.category }));

		return [...articleResults, ...quizResults];
	});

	let showSuggestions = $derived(focused && suggestions.length > 0);

	function handleSubmit() {
		if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
			navigateTo(suggestions[selectedIndex]);
			return;
		}
		onsubmit?.();
	}

	function navigateTo(item: (typeof suggestions)[0]) {
		if (item.type === 'quiz') {
			goto(`/quiz/${item.slug}`);
		} else {
			goto(`/wiki/${item.slug}`);
		}
		value = '';
		focused = false;
		inputEl?.blur();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!showSuggestions) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (e.key === 'Escape') {
			focused = false;
		}
	}

	function handleFocus() {
		focused = true;
		selectedIndex = -1;
	}

	function handleBlur() {
		// Delay to allow click on suggestion
		setTimeout(() => {
			focused = false;
		}, 150);
	}

	const sizeClasses = $derived(
		size === 'sm'
			? 'px-4 py-1.5 text-sm pr-9'
			: 'px-4 sm:px-5 py-2.5 sm:py-3 text-base sm:text-lg pr-12'
	);

	const buttonClasses = $derived(
		size === 'sm'
			? 'w-6 h-6 right-1.5'
			: 'w-8 h-8 sm:w-9 sm:h-9 right-1.5 sm:right-2'
	);

	const iconSize = $derived(size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4');
</script>

<div class="relative w-full">
	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
	>
		<div class="relative">
			<input
				bind:this={inputEl}
				type="text"
				{placeholder}
				bind:value
				onfocus={handleFocus}
				onblur={handleBlur}
				onkeydown={handleKeydown}
				class="w-full {sizeClasses} rounded-full border border-border bg-transparent dark:bg-white/5 text-text shadow-sm focus:outline-none focus:border-primary"
			/>
			{#if value.trim()}
				<button
					type="submit"
					class="absolute top-1/2 -translate-y-1/2 {buttonClasses} rounded-full bg-primary text-bg flex items-center justify-center hover:bg-primary/80 transition"
					aria-label="Cerca"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class={iconSize}>
						<path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
					</svg>
				</button>
			{/if}
		</div>
	</form>

	{#if showSuggestions}
		<div class="absolute left-0 right-0 top-full mt-2 bg-bg border border-border rounded-xl shadow-lg overflow-hidden z-50">
			{#each suggestions as item, i}
				<button
					class="w-full text-left px-4 py-3 transition-colors {i === selectedIndex ? 'bg-primary/5' : 'hover:bg-primary/5'}"
					onmousedown={() => navigateTo(item)}
				>
					<span class="text-sm text-primary truncate block">{item.title}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
