# Auto-News Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Sezione `/notizie` con editoriali auto-generati da notizie RSS, approvati via email, serviti da Supabase.

**Architecture:** Vercel cron 2x/giorno → fetch RSS → Gemini filtra e genera editoriale → salva bozze in Supabase → email Resend con link approva/scarta → frontend legge articoli pubblicati da Supabase.

**Tech Stack:** SvelteKit, Supabase, Gemini 2.5 Flash, Resend, Google News RSS

---

### Task 1: Dipendenza + env vars

**Files:**
- Modify: `package.json`

**Step 1: Installa resend**
```bash
bun add resend
```

**Step 2: Aggiungi env vars al `.env`**
```
RESEND_API_KEY=re_...
NEWS_NOTIFICATION_EMAIL=tuo@email.com
```

**Step 3: Commit**
```bash
git add package.json bun.lockb
git commit -m "chore: add resend dependency"
```

---

### Task 2: SQL — tabelle news

**Files:**
- Create: `docs/database/news-tables.sql`

**Step 1: Scrivi lo SQL**

```sql
-- Fonti RSS configurabili
CREATE TABLE news_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  feed_url TEXT NOT NULL UNIQUE,
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Articoli/bozze news
CREATE TABLE news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  source_url TEXT NOT NULL UNIQUE,
  source_title TEXT NOT NULL,
  source_date TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'rejected')),
  approval_token UUID DEFAULT gen_random_uuid(),
  tags TEXT[] DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  published_at TIMESTAMPTZ
);

CREATE INDEX idx_news_status ON news_articles (status);
CREATE INDEX idx_news_published ON news_articles (published_at DESC);
CREATE INDEX idx_news_token ON news_articles (approval_token) WHERE approval_token IS NOT NULL;
CREATE INDEX idx_news_source_url ON news_articles (source_url);

-- Seed fonti iniziali
INSERT INTO news_sources (name, feed_url) VALUES
  ('Google News IT - Trans', 'https://news.google.com/rss/search?q=transgender+OR+transessuale+OR+%22identit%C3%A0+di+genere%22+OR+%22disforia+di+genere%22&hl=it&gl=IT&ceid=IT:it'),
  ('Google News IT - Diritti', 'https://news.google.com/rss/search?q=%22diritti+civili%22+OR+%22unioni+civili%22+OR+LGBTQ+OR+%22legge+Zan%22&hl=it&gl=IT&ceid=IT:it'),
  ('Google News IT - Vita', 'https://news.google.com/rss/search?q=aborto+OR+eutanasia+OR+%22fine+vita%22+OR+%22testamento+biologico%22&hl=it&gl=IT&ceid=IT:it'),
  ('Google News EN - Global', 'https://news.google.com/rss/search?q=transgender+rights+OR+%22gender+identity%22+OR+%22LGBTQ+rights%22&hl=en&gl=US&ceid=US:en');
```

**Step 2: Esegui SQL nella Supabase SQL Editor**

**Step 3: Commit**
```bash
git add docs/database/news-tables.sql
git commit -m "docs: add news tables SQL"
```

---

### Task 3: RSS fetcher

**Files:**
- Create: `src/lib/server/rss.ts`

**Step 1: Crea il modulo RSS**

```typescript
import { supabase } from './supabase';

interface RSSItem {
	title: string;
	link: string;
	pubDate: string;
	description: string;
	sourceName: string;
}

export async function fetchAllFeeds(): Promise<RSSItem[]> {
	const { data: sources } = await supabase
		.from('news_sources')
		.select('name, feed_url')
		.eq('active', true);

	if (!sources?.length) return [];

	const allItems: RSSItem[] = [];

	for (const source of sources) {
		try {
			const res = await fetch(source.feed_url);
			const xml = await res.text();
			const items = parseRSS(xml, source.name);
			allItems.push(...items);
		} catch (e) {
			console.error(`RSS fetch failed for ${source.name}:`, e);
		}
	}

	return allItems;
}

function parseRSS(xml: string, sourceName: string): RSSItem[] {
	const items: RSSItem[] = [];
	const itemRegex = /<item>([\s\S]*?)<\/item>/g;
	let match;

	while ((match = itemRegex.exec(xml)) !== null) {
		const block = match[1];
		const title = extractTag(block, 'title');
		const link = extractTag(block, 'link');
		const pubDate = extractTag(block, 'pubDate');
		const description = extractTag(block, 'description');

		if (title && link) {
			items.push({
				title: decodeEntities(title),
				link,
				pubDate: pubDate || '',
				description: decodeEntities(description || ''),
				sourceName
			});
		}
	}

	return items;
}

function extractTag(xml: string, tag: string): string | null {
	const cdata = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
	const cdataMatch = cdata.exec(xml);
	if (cdataMatch) return cdataMatch[1].trim();

	const simple = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
	const simpleMatch = simple.exec(xml);
	return simpleMatch ? simpleMatch[1].trim() : null;
}

function decodeEntities(text: string): string {
	return text
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

export async function deduplicateItems(items: RSSItem[]): Promise<RSSItem[]> {
	if (!items.length) return [];

	const urls = items.map((i) => i.link);
	const { data: existing } = await supabase
		.from('news_articles')
		.select('source_url')
		.in('source_url', urls);

	const existingUrls = new Set(existing?.map((e) => e.source_url) ?? []);
	return items.filter((i) => !existingUrls.has(i.link));
}
```

