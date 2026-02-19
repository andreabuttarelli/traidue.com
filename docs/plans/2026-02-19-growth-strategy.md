# Growth Strategy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make traidue.com a self-sharing engine — social sharing on articles/quiz, homepage myths+quiz redesign, association CTA, email collection.

**Architecture:** All client-side. Share buttons use native URL schemes (Twitter intent, WhatsApp/Telegram deep links). Email collection via Formspree (zero backend). Homepage myths+quiz merged into a 2-column layout.

**Tech Stack:** SvelteKit, Svelte 5 runes, Tailwind CSS v4, Formspree free tier

---

### Task 1: Share Buttons Component

Create a reusable `ShareButtons.svelte` component for use in articles and quiz results.

**Files:**
- Create: `src/lib/components/ui/ShareButtons.svelte`

**Step 1: Create the ShareButtons component**

```svelte
<script lang="ts">
	let {
		url,
		text
	}: {
		url: string;
		text: string;
	} = $props();

	function copyLink() {
		navigator.clipboard.writeText(url);
	}
</script>

<div class="flex items-center gap-2">
	<a
		href="https://twitter.com/intent/tweet?text={encodeURIComponent(text)}&url={encodeURIComponent(url)}"
		target="_blank"
		rel="noopener noreferrer"
		class="text-muted hover:text-primary transition p-1.5 sm:p-2 rounded-full border border-border"
		title="Condividi su X"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-[18px] sm:h-[18px]"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
	</a>
	<a
		href="https://api.whatsapp.com/send?text={encodeURIComponent(text + ' ' + url)}"
		target="_blank"
		rel="noopener noreferrer"
		class="text-muted hover:text-primary transition p-1.5 sm:p-2 rounded-full border border-border"
		title="Condividi su WhatsApp"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-[18px] sm:h-[18px]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
	</a>
	<a
		href="https://t.me/share/url?url={encodeURIComponent(url)}&text={encodeURIComponent(text)}"
		target="_blank"
		rel="noopener noreferrer"
		class="text-muted hover:text-primary transition p-1.5 sm:p-2 rounded-full border border-border"
		title="Condividi su Telegram"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-[18px] sm:h-[18px]"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
	</a>
	<button
		onclick={copyLink}
		class="text-muted hover:text-primary transition p-1.5 sm:p-2 rounded-full border border-border"
		title="Copia link"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:w-[18px] sm:h-[18px]"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
	</button>
</div>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (component not yet imported anywhere)

**Step 3: Commit**

```bash
git add src/lib/components/ui/ShareButtons.svelte
git commit -m "feat: add reusable ShareButtons component (X, WhatsApp, Telegram, copy link)"
```

---

### Task 2: Share Buttons on Wiki Articles

Replace the standalone copy-link button in `WikiLayout.svelte` with the new `ShareButtons` component.

**Files:**
- Modify: `src/lib/components/wiki/WikiLayout.svelte`

**Step 1: Add import and replace the copy-link button**

In the `<script>` block, add:
```ts
import ShareButtons from '$lib/components/ui/ShareButtons.svelte';
```

Replace this block (lines 65-81):
```svelte
<div class="flex items-center gap-2">
	<button
		onclick={() => { navigator.clipboard.writeText(`https://www.traidue.com/wiki/${slug}`); }}
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
```

With:
```svelte
<div class="flex items-center gap-2">
	<ShareButtons url="https://www.traidue.com/wiki/{slug}" text={title} />
	<a
		href="/wiki/{slug}/raw"
		target="_blank"
		class="text-xs sm:text-sm text-muted hover:text-primary transition px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-border"
		title="Visualizza come markdown (per LLM e AI agent)"
	>
		LLM
	</a>
</div>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/lib/components/wiki/WikiLayout.svelte
git commit -m "feat: add social share buttons (X, WhatsApp, Telegram) on wiki articles"
```

---

### Task 3: Shareable Quiz Results

Add share buttons to the quiz result screen so users can share their score.

**Files:**
- Modify: `src/lib/components/quiz/QuizResult.svelte`
- Modify: `src/lib/components/quiz/QuizPlayer.svelte`

**Step 1: Pass quiz metadata to QuizResult**

In `QuizPlayer.svelte`, update the `QuizResult` usage (line 73-79) to pass quiz title and slug:

```svelte
<QuizResult
	{score}
	{level}
	totalQuestions={quiz.questions.length}
	{correctAnswers}
	onRetry={retry}
	quizTitle={quiz.title}
	quizSlug={quiz.slug}
