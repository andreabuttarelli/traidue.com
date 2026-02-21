/**
 * Test script for the full news pipeline.
 * Run: bun run scripts/test-news-pipeline.ts
 *
 * Requires SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY, RESEND_API_KEY,
 * NEWS_NOTIFICATION_EMAIL in .env
 */

import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';
import { Resend } from 'resend';
import sharp from 'sharp';

// --- Load env ---
const env = await loadEnv();

function requiredEnv(key: string): string {
	const val = env[key];
	if (!val) throw new Error(`Missing env var: ${key}`);
	return val;
}

async function loadEnv(): Promise<Record<string, string>> {
	const text = await Bun.file('.env').text();
	const result: Record<string, string> = {};
	for (const line of text.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eqIdx = trimmed.indexOf('=');
		if (eqIdx === -1) continue;
		result[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1).replace(/^["']|["']$/g, '');
	}
	return result;
}

const SUPABASE_URL = requiredEnv('SUPABASE_URL');
const SUPABASE_KEY = requiredEnv('SUPABASE_KEY');
const GEMINI_API_KEY = requiredEnv('GEMINI_API_KEY');
const RESEND_API_KEY = requiredEnv('RESEND_API_KEY');
const NEWS_NOTIFICATION_EMAIL = requiredEnv('NEWS_NOTIFICATION_EMAIL');
const BASE_URL = 'https://www.traidue.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
const genai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const resend = new Resend(RESEND_API_KEY);

// =============================================
// Step 1: Fetch RSS
// =============================================
console.log('\n=== STEP 1: Fetching RSS feeds ===');

const { data: sources } = await supabase
	.from('news_sources')
	.select('name, feed_url')
	.eq('active', true);

if (!sources?.length) {
	console.error('No active RSS sources found!');
	process.exit(1);
}
console.log(`Found ${sources.length} active sources: ${sources.map((s) => s.name).join(', ')}`);

interface RSSItem {
	title: string;
	link: string;
	pubDate: string;
	description: string;
	sourceName: string;
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

const allItems: RSSItem[] = [];
for (const source of sources) {
	try {
		const res = await fetch(source.feed_url, { signal: AbortSignal.timeout(10_000) });
		if (!res.ok) {
			console.error(`  ✗ ${source.name}: HTTP ${res.status}`);
			continue;
		}
		const xml = await res.text();
		const itemRegex = /<item>([\s\S]*?)<\/item>/g;
		let match;
		let count = 0;
		while ((match = itemRegex.exec(xml)) !== null) {
			const block = match[1];
			const title = extractTag(block, 'title');
			const link = extractTag(block, 'link');
			const pubDate = extractTag(block, 'pubDate');
			const description = extractTag(block, 'description');
			if (title && link) {
				allItems.push({
					title: decodeEntities(title),
					link,
					pubDate: pubDate || '',
					description: decodeEntities(description || ''),
					sourceName: source.name
				});
				count++;
			}
		}
		console.log(`  ✓ ${source.name}: ${count} items`);
	} catch (e: any) {
		console.error(`  ✗ ${source.name}: ${e.message}`);
	}
}

// Filter last 48h
const cutoff = Date.now() - 48 * 60 * 60 * 1000;
const recentItems = allItems.filter((item) => {
	if (!item.pubDate) return true;
	const parsed = new Date(item.pubDate).getTime();
	return !isNaN(parsed) && parsed >= cutoff;
});
console.log(`Total: ${allItems.length} items, ${recentItems.length} from last 48h`);

if (!recentItems.length) {
	console.log('No recent items, exiting.');
	process.exit(0);
}

// =============================================
// Step 2: Dedup by source_url
// =============================================
console.log('\n=== STEP 2: Deduplicating by source URL ===');

const urls = recentItems.map((i) => i.link);
const { data: existing } = await supabase
	.from('news_articles')
	.select('source_url')
	.in('source_url', urls);

const existingUrls = new Set(existing?.map((e) => e.source_url) ?? []);
const newItems = recentItems.filter((i) => !existingUrls.has(i.link));
console.log(`Deduped: ${recentItems.length} → ${newItems.length} new items (${existingUrls.size} already in DB)`);

if (!newItems.length) {
	console.log('No new items after dedup, exiting.');
	process.exit(0);
}

// =============================================
// Step 3: Fetch recent articles for cross-run dedup
// =============================================
console.log('\n=== STEP 3: Fetching recent articles for cross-run dedup ===');

const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
const { data: recentArticles } = await supabase
	.from('news_articles')
	.select('title')
	.gte('created_at', sevenDaysAgo)
	.order('created_at', { ascending: false });

const recentTitles = (recentArticles ?? []).map((r) => r.title);
console.log(`Found ${recentTitles.length} articles from last 7 days`);
if (recentTitles.length) {
	recentTitles.forEach((t) => console.log(`  - "${t}"`));
}

// =============================================
// Step 4: Gemini ranking
// =============================================
console.log('\n=== STEP 4: Ranking with Gemini ===');

const RANKING_PROMPT = `Sei un caporedattore esperto di diritti civili e tematiche LGBTQ+ per traidue.com, un sito informativo italiano.

COMPITO: Ricevi una lista di notizie. Devi:
1. Filtrare solo quelle RILEVANTI (transgender, LGBTQ+, diritti civili, aborto, eutanasia, fine vita, identità di genere)
2. Classificarle per URGENZA e IMPATTO — dalla più importante alla meno importante

CRITERI DI RANKING (dal più al meno prioritario):
- Nuove leggi, sentenze, o provvedimenti che impattano direttamente i diritti delle persone
- Dichiarazioni ufficiali di politici, istituzioni, o figure di rilievo
- Episodi di discriminazione, violenza, o ingiustizia documentati
- Avanzamenti significativi nei diritti (nuove tutele, riconoscimenti)
- Notizie internazionali con implicazioni dirette per l'Italia
- Ricerche scientifiche o accademiche rilevanti
- Notizie culturali, editoriali, o di costume

FORMATO RISPOSTA (JSON):
{
  "ranked": [
    {
      "original_index": 0,
      "relevance_score": 9,
      "reason": "Breve motivazione di 1 frase sul perché è importante"
    }
  ],
  "discarded": [
    {
      "original_index": 2,
      "reason": "Non rilevante: riguarda..."
    }
  ]
}

DEDUP TEMATICA:
- Se più notizie parlano dello STESSO fatto/evento (anche da fonti diverse, con titoli diversi), tienine solo UNA: quella con più dettagli o dalla fonte più autorevole
- Le altre vanno in "discarded" con reason "Duplicato tematico di [indice]"

ARTICOLI GIÀ PUBBLICATI:
- Riceverai anche una lista di articoli già pubblicati di recente sulla piattaforma
- Se una notizia tratta lo STESSO argomento/evento di un articolo già pubblicato, va in "discarded" con reason "Già trattato: [titolo articolo esistente]"
- Anche se l'angolazione è leggermente diversa, se il fatto di base è lo stesso, scartala
- Considera duplicato anche notizie che sono aggiornamenti minori di fatti già coperti

REGOLE:
- relevance_score da 1 (poco urgente) a 10 (massima urgenza)
- Ordina "ranked" dal punteggio più alto al più basso
- Includi SOLO notizie rilevanti in "ranked"
- Includi le non rilevanti in "discarded"
- Sii selettivo: non tutto è urgente`;

const itemsList = newItems
	.map((item, i) => `[${i}] "${item.title.slice(0, 200)}" — ${item.sourceName}\n${item.description.slice(0, 500)}`)
	.join('\n\n');

const alreadyPublished = recentTitles.length
	? `\n\nARTICOLI GIÀ PUBBLICATI SULLA PIATTAFORMA:\n${recentTitles.map((t) => `- "${t}"`).join('\n')}`
	: '';

const rankResult = await model.generateContent({
	contents: [{ role: 'user', parts: [{ text: `Notizie da classificare:\n\n${itemsList}${alreadyPublished}` }] }],
	systemInstruction: { role: 'user', parts: [{ text: RANKING_PROMPT }] },
	generationConfig: { responseMimeType: 'application/json' }
});

let rankParsed: {
	ranked: Array<{ original_index: number; relevance_score: number; reason: string }>;
	discarded?: Array<{ original_index: number; reason: string }>;
};

try {
	rankParsed = JSON.parse(rankResult.response.text());
} catch {
	console.error('Failed to parse ranking:', rankResult.response.text().slice(0, 500));
	process.exit(1);
}

const discardedCount = rankParsed.discarded?.length ?? 0;
console.log(`Ranked: ${rankParsed.ranked.length} relevant | Discarded: ${discardedCount}`);

if (rankParsed.discarded?.length) {
	console.log('\nDiscarded:');
	rankParsed.discarded.forEach((d) => console.log(`  [${d.original_index}] ${d.reason}`));
}

const sortedRanked = rankParsed.ranked
	.sort((a, b) => b.relevance_score - a.relevance_score)
	.slice(0, 3);

if (!sortedRanked.length) {
	console.log('No relevant items after ranking, exiting.');
	process.exit(0);
}

console.log('\nTop items:');
sortedRanked.forEach((r) =>
	console.log(`  [${r.original_index}] score=${r.relevance_score}: ${r.reason} → "${newItems[r.original_index]?.title?.slice(0, 80)}"`)
);

// =============================================
// Step 5: Generate editorials
// =============================================
console.log('\n=== STEP 5: Generating editorials ===');

const EDITORIAL_PROMPT = `Sei un editorialista esperto di diritti civili e tematiche LGBTQ+ per traidue.com, un sito informativo italiano.

COMPITO: Ricevi una notizia selezionata come prioritaria dalla redazione. Genera un editoriale argomentato in italiano.

STILE E TONO:
- Giornalismo d'opinione rigoroso e documentato — ogni affermazione deve essere supportata da fatti
- Cita sempre la fonte originale e i passaggi specifici che commenti (es. "Come riportato da [fonte], ...")
- Se citi dichiarazioni di politici o figure pubbliche, riporta le parole esatte tra virgolette
- Spirito critico costruttivo: analizza, contestualizza, proponi chiavi di lettura — non limitarti ad attaccare
- Contestualizza per il pubblico italiano: confronta con la situazione in Italia, cita leggi rilevanti (L. 164/82, DDL Zan, ecc.)
- Se la notizia è dall'estero, spiega perché è rilevante anche per l'Italia

REGOLE INDEROGABILI:
- MAI insulti, diffamazione, linguaggio violento o incitamento all'odio
- MAI accuse non verificabili o affermazioni che possano configurare diffamazione (art. 595 c.p.)
- MAI attaccare gratuitamente associazioni trans, LGBTQ+ o alleate — critica solo se argomentata e documentata
- Usa sempre il condizionale per ipotesi non confermate ("sembrerebbe", "stando a quanto riportato")
- Distingui chiaramente fatti da opinioni
- Se parli di procedimenti legali, usa "indagato/a" e non "colpevole" prima di una sentenza

STRUTTURA DELL'EDITORIALE:
- Apri con i fatti: cosa è successo, dove, quando, chi è coinvolto
- Cita la fonte e i passaggi chiave della notizia originale
- Analisi: perché è importante, quali sono le implicazioni
- Contesto italiano: come si collega alla situazione nel nostro paese
- Chiusura: riflessione o domanda aperta che stimoli il pensiero del lettore

FORMATO RISPOSTA (JSON):
{
  "title": "Titolo editoriale in italiano (max 80 char)",
  "slug": "slug-in-italiano-senza-accenti",
  "summary": "Riassunto di 2-3 frasi per la card preview",
  "content": "Editoriale di 500-800 parole in markdown. Strutturato con fatti, citazioni dalla fonte, analisi e contesto. Usa ## per sottotitoli.",
  "tags": ["transgender", "diritti-civili"]
}

TAG VALIDI: transgender, lgbtq, diritti-civili, aborto, eutanasia, fine-vita, identita-di-genere, discriminazione, politica, internazionale, italia, sport, salute, cultura`;

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

const articles: GeneratedArticle[] = [];
for (const ranked of sortedRanked) {
	const item = newItems[ranked.original_index];
	if (!item) continue;

	console.log(`\nGenerating editorial for: "${item.title.slice(0, 80)}"`);
	const input = `Notizia da commentare:\n\n"${item.title.slice(0, 200)}" — ${item.sourceName}\n${item.description.slice(0, 500)}`;

	const editResult = await model.generateContent({
		contents: [{ role: 'user', parts: [{ text: input }] }],
		systemInstruction: { role: 'user', parts: [{ text: EDITORIAL_PROMPT }] },
		generationConfig: { responseMimeType: 'application/json' }
	});

	try {
		const parsed = JSON.parse(editResult.response.text());
		if (parsed.title && parsed.content) {
			const article: GeneratedArticle = {
				title: parsed.title,
				slug: parsed.slug || slugify(parsed.title),
				summary: parsed.summary || parsed.content.slice(0, 200),
				content: parsed.content,
				tags: parsed.tags || [],
				sourceUrl: item.link,
				sourceTitle: item.title,
				sourceDate: item.pubDate
			};
			articles.push(article);
			console.log(`  ✓ "${article.title}" (${article.content.split(/\s+/).length} words)`);
		}
	} catch {
		console.error('  ✗ Failed to parse editorial response');
	}
}

if (!articles.length) {
	console.log('No articles generated, exiting.');
	process.exit(0);
}

// =============================================
// Step 6: Save drafts to DB
// =============================================
console.log('\n=== STEP 6: Saving drafts to DB ===');

interface Draft {
	id: string;
	title: string;
	summary: string;
	content: string;
	tags: string[];
	sourceUrl: string;
	sourceTitle: string;
	approvalToken: string;
	image?: string;
	thumb?: string;
}

const drafts: Draft[] = [];
for (const article of articles) {
	let slug = article.slug;
	let attempt = 0;

	while (attempt < 3) {
		const insertSlug = attempt === 0 ? slug : `${slug}-${attempt}`;
		const { data, error } = await supabase
			.from('news_articles')
			.insert({
				title: article.title,
				slug: insertSlug,
				summary: article.summary,
				content: article.content,
				source_url: article.sourceUrl,
				source_title: article.sourceTitle,
				source_date: article.sourceDate || null,
				tags: article.tags
			})
			.select('id, title, summary, content, tags, source_url, source_title, approval_token')
			.single();

		if (!error && data) {
			drafts.push({
				id: data.id,
				title: data.title,
				summary: data.summary,
				content: data.content,
				tags: data.tags,
				sourceUrl: data.source_url,
				sourceTitle: data.source_title,
				approvalToken: data.approval_token
			});
			console.log(`  ✓ Saved: "${data.title}" (id: ${data.id})`);
			break;
		}

		if (error?.code === '23505' && error.message.includes('slug')) {
			attempt++;
			continue;
		}

		console.error(`  ✗ Failed to save "${article.title}":`, error?.message);
		break;
	}
}

// =============================================
// Step 7: Generate images
// =============================================
console.log('\n=== STEP 7: Generating images ===');

const IMAGE_MODEL = 'gemini-2.5-flash-image';
const BUCKET = 'news-images';

for (const draft of drafts) {
	try {
		const matchingArticle = articles.find((a) => a.sourceUrl === draft.sourceUrl);
		if (!matchingArticle) continue;

		console.log(`  Generating image for: "${draft.title.slice(0, 60)}"`);
		const tagHint = matchingArticle.tags.slice(0, 3).join(', ');
		const prompt = `Abstract artistic illustration for a news editorial about: "${draft.title}". Themes: ${tagHint}. Style: abstract painting, bold brushstrokes, muted earth tones with accent colors, no text, no faces, no photographs, editorial art style.`;

		let imageBuffer: Buffer | null = null;
		for (let attempt = 1; attempt <= 3; attempt++) {
			try {
				const result = await genai.models.generateContent({
					model: IMAGE_MODEL,
					contents: [{ role: 'user', parts: [{ text: prompt }] }],
					config: {
						responseModalities: ['IMAGE'],
						imageConfig: { aspectRatio: '16:9' }
					}
				});
				const imageBytes = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
				if (imageBytes) {
					imageBuffer = Buffer.from(imageBytes, 'base64');
					break;
				}
				console.error(`    Attempt ${attempt}/3: no image data`);
			} catch (e: any) {
				console.error(`    Attempt ${attempt}/3 error:`, e?.message?.slice(0, 100));
			}
			if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
		}

		if (!imageBuffer) {
			console.error(`  ✗ Image generation failed for "${draft.title}"`);
			continue;
		}

		const slug = matchingArticle.slug;
		const fullBuffer = await sharp(imageBuffer).resize(1344, 768, { fit: 'cover' }).webp({ quality: 80 }).toBuffer();
		const thumbBuffer = await sharp(imageBuffer).resize(672, 378, { fit: 'cover' }).webp({ quality: 75 }).toBuffer();

		await supabase.storage.from(BUCKET).upload(`${slug}.webp`, fullBuffer, { contentType: 'image/webp', upsert: true });
		await supabase.storage.from(BUCKET).upload(`${slug}-thumb.webp`, thumbBuffer, { contentType: 'image/webp', upsert: true });

		const { data: fullData } = supabase.storage.from(BUCKET).getPublicUrl(`${slug}.webp`);
		const { data: thumbData } = supabase.storage.from(BUCKET).getPublicUrl(`${slug}-thumb.webp`);

		await supabase.from('news_articles').update({ image: fullData.publicUrl, thumb: thumbData.publicUrl }).eq('id', draft.id);
		draft.image = fullData.publicUrl;
		draft.thumb = thumbData.publicUrl;
		console.log(`  ✓ Image uploaded (${(fullBuffer.length / 1024).toFixed(0)}KB + ${(thumbBuffer.length / 1024).toFixed(0)}KB thumb)`);
	} catch (e: any) {
		console.error(`  ✗ Image failed for "${draft.title}":`, e?.message);
	}
}

// =============================================
// Step 8: Send email digest
// =============================================
console.log('\n=== STEP 8: Sending email digest ===');

function escapeHtml(str: string): string {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function sanitizeUrl(url: string): string {
	try {
		const parsed = new URL(url);
		if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return url;
	} catch {}
	return '#';
}

function markdownToSimpleHtml(md: string): string {
	return md
		.replace(/^## (.+)$/gm, '<h3 style="margin: 16px 0 8px; font-size: 15px; font-weight: 600;">$1</h3>')
		.replace(/^### (.+)$/gm, '<h4 style="margin: 12px 0 6px; font-size: 14px; font-weight: 600;">$1</h4>')
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/\n\n/g, '</p><p style="margin: 0 0 12px; line-height: 1.6;">')
		.replace(/\n/g, '<br>');
}

const articlesHtml = drafts
	.map(
		(d) => `
<div style="margin-bottom: 40px; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
  ${d.thumb ? `<img src="${sanitizeUrl(d.thumb)}" alt="" width="672" height="378" style="width: 100%; height: auto; display: block;" />` : ''}
  <div style="padding: 24px;">
    <div style="margin-bottom: 12px;">
      ${d.tags.map((t) => `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; border: 1px solid #ddd; font-size: 11px; color: #666; margin-right: 6px; margin-bottom: 4px;">${escapeHtml(t)}</span>`).join('')}
    </div>
    <h2 style="margin: 0 0 10px; font-size: 20px; color: #111; line-height: 1.3;">${escapeHtml(d.title)}</h2>
    <p style="margin: 0 0 16px; color: #555; font-size: 14px; font-style: italic; line-height: 1.5;">${escapeHtml(d.summary)}</p>
    <div style="padding: 16px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; margin-bottom: 16px; color: #333; font-size: 14px;">
      <p style="margin: 0 0 12px; line-height: 1.6;">${markdownToSimpleHtml(escapeHtml(d.content))}</p>
    </div>
    <p style="margin: 0 0 20px; font-size: 12px; color: #999;">
      Fonte: <a href="${sanitizeUrl(d.sourceUrl)}" style="color: #999; text-decoration: underline;">${escapeHtml(d.sourceTitle)}</a>
    </p>
    <div style="text-align: center;">
      <a href="${BASE_URL}/api/news/approve/${d.approvalToken}"
         style="display: inline-block; padding: 12px 32px; background: #111; color: #fff; text-decoration: none; border-radius: 6px; margin-right: 12px; font-size: 14px; font-weight: 500;">
        Approva e pubblica
      </a>
      <a href="${BASE_URL}/api/news/reject/${d.approvalToken}"
         style="display: inline-block; padding: 12px 32px; background: #fff; color: #111; text-decoration: none; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; font-weight: 500;">
        Scarta
      </a>
    </div>
  </div>
</div>`
	)
	.join('');

await resend.emails.send({
	from: 'Andrea from Dal Nulla <noreply@dalnulla.com>',
	to: NEWS_NOTIFICATION_EMAIL,
	subject: `${drafts.length === 1 ? '1 notizia' : `${drafts.length} notizie`} da approvare — traidue.com`,
	html: `
<div style="font-family: -apple-system, Inter, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px;">
  <div style="margin-bottom: 32px; text-align: center;">
    <h1 style="font-size: 24px; margin: 0 0 6px; color: #111;">Nuove notizie da approvare</h1>
    <p style="margin: 0; color: #888; font-size: 14px;">${drafts.length === 1 ? '1 editoriale generato' : `${drafts.length} editoriali generati`} — leggi e decidi</p>
  </div>
  ${articlesHtml}
  <p style="margin-top: 32px; color: #bbb; font-size: 11px; text-align: center;">
    traidue.com · Le bozze non approvate verranno ignorate.
  </p>
</div>`
});

console.log(`  ✓ Email sent to ${NEWS_NOTIFICATION_EMAIL}`);

// =============================================
// Summary
// =============================================
console.log('\n=== PIPELINE COMPLETE ===');
console.log(`RSS items fetched: ${allItems.length}`);
console.log(`After 48h filter: ${recentItems.length}`);
console.log(`After URL dedup: ${newItems.length}`);
console.log(`Recent articles in DB (cross-run dedup): ${recentTitles.length}`);
console.log(`Ranked relevant: ${rankParsed.ranked.length}`);
console.log(`Editorials generated: ${articles.length}`);
console.log(`Drafts saved: ${drafts.length}`);
console.log(`Images generated: ${drafts.filter((d) => d.image).length}`);
console.log(`Email sent: yes`);
