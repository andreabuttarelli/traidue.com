# Tra i Due - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build traidue.com, an Italian informational website about trans topics with a wiki system (Markdown articles) and interactive quizzes, optimized for SEO.

**Architecture:** SvelteKit with mdsvex for Markdown content, Tailwind CSS v4 for styling, fully static prerendering via adapter-vercel. Wiki articles are `.md` files with YAML frontmatter. Quizzes are JSON files with client-side scoring.

**Tech Stack:** SvelteKit 2.x, mdsvex 0.12.x, Tailwind CSS 4.x (@tailwindcss/vite), @sveltejs/adapter-vercel 6.x, TypeScript

**Design doc:** `docs/plans/2026-02-18-traidue-design.md`

---

## Task 1: Scaffold SvelteKit Project

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `src/app.html`, `src/app.css`, `src/routes/+page.svelte`, `src/routes/+layout.svelte`, `static/robots.txt`

**Step 1: Create SvelteKit project**

Run:
```bash
npx sv create . --template minimal --types ts --no-add-ons --no-install
```

If it errors because directory is not empty, use a temp dir then move:
```bash
npx sv create /tmp/traidue-scaffold --template minimal --types ts --no-add-ons --no-install
cp -r /tmp/traidue-scaffold/* /tmp/traidue-scaffold/.* . 2>/dev/null || true
rm -rf /tmp/traidue-scaffold
```

**Step 2: Install core dependencies**

Run:
```bash
npm install
```

**Step 3: Install additional dependencies**

Run:
```bash
npm install -D mdsvex tailwindcss @tailwindcss/vite @sveltejs/adapter-vercel
```

**Step 4: Configure mdsvex in svelte.config.js**

Replace `svelte.config.js` with:

```javascript
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		wiki: 'src/lib/components/wiki/WikiLayout.svelte'
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
```

**Step 5: Configure Tailwind CSS v4 in vite.config.ts**

Replace `vite.config.ts` with:

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit()
	]
});
```

**Step 6: Create src/app.css with Tailwind and design tokens**

```css
@import "tailwindcss";

@theme {
	--color-primary: #1a1a2e;
	--color-accent: #f4a4b8;
	--color-bg: #fafaf8;
	--color-text: #2d2d2d;
	--color-border: #e5e5e3;
	--color-muted: #6b6b6b;
	--color-card: #ffffff;
	--color-success: #22c55e;
	--color-error: #ef4444;
	--color-info: #3b82f6;
	--color-warning: #f59e0b;

	--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
	--font-heading: 'Space Grotesk', var(--font-sans);
}
```

**Step 7: Create static/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://traidue.com/sitemap.xml
```

**Step 8: Verify build works**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors.

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold SvelteKit project with mdsvex, Tailwind v4, adapter-vercel"
```

---

## Task 2: Global Layout, Navbar, Footer

**Files:**
- Create: `src/routes/+layout.svelte`, `src/lib/components/ui/Navbar.svelte`, `src/lib/components/ui/Footer.svelte`
- Modify: `src/app.html` (add font preload)

**Step 1: Add font preload to app.html**

In `src/app.html`, inside `<head>`, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
```

**Step 2: Create Navbar component**

Create `src/lib/components/ui/Navbar.svelte`:

Sticky navbar with:
- Logo/wordmark "Tra i Due" on the left
- Navigation links: Wiki, Quiz, Chi Siamo
- Hamburger menu on mobile (<640px)
- Background `bg-bg` with subtle bottom border
- Smooth open/close transition for mobile menu

**Step 3: Create Footer component**

Create `src/lib/components/ui/Footer.svelte`:

Footer with:
- Three columns on desktop (About brief, Links, Legal)
- Copyright + Apache 2.0 license mention
- Stacked on mobile

**Step 4: Create root layout**

Update `src/routes/+layout.svelte`:

```svelte
<script>
	import '../app.css';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-bg text-text font-sans">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
```

**Step 5: Verify dev server**

