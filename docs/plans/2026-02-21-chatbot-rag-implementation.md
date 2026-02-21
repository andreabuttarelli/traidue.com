# Chatbot RAG Wiki — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a RAG chatbot that answers user questions based on ~113 wiki articles, using Gemini for embeddings and responses.

**Architecture:** Build-time script generates embeddings for all articles into a static JSON. At runtime, a SvelteKit API route embeds the user query, finds the top 5 most relevant articles via cosine similarity, and streams a Gemini Flash response. The UI is a sidebar that pushes content to the left.

**Tech Stack:** Gemini API (embedding + Flash), SvelteKit server endpoints, Svelte 5 runes, Tailwind CSS v4

---

### Task 1: Install Gemini SDK dependency

**Files:**
- Modify: `package.json`

**Step 1: Install @google/generative-ai**

Run: `bun add @google/generative-ai`

**Step 2: Verify installation**

Run: `bun run check`
Expected: No errors

**Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add @google/generative-ai dependency"
```

---

### Task 2: Create embeddings generation script

**Files:**
- Create: `scripts/generate-embeddings.ts`
- Modify: `package.json` (add script)

**Step 1: Create the script**

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const WIKI_DIR = 'src/content/wiki';
const OUTPUT_FILE = 'static/embeddings.json';
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
	console.error('GEMINI_API_KEY not set in environment');
	process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });

interface ArticleEmbedding {
	slug: string;
	title: string;
	category: string;
	sources: { title: string; url: string; year: number }[];
	embedding: number[];
}

function getMarkdownFiles(dir: string): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir)) {
		const fullPath = join(dir, entry);
		if (statSync(fullPath).isDirectory()) {
			files.push(...getMarkdownFiles(fullPath));
		} else if (entry.endsWith('.md')) {
			files.push(fullPath);
		}
	}
	return files;
}

function parseFrontmatter(content: string): Record<string, any> {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const frontmatter: Record<string, any> = {};
	let currentKey = '';
	let currentArray: any[] | null = null;
	let currentObject: Record<string, any> | null = null;

	for (const line of match[1].split('\n')) {
		// Handle array items with object properties
		if (currentArray !== null && /^\s+-\s+\w+:/.test(line)) {
			const objMatch = line.match(/^\s+-\s+(\w+):\s*"?(.+?)"?\s*$/);
			if (objMatch) {
				currentObject = { [objMatch[1]]: objMatch[2] };
				currentArray.push(currentObject);
				continue;
			}
		}
		if (currentObject && /^\s+\w+:/.test(line) && !/^\s+-/.test(line)) {
			const propMatch = line.match(/^\s+(\w+):\s*"?(.+?)"?\s*$/);
			if (propMatch) {
				const val = propMatch[2];
				currentObject[propMatch[1]] = isNaN(Number(val)) ? val : Number(val);
				continue;
			}
		}
		// Handle simple array items
		if (currentArray !== null && /^\s+-\s/.test(line)) {
			const val = line.replace(/^\s+-\s*"?/, '').replace(/"?\s*$/, '');
			currentObject = null;
			currentArray.push(val);
			continue;
		}
		// Handle top-level key
		const keyMatch = line.match(/^(\w+):\s*(.*)/);
		if (keyMatch) {
			currentObject = null;
			const [, key, rawVal] = keyMatch;
			const val = rawVal.replace(/^"/, '').replace(/"$/, '').trim();
			if (val === '') {
				currentArray = [];
				frontmatter[key] = currentArray;
				currentKey = key;
			} else if (val.startsWith('[')) {
				// Inline array like tags: ["a", "b"]
				frontmatter[key] = val.replace(/[\[\]"]/g, '').split(',').map(s => s.trim());
				currentArray = null;
			} else {
				frontmatter[key] = val;
				currentArray = null;
			}
		}
	}
	return frontmatter;
}

function extractBody(content: string): string {
	const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
	// Remove markdown syntax for cleaner embedding
	return withoutFrontmatter
		.replace(/^#{1,6}\s+/gm, '')  // headings
		.replace(/\*\*(.+?)\*\*/g, '$1')  // bold
		.replace(/\*(.+?)\*/g, '$1')  // italic
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links
		.replace(/!\[.*?\]\(.*?\)/g, '')  // images
		.replace(/```[\s\S]*?```/g, '')  // code blocks
		.replace(/\n{3,}/g, '\n\n')
		.trim()
		.slice(0, 8000);
}

async function main() {
	const files = getMarkdownFiles(WIKI_DIR);
	console.log(`Found ${files.length} articles`);

	const embeddings: ArticleEmbedding[] = [];
	const batchSize = 10;

	for (let i = 0; i < files.length; i += batchSize) {
		const batch = files.slice(i, i + batchSize);
		const results = await Promise.all(
			batch.map(async (filePath) => {
				const content = readFileSync(filePath, 'utf-8');
				const frontmatter = parseFrontmatter(content);
				const slug = filePath.split('/').pop()!.replace('.md', '');
				const category = relative(WIKI_DIR, filePath).split('/')[0];
				const body = extractBody(content);
				const textToEmbed = `${frontmatter.title || slug}\n${frontmatter.description || ''}\n${body}`;

				const result = await model.embedContent(textToEmbed);
				const embedding = result.embedding.values;

				return {
					slug,
					title: frontmatter.title || slug,
					category,
					sources: Array.isArray(frontmatter.sources) ? frontmatter.sources : [],
					embedding
				};
			})
		);
		embeddings.push(...results);
		console.log(`Processed ${Math.min(i + batchSize, files.length)}/${files.length}`);
	}

	writeFileSync(OUTPUT_FILE, JSON.stringify(embeddings));
	const sizeMB = (Buffer.byteLength(JSON.stringify(embeddings)) / 1024 / 1024).toFixed(2);
	console.log(`Saved ${embeddings.length} embeddings to ${OUTPUT_FILE} (${sizeMB} MB)`);
}

main().catch(console.error);
```