**Step 2: Commit**
```bash
git add src/lib/server/rss.ts
git commit -m "feat: add RSS fetcher with deduplication"
```

---

### Task 4: Gemini news processor

**Files:**
- Create: `src/lib/server/news-generator.ts`

**Step 1: Crea il modulo**

```typescript
import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

interface RSSItem {
	title: string;
	link: string;
	pubDate: string;
	description: string;
	sourceName: string;
}

interface GeneratedArticle {
	title: string;
	slug: string;
	summary: string;
	content: string;
	tags: string[];
	sourceUrl: string;
	sourceTitle: string;
	sourceDate: string;
}

const SYSTEM_PROMPT = `Sei un editorialista esperto di diritti civili e tematiche LGBTQ+ per traidue.com, un sito informativo italiano.

COMPITO: Ricevi una lista di notizie. Per ognuna:
1. Decidi se è RILEVANTE (transgender, LGBTQ+, diritti civili, aborto, eutanasia, fine vita, identità di genere)
2. Se rilevante, genera un editoriale in italiano

TONO:
- Voce editoriale critica e attivista
- Indignazione quando serve (leggi restrittive, discriminazioni, dichiarazioni contrarie)
- Spirito critico sempre, anche sulle "buone notizie"
- Contestualizza per il pubblico italiano
- Se la notizia è dall'estero, spiega perché è rilevante anche per l'Italia

FORMATO RISPOSTA (JSON):
{
  "articles": [
    {
      "relevant": true,
      "title": "Titolo editoriale in italiano (max 80 char)",
      "slug": "slug-in-italiano-senza-accenti",
      "summary": "Riassunto di 2-3 frasi per la card preview",
      "content": "Editoriale di 300-500 parole in markdown. Includi contesto, analisi critica, e implicazioni. Usa ## per sottotitoli se necessario.",
      "tags": ["transgender", "diritti-civili"],
      "original_index": 0
    }
  ]
}

TAG VALIDI: transgender, lgbtq, diritti-civili, aborto, eutanasia, fine-vita, identita-di-genere, discriminazione, politica, internazionale, italia, sport, salute, cultura

Se una notizia NON è rilevante, includi { "relevant": false, "original_index": N }

Rispondi SOLO con JSON valido, nessun testo prima o dopo.`;

export async function processNewsItems(items: RSSItem[]): Promise<GeneratedArticle[]> {
	if (!items.length) return [];

	const itemsList = items
		.map((item, i) => `[${i}] "${item.title}" — ${item.sourceName}\n${item.description}`)
		.join('\n\n');

	const result = await model.generateContent({
		contents: [{ role: 'user', parts: [{ text: `Notizie da analizzare:\n\n${itemsList}` }] }],
		systemInstruction: { role: 'user', parts: [{ text: SYSTEM_PROMPT }] }
	});

	const text = result.response.text();

	let parsed: { articles: Array<{
		relevant: boolean;
		title?: string;
		slug?: string;
		summary?: string;
		content?: string;
		tags?: string[];
		original_index: number;
	}> };

	try {
		const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
		parsed = JSON.parse(jsonStr);
	} catch {
		console.error('Failed to parse Gemini response:', text.slice(0, 500));
		return [];
	}

	const generated: GeneratedArticle[] = [];

	for (const article of parsed.articles) {
		if (!article.relevant || !article.title || !article.content) continue;

		const source = items[article.original_index];
		if (!source) continue;

		generated.push({
			title: article.title,
			slug: article.slug || slugify(article.title),
			summary: article.summary || article.content.slice(0, 200),
			content: article.content,
			tags: article.tags || [],
			sourceUrl: source.link,
			sourceTitle: source.title,
			sourceDate: source.pubDate
		});
	}

	return generated;
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 80)
		.replace(/-$/, '');
}
```