Run:
```bash
npm run dev
```
Expected: Page loads with navbar and footer visible.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add global layout with navbar and footer"
```

---

## Task 3: SEO Component and Head Meta Tags

**Files:**
- Create: `src/lib/components/seo/SEO.svelte`, `src/lib/components/seo/StructuredData.svelte`

**Step 1: Create SEO component**

Create `src/lib/components/seo/SEO.svelte`:

Props: `title`, `description`, `url`, `image`, `type` (default "website"), `article` (optional article metadata).

Renders in `<svelte:head>`:
- `<title>{title} | Tra i Due</title>`
- `<meta name="description">`
- `<link rel="canonical" href={url}>`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:locale` (it_IT), `og:site_name`
- Twitter: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- If article: `article:published_time`, `article:modified_time`, `article:section`, `article:tag`

**Step 2: Create StructuredData component**

Create `src/lib/components/seo/StructuredData.svelte`:

Props: `schema` (any JSON-LD object).

Renders:
```svelte
<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify(schema)}
	</script>
</svelte:head>
```

**Step 3: Verify by adding SEO to the temporary homepage**

Add `<SEO title="Home" description="Tra i Due - Informazione sulle tematiche trans" url="https://traidue.com" />` to `+page.svelte`.

Run: `npm run dev` and inspect page source for meta tags.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add SEO and structured data components"
```

---

## Task 4: Wiki Content Loading System

**Files:**
- Create: `src/lib/utils/wiki.ts`, `src/content/wiki/terminologia/identita-di-genere.md` (sample), `src/lib/components/wiki/WikiLayout.svelte`

**Step 1: Create wiki utility for loading articles**

Create `src/lib/utils/wiki.ts`:

```typescript
export interface WikiArticle {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	date: string;
	updated: string;
	sources: { title: string; url: string; year: number }[];
	related: string[];
}

export interface WikiEntry {
	metadata: WikiArticle;
	default: import('svelte').Component;
}

