# i18n Implementation Plan — traidue.com

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add full internationalization (IT, EN, ES, PT) to traidue.com using Paraglide JS, with translated UI strings, wiki articles, quizzes, and glossary.

**Architecture:** Paraglide JS handles UI string translations and URL-based locale routing (IT default with no prefix, `/en/`, `/es/`, `/pt/` for others). Wiki articles live as separate markdown files per language in `src/content/wiki/{lang}/{category}/{slug}.md`, linked via a `translationKey` frontmatter field. Content loading functions become locale-aware.

**Tech Stack:** Paraglide JS (Vite plugin), SvelteKit reroute/handle hooks, mdsvex, Svelte 5 runes

**Design doc:** `docs/plans/2026-03-11-i18n-design.md`

---

### Task 1: Install and configure Paraglide JS

**Files:**
- Modify: `vite.config.ts`
- Create: `project.inlang/settings.json`
- Modify: `src/app.html`
- Create: `src/hooks.ts`
- Create: `src/hooks.server.ts`
- Create: `messages/it.json`
- Create: `messages/en.json`
- Create: `messages/es.json`
- Create: `messages/pt.json`

**Step 1: Install Paraglide**

Run: `bun add @inlang/paraglide-js`

**Step 2: Create inlang project settings**

Create `project.inlang/settings.json`:
```json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "sourceLanguageTag": "it",
  "languageTags": ["it", "en", "es", "pt"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-without-source@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@latest/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{languageTag}.json"
  }
}
```

**Step 3: Add Paraglide Vite plugin**

Modify `vite.config.ts`:
```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale']
		}),
		sveltekit()
	]
});
```

**Step 4: Update app.html for dynamic lang attribute**

Change `src/app.html` line 2 from:
```html
<html lang="it">
```
to:
```html
<html lang="%lang%">
```

**Step 5: Create hooks.ts (reroute)**

Create `src/hooks.ts`:
```typescript
import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';

export const reroute: Reroute = (request) => {
	return deLocalizeUrl(request.url).pathname;
};
```

**Step 6: Create hooks.server.ts (handle)**

Create `src/hooks.server.ts`:
```typescript
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

export const handle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', locale)
		});
	});
```

**Step 7: Create initial message files with a small set of UI strings**

Create `messages/it.json`:
```json
{
  "nav_wiki": "Wiki",
  "nav_opinions": "Opinioni",
  "nav_quiz": "Quiz",
  "nav_about": "Chi Siamo",
  "search_placeholder": "Cerca nel sito...",
  "search_placeholder_hero": "Cos'è la disforia? Chi è Laverne Cox?",
  "menu_open": "Apri menu",
  "menu_close": "Chiudi menu"
}
```

Create `messages/en.json`:
```json
{
  "nav_wiki": "Wiki",
  "nav_opinions": "Opinions",
  "nav_quiz": "Quiz",
  "nav_about": "About Us",
  "search_placeholder": "Search the site...",
  "search_placeholder_hero": "What is dysphoria? Who is Laverne Cox?",
  "menu_open": "Open menu",
  "menu_close": "Close menu"
}
```

Create `messages/es.json`:
```json
{
  "nav_wiki": "Wiki",
  "nav_opinions": "Opiniones",
  "nav_quiz": "Quiz",
  "nav_about": "Quiénes Somos",
  "search_placeholder": "Buscar en el sitio...",
  "search_placeholder_hero": "¿Qué es la disforia? ¿Quién es Laverne Cox?",
  "menu_open": "Abrir menú",
  "menu_close": "Cerrar menú"
}
```

Create `messages/pt.json`:
```json
{
  "nav_wiki": "Wiki",
  "nav_opinions": "Opiniões",
  "nav_quiz": "Quiz",
  "nav_about": "Quem Somos",
  "search_placeholder": "Pesquisar no site...",
  "search_placeholder_hero": "O que é disforia? Quem é Laverne Cox?",
  "menu_open": "Abrir menu",
  "menu_close": "Fechar menu"
}
```

**Step 8: Add `src/lib/paraglide/` to .gitignore**

Append to `.gitignore`:
```
src/lib/paraglide/
```

**Step 9: Run dev server to generate paraglide output**

Run: `bun run dev`
Expected: Paraglide generates `src/lib/paraglide/` with `messages.js`, `runtime.js`, `server.js`

**Step 10: Verify build works**

Run: `bun run build`
Expected: Build completes without errors

**Step 11: Commit**

```bash
git add project.inlang/ messages/ src/hooks.ts src/hooks.server.ts vite.config.ts src/app.html .gitignore
git commit -m "feat: install and configure Paraglide JS for i18n (it, en, es, pt)"
```

---

### Task 2: Extract all UI strings to Paraglide messages

**Files:**
- Modify: `messages/it.json` (add all UI strings)
- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Modify: `messages/pt.json`