**Step 2: Commit**
```bash
git add src/lib/server/news-generator.ts
git commit -m "feat: add Gemini news processor with editorial generation"
```

---

### Task 5: Email notification con Resend

**Files:**
- Create: `src/lib/server/news-email.ts`

**Step 1: Crea il modulo**

```typescript
import { RESEND_API_KEY, NEWS_NOTIFICATION_EMAIL } from '$env/static/private';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

interface NewsDraft {
	id: string;
	title: string;
	summary: string;
	sourceUrl: string;
	approvalToken: string;
}

export async function sendNewsDigest(drafts: NewsDraft[], baseUrl: string): Promise<void> {
	if (!drafts.length) return;

	const articlesHtml = drafts
		.map(
			(d) => `
<div style="margin-bottom: 32px; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
  <h2 style="margin: 0 0 8px; font-size: 18px;">${d.title}</h2>
  <p style="margin: 0 0 12px; color: #555;">${d.summary}</p>
  <p style="margin: 0 0 16px; font-size: 13px;">
    <a href="${d.sourceUrl}" style="color: #777;">Fonte originale</a>
  </p>
  <div>
    <a href="${baseUrl}/api/news/approve/${d.approvalToken}"
       style="display: inline-block; padding: 8px 20px; background: #111; color: #fff; text-decoration: none; border-radius: 4px; margin-right: 8px;">
      Approva
    </a>
    <a href="${baseUrl}/api/news/reject/${d.approvalToken}"
       style="display: inline-block; padding: 8px 20px; background: #fff; color: #111; text-decoration: none; border-radius: 4px; border: 1px solid #ccc;">
      Scarta
    </a>
  </div>
</div>`
		)
		.join('');

	await resend.emails.send({
		from: 'traidue.com <notizie@traidue.com>',
		to: NEWS_NOTIFICATION_EMAIL,
		subject: `${drafts.length} notizie da approvare — traidue.com`,
		html: `
<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 22px; margin-bottom: 24px;">Nuove notizie da approvare</h1>
  ${articlesHtml}
  <p style="margin-top: 32px; color: #999; font-size: 12px;">
    Le bozze non approvate entro 7 giorni verranno ignorate.
  </p>
</div>`
	});
}
```

**Step 2: Commit**
```bash
git add src/lib/server/news-email.ts
git commit -m "feat: add Resend email notification for news drafts"
```

---

### Task 6: Cron endpoint news

**Files:**
- Create: `src/routes/api/cron/news/+server.ts`
- Modify: `vercel.json`

**Step 1: Crea l'endpoint**

```typescript
import { CRON_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';
import { fetchAllFeeds, deduplicateItems } from '$lib/server/rss';
import { processNewsItems } from '$lib/server/news-generator';
import { sendNewsDigest } from '$lib/server/news-email';

export const GET: RequestHandler = async ({ request, url }) => {
	const auth = request.headers.get('authorization');
	if (auth !== `Bearer ${CRON_SECRET}`) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		// 1. Fetch RSS
		const allItems = await fetchAllFeeds();
		if (!allItems.length) return json({ ok: true, message: 'No RSS items' });

		// 2. Deduplica
		const newItems = await deduplicateItems(allItems);
		if (!newItems.length) return json({ ok: true, message: 'No new items' });

		// 3. Gemini filtra e genera
		const articles = await processNewsItems(newItems);
		if (!articles.length) return json({ ok: true, message: 'No relevant news' });

		// 4. Salva bozze in DB
		const drafts = [];
		for (const article of articles) {
			const { data, error } = await supabase
				.from('news_articles')
				.insert({
					title: article.title,
					slug: article.slug,
					summary: article.summary,
					content: article.content,
					source_url: article.sourceUrl,
					source_title: article.sourceTitle,
					source_date: article.sourceDate || null,
					tags: article.tags
				})
				.select('id, title, summary, source_url, approval_token')
				.single();

			if (error) {
				console.error(`Failed to insert article "${article.title}":`, error.message);
				continue;
			}

			drafts.push({
				id: data.id,
				title: data.title,
				summary: data.summary,
				sourceUrl: data.source_url,
				approvalToken: data.approval_token
			});
		}

		// 5. Email digest
		if (drafts.length) {
			const baseUrl = url.origin;
			await sendNewsDigest(drafts, baseUrl);
		}

		return json({ ok: true, drafted: drafts.length });
	} catch (e) {
		console.error('News cron error:', e);
		return json({ error: 'Internal error' }, { status: 500 });
	}
};
```

