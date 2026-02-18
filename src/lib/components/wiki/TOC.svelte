<script lang="ts">
	interface TOCItem {
		id: string;
		text: string;
		level: number;
	}

	let items = $state<TOCItem[]>([]);
	let activeId = $state('');
	let isOpen = $state(false);

	$effect(() => {
		const headings = document.querySelectorAll('article h2, article h3');
		items = Array.from(headings).map((h) => ({
			id:
				h.id ||
				h.textContent
					?.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^\w-]/g, '') ||
				'',
			text: h.textContent || '',
			level: parseInt(h.tagName[1])
		}));
		headings.forEach((h, i) => {
			if (!h.id && items[i]) {
				h.id = items[i].id;
			}
		});

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{ rootMargin: '-80px 0px -70% 0px' }
		);

		headings.forEach((h) => observer.observe(h));

		return () => observer.disconnect();
	});
</script>

{#if items.length > 0}
	<!-- Mobile: collapsible -->
	<div class="lg:hidden mb-8">
		<button
			class="flex items-center gap-2 text-sm text-muted"
			onclick={() => (isOpen = !isOpen)}
		>
			<span>Indice</span>
			<span class="text-xs">{isOpen ? '▲' : '▼'}</span>
		</button>
		{#if isOpen}
			<nav class="mt-3 pl-3">
				{#each items as item}
					<a
						href="#{item.id}"
						class="flex items-center gap-2 text-sm py-1 transition {item.level === 3 ? 'pl-4' : ''} {activeId === item.id ? 'text-primary' : 'text-muted hover:text-primary'}"
					>
						<span class="w-1.5 h-1.5 shrink-0 rounded-full bg-primary transition-opacity {activeId === item.id ? 'opacity-100' : 'opacity-0'}"></span>
						{item.text}
					</a>
				{/each}
			</nav>
		{/if}
	</div>

	<!-- Desktop: sticky sidebar on the left -->
	<nav class="hidden lg:block sticky top-20 self-start w-52 shrink-0">
		<p class="text-xs uppercase tracking-wider text-muted mb-3">Indice</p>
		<div class="pl-3">
			{#each items as item}
				<a
					href="#{item.id}"
					class="flex items-center gap-2 text-sm py-1 transition {item.level === 3 ? 'pl-3' : ''} {activeId === item.id ? 'text-primary' : 'text-muted hover:text-primary'}"
				>
					<span class="w-1.5 h-1.5 shrink-0 rounded-full bg-primary transition-opacity {activeId === item.id ? 'opacity-100' : 'opacity-0'}"></span>
					{item.text}
				</a>
			{/each}
		</div>
	</nav>
{/if}