**Step 1: Audit all hardcoded Italian strings across components**

Read all component files and list every user-facing Italian string. Key files:
- `src/lib/components/ui/Navbar.svelte` — nav links, aria labels, search placeholder
- `src/lib/components/ui/Footer.svelte` — "Navigazione", "Legale", copyright, newsletter CTA, all link labels
- `src/lib/components/wiki/WikiLayout.svelte` — "Wiki", category labels, "Domande frequenti", "Fonti", "Approfondimenti", "Cronologia modifiche", reading time, date labels, media type labels, email CTA, "Generato con AI"
- `src/routes/+page.svelte` — hero text, myths, category names, CTAs, section headings
- `src/routes/wiki/+page.svelte` — page title, search UI, category filter labels
- `src/routes/wiki/[slug]/+page.ts` — error message "Articolo non trovato"
- `src/routes/quiz/` — quiz UI strings
- `src/routes/glossario/` — glossary page strings
- `src/routes/chi-siamo/`, `famiglie/`, `giovani/` — full page content
- `src/lib/components/ui/ShareButtons.svelte` — share text
- `src/lib/components/ui/CookieBanner.svelte` — cookie consent text
- `src/lib/components/ui/ChatWidget.svelte` — chat UI text

**Step 2: Add all strings to messages/it.json**

This is the full extraction. Organize by component/section with flat keys using underscores. Example structure:

```json
{
  "nav_wiki": "Wiki",
  "nav_opinions": "Opinioni",
  "nav_quiz": "Quiz",
  "nav_about": "Chi Siamo",
  "search_placeholder": "Cerca nel sito...",
  "search_placeholder_hero": "Cos'è la disforia? Chi è Laverne Cox?",
  "menu_open": "Apri menu",
  "menu_close": "Chiudi menu",

  "footer_nav": "Navigazione",
  "footer_legal": "Legale",
  "footer_tagline": "Scienza, storie e cultura trans.",
  "footer_copyright": "© 2026 Tra i Due",
  "footer_privacy": "Privacy Policy",
  "footer_cookie": "Cookie Policy",
  "footer_terms": "Termini di Utilizzo",
  "footer_license": "Licenza Apache 2.0",
  "footer_newsletter_title": "Resta aggiornato",
  "footer_newsletter_desc": "Nuovi articoli e aggiornamenti. Niente spam, solo fatti.",
  "footer_newsletter_cta": "Iscriviti",
  "footer_glossary": "Glossario",
  "footer_regions": "Regioni",
  "footer_why_ai": "Perché l'AI",

  "wiki_breadcrumb": "Wiki",
  "wiki_faq_title": "Domande frequenti",
  "wiki_sources_title": "Fonti",
  "wiki_deepdive_title": "Approfondimenti",
  "wiki_changelog_title": "Cronologia modifiche",
  "wiki_reading_time": "{minutes} min di lettura",
  "wiki_sources_cited": "{count} fonti citate",
  "wiki_updated": "Aggiornato {date}",
  "wiki_published": "Pubblicato {date}",
  "wiki_generated_ai": "Generato con AI",
  "wiki_copy_link": "Copia link alla sezione",
  "wiki_deepdive_link": "Approfondisci",
  "wiki_email_cta_title": "Ti è stato utile?",
  "wiki_email_cta_desc": "Nuovi articoli e aggiornamenti. Niente spam, solo fatti.",
  "wiki_email_cta_button": "Resta aggiornato",
  "wiki_not_found": "Articolo non trovato",
  "wiki_llm_button_title": "Visualizza come markdown (per LLM e AI agent)",

  "media_libro": "Libro",
  "media_film": "Film",
  "media_serie": "Serie TV",
  "media_documentario": "Documentario",
  "media_podcast": "Podcast",

  "relative_today": "oggi",
  "relative_yesterday": "ieri",
  "relative_days_ago": "{days} giorni fa",
  "relative_week_ago": "una settimana fa",
  "relative_weeks_ago": "{weeks} settimane fa",
  "relative_month_ago": "un mese fa",
  "relative_months_ago": "{months} mesi fa",

  "home_hero_subtitle": "Fatti scientifici e storie di chi sta cambiando il mondo.",
  "home_hero_desc": "{articles} articoli, {sources}+ fonti scientifiche. La risorsa in italiano più completa sulle tematiche trans.",
  "home_explore_articles": "Esplora gli articoli",
  "home_take_quiz": "Mettiti alla prova",
  "home_persona_family_title": "Sei un genitore o familiare",
  "home_persona_family_desc": "Come supportare tuo figlio o una persona cara nel suo percorso.",
  "home_persona_youth_title": "Sei un/a adolescente",
  "home_persona_youth_desc": "Risorse pensate per te: informazioni chiare, senza giudizio.",
  "home_persona_pro_title": "Sei un/a professionista",
  "home_persona_pro_desc": "Evidenze scientifiche e fonti peer-reviewed per il tuo lavoro.",
  "home_featured_title": "Da leggere",
  "home_all": "Tutti",
  "home_all_articles": "Tutti gli articoli",
  "home_people_title": "Imprenditori, artisti, avvocati, scienziati. E molto altro.",
  "home_people_desc": "Le persone trans stanno ricoprendo ruoli chiave nella società. Noi raccontiamo le loro storie, con i fatti.",
  "home_all_stories": "Tutte le storie",

  "cat_terminologia": "Terminologia",
  "cat_scienza": "Scienza",
  "cat_percorsi": "Percorsi",
  "cat_cultura": "Cultura",
  "cat_persone": "Persone"
}
```

