<script lang="ts">
	import ShareButtons from '$lib/components/ui/ShareButtons.svelte';
	import { getGlossaryTerms } from '$lib/data/glossary';
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';

	const glossaryTerms = $derived(getGlossaryTerms(getLocale()));

	let {
		title,
		slug,
		description,
		category,
		tags = [],
		date,
		updated,
		image,
		sources = [],
		media = [],
		faq = [],
		changelog = [],
		related = [],
		children
	} = $props();

	const mediaLabels = $derived<Record<string, string>>({
		libro: m.media_libro(),
		film: m.media_film(),
		serie: m.media_serie(),
		documentario: m.media_documentario(),
		podcast: m.media_podcast()
	});

	let proseEl: HTMLDivElement;
	let readingTime = $state(0);

	$effect(() => {
		if (!proseEl) return;
		const text = proseEl.textContent ?? '';
		const words = text.trim().split(/\s+/).length;
		readingTime = Math.max(1, Math.ceil(words / 200));
	});

	$effect(() => {
		if (!proseEl) return;
		const headings = proseEl.querySelectorAll('h2, h3');
		for (const h of headings) {
			if (h.querySelector('.heading-link')) continue;
			const id = h.id;
			if (!id) continue;
			const btn = document.createElement('a');
			btn.href = `#${id}`;
			btn.className = 'heading-link';
			btn.title = m.wiki_copy_section_link();
			btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
			btn.onclick = (e) => {
				e.preventDefault();
				const url = `${window.location.origin}${window.location.pathname}#${id}`;
				navigator.clipboard.writeText(url);
				window.location.hash = id;
			};
			h.appendChild(btn);
		}
	});

	// Glossary term annotations
	const skipTags = new Set(['A', 'CODE', 'PRE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

	function isInsideSkippedTag(node: Node): boolean {
		let parent = node.parentElement;
		while (parent && parent !== proseEl) {
			if (skipTags.has(parent.tagName)) return true;
			parent = parent.parentElement;
		}
		return false;
	}

	$effect(() => {
		if (!proseEl) return;
		// Skip if already annotated
		if (proseEl.querySelector('.glossary-term')) return;
		// Wait for mdsvex content to render
		if (!proseEl.textContent?.trim()) return;

		const annotated = new Set<string>();

		// Sort terms by length descending so longer terms match first
		const sortedTerms = [...glossaryTerms].sort((a, b) => b.term.length - a.term.length);

		for (const { term, definition, link } of sortedTerms) {
			if (annotated.has(term)) continue;

			// Build regex: escape special chars, word boundary, case-insensitive
			const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const regex = new RegExp(`\\b${escaped}\\b`, 'i');

			const walker = document.createTreeWalker(proseEl, NodeFilter.SHOW_TEXT);
			let textNode: Text | null;
			let found = false;

			while ((textNode = walker.nextNode() as Text | null)) {
				if (found) break;
				if (isInsideSkippedTag(textNode)) continue;

				const match = textNode.textContent?.match(regex);
				if (!match || match.index === undefined) continue;

				const before = textNode.textContent!.substring(0, match.index);
				const matched = textNode.textContent!.substring(match.index, match.index + match[0].length);
				const after = textNode.textContent!.substring(match.index + match[0].length);

				const span = document.createElement('span');
				span.className = 'glossary-term';
				span.setAttribute('role', 'button');
				span.setAttribute('aria-expanded', 'false');
				span.setAttribute('tabindex', '0');
				span.setAttribute('data-definition', definition);
				if (link) span.setAttribute('data-link', link);
				span.textContent = matched;

				const parent = textNode.parentNode!;
				if (before) parent.insertBefore(document.createTextNode(before), textNode);
				parent.insertBefore(span, textNode);
				if (after) parent.insertBefore(document.createTextNode(after), textNode);
				parent.removeChild(textNode);

				annotated.add(term);
				found = true;
			}
		}
	});

	// Glossary popover click handler
	function handleGlossaryClick(e: MouseEvent) {
		const target = (e.target as HTMLElement).closest('.glossary-term') as HTMLElement | null;

		// Close any existing popover
		const existing = proseEl?.querySelector('.glossary-popover');
		if (existing) {
			const prevTerm = existing.previousElementSibling ?? existing.parentElement;
			prevTerm?.setAttribute('aria-expanded', 'false');
			existing.remove();
		}

		if (!target) return;

		// If we just closed the popover for this same term, stop
		if (existing && existing.previousElementSibling === target) return;

		const definition = target.getAttribute('data-definition');
		const link = target.getAttribute('data-link');
		if (!definition) return;

		target.setAttribute('aria-expanded', 'true');

		const popover = document.createElement('div');
		popover.className = 'glossary-popover';

		let html = `<p style="margin:0">${definition}</p>`;
		if (link) {
			html += `<a href="${link}" class="glossary-popover-link">${m.wiki_glossary_read_more()} &rarr;</a>`;
		}
		popover.innerHTML = html;

		// Position below the term
		target.style.position = 'relative';
		target.appendChild(popover);
	}

	function handleGlossaryKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			const target = (e.target as HTMLElement).closest('.glossary-term');
			if (target) {
				e.preventDefault();
				handleGlossaryClick(e as unknown as MouseEvent);
			}
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.glossary-term') && !target.closest('.glossary-popover')) {
			const existing = proseEl?.querySelector('.glossary-popover');
			if (existing) {
				const prevTerm = existing.parentElement;
				prevTerm?.setAttribute('aria-expanded', 'false');
				existing.remove();
			}
		}
	}

	$effect(() => {
		if (!proseEl) return;
		proseEl.addEventListener('click', handleGlossaryClick);
		proseEl.addEventListener('keydown', handleGlossaryKeydown);
		document.addEventListener('click', handleClickOutside);
		return () => {
			proseEl.removeEventListener('click', handleGlossaryClick);
			proseEl.removeEventListener('keydown', handleGlossaryKeydown);
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Inline citation references: [1], [2], etc. → superscript links to #fonte-N
	$effect(() => {
		if (!proseEl || sources.length === 0) return;
		if (proseEl.querySelector('.cite-ref')) return;

		const citationRegex = /\[(\d+)\]/g;
		const walker = document.createTreeWalker(proseEl, NodeFilter.SHOW_TEXT);
		const nodesToProcess: { node: Text; matches: { index: number; num: number; length: number }[] }[] = [];

		let textNode: Text | null;
		while ((textNode = walker.nextNode() as Text | null)) {
			if (isInsideSkippedTag(textNode)) continue;
			const text = textNode.textContent ?? '';
			const matches: { index: number; num: number; length: number }[] = [];
			let match;
			while ((match = citationRegex.exec(text)) !== null) {
				const num = parseInt(match[1], 10);
				if (num >= 1 && num <= sources.length) {
					matches.push({ index: match.index, num, length: match[0].length });
				}
			}
			if (matches.length > 0) {
				nodesToProcess.push({ node: textNode, matches });
			}
		}

		for (const { node, matches } of nodesToProcess) {
			const text = node.textContent ?? '';
			const parent = node.parentNode!;
			const frag = document.createDocumentFragment();
			let lastIdx = 0;

			for (const { index, num, length } of matches) {
				if (index > lastIdx) {
					frag.appendChild(document.createTextNode(text.substring(lastIdx, index)));
				}
				const sup = document.createElement('sup');
				const a = document.createElement('a');
				a.href = `#fonte-${num}`;
				a.className = 'cite-ref';
				a.title = sources[num - 1]?.title ?? '';
				a.textContent = `[${num}]`;
				sup.appendChild(a);
				frag.appendChild(sup);
				lastIdx = index + length;
			}

			if (lastIdx < text.length) {
				frag.appendChild(document.createTextNode(text.substring(lastIdx)));
			}

			parent.replaceChild(frag, node);
		}
	});

	function relativeDate(dateStr: string): string {
		const now = new Date();
		const d = new Date(dateStr);
		const diffMs = now.getTime() - d.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return m.relative_today();
		if (diffDays === 1) return m.relative_yesterday();
		if (diffDays < 7) return m.relative_days_ago({ days: diffDays });
		if (diffDays < 14) return m.relative_one_week_ago();
		if (diffDays < 30) return m.relative_weeks_ago({ weeks: Math.floor(diffDays / 7) });
		if (diffDays < 60) return m.relative_one_month_ago();
		if (diffDays < 365) return m.relative_months_ago({ months: Math.floor(diffDays / 30) });

		const locale = getLocale();
		const localeMap: Record<string, string> = { it: 'it-IT', en: 'en-US', es: 'es-ES', pt: 'pt-BR' };
		return d.toLocaleDateString(localeMap[locale] ?? 'it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<article>
	<header class="mb-6 sm:mb-8">
		<div class="flex items-center justify-between mb-3">
			<div class="flex items-center gap-2 text-sm text-muted">
				<a href="/wiki" class="hover:text-primary transition">{m.wiki_breadcrumb()}</a>
				<span>/</span>
				<span class="capitalize">{category}</span>
			</div>
			<div class="flex items-center gap-2">
				<ShareButtons url="https://www.traidue.com/wiki/{slug}" text={title} />
				<a
					href="/wiki/{slug}/raw"
					target="_blank"
					class="text-xs sm:text-sm text-muted hover:text-primary transition px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-border"
					title={m.wiki_llm_title()}
				>
					LLM
				</a>
			</div>
		</div>
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-3">{title}</h1>
	</header>

	{#if image}
		<div class="rounded-xl overflow-hidden mb-8 sm:mb-10">
			<img
				src={image}
				alt={title}
				width="1344"
				height="768"
				decoding="async"
				class="w-full aspect-[16/9] object-cover"
			/>
		</div>
	{/if}

	<div class="prose prose-lg max-w-none" bind:this={proseEl}>
		{@render children()}
	</div>

	{#if faq.length > 0}
		<div class="mt-12 pt-8 border-t border-border">
			<h2 class="text-xl font-heading font-semibold text-primary mb-4">{m.wiki_faq_title()}</h2>
			<div class="grid sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-8">
				{#each faq as item}
					<div>
						<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">{item.question}</h3>
						<p class="text-muted text-sm leading-relaxed">{item.answer}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if sources.length > 0}
		<footer class="mt-12 pt-8 border-t border-border">
			<h2 class="text-xl font-heading font-semibold text-primary mb-4">{m.wiki_sources_title()}</h2>
			<ol class="space-y-2 list-decimal list-inside">
				{#each sources as source, i}
					<li id="fonte-{i + 1}">
						<a href={source.url} target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">
							{source.title}
						</a>
						{#if source.year}
							<span class="text-muted text-sm">({source.year})</span>
						{/if}
					</li>
				{/each}
			</ol>
		</footer>
	{/if}

	{#if media.length > 0}
		<div class="mt-12 pt-8 border-t border-border">
			<h2 class="text-xl font-heading font-semibold text-primary mb-4">{m.wiki_media_title()}</h2>
			<ul class="space-y-2">
				{#each media as item}
					<li>
						<span class="text-xs text-muted uppercase tracking-wide">{mediaLabels[item.type] ?? item.type}</span>
						{#if item.url}
							<a href={item.url} target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline ml-2">
								{item.title}
							</a>
						{:else}
							<span class="text-text ml-2">{item.title}</span>
						{/if}
						{#if item.year}
							<span class="text-muted text-sm">({item.year})</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if changelog.length > 0}
		<div class="mt-12 pt-8 border-t border-border">
			<details class="group">
				<summary class="flex items-center gap-2 cursor-pointer text-sm text-muted hover:text-primary transition select-none list-none [&::-webkit-details-marker]:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 shrink-0">
						<path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM5.404 4.343a.75.75 0 0 0 0 1.06L6.94 6.94 5.404 8.475a.75.75 0 1 0 1.06 1.06l2.122-2.12a.75.75 0 0 0 0-1.062L6.464 4.343a.75.75 0 0 0-1.06 0Z" clip-rule="evenodd" />
					</svg>
					<span>{m.wiki_changelog_title()} ({changelog.length})</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3 transition-transform group-open:rotate-90">
						<path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</summary>
				<div class="mt-3 space-y-3 pl-6">
					{#each changelog as entry}
						<div>
							<time class="text-xs font-medium text-muted">{new Date(entry.date).toLocaleDateString(({ it: 'it-IT', en: 'en-US', es: 'es-ES', pt: 'pt-BR' } as Record<string, string>)[getLocale()] ?? 'it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
							<ul class="mt-1 space-y-0.5">
								{#each entry.changes as change}
									<li class="text-sm text-muted">&mdash; {change}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</details>
		</div>
	{/if}

	<div class="mt-12 pt-8 border-t border-border">
		<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
			<span>
				{#if updated && updated !== date}
					{m.wiki_updated({ date: relativeDate(updated) })}
				{:else}
					{m.wiki_published({ date: relativeDate(date) })}
				{/if}
			</span>
			{#if readingTime > 0}
				<span>&middot;</span>
				<span>{m.wiki_reading_time({ minutes: readingTime })}</span>
			{/if}
			{#if sources.length > 0}
				<span>&middot;</span>
				<span>{m.wiki_sources_cited({ count: sources.length })}</span>
			{/if}
			<span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface text-muted border border-border">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
					<path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.062ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.828 11.828a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 1 0 1.061 1.062l1.06-1.062ZM8 13.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V14a.75.75 0 0 1 .75-.75ZM4.172 11.828a.75.75 0 1 0 1.06-1.06l1.062 1.06a.75.75 0 1 0-1.061 1.062l-1.06-1.062ZM1 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 1 8ZM4.172 4.172a.75.75 0 0 0 1.06 1.06L4.17 4.17a.75.75 0 0 0-1.061-1.06l1.06 1.061Z" />
				</svg>
				{m.wiki_ai_badge()}
			</span>
		</div>
		{#if tags.length > 0}
			<div class="flex flex-wrap gap-2 mt-3">
				{#each tags as tag}
					<span class="text-xs text-muted px-2.5 py-1 rounded-full border border-border">{tag}</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Email CTA -->
	<div class="mt-12 pt-8 border-t border-border">
		<p class="text-sm font-medium text-primary mb-1">{m.wiki_email_cta_title()}</p>
		<p class="text-sm text-muted mb-4">{m.wiki_email_cta_desc()}</p>
		<a
			href="/newsletter"
			class="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary text-bg hover:bg-primary/80 transition"
		>
			{m.wiki_email_cta_button()}
		</a>
	</div>
</article>
