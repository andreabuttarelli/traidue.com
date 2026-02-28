/**
 * Dry-run test for the news pipeline.
 * Fetches RSS → ranks → generates 1 editorial + 1 image → saves locally.
 * Does NOT write to DB or send emails.
 *
 * Run: bun run scripts/test-news-dryrun.ts
 *
 * Output goes to tmp/news-dryrun/
 */

import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import { mkdir } from 'fs/promises';
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

const GEMINI_API_KEY = requiredEnv('GEMINI_API_KEY');
const SUPABASE_URL = requiredEnv('SUPABASE_URL');
const SUPABASE_KEY = requiredEnv('SUPABASE_KEY');

const genai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const MODEL = 'gemini-3.1-pro-preview';
const IMAGE_MODEL = 'gemini-3.1-flash-image-preview';
const OUTPUT_DIR = 'tmp/news-dryrun';
const STYLE_REFERENCE_URL =
	'https://vkasizlzkcvvuykoguek.supabase.co/storage/v1/object/public/news-images/generated_ref_1772026325362_0.png.jpeg';

await mkdir(OUTPUT_DIR, { recursive: true });

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
console.log(`Found ${sources.length} active sources`);

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

function extractAtomLink(xml: string): string | null {
	const altMatch =
		/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/.exec(xml) ||
		/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["']/.exec(xml);
	if (altMatch) return altMatch[1];
	const hrefMatch = /<link[^>]*href=["']([^"']+)["']/.exec(xml);
	return hrefMatch ? hrefMatch[1] : null;
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
		const res = await fetch(source.feed_url, {
			signal: AbortSignal.timeout(10_000),
			headers: { 'User-Agent': 'traidue.com/1.0 (news aggregator)' }
		});
		if (!res.ok) {
			console.error(`  ✗ ${source.name}: HTTP ${res.status}`);
			continue;
		}
		const xml = await res.text();
		const isAtom = /<feed[\s>]/.test(xml);
		let count = 0;

		if (isAtom) {
			const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
			let match;
			while ((match = entryRegex.exec(xml)) !== null) {
				const block = match[1];
				const title = extractTag(block, 'title');
				const link = extractAtomLink(block);
				const pubDate = extractTag(block, 'updated') || extractTag(block, 'published');
				const description = extractTag(block, 'content') || extractTag(block, 'summary');
				if (title && link) {
					allItems.push({
						title: decodeEntities(title),
						link,
						pubDate: pubDate || '',
						description: decodeEntities(description || '').slice(0, 500),
						sourceName: source.name
					});
					count++;
				}
			}
		} else {
			const itemRegex = /<item>([\s\S]*?)<\/item>/g;
			let match;
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
						description: decodeEntities(description || '').slice(0, 500),
						sourceName: source.name
					});
					count++;
				}
			}
		}
		console.log(`  ✓ ${source.name}: ${count} items`);
	} catch (e: any) {
		console.error(`  ✗ ${source.name}: ${e.message}`);
	}
}

const cutoff = Date.now() - 72 * 60 * 60 * 1000;
const recentItems = allItems.filter((item) => {
	if (!item.pubDate) return true;
	const parsed = new Date(item.pubDate).getTime();
	return !isNaN(parsed) && parsed >= cutoff;
});
console.log(`Total: ${allItems.length} items, ${recentItems.length} from last 72h`);

if (!recentItems.length) {
	console.log('No recent items, exiting.');
	process.exit(0);
}

// =============================================
// Step 2: Ranking (no DB dedup — dry run)
// =============================================
console.log('\n=== STEP 2: Ranking with Gemini ===');

const RANKING_PROMPT = `Sei un caporedattore esperto di diritti civili e tematiche LGBTQ+ per traidue.com, un sito informativo italiano.

COMPITO: Ricevi una lista di notizie. Devi:
1. Filtrare solo quelle RILEVANTI per la community e le community affini
2. Classificarle per URGENZA e IMPATTO — dalla più importante alla meno importante

TEMI RILEVANTI:
- Transgender, LGBTQ+, diritti civili, identità di genere, disforia di genere
- Aborto, eutanasia, fine vita, diritti riproduttivi
- Sondaggi politici e polls sui diritti civili/LGBTQ+
- Situazione legale negli USA: leggi anti-trans, executive orders, sentenze SCOTUS, dichiarazioni del presidente USA contro persone LGBT
- Elezioni e politica europea: risultati elettorali, nuove leggi, diritti in Europa
- Diritti riproduttivi in Europa e nel mondo
- Intelligenza artificiale: novità, regolamentazioni, impatti sulla società, bias e discriminazione algoritmica
- Buone notizie per la community: vittorie legali, riconoscimenti, traguardi

CRITERI DI RANKING (dal più al meno prioritario):
- Nuove leggi, sentenze, o provvedimenti che impattano direttamente i diritti delle persone
- Dichiarazioni ufficiali di politici, istituzioni, o figure di rilievo (es. presidente USA, leader europei)
- Sondaggi e polls rilevanti per la community (opinione pubblica su diritti, elezioni)
- Episodi di discriminazione, violenza, o ingiustizia documentati
- Avanzamenti significativi nei diritti (nuove tutele, riconoscimenti, vittorie legali)
- Notizie internazionali con implicazioni dirette per l'Italia o la community globale
- Novità rilevanti sull'intelligenza artificiale (regolamentazioni, bias, impatti sociali)
- Ricerche scientifiche o accademiche rilevanti
- Notizie culturali, editoriali, o di costume

FORMATO RISPOSTA (JSON):
{
  "ranked": [
    { "original_index": 0, "relevance_score": 9, "reason": "Breve motivazione" }
  ],
  "discarded": [
    { "original_index": 2, "reason": "Non rilevante: riguarda..." }
  ]
}

DEDUP TEMATICA:
- Se più notizie parlano dello STESSO fatto/evento, tienine solo UNA
- Le altre vanno in "discarded" con reason "Duplicato tematico di [indice]"

REGOLE:
- relevance_score da 1 a 10
- Ordina "ranked" dal punteggio più alto al più basso
- Sii selettivo: non tutto è urgente`;