**Step 2: Add npm script to package.json**

Add to `scripts` in package.json:
```json
"generate-embeddings": "bun run scripts/generate-embeddings.ts"
```

**Step 3: Add static/embeddings.json to .gitignore**

Append to `.gitignore`:
```
# Chatbot embeddings (generated)
static/embeddings.json
```

**Step 4: Run the script to generate embeddings**

Run: `GEMINI_API_KEY=$(grep GEMINI_API_KEY .env | cut -d= -f2) bun run generate-embeddings`
Expected: `Saved 113 embeddings to static/embeddings.json`

**Step 5: Commit**

```bash
git add scripts/generate-embeddings.ts package.json .gitignore
git commit -m "feat: add embeddings generation script for chatbot RAG"
```

---

### Task 3: Create chat API endpoint

**Files:**
- Create: `src/lib/utils/embeddings.ts`
- Create: `src/routes/api/chat/+server.ts`

**Step 1: Create embeddings utility (cosine similarity + search)**

Create `src/lib/utils/embeddings.ts`:

```typescript
export interface StoredEmbedding {
	slug: string;
	title: string;
	category: string;
	sources: { title: string; url: string; year: number }[];
	embedding: number[];
}

export function cosineSimilarity(a: number[], b: number[]): number {
	let dotProduct = 0;
	let normA = 0;
	let normB = 0;
	for (let i = 0; i < a.length; i++) {
		dotProduct += a[i] * b[i];
		normA += a[i] * a[i];
		normB += b[i] * b[i];
	}
	return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function findRelevantArticles(
	queryEmbedding: number[],
	storedEmbeddings: StoredEmbedding[],
	topK: number = 5,
	currentSlug?: string
): StoredEmbedding[] {
	const scored = storedEmbeddings.map((entry) => ({
		...entry,
		score: cosineSimilarity(queryEmbedding, entry.embedding)
	}));

	scored.sort((a, b) => b.score - a.score);

	const results = scored.slice(0, topK);

	// Always include currentSlug if provided and not already in results
	if (currentSlug && !results.find((r) => r.slug === currentSlug)) {
		const current = scored.find((r) => r.slug === currentSlug);
		if (current) {
			results.pop();
			results.unshift(current);
		}
	}

	return results;
}
```

**Step 2: Create the chat API endpoint**

Create `src/routes/api/chat/+server.ts`:

```typescript
import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findRelevantArticles, type StoredEmbedding } from '$lib/utils/embeddings';
import { readFileSync } from 'fs';
import { getRawArticleBySlug } from '$lib/utils/wiki';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
const chatModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

let embeddingsCache: StoredEmbedding[] | null = null;

function loadEmbeddings(): StoredEmbedding[] {
	if (embeddingsCache) return embeddingsCache;
	const data = readFileSync('static/embeddings.json', 'utf-8');
	embeddingsCache = JSON.parse(data);
	return embeddingsCache!;
}

const SYSTEM_PROMPT = `Sei l'assistente di traidue.com, un sito informativo italiano su identità di genere e tematiche transgender.