**Step 2: Aggiungi cron a vercel.json**

Aggiungi al array `crons`:
```json
{
  "path": "/api/cron/news",
  "schedule": "0 7,17 * * *"
}
```
(8:00 e 18:00 ora italiana = 7:00 e 17:00 UTC)

**Step 3: Commit**
```bash
git add src/routes/api/cron/news/+server.ts vercel.json
git commit -m "feat: add news cron endpoint (2x/day)"
```

---

### Task 7: Endpoint approvazione/rifiuto

**Files:**
- Create: `src/routes/api/news/approve/[token]/+server.ts`
- Create: `src/routes/api/news/reject/[token]/+server.ts`

**Step 1: Endpoint approve**

```typescript
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params;

	const { data, error } = await supabase
		.from('news_articles')
		.update({
			status: 'published',
			published_at: new Date().toISOString(),
			approval_token: null
		})
		.eq('approval_token', token)
		.eq('status', 'draft')
		.select('slug')
		.single();

	if (error || !data) {
		redirect(303, '/notizie?action=invalid');
	}

	redirect(303, `/notizie?action=approved&slug=${data.slug}`);
};
```

**Step 2: Endpoint reject**

```typescript
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params;

	const { error } = await supabase
		.from('news_articles')
		.update({
			status: 'rejected',
			approval_token: null
		})
		.eq('approval_token', token)
		.eq('status', 'draft');

	if (error) {
		redirect(303, '/notizie?action=invalid');
	}

	redirect(303, '/notizie?action=rejected');
};
```

**Step 3: Commit**
```bash
git add src/routes/api/news/approve src/routes/api/news/reject
git commit -m "feat: add news approve/reject endpoints"
```

---

### Task 8: Pagina lista `/notizie`

**Files:**
- Create: `src/routes/notizie/+page.server.ts`
- Create: `src/routes/notizie/+page.svelte`

**Step 1: Server load**

```typescript
import { supabase } from '$lib/server/supabase';

export const prerender = false;

export async function load({ url }) {
	const page = Number(url.searchParams.get('page') ?? '1');
	const tag = url.searchParams.get('tag');
	const perPage = 10;
	const offset = (page - 1) * perPage;

	let query = supabase
		.from('news_articles')
		.select('id, title, slug, summary, tags, source_url, source_title, published_at', { count: 'exact' })
		.eq('status', 'published')
		.order('published_at', { ascending: false })
		.range(offset, offset + perPage - 1);

	if (tag) {
		query = query.contains('tags', [tag]);
	}

	const { data: articles, count } = await query;

	const { data: allTags } = await supabase
		.from('news_articles')
		.select('tags')
		.eq('status', 'published');

	const uniqueTags = [...new Set((allTags ?? []).flatMap((a) => a.tags))].sort();

	return {
		articles: articles ?? [],
		totalPages: Math.ceil((count ?? 0) / perPage),
		currentPage: page,
		currentTag: tag,
		tags: uniqueTags
	};
}
```

**Step 2: Page component**

Svelte 5 page con:
- Hero: titolo "Notizie" + descrizione
- Filtro tag (bottoni come le categorie in `/wiki`)
- Griglia card: titolo, data, tag, riassunto, link a `/notizie/[slug]`
- Paginazione (precedente/successiva)
- Toast di conferma se `?action=approved|rejected|invalid` nel URL
- Design coerente: monochrome, Inter, stesse classi del wiki

**Step 3: Commit**
```bash
git add src/routes/notizie/
git commit -m "feat: add /notizie list page with tag filtering and pagination"
```

---

### Task 9: Pagina singola `/notizie/[slug]`

