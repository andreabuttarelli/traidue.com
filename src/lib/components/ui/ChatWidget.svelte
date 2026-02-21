<script lang="ts">
	import { page } from '$app/stores';
	import { tick } from 'svelte';

	interface Message {
		role: 'user' | 'assistant';
		content: string;
	}

	let open = $state(false);
	let messages = $state<Message[]>([]);
	let input = $state('');
	let loading = $state(false);
	let messagesContainer = $state<HTMLDivElement>();
	let inputEl = $state<HTMLInputElement>();
	let toggleButton = $state<HTMLButtonElement>();

	let currentSlug = $derived(
		$page.url.pathname.startsWith('/wiki/')
			? $page.url.pathname.replace('/wiki/', '').replace(/\/$/, '')
			: null
	);

	const ALLOWED_TAGS = new Set(['a', 'strong', 'em', 'br', 'details', 'summary']);

	function sanitizeHtml(html: string): string {
		// Strip all tags except whitelisted ones
		return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tag) => {
			const lower = tag.toLowerCase();
			if (!ALLOWED_TAGS.has(lower)) return '';
			// For allowed tags, only keep safe attributes
			if (lower === 'a') {
				const href = match.match(/href="([^"]*?)"/);
				const cls = match.match(/class="([^"]*?)"/);
				if (match.startsWith('</')) return '</a>';
				const parts = ['<a'];
				if (href) parts.push(`href="${href[1]}"`);
				if (cls) parts.push(`class="${cls[1]}"`);
				return parts.join(' ') + '>';
			}
			if (lower === 'details') return match.startsWith('</') ? '</details>' : '<details class="mt-3 text-xs">';
			if (lower === 'summary') {
				if (match.startsWith('</')) return '</summary>';
				return '<summary class="cursor-pointer text-muted hover:text-primary">';
			}
			// For simple tags (strong, em, br), return clean open/close
			return match.startsWith('</') ? `</${lower}>` : `<${lower}>`;
		});
	}

	function renderMarkdown(text: string): string {
		let html = text
			// Escape any existing HTML first
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			// Then apply markdown transformations
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline hover:no-underline">$1</a>')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			// Restore details/summary (Gemini outputs these literally per system prompt)
			.replace(/&lt;details&gt;/g, '<details class="mt-3 text-xs">')
			.replace(/&lt;\/details&gt;/g, '</details>')
			.replace(/&lt;summary&gt;(.+?)&lt;\/summary&gt;/g, '<summary class="cursor-pointer text-muted hover:text-primary">$1</summary>')
			.replace(/\n/g, '<br>');

		return sanitizeHtml(html);
	}

	async function scrollToBottom() {
		await tick();
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	async function openPanel() {
		open = true;
		await tick();
		inputEl?.focus();
	}

	async function closePanel() {
		open = false;
		await tick();
		toggleButton?.focus();
	}

	function handlePanelKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closePanel();
		}
	}

	async function sendMessage() {
		const text = input.trim();
		if (!text || loading) return;

		input = '';
		messages.push({ role: 'user', content: text });
		loading = true;

		messages.push({ role: 'assistant', content: '' });
		const assistantIndex = messages.length - 1;

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: text,
					history: messages.slice(0, -2).map((m) => ({ role: m.role, content: m.content })),
					currentSlug
				})
			});

			if (!response.ok) {
				messages[assistantIndex].content = 'Mi dispiace, si è verificato un errore. Riprova.';
				loading = false;
				return;
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					messages[assistantIndex].content += decoder.decode(value, { stream: true });
					await scrollToBottom();
				}
			}
		} catch {
			messages[assistantIndex].content = 'Mi dispiace, si è verificato un errore. Riprova.';
		} finally {
			loading = false;
			await scrollToBottom();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<!-- Floating button -->
{#if !open}
	<button
		bind:this={toggleButton}
		onclick={openPanel}
		class="fixed bottom-20 right-6 z-40 w-12 h-12 rounded-full bg-primary text-bg flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity"
		aria-label="Apri chat"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
	</button>
{/if}

<!-- Chat panel -->
{#if open}
	<div
		role="dialog"
		aria-label="Chat assistente wiki"
		tabindex="-1"
		onkeydown={handlePanelKeydown}
		class="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full h-full sm:w-[380px] sm:h-[500px] sm:max-w-[calc(100vw-3rem)] bg-bg border border-border sm:rounded-xl shadow-xl flex flex-col"
	>
		<!-- Header -->
		<div class="flex items-center justify-between px-4 py-3 border-b border-border sm:rounded-t-xl">
			<h2 class="text-sm font-semibold tracking-tight">Chiedi al Wiki</h2>
			<button
				onclick={closePanel}
				class="p-1 text-muted hover:text-primary transition-colors"
				aria-label="Chiudi chat"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
			</button>
		</div>

		<!-- Messages -->
		<div bind:this={messagesContainer} class="flex-1 overflow-y-auto px-4 py-4 space-y-3">
			{#if messages.length === 0}
				<div class="text-center text-muted text-sm mt-8">
					<p class="mb-2">Ciao! Sono l'assistente di traidue.com.</p>
					<p>Chiedimi qualsiasi cosa sugli argomenti del wiki.</p>
					{#if currentSlug}
						<p class="mt-2 text-xs">Sto leggendo: <strong>{currentSlug}</strong></p>
					{/if}
				</div>
			{/if}

			{#each messages as message}
				<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div class="max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed {message.role === 'user' ? 'bg-primary text-bg' : 'bg-border/30 text-text'}">
						{#if message.role === 'assistant'}
							{@html renderMarkdown(message.content)}
							{#if loading && message === messages[messages.length - 1] && !message.content}
								<span class="inline-block w-1.5 h-4 bg-muted animate-pulse rounded-sm"></span>
							{/if}
						{:else}
							{message.content}
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Input -->
		<div class="border-t border-border px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
			<div class="flex gap-2">
				<input
					bind:this={inputEl}
					type="text"
					bind:value={input}
					onkeydown={handleKeydown}
					placeholder="Scrivi una domanda..."
					disabled={loading}
					class="flex-1 px-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:border-primary disabled:opacity-50"
				/>
				<button
					onclick={sendMessage}
					disabled={loading || !input.trim()}
					class="px-3 py-2 bg-primary text-bg rounded-lg text-sm font-medium disabled:opacity-30 hover:opacity-80 transition-opacity"
					aria-label="Invia"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
				</button>
			</div>
		</div>
	</div>
{/if}