REGOLE:
- Rispondi SOLO basandoti sui contenuti degli articoli forniti come contesto
- Se la domanda non è coperta dai contenuti, rispondi gentilmente che non hai informazioni a riguardo e suggerisci di esplorare il wiki su traidue.com
- Cita le pagine wiki come link markdown: [Titolo articolo](/wiki/slug)
- In fondo alla risposta, se hai usato informazioni da articoli con fonti scientifiche, aggiungi un blocco con le fonti così:

<details>
<summary>Fonti scientifiche</summary>

- Titolo fonte (Anno) — URL
</details>

- Rispondi sempre in italiano
- Sii conciso ma informativo
- Non inventare informazioni non presenti nel contesto`;

export const POST: RequestHandler = async ({ request }) => {
	const { message, history, currentSlug } = await request.json();

	if (!message || typeof message !== 'string') {
		return json({ error: 'Message is required' }, { status: 400 });
	}

	const embeddings = loadEmbeddings();

	// Embed the user query
	const queryResult = await embeddingModel.embedContent(message);
	const queryEmbedding = queryResult.embedding.values;

	// Find relevant articles
	const relevant = findRelevantArticles(queryEmbedding, embeddings, 5, currentSlug || undefined);

	// Fetch raw markdown for relevant articles
	const articlesContext = relevant
		.map((article) => {
			const raw = getRawArticleBySlug(article.slug);
			const body = raw
				? raw.replace(/^---\n[\s\S]*?\n---\n/, '').slice(0, 4000)
				: '';
			const sourcesText = article.sources
				.map((s) => `- ${s.title} (${s.year}) — ${s.url}`)
				.join('\n');
			return `## ${article.title} [/wiki/${article.slug}]\n${body}\n\nFonti:\n${sourcesText}`;
		})
		.join('\n\n---\n\n');

	// Build conversation history for Gemini
	const contents = [];

	// Add history
	if (Array.isArray(history)) {
		for (const msg of history) {
			contents.push({
				role: msg.role === 'assistant' ? 'model' : 'user',
				parts: [{ text: msg.content }]
			});
		}
	}

	// Add current message with context
	contents.push({
		role: 'user',
		parts: [
			{
				text: `Contesto dagli articoli del wiki:\n\n${articlesContext}\n\n---\n\nDomanda dell'utente: ${message}`
			}
		]
	});

	// Stream response
	const result = await chatModel.generateContentStream({
		contents,
		systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
	});

	const stream = new ReadableStream({
		async start(controller) {
			for await (const chunk of result.stream) {
				const text = chunk.text();
				if (text) {
					controller.enqueue(new TextEncoder().encode(text));
				}
			}
			controller.close();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache'
		}
	});
};
```

**Step 3: Verify types compile**

Run: `bun run check`
Expected: No type errors

**Step 4: Commit**

```bash
git add src/lib/utils/embeddings.ts src/routes/api/chat/+server.ts
git commit -m "feat: add chat API endpoint with RAG pipeline"
```

---

### Task 4: Create ChatSidebar UI component

**Files:**
- Create: `src/lib/components/ui/ChatSidebar.svelte`

**Step 1: Create the component**

```svelte
<script lang="ts">
	import { page } from '$app/stores';

	interface Message {
		role: 'user' | 'assistant';
		content: string;
	}

	let { open = $bindable(false) } = $props();

	let messages = $state<Message[]>([]);
	let input = $state('');
	let loading = $state(false);
	let messagesContainer = $state<HTMLDivElement>();

	// Get current wiki slug if on a wiki page
	let currentSlug = $derived(
		$page.url.pathname.startsWith('/wiki/')
			? $page.url.pathname.replace('/wiki/', '').replace(/\/$/, '')
			: null
	);

	function scrollToBottom() {
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	async function sendMessage() {
		const text = input.trim();
		if (!text || loading) return;

		input = '';
		messages.push({ role: 'user', content: text });
		loading = true;

		// Add empty assistant message for streaming
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
					scrollToBottom();
				}
			}
		} catch {
			messages[assistantIndex].content = 'Mi dispiace, si è verificato un errore. Riprova.';
		} finally {
			loading = false;
			scrollToBottom();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	function renderMarkdown(text: string): string {
		return text
			// Links: [text](url)
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline hover:no-underline">$1</a>')
			// Bold
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			// Italic
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			// Details/summary (for scientific sources)
			.replace(/<details>/g, '<details class="mt-3 text-sm">')
			.replace(/<summary>(.+?)<\/summary>/g, '<summary class="cursor-pointer text-muted hover:text-primary">$1</summary>')
			// Line breaks
			.replace(/\n/g, '<br>');
	}
</script>

{#if open}
	<aside class="fixed right-0 top-0 h-full w-full sm:w-[380px] bg-bg border-l border-border z-40 flex flex-col shadow-lg">
		<!-- Header -->
		<div class="flex items-center justify-between px-4 py-3 border-b border-border">
			<h2 class="text-sm font-semibold tracking-tight">Chiedi al Wiki</h2>
			<button
				onclick={() => (open = false)}
				class="p-1 text-muted hover:text-primary transition-colors"
				aria-label="Chiudi chat"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
			</button>
		</div>

		<!-- Messages -->
		<div bind:this={messagesContainer} class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
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
								<span class="inline-block w-2 h-4 bg-muted animate-pulse"></span>
							{/if}
						{:else}
							{message.content}
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Input -->
		<div class="border-t border-border px-4 py-3">
			<div class="flex gap-2">
				<input
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
	</aside>
{/if}
```

**Step 2: Verify types**

Run: `bun run check`

**Step 3: Commit**

```bash
git add src/lib/components/ui/ChatSidebar.svelte
git commit -m "feat: add ChatSidebar component with streaming responses"
```

---

### Task 5: Create ChatButton and integrate into layout

**Files:**
- Create: `src/lib/components/ui/ChatButton.svelte`
- Modify: `src/routes/+layout.svelte`

**Step 1: Create the floating chat button**

Create `src/lib/components/ui/ChatButton.svelte`:

```svelte
<script lang="ts">
	let { open = $bindable(false) } = $props();
</script>

{#if !open}
	<button
		onclick={() => (open = true)}
		class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-bg flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity"
		aria-label="Apri chat"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
	</button>
{/if}
```

**Step 2: Integrate into +layout.svelte**

Modify `src/routes/+layout.svelte` to:

```svelte
<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import CookieBanner from '$lib/components/ui/CookieBanner.svelte';
	import ChatButton from '$lib/components/ui/ChatButton.svelte';
	import ChatSidebar from '$lib/components/ui/ChatSidebar.svelte';

	let { children, data } = $props();
	let chatOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-bg text-text font-sans transition-[margin] duration-300 {chatOpen ? 'sm:mr-[380px]' : ''}">
	<Navbar articles={data.allArticles} quizzes={data.allQuizzes} />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
<CookieBanner />
<ChatButton bind:open={chatOpen} />
<ChatSidebar bind:open={chatOpen} />
```

**Step 3: Verify dev server works**

Run: `bun run dev`
Expected: Page loads, chat button visible bottom-right, clicking it opens sidebar and pushes content

**Step 4: Commit**

```bash
git add src/lib/components/ui/ChatButton.svelte src/routes/+layout.svelte
git commit -m "feat: integrate chat button and sidebar into layout"
```

---

### Task 6: End-to-end test and polish

**Step 1: Ensure embeddings are generated**

Run: `ls -la static/embeddings.json`
Expected: File exists with reasonable size (~5-10 MB)

**Step 2: Start dev server and test**

Run: `bun run dev`

Test manually:
1. Click chat button → sidebar opens, content pushes left
2. Type "cos'è la disforia di genere?" → get streaming response with wiki links
3. Ask follow-up "e come si diagnostica?" → uses conversation history
4. Navigate to a wiki article → chat shows current slug
5. Ask "riassumimi questo articolo" → uses current article as context
6. Ask "qual è la ricetta della carbonara?" → polite refusal (out of scope)
7. Close sidebar → content returns to full width

**Step 3: Verify fonti scientifiche appear in collapsible**

Check that responses include `<details>` block with scientific sources when relevant.

**Step 4: Final commit if any polish needed**

```bash
git add -A
git commit -m "feat: chatbot RAG wiki complete"
```
