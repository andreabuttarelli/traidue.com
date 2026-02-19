<script lang="ts">
	import type { WikiArticle } from '$lib/utils/wiki';

	let { article }: { article: WikiArticle } = $props();
</script>

<a
	href="/wiki/{article.slug}"
	class="group block transition-all"
>
	{#if article.image}
		<div class="aspect-[16/9] overflow-hidden rounded-xl mb-4">
			<img
				src={article.image}
				alt=""
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				loading="lazy"
			/>
		</div>
	{/if}
	<div class="flex items-center gap-3 mb-1.5">
		<span class="text-xs text-muted uppercase tracking-wide">
			{article.category}
		</span>
		{#if article.sources?.length}
			<span class="text-xs text-muted">{article.sources.length} fonti</span>
		{/if}
	</div>
	<h2 class="text-base font-heading font-semibold text-primary mb-1.5 group-hover:underline">{article.title}</h2>
	<p class="text-muted text-sm leading-relaxed line-clamp-2">{article.description}</p>
</a>
