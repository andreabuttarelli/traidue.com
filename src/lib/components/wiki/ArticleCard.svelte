<script lang="ts">
	import type { WikiArticle } from '$lib/utils/wiki';

	let { article }: { article: WikiArticle } = $props();
</script>

<a
	href="/wiki/{article.slug}"
	class="block bg-card rounded-xl border border-border p-6 hover:shadow-md transition"
>
	<div class="flex items-center gap-2 mb-3">
		<span class="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full capitalize">
			{article.category}
		</span>
		<span class="text-sm text-muted">
			{new Date(article.date).toLocaleDateString('it-IT', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})}
		</span>
	</div>
	<h2 class="text-lg font-heading font-semibold text-primary mb-2">{article.title}</h2>
	<p class="text-muted text-sm line-clamp-2">{article.description}</p>
</a>