**Files:**
- Create: `src/routes/notizie/[slug]/+page.server.ts`
- Create: `src/routes/notizie/[slug]/+page.svelte`

**Step 1: Server load**

```typescript
import { supabase } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

export const prerender = false;

export async function load({ params }) {
	const { data: article } = await supabase
		.from('news_articles')
		.select('*')
		.eq('slug', params.slug)
		.eq('status', 'published')
		.single();

	if (!article) error(404, 'Notizia non trovata');

	return { article };
}
```

**Step 2: Page component**

Layout simile a WikiLayout ma semplificato:
- Breadcrumb: Home > Notizie > Titolo
- Titolo, data pubblicazione, tag come badge
- Contenuto markdown renderizzato (usa `{@html}` con marked o simile)
- Link "Fonte originale" alla notizia source
- ShareButtons in fondo
- Email CTA "Resta aggiornato"

**Step 3: Commit**
```bash
git add src/routes/notizie/[slug]/
git commit -m "feat: add /notizie/[slug] article page"
```

---

### Task 10: Navbar + Sitemap

**Files:**
- Modify: `src/lib/components/ui/Navbar.svelte`
- Modify: `src/routes/sitemap.xml/+server.ts`

**Step 1: Aggiungi "Notizie" alla navbar**

Nel array `navLinks` aggiungi:
```typescript
{ href: '/notizie', label: 'Notizie' }
```

**Step 2: Aggiungi notizie alla sitemap**

Query Supabase per tutti gli articoli pubblicati e aggiungili al sitemap XML.

**Step 3: Commit**
```bash
git add src/lib/components/ui/Navbar.svelte src/routes/sitemap.xml/+server.ts
git commit -m "feat: add Notizie to navbar and sitemap"
```

---

### Task 11: Markdown rendering per notizie

**Files:**
- Create: `src/lib/utils/markdown.ts`

**Step 1: Crea utility di rendering**

Serve un parser markdown per il contenuto delle notizie (che viene da DB, non da mdsvex). Usa `marked` (leggero):

```bash
bun add marked
```

```typescript
import { marked } from 'marked';

export function renderMarkdown(content: string): string {
	return marked.parse(content, { async: false }) as string;
}
```

**Step 2: Commit**
```bash
git add src/lib/utils/markdown.ts package.json bun.lockb
git commit -m "feat: add markdown renderer for news articles"
```

---

### Task 12: Test end-to-end manuale

**Step 1: Verifica SQL** — tabelle `news_sources` e `news_articles` create, seed inserito

**Step 2: Test cron locale**
```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:5173/api/cron/news
```
Atteso: JSON con `drafted: N`, email ricevuta con bozze

**Step 3: Test approvazione** — click su "Approva" nell'email, verifica redirect a `/notizie?action=approved`, articolo visibile in `/notizie`

**Step 4: Test rifiuto** — click su "Scarta", verifica che l'articolo non appaia

**Step 5: Test frontend** — navigazione `/notizie`, filtro tag, paginazione, pagina singola `/notizie/[slug]`

**Step 6: Deploy e verifica cron su Vercel**

---

## Riepilogo file

| # | Azione | File |
|---|--------|------|
| 1 | Dipendenza | `package.json` |
| 2 | SQL | `docs/database/news-tables.sql` |
| 3 | Crea | `src/lib/server/rss.ts` |
| 4 | Crea | `src/lib/server/news-generator.ts` |
| 5 | Crea | `src/lib/server/news-email.ts` |
| 6 | Crea | `src/routes/api/cron/news/+server.ts` |
| 6 | Modifica | `vercel.json` |
| 7 | Crea | `src/routes/api/news/approve/[token]/+server.ts` |
| 7 | Crea | `src/routes/api/news/reject/[token]/+server.ts` |
| 8 | Crea | `src/routes/notizie/+page.server.ts` |
| 8 | Crea | `src/routes/notizie/+page.svelte` |
| 9 | Crea | `src/routes/notizie/[slug]/+page.server.ts` |
| 9 | Crea | `src/routes/notizie/[slug]/+page.svelte` |
| 10 | Modifica | `src/lib/components/ui/Navbar.svelte` |
| 10 | Modifica | `src/routes/sitemap.xml/+server.ts` |
| 11 | Crea | `src/lib/utils/markdown.ts` |