export async function getAllArticles(): Promise<WikiArticle[]> {
	const modules = import.meta.glob<WikiEntry>('/src/content/wiki/**/*.md', { eager: true });
	const articles: WikiArticle[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		articles.push({
			...module.metadata,
			slug
		});
	}

	return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<WikiEntry | null> {
	const modules = import.meta.glob<WikiEntry>('/src/content/wiki/**/*.md', { eager: true });

	for (const [path, module] of Object.entries(modules)) {
		const fileSlug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (fileSlug === slug) {
			return module;
		}
	}

	return null;
}
```

**Step 2: Create a sample wiki article**

Create `src/content/wiki/terminologia/identita-di-genere.md`:

```markdown
---
title: "Identita' di genere: cos'e' e cosa sappiamo"
slug: "identita-di-genere"
description: "Una guida completa all'identita' di genere: definizioni, basi scientifiche e differenze con il sesso biologico."
category: "terminologia"
tags: ["identita' di genere", "definizioni", "basi"]
date: "2026-02-18"
updated: "2026-02-18"
sources:
  - title: "WHO - Gender and health"
    url: "https://www.who.int/health-topics/gender"
    year: 2024
related: []
---

# Identita' di genere: cos'e' e cosa sappiamo

L'identita' di genere e' il senso intimo e profondo di essere uomo, donna, entrambi, nessuno dei due, o di collocarsi in un punto diverso dello spettro di genere.

## Differenza tra sesso e genere

Il **sesso biologico** si riferisce alle caratteristiche fisiche (cromosomi, ormoni, anatomia), mentre il **genere** riguarda l'identita' personale e il ruolo sociale.

## Cosa dice la scienza

Le ricerche in neurologia e genetica mostrano che l'identita' di genere ha basi biologiche complesse, non riducibili a un singolo fattore.
```

**Step 3: Create WikiLayout component for mdsvex**

Create `src/lib/components/wiki/WikiLayout.svelte`:

This is the layout mdsvex uses when rendering wiki articles. It receives metadata as props and wraps the content in a nice article layout with:
- Breadcrumb
- Title, category badge, date
- Article content (the `{@render children()}` slot)
- Sources section at the bottom

**Step 4: Verify article loads**

Run: `npm run dev`, check that the import.meta.glob picks up the article without errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add wiki content loading system with sample article"
```

---

## Task 5: Wiki Routes (Index + Article Page)

**Files:**
- Create: `src/routes/wiki/+page.svelte`, `src/routes/wiki/+page.server.ts`, `src/routes/wiki/[slug]/+page.svelte`, `src/routes/wiki/[slug]/+page.server.ts`
- Create: `src/lib/components/wiki/ArticleCard.svelte`, `src/lib/components/wiki/TOC.svelte`

**Step 1: Create wiki index page server load**

Create `src/routes/wiki/+page.server.ts`:

```typescript
import { getAllArticles } from '$lib/utils/wiki';

export async function load() {
	const articles = await getAllArticles();
	const categories = [...new Set(articles.map(a => a.category))];
	const tags = [...new Set(articles.flatMap(a => a.tags))];
	return { articles, categories, tags };
}
```

**Step 2: Create ArticleCard component**

Create `src/lib/components/wiki/ArticleCard.svelte`:

A card component showing: title, description (truncated), category badge, date. Links to `/wiki/{slug}`.

**Step 3: Create wiki index page**

Create `src/routes/wiki/+page.svelte`:

- SEO component with title "Wiki"
- Search bar (client-side text filter using `$state`)
- Category filter buttons
- Grid of ArticleCard components
- StructuredData with `WebSite` + `SearchAction` schema

**Step 4: Create article page server load**

Create `src/routes/wiki/[slug]/+page.server.ts`:

```typescript
import { getArticleBySlug } from '$lib/utils/wiki';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const article = await getArticleBySlug(params.slug);
	if (!article) {
		throw error(404, 'Articolo non trovato');
	}
	return {
		metadata: article.metadata,
		component: article.default
	};
}
```

Note: Passing a Svelte component through `load` may not work directly. If it doesn't, use a different approach: render the article in `+page.svelte` by importing it dynamically based on slug. Alternative approach:

```typescript
// +page.ts (client-side load)
import { getArticleBySlug } from '$lib/utils/wiki';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const article = await getArticleBySlug(params.slug);
	if (!article) {
		throw error(404, 'Articolo non trovato');
	}
	return {
		metadata: article.metadata,
		Content: article.default
	};
}
```

**Step 5: Create TOC component**

Create `src/lib/components/wiki/TOC.svelte`:

Auto-generates table of contents from headings. On desktop: sticky sidebar. On mobile: collapsible at top.

Uses `$effect` to query all `h2, h3` elements in the article and builds the TOC.

**Step 6: Create article page**

Create `src/routes/wiki/[slug]/+page.svelte`:

- SEO with article metadata, type="article"
- StructuredData with `Article` + `BreadcrumbList` schema
- Breadcrumb: Home > Wiki > {category} > {title}
- Article layout: TOC sidebar (desktop) + content area (max-w-prose ~720px)
- Sources section
- Related articles section

**Step 7: Verify wiki pages work**

Run: `npm run dev`
- Visit `/wiki` - should show index with sample article
- Visit `/wiki/identita-di-genere` - should show article with TOC

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add wiki index and article pages with search and TOC"
```

---

## Task 6: UI Components (Callout, Badge, Breadcrumb)

**Files:**
- Create: `src/lib/components/ui/Callout.svelte`, `src/lib/components/ui/Badge.svelte`, `src/lib/components/ui/Breadcrumb.svelte`

**Step 1: Create Callout component**

Create `src/lib/components/ui/Callout.svelte`:

Props: `type` ("info" | "warning" | "success" | "error"), `title` (optional).

Renders a styled box with:
- Left border color based on type
- Icon based on type (using unicode characters or simple SVG)
- Title (bold) + content slot
- Colors from design tokens

This component is usable inside mdsvex Markdown articles.

**Step 2: Create Badge component**

Create `src/lib/components/ui/Badge.svelte`:

Props: `variant` ("default" | "category" | "tag"), `href` (optional).

Small pill/badge for categories and tags.

**Step 3: Create Breadcrumb component**

Create `src/lib/components/ui/Breadcrumb.svelte`:

Props: `items` (array of `{ label: string, href?: string }`).

Renders breadcrumb trail with `>` separators. Last item is not a link. Includes `BreadcrumbList` structured data.

**Step 4: Verify components render**

Run: `npm run dev`, check the article page for breadcrumbs. Add a `<Callout>` to the sample article to test.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Callout, Badge, and Breadcrumb UI components"
```

---

## Task 7: Quiz System

**Files:**
- Create: `src/lib/data/quiz/identita-di-genere.json`, `src/lib/utils/quiz.ts`, `src/lib/components/quiz/QuizPlayer.svelte`, `src/lib/components/quiz/QuizQuestion.svelte`, `src/lib/components/quiz/QuizResult.svelte`, `src/lib/components/quiz/ProgressBar.svelte`

**Step 1: Create sample quiz data**

Create `src/lib/data/quiz/identita-di-genere.json`:

```json
{
	"slug": "identita-di-genere",
	"title": "Quanto ne sai di identita' di genere?",
	"description": "Metti alla prova le tue conoscenze sull'identita' di genere con questo quiz.",
	"category": "terminologia",
	"questions": [
		{
			"text": "Qual e' la differenza tra sesso biologico e genere?",
			"options": [
				"Sono sinonimi",
				"Il sesso e' biologico, il genere riguarda l'identita' personale e sociale",
				"Il genere e' determinato dai cromosomi",
				"Il sesso e' una scelta, il genere no"
			],
			"correct": 1,
			"explanation": "Il sesso biologico si riferisce a caratteristiche fisiche (cromosomi, ormoni, anatomia), mentre il genere riguarda l'identita' personale e il ruolo sociale."
		},
		{
			"text": "L'identita' di genere e' determinata da:",
			"options": [
				"Solo i cromosomi",
				"Solo l'educazione ricevuta",
				"Una combinazione di fattori biologici e psicosociali",
				"La scelta personale"
			],
			"correct": 2,
			"explanation": "Le ricerche mostrano che l'identita' di genere emerge dall'interazione di fattori biologici (neurologici, genetici, ormonali) e psicosociali."
		},
		{
			"text": "Cosa significa 'non-binary'?",
			"options": [
				"Non identificarsi ne' come uomo ne' come donna, o identificarsi con entrambi",
				"Non avere un genere",
				"Cambiare genere frequentemente",
				"Rifiutare il concetto di genere"
			],
			"correct": 0,
			"explanation": "Non-binary (o non binario) indica chi non si riconosce esclusivamente nel binarismo uomo/donna. Include varie esperienze di genere."
		},
		{
			"text": "Quale organizzazione ha rimosso la transessualita' dalla lista delle malattie mentali?",
			"options": [
				"ONU",
				"FDA",
				"OMS (WHO)",
				"APA"
			],
			"correct": 2,
			"explanation": "L'OMS (Organizzazione Mondiale della Sanita') nell'ICD-11 (2019) ha riclassificato la condizione come 'incongruenza di genere', rimuovendola dal capitolo sui disturbi mentali."
		},
		{
			"text": "La disforia di genere e':",
			"options": [
				"Una malattia mentale",
				"Il disagio che puo' derivare dall'incongruenza tra identita' di genere e sesso assegnato alla nascita",
				"Sinonimo di essere transgender",
				"Una scelta consapevole"
			],
			"correct": 1,
			"explanation": "La disforia di genere e' il disagio clinicamente significativo che alcune persone trans possono provare. Non tutte le persone trans sperimentano disforia."
		}
	],
	"levels": [
		{ "min": 0, "max": 30, "label": "Principiante", "message": "Hai ancora tanto da scoprire! Dai un'occhiata ai nostri articoli nella sezione Wiki." },
		{ "min": 31, "max": 70, "label": "Informato/a", "message": "Buona base di conoscenze! Approfondisci con i nostri articoli scientifici." },
		{ "min": 71, "max": 100, "label": "Esperto/a", "message": "Ottima conoscenza! Continua ad aggiornarti con noi." }
	]
}
```

**Step 2: Create quiz utility**

Create `src/lib/utils/quiz.ts`:

```typescript
export interface QuizQuestion {
	text: string;
	options: string[];
	correct: number;
	explanation: string;
}

export interface QuizLevel {
	min: number;
	max: number;
	label: string;
	message: string;
}

export interface Quiz {
	slug: string;
	title: string;
	description: string;
	category: string;
	questions: QuizQuestion[];
	levels: QuizLevel[];
}

export function getAllQuizzes(): Quiz[] {
	const modules = import.meta.glob<{ default: Quiz }>('/src/lib/data/quiz/*.json', { eager: true });
	return Object.values(modules).map(m => m.default);
}

export function getQuizBySlug(slug: string): Quiz | null {
	const quizzes = getAllQuizzes();
	return quizzes.find(q => q.slug === slug) ?? null;
}

export function calculateScore(answers: (number | null)[], questions: QuizQuestion[]): number {
	const correct = answers.filter((a, i) => a === questions[i].correct).length;
	return Math.round((correct / questions.length) * 100);
}

export function getLevel(score: number, levels: QuizLevel[]): QuizLevel {
	return levels.find(l => score >= l.min && score <= l.max) ?? levels[0];
}
```

**Step 3: Create ProgressBar component**

Create `src/lib/components/quiz/ProgressBar.svelte`:

Props: `current` (number), `total` (number).

Animated progress bar showing current question / total.

**Step 4: Create QuizQuestion component**

Create `src/lib/components/quiz/QuizQuestion.svelte`:

Props: `question` (QuizQuestion), `questionNumber` (number), `onAnswer` (callback).

Shows:
- Question text
- 4 option buttons (full width, hover effect)
- After answering: highlight correct (green), wrong (red), show explanation
- "Prossima domanda" button appears after answering

**Step 5: Create QuizResult component**

Create `src/lib/components/quiz/QuizResult.svelte`:

Props: `score` (number), `level` (QuizLevel), `totalQuestions` (number), `correctAnswers` (number).

Shows:
- Score percentage (large, animated)
- Level label and message
- "Riprova" button
- "Esplora la Wiki" link
- Share functionality (copy result text to clipboard)

**Step 6: Create QuizPlayer component**

Create `src/lib/components/quiz/QuizPlayer.svelte`:

Props: `quiz` (Quiz).

State machine with `$state`:
- State: `intro` | `playing` | `result`
- Tracks: `currentQuestion`, `answers[]`, `score`

In `intro`: shows quiz title, description, number of questions, "Inizia" button.
In `playing`: shows ProgressBar + QuizQuestion.
In `result`: shows QuizResult.

**Step 7: Verify quiz components render**

Create a quick test: add `<QuizPlayer quiz={sampleQuiz} />` in a temp page. Run `npm run dev`.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add quiz system with player, scoring, and sample quiz"
```

---

## Task 8: Quiz Routes (Index + Quiz Page)

**Files:**
- Create: `src/routes/quiz/+page.svelte`, `src/routes/quiz/+page.server.ts`, `src/routes/quiz/[slug]/+page.svelte`, `src/routes/quiz/[slug]/+page.server.ts`
- Create: `src/lib/components/quiz/QuizCard.svelte`

**Step 1: Create quiz index server load**

Create `src/routes/quiz/+page.server.ts`:

```typescript
import { getAllQuizzes } from '$lib/utils/quiz';

export async function load() {
	const quizzes = getAllQuizzes();
	return { quizzes };
}
```

**Step 2: Create QuizCard component**

Create `src/lib/components/quiz/QuizCard.svelte`:

Card showing: quiz title, description, number of questions, category badge. Links to `/quiz/{slug}`.

**Step 3: Create quiz index page**

Create `src/routes/quiz/+page.svelte`:

- SEO component
- Page title "Quiz"
- Grid of QuizCard components

**Step 4: Create quiz page server load**

Create `src/routes/quiz/[slug]/+page.server.ts`:

```typescript
import { getQuizBySlug } from '$lib/utils/quiz';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const quiz = getQuizBySlug(params.slug);
	if (!quiz) {
		throw error(404, 'Quiz non trovato');
	}
	return { quiz };
}
```

**Step 5: Create quiz page**

Create `src/routes/quiz/[slug]/+page.svelte`:

- SEO with quiz metadata
- StructuredData with `Quiz` schema
- Breadcrumb: Home > Quiz > {title}
- QuizPlayer component
- Max width container

**Step 6: Verify quiz flow**

Run: `npm run dev`
- Visit `/quiz` - should show quiz list
- Visit `/quiz/identita-di-genere` - should show the quiz, play through all questions, see result

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add quiz index and quiz pages"
```

