<script lang="ts">
	let {
		title,
		slug,
		description,
		category,
		tags = [],
		date,
		updated,
		sources = [],
		related = [],
		children
	} = $props();

	function relativeDate(dateStr: string): string {
		const now = new Date();
		const d = new Date(dateStr);
		const diffMs = now.getTime() - d.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return 'oggi';
		if (diffDays === 1) return 'ieri';
		if (diffDays < 7) return `${diffDays} giorni fa`;
		if (diffDays < 14) return 'una settimana fa';
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} settimane fa`;
		if (diffDays < 60) return 'un mese fa';
		if (diffDays < 365) return `${Math.floor(diffDays / 30)} mesi fa`;
		return d.toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<article>
	<header class="mb-6 sm:mb-8">
		<div class="flex items-center justify-between mb-3">
			<div class="flex items-center gap-2 text-sm text-muted">
				<a href="/wiki" class="hover:text-primary transition">Wiki</a>
				<span>/</span>
				<span class="capitalize">{category}</span>
			</div>
			<div class="flex items-center gap-2">
				<button
					onclick={() => { navigator.clipboard.writeText(`https://traidue.com/wiki/${slug}`); }}
					class="text-muted hover:text-primary transition p-1.5 sm:p-2 rounded-full border border-border"
					title="Copia link articolo"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:w-[18px] sm:h-[18px]"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
				</button>
				<a
					href="/wiki/{slug}/raw"
					target="_blank"
					class="text-xs sm:text-sm text-muted hover:text-primary transition px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-border"
					title="Visualizza come markdown (per LLM e AI agent)"
				>
					LLM
				</a>
			</div>
		</div>
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-3">{title}</h1>
		<p class="text-muted text-sm">
			{#if updated && updated !== date}
				Aggiornato {relativeDate(updated)}
			{:else}
				Pubblicato {relativeDate(date)}
			{/if}
		</p>
		{#if tags.length > 0}
			<div class="flex flex-wrap gap-2 mt-3">
				{#each tags as tag}
					<span class="text-xs text-muted px-2.5 py-1 rounded-full border border-border">{tag}</span>
				{/each}
			</div>
		{/if}
	</header>

	<div class="prose prose-lg max-w-none">
		{@render children()}
	</div>

	{#if sources.length > 0}
		<footer class="mt-12 pt-8 border-t border-border">
			<h2 class="text-xl font-heading font-semibold text-primary mb-4">Fonti</h2>
			<ul class="space-y-2">
				{#each sources as source}
					<li>
						<a href={source.url} target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">
							{source.title}
						</a>
						{#if source.year}
							<span class="text-muted text-sm">({source.year})</span>
						{/if}
					</li>
				{/each}
			</ul>
		</footer>
	{/if}
</article>