**Step 3: Create EN, ES, PT translations**

Translate each key into the target language. Use the same key structure.

**Step 4: Verify by running dev server**

Run: `bun run dev`
Expected: No compilation errors. Paraglide regenerates output with new keys.

**Step 5: Commit**

```bash
git add messages/
git commit -m "feat: extract all UI strings to Paraglide message files (it, en, es, pt)"
```

---

### Task 3: Update Navbar with Paraglide messages + language switcher

**Files:**
- Modify: `src/lib/components/ui/Navbar.svelte`
- Create: `src/lib/components/ui/LanguageSwitcher.svelte`

**Step 1: Create LanguageSwitcher component**

Create `src/lib/components/ui/LanguageSwitcher.svelte`:
```svelte
<script lang="ts">
	import { locales, getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/state';

	const localeLabels: Record<string, string> = {
		it: 'IT',
		en: 'EN',
		es: 'ES',
		pt: 'PT'
	};

	let open = $state(false);

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}
</script>

<div class="relative">
	<button
		onclick={toggle}
		class="flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors"
		aria-label="Change language"
		aria-expanded={open}
	>
		{localeLabels[getLocale()] ?? getLocale().toUpperCase()}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
			<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
		</svg>
	</button>
	{#if open}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fixed inset-0 z-40" onclick={close} onkeydown={(e) => e.key === 'Escape' && close()}></div>
		<div class="absolute right-0 top-full mt-1 z-50 bg-bg border border-border rounded-lg shadow-md py-1 min-w-[80px]">
			{#each locales as locale}
				<a
					href={localizeHref(page.url.pathname, { locale })}
					data-sveltekit-reload
					onclick={close}
					class="block px-3 py-1.5 text-sm transition-colors {locale === getLocale() ? 'text-primary font-medium' : 'text-muted hover:text-primary'}"
				>
					{localeLabels[locale] ?? locale.toUpperCase()}
				</a>
			{/each}
		</div>
	{/if}
</div>
```

**Step 2: Update Navbar.svelte to use Paraglide messages + LanguageSwitcher**

Replace hardcoded strings in `src/lib/components/ui/Navbar.svelte`:

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import type { WikiArticle } from '$lib/utils/wiki';
	import Logo from './Logo.svelte';
	import SearchInput from './SearchInput.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	// ... (rest of props stay the same)

	const navLinks = $derived([
		{ href: '/wiki', label: m.nav_wiki() },
		{ href: '/editoriali', label: m.nav_opinions() },
		{ href: '/quiz', label: m.nav_quiz() },
		{ href: '/chi-siamo', label: m.nav_about() }
	]);
```

Add `<LanguageSwitcher />` next to `<ThemeToggle />` in both desktop and mobile layouts.

Update search placeholder: `placeholder={m.search_placeholder()}`

Update aria-labels: `aria-label={mobileMenuOpen ? m.menu_close() : m.menu_open()}`

**Step 3: Verify navbar renders correctly in all languages**

Run: `bun run dev`
Navigate to `/`, `/en`, `/es`, `/pt` and verify navbar text changes.

**Step 4: Commit**

```bash
git add src/lib/components/ui/Navbar.svelte src/lib/components/ui/LanguageSwitcher.svelte
git commit -m "feat: internationalize Navbar with Paraglide + add language switcher"
```

---

### Task 4: Update Footer with Paraglide messages

**Files:**
- Modify: `src/lib/components/ui/Footer.svelte`

**Step 1: Replace all hardcoded Italian strings with Paraglide message calls**

Import `* as m from '$lib/paraglide/messages'` and replace:
- "Scienza, storie e cultura trans." → `m.footer_tagline()`
- "Navigazione" → `m.footer_nav()`
- "Legale" → `m.footer_legal()`
- All link labels, CTA text, copyright
- Newsletter CTA text

**Step 2: Verify footer in all locales**

Run: `bun run dev`, check `/en`, `/es`, `/pt`

**Step 3: Commit**

```bash
git add src/lib/components/ui/Footer.svelte
git commit -m "feat: internationalize Footer with Paraglide messages"
```

---

### Task 5: Restructure wiki content for multi-language support

**Files:**
- Move: `src/content/wiki/{category}/*.md` → `src/content/wiki/it/{category}/*.md`
- Modify: Each article's frontmatter to add `lang` and `translationKey`
- Modify: `src/lib/utils/wiki.ts`

**Step 1: Move existing articles into `it/` subdirectory**

```bash
cd src/content/wiki
for category in cultura percorsi persone scienza terminologia; do
  mkdir -p "it/$category"
  mv "$category"/*.md "it/$category/"
  rmdir "$category"
done
```

**Step 2: Add `lang` and `translationKey` to each article's frontmatter**

For each `.md` file in `src/content/wiki/it/`, add two frontmatter fields:
- `lang: it`
- `translationKey:` — use the slug as the translationKey (e.g., `translationKey: "disforia-di-genere"`)

This can be scripted:
```bash
for file in src/content/wiki/it/**/*.md; do
  slug=$(basename "$file" .md)
  # Insert lang and translationKey after the first ---
  sed -i '' "2i\\
