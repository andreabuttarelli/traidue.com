<script lang="ts">
	interface TOCItem {
		id: string;
		text: string;
		level: number;
	}

	let items = $state<TOCItem[]>([]);
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
						class="block text-sm py-1 text-muted hover:text-primary transition {item.level === 3
							? 'pl-4'
							: ''}"
					>
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
					class="block text-sm py-1 text-muted hover:text-primary transition {item.level === 3
						? 'pl-3'
						: ''}"
				>
					{item.text}
				</a>
			{/each}
		</div>
	</nav>
{/if}
