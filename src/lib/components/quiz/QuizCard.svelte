<script lang="ts">
	import type { Quiz } from '$lib/utils/quiz';

	let { quiz }: { quiz: Quiz } = $props();
</script>

<a
	href="/quiz/{quiz.slug}"
	class="block py-5 border-b border-border hover:pl-2 transition-all"
>
	<div class="flex items-center gap-3 mb-1.5">
		<span class="text-xs text-muted uppercase tracking-wide">
			{quiz.category}
		</span>
		<span class="text-xs text-muted">{quiz.questions.length} domande</span>
	</div>
	<h2 class="text-lg font-heading font-semibold text-primary mb-1">{quiz.title}</h2>
	<p class="text-muted text-sm line-clamp-2">{quiz.description}</p>
</a>