lang: \"it\"\\
translationKey: \"$slug\"
" "$file"
done
```

**Step 3: Update `src/lib/utils/wiki.ts` to be locale-aware**

```typescript
export interface WikiArticle {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	date: string;
	updated: string;
	image?: string;
	sources: { title: string; url: string; year: number }[];
	faq?: { question: string; answer: string }[];
	media?: { type: string; title: string; url?: string; year?: number }[];
	changelog?: { date: string; changes: string[] }[];
	related: string[];
	lang?: string;
	translationKey?: string;
}

export interface WikiEntry {
	metadata: WikiArticle;
	default: import('svelte').Component;
}

const modules = import.meta.glob<WikiEntry>('/src/content/wiki/**/*.md', { eager: true });

function getLangFromPath(path: string): string {
	// path: /src/content/wiki/{lang}/{category}/{slug}.md
	const parts = path.split('/');
	// parts: ['', 'src', 'content', 'wiki', lang, category, 'slug.md']
	return parts[4] ?? 'it';
}

export function getAllArticles(lang: string = 'it'): WikiArticle[] {
	const articles: WikiArticle[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const fileLang = getLangFromPath(path);
		if (fileLang !== lang) continue;

		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		articles.push({
			...module.metadata,
			slug,
			lang: fileLang
		});
	}

	return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string, lang: string = 'it'): WikiEntry | null {
	for (const [path, module] of Object.entries(modules)) {
		const fileLang = getLangFromPath(path);
		if (fileLang !== lang) continue;

		const fileSlug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (fileSlug === slug) {
			return module;
		}
	}

	return null;
}

export function getRawArticleBySlug(slug: string, lang: string = 'it'): string | null {
	const rawModules = import.meta.glob<string>('/src/content/wiki/**/*.md', { eager: true, query: '?raw', import: 'default' });

	for (const [path, content] of Object.entries(rawModules)) {
		const fileLang = getLangFromPath(path);
		if (fileLang !== lang) continue;

		const fileSlug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (fileSlug === slug) {
			return content;
		}
	}

	return null;
}

export function getTranslations(translationKey: string): Record<string, WikiArticle> {
	const result: Record<string, WikiArticle> = {};

	for (const [path, module] of Object.entries(modules)) {
		if (module.metadata.translationKey === translationKey) {
			const lang = getLangFromPath(path);
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			result[lang] = { ...module.metadata, slug, lang };
		}
	}

	return result;
}
```

**Step 4: Verify articles still load correctly**

Run: `bun run dev`
Navigate to `/wiki` — articles should still appear (loading from `it/` subfolder now).

**Step 5: Commit**

```bash
git add src/content/wiki/ src/lib/utils/wiki.ts
git commit -m "feat: restructure wiki content into per-language directories, make wiki.ts locale-aware"
```

---

### Task 6: Update wiki routes to pass locale

**Files:**
- Modify: `src/routes/+layout.server.ts`
- Modify: `src/routes/wiki/[slug]/+page.ts`
- Modify: `src/routes/wiki/+page.server.ts`
- Modify: `src/routes/+page.server.ts`

**Step 1: Pass locale to data loaders**

The key challenge: getting the current locale in load functions. Use `getLocale()` from Paraglide runtime.

Update `src/routes/+layout.server.ts`:
```typescript
import { getAllArticles } from '$lib/utils/wiki';
import { getAllQuizzes } from '$lib/utils/quiz';
import { getLocale } from '$lib/paraglide/runtime';

export function load() {
	const lang = getLocale();
	const articles = getAllArticles(lang);
	const quizzes = getAllQuizzes(lang);
	return {
		allArticles: articles,
		allQuizzes: quizzes,
		lang
	};
}
```

Update `src/routes/wiki/[slug]/+page.ts`:
```typescript
import { getAllArticles, getArticleBySlug, getTranslations } from '$lib/utils/wiki';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export function entries() {
	// Generate entries for ALL languages
	const allLangs = ['it', 'en', 'es', 'pt'];
	const entries: { slug: string }[] = [];
	for (const lang of allLangs) {
		for (const a of getAllArticles(lang)) {
			entries.push({ slug: a.slug });
		}
	}
	return entries;
}