const itemsList = recentItems
	.map((item, i) => `[${i}] "${item.title.slice(0, 200)}" — ${item.sourceName}\n${item.description.slice(0, 300)}`)
	.join('\n\n');

const rankResult = await genai.models.generateContent({
	model: MODEL,
	contents: [{ role: 'user', parts: [{ text: `Notizie da classificare:\n\n${itemsList}` }] }],
	config: {
		systemInstruction: RANKING_PROMPT,
		responseMimeType: 'application/json'
	}
});

let rankParsed: {
	ranked: Array<{ original_index: number; relevance_score: number; reason: string }>;
	discarded?: Array<{ original_index: number; reason: string }>;
};

try {
	rankParsed = JSON.parse(rankResult.text ?? '');
} catch {
	console.error('Failed to parse ranking:', (rankResult.text ?? '').slice(0, 500));
	process.exit(1);
}

console.log(`Ranked: ${rankParsed.ranked.length} relevant | Discarded: ${rankParsed.discarded?.length ?? 0}`);

const top = rankParsed.ranked.sort((a, b) => b.relevance_score - a.relevance_score).slice(0, 5);

if (!top.length) {
	console.log('No relevant items, exiting.');
	process.exit(0);
}

console.log('\nTop 5:');
top.forEach((r) =>
	console.log(`  [${r.original_index}] score=${r.relevance_score}: ${r.reason}`)
);

// =============================================
// Step 3: Generate editorial for #1 (with Google Search)
// =============================================
const topItem = recentItems[top[0].original_index];
console.log(`\n=== STEP 3: Generating editorial for #1 ===`);
console.log(`  "${topItem.title}"`);

const EDITORIAL_PROMPT = `Sei un editorialista esperto di diritti civili e tematiche LGBTQ+ per traidue.com, un sito informativo italiano.

COMPITO: Ricevi una notizia selezionata come prioritaria dalla redazione. Genera un editoriale argomentato in italiano.
USA IL TOOL GOOGLE SEARCH per cercare informazioni aggiuntive, contesto, dichiarazioni ufficiali e dati recenti sulla notizia.

STILE E TONO:
- Giornalismo d'opinione rigoroso e documentato — ogni affermazione deve essere supportata da fatti
- Cita sempre la fonte originale e i passaggi specifici che commenti
- Se citi dichiarazioni di politici o figure pubbliche, riporta le parole esatte tra virgolette
- Spirito critico costruttivo: analizza, contestualizza, proponi chiavi di lettura
- Contestualizza per il pubblico italiano
- Se la notizia è dall'estero, spiega perché è rilevante anche per l'Italia

REGOLE INDEROGABILI:
- MAI insulti, diffamazione, linguaggio violento o incitamento all'odio
- MAI accuse non verificabili
- Usa sempre il condizionale per ipotesi non confermate
- Distingui chiaramente fatti da opinioni

FORMATO RISPOSTA (JSON):
{
  "title": "Titolo editoriale in italiano (max 80 char)",
  "slug": "slug-in-italiano-senza-accenti",
  "summary": "Riassunto di 2-3 frasi per la card preview",
  "content": "Editoriale di 500-800 parole in markdown. Usa ## per sottotitoli.",
  "tags": ["transgender", "diritti-civili"]
}

TAG VALIDI: transgender, lgbtq, diritti-civili, aborto, eutanasia, fine-vita, identita-di-genere, discriminazione, politica, internazionale, italia, usa, europa, sport, salute, cultura, sondaggi, intelligenza-artificiale, diritti-riproduttivi, buone-notizie`;

const input = `Notizia da commentare:\n\n"${topItem.title.slice(0, 200)}" — ${topItem.sourceName}\n${topItem.description.slice(0, 500)}`;