---

## Task 9: Homepage

**Files:**
- Create/modify: `src/routes/+page.svelte`, `src/routes/+page.server.ts`

**Step 1: Create homepage server load**

Create `src/routes/+page.server.ts`:

```typescript
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export async function load() {
	const articles = await getAllArticles();
	const quizzes = getAllQuizzes();
	return {
		featuredArticles: articles.slice(0, 4),
		featuredQuizzes: quizzes.slice(0, 2)
	};
}
```

**Step 2: Build homepage**

Use `frontend-design` skill to create the homepage with these sections:

1. **Hero** - "Tra i Due" title, tagline about informazione trans, CTA to explore wiki
2. **Articoli in evidenza** - 3-4 ArticleCard components in a grid
3. **Mettiti alla prova** - 1-2 QuizCard components
4. **Categorie** - 4 category cards (Terminologia, Scienza, Percorsi, Cultura) linking to `/wiki?category=X`
5. **CTA finale** - Invite to explore the full wiki

SEO: title "Tra i Due - Informazione sulle tematiche trans", appropriate description.
StructuredData: `WebSite` schema with `SearchAction`.

**Step 3: Verify homepage**

Run: `npm run dev`, visit `/`.
Expected: All sections render with real data.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add homepage with hero, featured content, and categories"
```

---

## Task 10: Chi Siamo Page

**Files:**
- Create: `src/routes/chi-siamo/+page.svelte`

**Step 1: Create about page**

Create `src/routes/chi-siamo/+page.svelte`:

- SEO component
- Sections: Missione, Metodologia (citazione fonti peer-reviewed), Contatti (email placeholder)
- Minimal, clean layout matching the editorial style
- StructuredData: `Organization` schema

**Step 2: Verify**

Run: `npm run dev`, visit `/chi-siamo`.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add chi siamo page"
```