export const prerender = true;

export function load({ params }) {
	const lang = getLocale();
	const article = getArticleBySlug(params.slug, lang);
	if (!article) {
		error(404, 'Article not found');
	}

	const allArticles = getAllArticles(lang);
	const relatedArticles = (article.metadata.related ?? [])
		.map((slug: string) => allArticles.find((a) => a.slug === slug))
		.filter((a): a is NonNullable<typeof a> => a != null)
		.map(({ slug, title, description, category, image, sources }) => ({ slug, title, description, category, image, sources }));

	const translations = article.metadata.translationKey
		? getTranslations(article.metadata.translationKey)
		: {};

	return {
		metadata: article.metadata,
		Content: article.default,
		relatedArticles,
		translations
	};
}
```

**Step 2: Verify article pages load**

Run: `bun run dev`
Navigate to `/wiki/disforia-di-genere` — should work as before.

**Step 3: Commit**

```bash
git add src/routes/+layout.server.ts src/routes/wiki/ src/routes/+page.server.ts
git commit -m "feat: pass locale to wiki data loaders, support translations lookup"
```

---

### Task 7: Update WikiLayout.svelte with Paraglide messages

**Files:**
- Modify: `src/lib/components/wiki/WikiLayout.svelte`

**Step 1: Replace all hardcoded Italian strings**

Import `* as m from '$lib/paraglide/messages'` and replace:
- `mediaLabels` object → use `m.media_libro()`, etc.
- `'Copia link alla sezione'` → `m.wiki_copy_link()`
- `'Domande frequenti'` → `m.wiki_faq_title()`
- `'Fonti'` → `m.wiki_sources_title()`
- `'Approfondimenti'` → `m.wiki_deepdive_title()`
- `'Cronologia modifiche'` → `m.wiki_changelog_title()`
- `'{readingTime} min di lettura'` → `m.wiki_reading_time({ minutes: readingTime })`
- `'{sources.length} fonti citate'` → `m.wiki_sources_cited({ count: sources.length })`
- `relativeDate()` function → use Paraglide messages for time labels
- `'Generato con AI'` → `m.wiki_generated_ai()`
- `'Ti è stato utile?'` → `m.wiki_email_cta_title()`
- CTA text → `m.wiki_email_cta_button()`
- `'Approfondisci'` → `m.wiki_deepdive_link()`
- Date formatting: use `getLocale()` for `toLocaleDateString()`

**Step 2: Update relativeDate function to use locale-aware messages**

```typescript
import { getLocale } from '$lib/paraglide/runtime';