const editResult = await genai.models.generateContent({
	model: MODEL,
	contents: [{ role: 'user', parts: [{ text: input }] }],
	config: {
		systemInstruction: EDITORIAL_PROMPT,
		responseMimeType: 'application/json',
		tools: [{ googleSearch: {} }]
	}
});

let article: { title: string; slug: string; summary: string; content: string; tags: string[] };

try {
	article = JSON.parse(editResult.text ?? '');
} catch {
	console.error('Failed to parse editorial:', (editResult.text ?? '').slice(0, 500));
	process.exit(1);
}

const wordCount = article.content.split(/\s+/).length;
console.log(`  ✓ "${article.title}" (${wordCount} words, tags: ${article.tags.join(', ')})`);

// Save article text
const articleMd = `# ${article.title}

> ${article.summary}

**Tags:** ${article.tags.join(', ')}
**Slug:** ${article.slug}
**Fonte:** ${topItem.title} — ${topItem.sourceName}
**Link:** ${topItem.link}

---

${article.content}
`;

await Bun.write(`${OUTPUT_DIR}/article.md`, articleMd);
console.log(`  → Saved to ${OUTPUT_DIR}/article.md`);

// =============================================
// Step 4: Generate image (with reference)
// =============================================
console.log('\n=== STEP 4: Generating image ===');

let referenceBase64: string | null = null;
try {
	const refRes = await fetch(STYLE_REFERENCE_URL, { signal: AbortSignal.timeout(10_000) });
	if (refRes.ok) {
		referenceBase64 = Buffer.from(await refRes.arrayBuffer()).toString('base64');
		console.log('  ✓ Reference image loaded');
	}
} catch {
	console.log('  ⚠ Could not load reference image, proceeding without');
}

const tagHint = article.tags.slice(0, 3).join(', ');
const imagePrompt = `Use the reference image as a STYLE GUIDE ONLY — match its soft digital painting technique: bokeh light effects, soft blurred brushwork, silhouettes and semi-abstract human figures. DO NOT copy the specific subject or composition of the reference.

Create a NEW illustration for this news headline: "${article.title}". Themes: ${tagHint}.

IMPORTANT — MOOD MUST MATCH THE CONTENT:
- If the news is negative (discrimination, attacks on rights, violence, bans, restrictions): use darker, desaturated tones, cold blues, grays, deep purples, shadows, isolated or oppressed figures, dramatic lighting, tension and weight. Evoke sadness, injustice, or struggle.
- If the news is positive (victories, new rights, inclusion, milestones): use warm, luminous pastels, glowing light, people together, hope and celebration.
- If the news is neutral/informational: balanced palette, neither too dark nor too bright.

The subject of the image should LOOSELY represent the topic — not literally, but evocatively. Use silhouettes, semi-abstract human figures, and symbolic visual metaphors. MUST NOT include: any text, words, letters, labels, captions, borders, frames, realistic detailed faces, or photographs.`;

const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];
if (referenceBase64) {
	parts.push({ inlineData: { mimeType: 'image/jpeg', data: referenceBase64 } });
}
parts.push({ text: imagePrompt });

let imageBuffer: Buffer | null = null;
for (let attempt = 1; attempt <= 3; attempt++) {
	try {
		const result = await genai.models.generateContent({
			model: IMAGE_MODEL,
			contents: [{ role: 'user', parts }],
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
		console.error(`  Attempt ${attempt}/3: no image data`);
	} catch (e: any) {
		console.error(`  Attempt ${attempt}/3 error:`, e?.message?.slice(0, 100));
	}
	if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
}

if (imageBuffer) {
	const fullBuffer = await sharp(imageBuffer).resize(1344, 768, { fit: 'cover' }).webp({ quality: 80 }).toBuffer();
	const thumbBuffer = await sharp(imageBuffer).resize(672, 378, { fit: 'cover' }).webp({ quality: 75 }).toBuffer();

	await Bun.write(`${OUTPUT_DIR}/image-full.webp`, fullBuffer);
	await Bun.write(`${OUTPUT_DIR}/image-thumb.webp`, thumbBuffer);
	console.log(`  ✓ Images saved (${(fullBuffer.length / 1024).toFixed(0)}KB + ${(thumbBuffer.length / 1024).toFixed(0)}KB)`);
} else {
	console.error('  ✗ Image generation failed after 3 attempts');
}

// =============================================
// Summary
// =============================================
console.log('\n=== DRY RUN COMPLETE ===');
console.log(`RSS items: ${allItems.length} total, ${recentItems.length} recent`);
console.log(`Ranked: ${rankParsed.ranked.length} relevant`);
console.log(`Output: ${OUTPUT_DIR}/`);
console.log(`  - article.md  (editorial text)`);
console.log(`  - image-full.webp  (1344×768)`);
console.log(`  - image-thumb.webp (672×378)`);
console.log('\nOpen article.md to review the editorial text.');