---

## Task 11: Sitemap and Final SEO

**Files:**
- Create: `src/routes/sitemap.xml/+server.ts`

**Step 1: Create sitemap generator**

Create `src/routes/sitemap.xml/+server.ts`:

```typescript
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';

export const prerender = true;

export async function GET() {
	const articles = await getAllArticles();
	const quizzes = getAllQuizzes();

	const pages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/wiki', priority: '0.9', changefreq: 'weekly' },
		{ url: '/quiz', priority: '0.8', changefreq: 'monthly' },
		{ url: '/chi-siamo', priority: '0.5', changefreq: 'monthly' }
	];

	const articleUrls = articles.map(a => ({
		url: `/wiki/${a.slug}`,
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: a.updated || a.date
	}));

	const quizUrls = quizzes.map(q => ({
		url: `/quiz/${q.slug}`,
		priority: '0.7',
		changefreq: 'monthly'
	}));

	const allUrls = [...pages, ...articleUrls, ...quizUrls];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>https://traidue.com${u.url}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
```

**Step 2: Verify sitemap**

Run: `npm run dev`, visit `/sitemap.xml`.
Expected: Valid XML sitemap with all pages listed.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add auto-generated XML sitemap for SEO"
```

---

## Task 12: Build, Verify, Polish

**Step 1: Run full build**

Run:
```bash
npm run build
```
Expected: Build succeeds, all pages prerendered.

**Step 2: Preview production build**

Run:
```bash
npm run preview
```

Check all pages:
- `/` - Homepage
- `/wiki` - Wiki index
- `/wiki/identita-di-genere` - Article
- `/quiz` - Quiz index
- `/quiz/identita-di-genere` - Quiz
- `/chi-siamo` - About
- `/sitemap.xml` - Sitemap

**Step 3: Check SEO**

Inspect page source on each page for:
- Correct `<title>` tags
- `<meta name="description">`
- Open Graph tags
- Structured data JSON-LD
- Canonical URLs
- Heading hierarchy (one h1 per page)

**Step 4: Fix any issues found**

Address any build errors, broken links, or missing meta tags.

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final polish and build verification"
```

---

## Task Summary

| Task | Description | Depends On |
|------|-------------|------------|
| 1 | Scaffold SvelteKit project | - |
| 2 | Global layout, navbar, footer | 1 |
| 3 | SEO component and meta tags | 1 |
| 4 | Wiki content loading system | 1 |
| 5 | Wiki routes (index + article) | 2, 3, 4 |
| 6 | UI components (Callout, Badge, Breadcrumb) | 2 |
| 7 | Quiz system (player, scoring) | 1 |
| 8 | Quiz routes (index + quiz page) | 3, 6, 7 |
| 9 | Homepage | 5, 8 |
| 10 | Chi Siamo page | 2, 3 |
| 11 | Sitemap and final SEO | 5, 8 |
| 12 | Build, verify, polish | All |
