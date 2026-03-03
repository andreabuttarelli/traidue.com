import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenAI } from '@google/genai';
import type { RSSItem } from './rss';
import { supabase } from './supabase';

const genai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const MODEL = 'gemini-3.1-pro-preview';
const FALLBACK_MODEL = 'gemini-3-flash-preview';

const GEMINI_TIMEOUT_MS = 60_000;
const RETRY_DELAY_MS = 5_000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
	return Promise.race([
		promise,
		new Promise<never>((_, reject) =>
			setTimeout(() => reject(new Error(`[News] Timeout: ${label} exceeded ${ms}ms`)), ms)
		)
	]);
}

async function geminiGenerate(
	options: Parameters<typeof genai.models.generateContent>[0],
	retryDelay = RETRY_DELAY_MS
): ReturnType<typeof genai.models.generateContent> {
	const label = String(options.model || MODEL);
	try {
		return await withTimeout(genai.models.generateContent(options), GEMINI_TIMEOUT_MS, label);
	} catch (err: unknown) {
		const status = (err as { status?: number }).status;
		const isRetryable = status === 503 || status === 429;
		const isTimeout = err instanceof Error && err.message.includes('Timeout');

		if (isRetryable || isTimeout) {
			const reason = isTimeout ? 'timeout' : `HTTP ${status}`;
			console.log(`[News] ${label} failed (${reason}), retrying in ${retryDelay / 1000}s...`);
			await new Promise((r) => setTimeout(r, retryDelay));
			try {
				return await withTimeout(
					genai.models.generateContent(options),
					GEMINI_TIMEOUT_MS,
					`${label}-retry`
				);
			} catch (retryErr: unknown) {
				console.log(`[News] Retry failed, falling back to ${FALLBACK_MODEL}`);
				return await withTimeout(
					genai.models.generateContent({ ...options, model: FALLBACK_MODEL }),
					GEMINI_TIMEOUT_MS,
					FALLBACK_MODEL
				);
			}
		}
		throw err;
	}
}

export interface GeneratedArticle {
	title: string;
	slug: string;
	summary: string;
	content: string;
	tags: string[];
	sourceUrl: string;
	sourceTitle: string;
	sourceDate: string;
}

const MAX_ARTICLES_PER_RUN = 5;

// --- Phase 1: Ranking ---

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

// --- Phase 2: Editorial generation ---

const EDITORIAL_PROMPT = `Sei un editorialista esperto di diritti civili e tematiche LGBTQ+ per traidue.com, un sito informativo italiano.

COMPITO: Ricevi una notizia selezionata come prioritaria dalla redazione. Genera un editoriale argomentato in italiano.

STILE E TONO:
- Scrivi come un giornalista d'opinione che vuole essere letto e condiviso — diretto, incisivo, mai noioso
- Il titolo è CRUCIALE: deve essere corto, provocatorio, emotivo, far venire voglia di cliccare. Usa domande retoriche, contrasti forti, numeri shock, o frasi ad effetto. NO titoli generici o burocratici. Esempi di buoni titoli: "Il Kansas cancella le persone trans dai documenti. Domani tocca a noi?", "Trump vuole vietare la transizione a scuola. Ecco cosa significa davvero.", "L'UE finanzia l'aborto: vittoria storica o promessa vuota?"
- Il summary deve essere un pugno nello stomaco: 2 frasi che catturano l'essenza della notizia con urgenza
- Apri il testo con una frase d'impatto, non con "Il giorno X è successo Y"
- Cita sempre la fonte originale e i passaggi specifici che commenti
- Se citi dichiarazioni di politici o figure pubbliche, riporta le parole esatte tra virgolette
- Spirito critico costruttivo: analizza, contestualizza, proponi chiavi di lettura
- Contestualizza per il pubblico italiano: confronta con la situazione in Italia, cita leggi rilevanti (L. 164/82, DDL Zan, ecc.)
- Se la notizia è dall'estero, spiega perché è rilevante anche per l'Italia
- Chiudi con una frase che resta in testa — una domanda scomoda, un'immagine forte, un invito all'azione

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
  "title": "Titolo BREVE, DIRETTO, PROVOCATORIO in italiano (max 70 char). Deve far venire voglia di cliccare.",
  "slug": "slug-in-italiano-senza-accenti",
  "summary": "2 frasi d'impatto che catturano l'urgenza della notizia. Deve far sentire che DEVI leggere l'articolo.",
  "content": "Editoriale di 500-800 parole in markdown. Strutturato con fatti, citazioni dalla fonte, analisi e contesto. Usa ## per sottotitoli.",
  "tags": ["transgender", "diritti-civili"]
}

TAG VALIDI: transgender, lgbtq, diritti-civili, aborto, eutanasia, fine-vita, identita-di-genere, discriminazione, politica, internazionale, italia, usa, europa, sport, salute, cultura, sondaggi, intelligenza-artificiale, diritti-riproduttivi, buone-notizie`;