function relativeDate(dateStr: string): string {
	const now = new Date();
	const d = new Date(dateStr);
	const diffMs = now.getTime() - d.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return m.relative_today();
	if (diffDays === 1) return m.relative_yesterday();
	if (diffDays < 7) return m.relative_days_ago({ days: diffDays });
	if (diffDays < 14) return m.relative_week_ago();
	if (diffDays < 30) return m.relative_weeks_ago({ weeks: Math.floor(diffDays / 7) });
	if (diffDays < 60) return m.relative_month_ago();
	if (diffDays < 365) return m.relative_months_ago({ months: Math.floor(diffDays / 30) });

	const locale = getLocale();
	const localeMap: Record<string, string> = { it: 'it-IT', en: 'en-US', es: 'es-ES', pt: 'pt-BR' };
	return d.toLocaleDateString(localeMap[locale] ?? 'it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
}
```

**Step 3: Verify WikiLayout renders correctly**

Run: `bun run dev`
Navigate to an article — all labels should show in current locale.

**Step 4: Commit**

```bash
git add src/lib/components/wiki/WikiLayout.svelte
git commit -m "feat: internationalize WikiLayout with Paraglide messages"
```

---

### Task 8: Update SEO.svelte for multi-language hreflang

**Files:**
- Modify: `src/lib/components/seo/SEO.svelte`

**Step 1: Add translations prop and multi-language hreflang**

```svelte
<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';

	let {
		title,
		description,
		url,
		image = 'https://www.traidue.com/images/wiki/identita-di-genere.webp',
		type = 'website',
		noindex = false,
		article,
		alternateUrls = {}
	}: {
		title: string;
		description: string;
		url: string;
		image?: string;
		type?: string;
		noindex?: boolean;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			section?: string;
			tags?: string[];
		};
		alternateUrls?: Record<string, string>;
	} = $props();

	const locale = getLocale();
	const ogLocaleMap: Record<string, string> = {
		it: 'it_IT',
		en: 'en_US',
		es: 'es_ES',
		pt: 'pt_BR'
	};
	const ogLocale = ogLocaleMap[locale] ?? 'it_IT';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{:else}
		<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	{/if}
	<link rel="canonical" href={url} />

	<!-- hreflang tags -->
	{#if Object.keys(alternateUrls).length > 0}
		{#each Object.entries(alternateUrls) as [lang, href]}
			<link rel="alternate" hreflang={lang} href={href} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={alternateUrls['it'] ?? url} />
	{:else}
		<link rel="alternate" hreflang={locale} href={url} />
		<link rel="alternate" hreflang="x-default" href={url} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:site_name" content="Tra i Due" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#if article}
		{#if article.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		{#if article.section}
			<meta property="article:section" content={article.section} />
		{/if}
		{#if article.tags}
			{#each article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}
</svelte:head>
```

**Step 2: Update all pages that use SEO.svelte to pass `alternateUrls`**

For wiki articles (in `src/routes/wiki/[slug]/+page.svelte`), build alternateUrls from the `translations` data:
```typescript
const alternateUrls = Object.fromEntries(
	Object.entries(data.translations).map(([lang, article]) => [
		lang,
		lang === 'it'
			? `https://www.traidue.com/wiki/${article.slug}`
			: `https://www.traidue.com/${lang}/wiki/${article.slug}`
	])
);
```

For static pages, build alternateUrls using Paraglide's `localizeHref`:
```typescript
import { locales, localizeHref } from '$lib/paraglide/runtime';
const alternateUrls = Object.fromEntries(
	locales.map(l => [l, `https://www.traidue.com${localizeHref('/', { locale: l })}`])
);
```

**Step 3: Commit**

```bash
git add src/lib/components/seo/SEO.svelte src/routes/
git commit -m "feat: update SEO component with multi-language hreflang and dynamic og:locale"
```

---

### Task 9: Update Homepage for i18n

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/+page.server.ts`

**Step 1: Replace all hardcoded strings on homepage with Paraglide messages**

Import `* as m from '$lib/paraglide/messages'` and replace:
- Hero subtitle, description, CTAs
- Persona card titles and descriptions
- Category names
- Section headings
- Myth claims and truths (these need message keys too)
- Schema.org text content

**Step 2: Update homepage server load to be locale-aware**

The `+page.server.ts` should pass the current locale to `getAllArticles()`.

**Step 3: Verify homepage in all 4 languages**

Run: `bun run dev`
Check `/`, `/en`, `/es`, `/pt`

**Step 4: Commit**

```bash
git add src/routes/+page.svelte src/routes/+page.server.ts
git commit -m "feat: internationalize homepage with Paraglide messages"
```

---

### Task 10: Restructure quiz data for multi-language

**Files:**
- Move: `src/lib/data/quiz/*.json` → `src/lib/data/quiz/it/*.json`
- Modify: `src/lib/utils/quiz.ts`

**Step 1: Move quiz files into `it/` subdirectory**

```bash
mkdir -p src/lib/data/quiz/it
mv src/lib/data/quiz/*.json src/lib/data/quiz/it/
```

**Step 2: Update quiz.ts to be locale-aware**

```typescript
const allModules = import.meta.glob<{ default: Quiz }>('/src/lib/data/quiz/**/*.json', { eager: true });

function getLangFromQuizPath(path: string): string {
	// path: /src/lib/data/quiz/{lang}/{slug}.json
	const parts = path.split('/');
	return parts[5] ?? 'it';
}

export function getAllQuizzes(lang: string = 'it'): Quiz[] {
	return Object.entries(allModules)
		.filter(([path]) => getLangFromQuizPath(path) === lang)
		.map(([, m]) => m.default);
}

export function getQuizBySlug(slug: string, lang: string = 'it'): Quiz | null {
	const quizzes = getAllQuizzes(lang);
	return quizzes.find(q => q.slug === slug) ?? null;
}
```

**Step 3: Update quiz routes to pass locale**

Update `src/routes/quiz/[slug]/+page.server.ts` to use `getLocale()`.

**Step 4: Commit**

```bash
git add src/lib/data/quiz/ src/lib/utils/quiz.ts src/routes/quiz/
git commit -m "feat: restructure quiz data for multi-language support"
```

---

### Task 11: Restructure glossary for multi-language

**Files:**
- Move: `src/lib/data/glossary.ts` → `src/lib/data/glossary/it.ts`
- Create: `src/lib/data/glossary/index.ts`
- Modify: `src/lib/components/wiki/WikiLayout.svelte` (glossary import)
- Modify: `src/routes/glossario/+page.svelte`

**Step 1: Move glossary into per-language files**

Move `src/lib/data/glossary.ts` to `src/lib/data/glossary/it.ts`.

Create `src/lib/data/glossary/index.ts`:
```typescript
import { glossaryTerms as it } from './it';

export type { GlossaryTerm } from './it';

const glossaries: Record<string, typeof it> = { it };

// Lazy-load other languages when they're added
// import { glossaryTerms as en } from './en';
// glossaries.en = en;

export function getGlossaryTerms(lang: string = 'it'): typeof it {
	return glossaries[lang] ?? glossaries.it ?? [];
}
```

**Step 2: Update imports in WikiLayout.svelte and glossario page**

Replace `import { glossaryTerms } from '$lib/data/glossary'` with:
```typescript
import { getGlossaryTerms } from '$lib/data/glossary';
import { getLocale } from '$lib/paraglide/runtime';

const glossaryTerms = $derived(getGlossaryTerms(getLocale()));
```

**Step 3: Commit**

```bash
git add src/lib/data/glossary/ src/lib/components/wiki/WikiLayout.svelte src/routes/glossario/
git commit -m "feat: restructure glossary for multi-language support"
```

---

### Task 12: Update sitemap for multi-language with xhtml:link alternates

**Files:**
- Modify: `src/routes/sitemap.xml/+server.ts`

**Step 1: Update sitemap to include all language versions**

Add `xmlns:xhtml` namespace and generate `<xhtml:link>` alternate entries for each URL that has translations.

```typescript
const langs = ['it', 'en', 'es', 'pt'];

function localizeUrl(url: string, lang: string): string {
	if (lang === 'it') return `https://www.traidue.com${url}`;
	return `https://www.traidue.com/${lang}${url}`;
}

// For each page, generate xhtml:link alternates
function alternateLinks(url: string): string {
	return langs
		.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${localizeUrl(url, l)}" />`)
		.join('\n');
}
```

Update the XML namespace:
```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
```

For wiki articles, use `getTranslations()` to find the correct translated slug for each language.

**Step 2: Verify sitemap output**

Run: `bun run dev`
Fetch `/sitemap.xml` and verify xhtml:link alternates appear.

**Step 3: Commit**

```bash
git add src/routes/sitemap.xml/+server.ts
git commit -m "feat: update sitemap with multi-language xhtml:link alternates"
```

---

### Task 13: Update OG image generation for locale

**Files:**
- Modify: `src/routes/og/[slug].png/+server.ts`

**Step 1: Add locale-aware category labels**

The OG image generator uses category names. Add a mapping:
```typescript
const categoryLabels: Record<string, Record<string, string>> = {
	it: { terminologia: 'Terminologia', scienza: 'Scienza', percorsi: 'Percorsi', cultura: 'Cultura', persone: 'Persone' },
	en: { terminologia: 'Terminology', scienza: 'Science', percorsi: 'Pathways', cultura: 'Culture', persone: 'People' },
	es: { terminologia: 'Terminología', scienza: 'Ciencia', percorsi: 'Recorridos', cultura: 'Cultura', persone: 'Personas' },
	pt: { terminologia: 'Terminologia', scienza: 'Ciência', percorsi: 'Percursos', cultura: 'Cultura', persone: 'Pessoas' }
};
```

Accept a `lang` query parameter in the OG route, defaulting to `it`.

**Step 2: Commit**

```bash
git add src/routes/og/
git commit -m "feat: locale-aware OG image generation"
```

---

### Task 14: Update remaining pages (chi-siamo, famiglie, giovani, etc.)

**Files:**
- Modify: `src/routes/chi-siamo/+page.svelte`
- Modify: `src/routes/famiglie/+page.svelte`
- Modify: `src/routes/giovani/+page.svelte`
- Modify: `src/routes/glossario/+page.svelte`
- Modify: `src/routes/newsletter/+page.svelte`
- Modify: `src/routes/perche-ai/+page.svelte`
- Modify: `src/routes/cookie/+page.svelte`
- Modify: `src/routes/privacy/+page.svelte`
- Modify: `src/routes/termini/+page.svelte`

**Step 1: For each page, extract Italian text into Paraglide messages**

Each page has its own content. Add keys to `messages/{lang}.json` for each page:
- `about_title`, `about_desc`, `about_content_*` (for paragraphs)
- `family_title`, `family_desc`, `family_content_*`
- etc.

**Step 2: Replace hardcoded text with message calls**

Import `* as m from '$lib/paraglide/messages'` and replace all Italian strings.

**Step 3: Update SEO tags on each page to pass `alternateUrls`**

Each page should build alternateUrls for hreflang:
```typescript
import { locales, localizeHref } from '$lib/paraglide/runtime';
const alternateUrls = Object.fromEntries(
	locales.map(l => [l, `https://www.traidue.com${localizeHref('/chi-siamo', { locale: l })}`])
);
```

**Step 4: Verify each page in all 4 languages**

**Step 5: Commit**

```bash
git add src/routes/ messages/
git commit -m "feat: internationalize all static pages with Paraglide messages"
```

---

### Task 15: Create translated article content (1 sample article per language)

**Files:**
- Create: `src/content/wiki/en/terminologia/gender-dysphoria.md`
- Create: `src/content/wiki/es/terminologia/disforia-de-genero.md`
- Create: `src/content/wiki/pt/terminologia/disforia-de-genero.md`

**Step 1: Translate the sample article (disforia-di-genere)**

Create English version at `src/content/wiki/en/terminologia/gender-dysphoria.md`:
- Translate title, seoTitle, description, tags
- Set `lang: en`, `translationKey: "disforia-di-genere"`, `slug: "gender-dysphoria"`
- Translate the full article body
- Keep same sources (they're in English already)

Repeat for ES and PT.

**Step 2: Verify translation linking works**

Run: `bun run dev`
- Navigate to `/wiki/disforia-di-genere` — should show IT version
- Navigate to `/en/wiki/gender-dysphoria` — should show EN version
- Language switcher should link between versions

**Step 3: Commit**

```bash
git add src/content/wiki/en/ src/content/wiki/es/ src/content/wiki/pt/
git commit -m "feat: add sample translated article (disforia-di-genere) in en, es, pt"
```

---

### Task 16: Update LanguageSwitcher to use translationKey for wiki articles

**Files:**
- Modify: `src/lib/components/ui/LanguageSwitcher.svelte`

**Step 1: Accept optional translations prop**

The LanguageSwitcher needs to know the available translations for the current page (wiki articles). Add an optional `translations` prop:

```svelte
<script lang="ts">
	import { locales, getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/state';

	let {
		translations = {}
	}: {
		translations?: Record<string, { slug: string }>;
	} = $props();

	// ... rest of component

	function getHrefForLocale(locale: string): string {
		// If we have a translated version, link to it
		if (translations[locale]) {
			const slug = translations[locale].slug;
			if (locale === 'it') return `/wiki/${slug}`;
			return `/${locale}/wiki/${slug}`;
		}
		// Otherwise just localize the current path
		return localizeHref(page.url.pathname, { locale });
	}
</script>
```

Use `getHrefForLocale(locale)` instead of `localizeHref(page.url.pathname, { locale })` in the template.

**Step 2: Pass translations from wiki article pages**

In `src/routes/wiki/[slug]/+page.svelte`, pass `translations` prop to the layout/navbar so it can reach the LanguageSwitcher. This may require passing it through the layout or using a Svelte context/store.

**Step 3: Commit**

```bash
git add src/lib/components/ui/LanguageSwitcher.svelte src/routes/wiki/
git commit -m "feat: language switcher uses translationKey for wiki article linking"
```

---

### Task 17: Bulk translate remaining articles

**Files:**
- Create: All translated articles in `src/content/wiki/{en,es,pt}/` directories

**Step 1: Create a translation script**

Create a helper script `scripts/translate-articles.ts` that:
1. Reads all IT articles from `src/content/wiki/it/`
2. For each article, generates translations using AI (or serves as a template for manual translation)
3. Creates the target files with correct frontmatter (translated slug, lang, translationKey)

This can be done incrementally — translate the most important/high-traffic articles first.

**Step 2: Execute translations**

Run the script or manually translate articles, starting with the most important ones.

**Step 3: Verify all translated articles load**

Run: `bun run build`
Expected: All language versions prerender correctly.

**Step 4: Commit**

```bash
git add src/content/wiki/
git commit -m "feat: add translated wiki articles for en, es, pt"
```

---

### Task 18: Final integration testing and build verification

**Files:** None new — this is a verification task.

**Step 1: Run full build**

Run: `bun run build`
Expected: Build succeeds with all localized pages prerendered.

**Step 2: Run type checking**

Run: `bun run check`
Expected: No TypeScript errors.

**Step 3: Test all critical paths**

Manually verify:
- [ ] Homepage loads in IT (no prefix), EN (`/en`), ES (`/es`), PT (`/pt`)
- [ ] Wiki article loads in all 4 languages with correct content
- [ ] Language switcher correctly links between translated articles
- [ ] Language switcher correctly links between static pages
- [ ] Navbar/Footer show translated text
- [ ] hreflang tags are correct in page source
- [ ] og:locale changes per language
- [ ] `<html lang>` attribute is correct
- [ ] Search only shows articles in current language
- [ ] Sitemap includes all language URLs
- [ ] OG images render with correct locale text
- [ ] Quiz loads in correct language
- [ ] Glossary shows terms in correct language
- [ ] WikiLayout labels (reading time, sources, etc.) are translated

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: integration fixes for i18n"
```

---

### Task 19: Update memory and documentation

**Files:**
- Modify: Memory file about project patterns

**Step 1: Update project memory with i18n patterns**

Document:
- How to add a new language
- How to translate an article (create file, set frontmatter)
- Where UI strings live (messages/*.json)
- Paraglide import patterns
- Content loading with locale parameter

**Step 2: Commit**

```bash
git add docs/
git commit -m "docs: add i18n documentation"
```
