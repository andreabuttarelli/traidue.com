<script lang="ts">
	let {
		title,
		description,
		category,
		tags = [],
		date,
		updated,
		sources = [],
		related = [],
		children
	} = $props();
</script>

<article class="max-w-prose mx-auto px-4 py-12">
	<header class="mb-8">
		<div class="flex items-center gap-2 text-sm text-muted mb-3">
			<a href="/wiki" class="hover:text-primary">Wiki</a>
			<span>›</span>
			<span class="capitalize">{category}</span>
		</div>
		<h1 class="text-4xl font-heading font-bold text-primary mb-3">{title}</h1>
		<p class="text-muted text-sm">
			Pubblicato il {new Date(date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
			{#if updated && updated !== date}
				· Aggiornato il {new Date(updated).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
			{/if}
		</p>
		{#if tags.length > 0}
			<div class="flex flex-wrap gap-2 mt-3">
				{#each tags as tag}
					<span class="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full">{tag}</span>
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
						<a href={source.url} target="_blank" rel="noopener noreferrer" class="text-info hover:underline">
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