/>
```

**Step 2: Update QuizResult to accept and use share data**

Replace the entire `src/lib/components/quiz/QuizResult.svelte` with:

```svelte
<script lang="ts">
	import type { QuizLevel } from '$lib/utils/quiz';
	import ShareButtons from '$lib/components/ui/ShareButtons.svelte';

	let {
		score,
		level,
		totalQuestions,
		correctAnswers,
		onRetry,
		quizTitle,
		quizSlug
	}: {
		score: number;
		level: QuizLevel;
		totalQuestions: number;
		correctAnswers: number;
		onRetry: () => void;
		quizTitle: string;
		quizSlug: string;
	} = $props();

	let shareText = $derived(
		`Ho fatto ${correctAnswers}/${totalQuestions} al quiz "${quizTitle}" su traidue.com — E tu?`
	);
</script>

<div class="text-center max-w-md mx-auto">
	<div class="mb-8">
		<div class="text-4xl sm:text-6xl font-heading font-semibold tracking-tight text-primary mb-2">{score}%</div>
		<div class="text-lg sm:text-xl font-heading font-semibold text-primary mb-2">{level.label}</div>
		<p class="text-muted">{level.message}</p>
	</div>

	<div class="border-t border-b border-border py-6 mb-8">
		<div class="text-sm text-muted mb-1">Risposte corrette</div>
		<div class="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-primary">
			{correctAnswers} / {totalQuestions}
		</div>
	</div>

	<div class="mb-8">
		<p class="text-sm text-muted mb-3">Condividi il tuo risultato</p>
		<div class="flex justify-center">
			<ShareButtons url="https://www.traidue.com/quiz/{quizSlug}" text={shareText} />
		</div>
	</div>

	<div class="flex flex-col sm:flex-row gap-3 justify-center">
		<button
			class="px-6 py-2.5 bg-primary text-white text-sm font-medium hover:bg-primary/80 transition"
			onclick={onRetry}
		>
			Riprova
		</button>
		<a
			href="/wiki"
			class="px-6 py-2.5 border border-primary text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
		>
			Esplora la Wiki
		</a>
	</div>
