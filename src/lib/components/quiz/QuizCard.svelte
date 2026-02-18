<script lang="ts">
	import type { Quiz } from '$lib/utils/quiz';

	let { quiz }: { quiz: Quiz } = $props();
</script>

<a
	href="/quiz/{quiz.slug}"
	class="block bg-card rounded-xl border border-border p-6 hover:shadow-md transition"
>
	<div class="flex items-center gap-2 mb-3">
		<span class="text-xs bg-accent/20 text-primary px-2.5 py-0.5 rounded-full capitalize">
			{quiz.category}
		</span>
		<span class="text-sm text-muted">{quiz.questions.length} domande</span>
	</div>
	<h2 class="text-lg font-heading font-semibold text-primary mb-2">{quiz.title}</h2>
	<p class="text-muted text-sm line-clamp-2">{quiz.description}</p>
</a>