export interface RankedItem {
	originalIndex: number;
	score: number;
	reason: string;
}

export async function rankNewsItems(items: RSSItem[]): Promise<RankedItem[]> {
	if (!items.length) return [];

	const recentTitles = await getRecentArticleTitles();
	const ranked = await rankItems(items, recentTitles);
	if (!ranked.length) return [];

	const topItems = ranked.slice(0, MAX_ARTICLES_PER_RUN);
	console.log(
		`[News] Ranked ${ranked.length} relevant items. Dispatching top ${topItems.length}:`,
		topItems.map((r) => `#${r.originalIndex} (score ${r.score}): ${r.reason}`).join(' | ')
	);

	return topItems;
}

async function getRecentArticleTitles(): Promise<string[]> {
	const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
	const { data, error } = await supabase
		.from('news_articles')
		.select('title')
		.gte('created_at', sevenDaysAgo)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('[News] Failed to fetch recent articles:', error.message);
		return [];
	}

	return (data ?? []).map((r) => r.title);
}

async function rankItems(items: RSSItem[], recentTitles: string[]): Promise<RankedItem[]> {
	const itemsList = items
		.map(
			(item, i) =>
				`[${i}] "${item.title.slice(0, 200)}" — ${item.sourceName}\n${item.description.slice(0, 500)}`
		)
		.join('\n\n');

	const alreadyPublished = recentTitles.length
		? `\n\nARTICOLI GIÀ PUBBLICATI SULLA PIATTAFORMA:\n${recentTitles.map((t) => `- "${t}"`).join('\n')}`
		: '';

	const result = await geminiGenerate({
		model: MODEL,
		contents: [{ role: 'user', parts: [{ text: `Notizie da classificare:\n\n${itemsList}${alreadyPublished}` }] }],
		config: {
			systemInstruction: RANKING_PROMPT,
			responseMimeType: 'application/json'
		}
	});

	let parsed: {
		ranked: Array<{ original_index: number; relevance_score: number; reason: string }>;
		discarded?: Array<{ original_index: number; reason: string }>;
	};

	try {
		parsed = JSON.parse(result.text ?? '');
	} catch {
		console.error('Failed to parse ranking response:', (result.text ?? '').slice(0, 500));
		return [];
	}

	const discardedCount = parsed.discarded?.length ?? 0;
	if (discardedCount) {
		console.log(`[News] Discarded ${discardedCount} irrelevant items`);
	}

	return (parsed.ranked ?? [])
		.sort((a, b) => b.relevance_score - a.relevance_score)
		.map((r) => ({
			originalIndex: r.original_index,
			score: r.relevance_score,
			reason: r.reason
		}));
}

export async function generateSingleEditorial(item: RSSItem): Promise<GeneratedArticle | null> {
	return generateEditorial(item);
}

async function generateEditorial(item: RSSItem): Promise<GeneratedArticle | null> {
	const input = `Notizia da commentare:\n\n"${item.title.slice(0, 200)}" — ${item.sourceName}\n${item.description.slice(0, 500)}`;

	const result = await geminiGenerate({
		model: MODEL,
		contents: [{ role: 'user', parts: [{ text: input }] }],
		config: {
			systemInstruction: EDITORIAL_PROMPT,
			responseMimeType: 'application/json',
			tools: [{ googleSearch: {} }]
		}
	});

	let parsed: {
		title?: string;
		slug?: string;
		summary?: string;
		content?: string;
		tags?: string[];
	};

	try {
		parsed = JSON.parse(result.text ?? '');
	} catch {
		console.error('Failed to parse editorial response:', (result.text ?? '').slice(0, 500));
		return null;
	}

	if (!parsed.title || !parsed.content) return null;

	return {
		title: parsed.title,
		slug: parsed.slug || slugify(parsed.title),
		summary: parsed.summary || parsed.content.slice(0, 200),
		content: parsed.content,
		tags: parsed.tags || [],
		sourceUrl: item.link,
		sourceTitle: item.title,
		sourceDate: item.pubDate
	};
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
