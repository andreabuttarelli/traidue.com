<script lang="ts">
	import type { WikiArticle } from '$lib/utils/wiki';

	let { article }: { article: WikiArticle } = $props();
</script>

<a
	href="/wiki/{article.slug}"
	class="block py-5 border-b border-border hover:pl-2 transition-all"
>
	<div class="flex items-center gap-3 mb-1.5">
		<span class="text-xs text-muted uppercase tracking-wide">
			{article.category}
		</span>
		<span class="text-xs text-muted">
			{new Date(article.date).toLocaleDateString('it-IT', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})}
		</span>
	</div>
	<h2 class="text-lg font-heading font-semibold text-primary mb-1">{article.title}</h2>
	<p class="text-muted text-sm line-clamp-2">{article.description}</p>
</a>