</div>
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/lib/components/quiz/QuizResult.svelte src/lib/components/quiz/QuizPlayer.svelte
git commit -m "feat: add shareable quiz results with social share buttons"
```

---

### Task 4: Homepage — Merge Myths + Quiz Section

Redesign the homepage to place the myths and quiz sections side-by-side on desktop, with a compelling "E tu quanto ne sai?" hook.

**Files:**
- Modify: `src/routes/+page.svelte`

**Step 1: Replace the myths section and quiz section with a merged layout**

Remove the existing `<!-- Miti e realtà -->` section (lines 82-99) and `<!-- Quiz -->` section (lines 137-161).

Replace both with this single merged section, placed after the hero and before the categories section:

```svelte
<!-- Miti e Quiz -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">Ecco cosa dicono. Ecco cosa dice la scienza.</h2>
		<p class="text-muted text-sm mb-6 sm:mb-8">I miti più diffusi, smontati con le evidenze.</p>
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Colonna miti -->
			<div class="grid gap-3 sm:gap-4 content-start">
				{#each myths as myth}
					<div class="p-5 rounded-xl border border-border">
						<p class="text-sm font-medium text-muted line-through mb-3">&laquo;{myth.claim}&raquo;</p>
						<p class="text-sm text-primary leading-relaxed">{myth.truth}</p>
					</div>
				{/each}
				<a href="/wiki/miti-comuni-persone-trans" class="text-sm text-muted hover:text-primary transition mt-1">Leggi tutti i falsi miti smontati &rarr;</a>
			</div>
			<!-- Colonna quiz -->
			{#if data.featuredQuizzes.length > 0}
				<div class="flex flex-col justify-center p-6 sm:p-8 rounded-xl border border-border">
					<p class="text-sm text-muted uppercase tracking-wide mb-2">Mettiti alla prova</p>
					<h3 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">E tu quanto ne sai?</h3>
					<p class="text-muted text-sm mb-6">
						{data.featuredQuizzes[0].questions.length} domande, risposte basate sulla ricerca scientifica. Scopri se sai distinguere i fatti dai miti.
					</p>
					<a
						href="/quiz/{data.featuredQuizzes[0].slug}"
						class="inline-block px-6 py-2.5 bg-primary text-white text-sm font-medium hover:bg-primary/80 transition self-start"
					>
						Inizia il quiz &rarr;
					</a>
				</div>
			{/if}
		</div>
	</div>
</section>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: merge myths + quiz sections side-by-side on homepage"
```

---

### Task 5: CTA Associazioni

Add a CTA for associations/professionals in `chi-siamo` and the footer.

**Files:**
- Modify: `src/routes/chi-siamo/+page.svelte`
- Modify: `src/lib/components/ui/Footer.svelte`

**Step 1: Add CTA section in chi-siamo**

In `src/routes/chi-siamo/+page.svelte`, add a new section after the "Contatti" section (before the closing `</div>` on line 125):

```svelte
<section class="border-t border-border pt-10 sm:pt-16">
	<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Per associazioni e professionisti</h2>
	<div class="space-y-4 text-text leading-relaxed">
		<p>
			Sei un'<strong>associazione</strong>, un'<strong>organizzazione</strong> o un <strong>professionista</strong> che lavora con persone trans?
			Ci piacerebbe collaborare: segnalaci risorse, proponi contenuti o aiutaci a raggiungere chi ha bisogno di informazione verificata.
		</p>
		<p>
			Scrivici a
			<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>
		</p>
	</div>
</section>
```

**Step 2: Add CTA in footer**

In `src/lib/components/ui/Footer.svelte`, change the grid from `sm:grid-cols-3` to `sm:grid-cols-2 lg:grid-cols-4` and add a fourth column before the closing `</div>` of the grid:

```svelte
<div>
	<p class="text-sm font-medium text-primary mb-3">Collabora</p>
	<div class="flex flex-col gap-2">
		<p class="text-sm text-muted leading-relaxed">
			Sei un'associazione o un professionista? Scrivici.
		</p>
		<a href="mailto:info@traidue.com" class="text-sm text-muted hover:text-primary transition">
			info@traidue.com
		</a>
	</div>
</div>
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/routes/chi-siamo/+page.svelte src/lib/components/ui/Footer.svelte
git commit -m "feat: add CTA for associations in chi-siamo page and footer"
```

---

### Task 6: Email Collection Form (Footer)

Add a "Resta aggiornato" email form in the footer using Formspree.

**Files:**
- Modify: `src/lib/components/ui/Footer.svelte`

**Step 1: Add the email form section**

In `Footer.svelte`, add a full-width email section above the existing grid. The form uses Formspree's endpoint. Replace the form action URL `FORMSPREE_ID` with the actual Formspree form ID once created.

The entire Footer.svelte becomes:

```svelte
<script lang="ts">
	import Logo from './Logo.svelte';

	let email = $state('');
	let submitted = $state(false);
	let submitting = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email || submitting) return;
		submitting = true;
		try {
			const res = await fetch('https://formspree.io/f/FORMSPREE_ID', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			if (res.ok) {
				submitted = true;
				email = '';
			}
		} finally {
			submitting = false;
		}
	}
</script>

<footer>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
		<!-- Email signup -->
		<div class="border-b border-border pb-8 sm:pb-12 mb-8 sm:mb-12">
			<div class="max-w-md">
				<p class="text-sm font-medium text-primary mb-1">Resta aggiornato</p>
				<p class="text-sm text-muted mb-4">Nuovi articoli e aggiornamenti. Niente spam, solo fatti.</p>
				{#if submitted}
					<p class="text-sm text-primary">Grazie! Ti terremo aggiornato.</p>
				{:else}
					<form onsubmit={handleSubmit} class="flex gap-2">
						<input
							type="email"
							bind:value={email}
							placeholder="La tua email"
							required
							class="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-transparent focus:outline-none focus:border-primary"
						/>
						<button
							type="submit"
							disabled={submitting}
							class="px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/80 transition disabled:opacity-50"
						>
							Iscriviti
						</button>
					</form>
					<p class="text-xs text-muted mt-2">
						Inviando acconsenti al trattamento dei dati. <a href="/privacy" class="underline hover:no-underline">Privacy Policy</a>
					</p>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
			<div>
				<p class="text-lg text-primary mb-2"><Logo /></p>
				<p class="text-sm text-muted leading-relaxed">
					Informazione accessibile e verificata sulle tematiche trans.
				</p>
			</div>

			<div>
				<p class="text-sm font-medium text-primary mb-3">Navigazione</p>
				<nav class="flex flex-col gap-2">
					<a href="/wiki" class="text-sm text-muted hover:text-primary transition-colors">Wiki</a>
					<a href="/quiz" class="text-sm text-muted hover:text-primary transition-colors">Quiz</a>
					<a href="/glossario" class="text-sm text-muted hover:text-primary transition-colors">Glossario</a>
					<a href="/chi-siamo" class="text-sm text-muted hover:text-primary transition-colors">Chi Siamo</a>
					<a href="https://github.com/andreabuttarelli/traidue.com" target="_blank" rel="noopener noreferrer" class="text-sm text-muted hover:text-primary transition-colors">GitHub</a>
				</nav>
			</div>

			<div>
				<p class="text-sm font-medium text-primary mb-3">Collabora</p>
				<div class="flex flex-col gap-2">
					<p class="text-sm text-muted leading-relaxed">
						Sei un'associazione o un professionista? Scrivici.
					</p>
					<a href="mailto:info@traidue.com" class="text-sm text-muted hover:text-primary transition">
						info@traidue.com
					</a>
				</div>
			</div>

			<div>
				<p class="text-sm font-medium text-primary mb-3">Legale</p>
				<div class="flex flex-col gap-2">
					<p class="text-sm text-muted">&copy; 2026 Tra i Due</p>
					<a href="/privacy" class="text-sm text-muted hover:text-primary transition-colors">Privacy Policy</a>
					<a href="/termini" class="text-sm text-muted hover:text-primary transition-colors">Termini di Utilizzo</a>
					<a
						href="https://www.apache.org/licenses/LICENSE-2.0"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-muted hover:text-primary transition-colors"
					>
						Licenza Apache 2.0
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
```

**Note:** Replace `FORMSPREE_ID` with the actual form ID after creating a form at https://formspree.io. The user needs to create a free Formspree account and form, then replace the placeholder.

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/lib/components/ui/Footer.svelte
git commit -m "feat: add email collection form in footer (Formspree)"
```

---

### Task 7: Email Signup CTA at End of Articles

Add an email signup prompt at the bottom of every wiki article.

**Files:**
- Modify: `src/lib/components/wiki/WikiLayout.svelte`

**Step 1: Add email CTA after the sources footer**

After the closing `</footer>` of the sources section (line 136), add:

```svelte
<!-- Email CTA -->
<div class="mt-12 pt-8 border-t border-border">
	<p class="text-sm font-medium text-primary mb-1">Ti è stato utile?</p>
	<p class="text-sm text-muted mb-4">Nuovi articoli e aggiornamenti. Niente spam, solo fatti.</p>
	<a
		href="#footer-email"
		class="inline-block px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/80 transition"
	>
		Resta aggiornato
	</a>
</div>
```

This links to the footer form rather than duplicating the form logic. Simple and DRY.

**Step 2: Add the id to the footer form**

In `Footer.svelte`, add `id="footer-email"` to the email signup `<div>`:

Change:
```svelte
<div class="border-b border-border pb-8 sm:pb-12 mb-8 sm:mb-12">
```
To:
```svelte
<div id="footer-email" class="border-b border-border pb-8 sm:pb-12 mb-8 sm:mb-12">
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/lib/components/wiki/WikiLayout.svelte src/lib/components/ui/Footer.svelte
git commit -m "feat: add email signup CTA at end of wiki articles"
```

---

### Task 8: Dynamic OG Images

Generate per-article OG images using satori so each shared link has a unique preview.

**Files:**
- Create: `src/routes/og/[slug].png/+server.ts`
- Modify: `src/lib/components/seo/SEO.svelte`
- Modify: `src/routes/wiki/[slug]/+page.svelte`

**Step 1: Install satori and sharp**

Run: `npm install satori sharp`

satori renders HTML/CSS to SVG, sharp converts SVG to PNG.

**Step 2: Create the OG image endpoint**

Create `src/routes/og/[slug].png/+server.ts`:

```ts
import satori from 'satori';
import sharp from 'sharp';
import { getAllArticles } from '$lib/utils/wiki';
import type { RequestHandler } from './$types';

const categoryColors: Record<string, string> = {
	terminologia: '#6366f1',
	scienza: '#059669',
	percorsi: '#d97706',
	cultura: '#e11d48'
};

export const GET: RequestHandler = async ({ params }) => {
	const articles = getAllArticles();
	const article = articles.find((a) => a.slug === params.slug);

	if (!article) {
		return new Response('Not found', { status: 404 });
	}

	const accentColor = categoryColors[article.category] || '#111111';

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '60px 80px',
					backgroundColor: '#ffffff',
					borderTop: `8px solid ${accentColor}`,
					fontFamily: 'Inter'
				},
				children: [
					{
						type: 'div',
						props: {
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '20px',
											color: accentColor,
											textTransform: 'uppercase',
											letterSpacing: '0.1em',
											marginBottom: '16px'
										},
										children: article.category
									}
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '52px',
											fontWeight: 700,
											color: '#111111',
											lineHeight: 1.2,
											maxWidth: '900px'
										},
										children: article.title
									}
								}
							]
						}
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-end'
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '24px',
											fontWeight: 600,
											color: '#111111'
										},
										children: 'Tra i Due'
									}
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '18px',
											color: '#777777'
										},
										children: `${article.sources.length} fonti citate`
									}
								}
							]
						}
					}
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Inter',
					data: await fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf').then(
						(r) => r.arrayBuffer()
					),
					weight: 400,
					style: 'normal'
				},
				{
					name: 'Inter',
					data: await fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf').then(
						(r) => r.arrayBuffer()
					),
					weight: 700,
					style: 'normal'
				}
			]
		}
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=604800, immutable'
		}
	});
};
```

**Step 3: Update SEO component to accept dynamic OG image**

The `SEO.svelte` already accepts an `image` prop with a default. No changes needed — the article page just needs to pass the dynamic URL.

**Step 4: Update wiki article page to pass OG image URL**

In `src/routes/wiki/[slug]/+page.svelte`, find where `SEO` is used and update the `image` prop to use the dynamic endpoint:

Change the image prop from the static article image to the OG endpoint:
```svelte
image="https://www.traidue.com/og/{data.metadata.slug}.png"
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds. Note: the OG endpoint is server-rendered (not prerendered) since it fetches fonts at runtime. If using adapter-static, this endpoint won't work — it requires adapter-auto or adapter-vercel.

**Step 6: Commit**

```bash
git add src/routes/og src/routes/wiki/[slug]/+page.svelte
git commit -m "feat: add dynamic OG images per wiki article using satori"
```

---

## Verification Checklist

After all tasks are complete, verify:

1. `npm run build` — passes
2. Visit any wiki article — share buttons (X, WhatsApp, Telegram, copy) visible in the header
3. Complete a quiz — "Condividi il tuo risultato" section with share buttons appears
4. Homepage — myths (left) and quiz CTA (right) displayed side-by-side on desktop
5. `/chi-siamo` — "Per associazioni e professionisti" section visible
6. Footer — email form present, "Collabora" column visible
7. End of any wiki article — "Ti è stato utile? Resta aggiornato" CTA visible
8. Share on X — opens Twitter with pre-filled text and URL
9. Share on WhatsApp — opens WhatsApp with pre-filled message
10. `/og/identita-di-genere.png` — returns a PNG image with article title and category color

## Notes

- **Formspree ID**: The user must create a free Formspree account at https://formspree.io, create a form, and replace `FORMSPREE_ID` in Footer.svelte with the actual form ID.
- **OG Images**: Requires a server runtime (not adapter-static). If deploying on Vercel, use adapter-vercel or adapter-auto.
- **Font loading**: The OG endpoint fetches Inter font from Google Fonts at runtime. Consider caching the font file locally for production if latency is a concern.
