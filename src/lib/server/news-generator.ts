import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RSSItem } from './rss';
import { supabase } from './supabase';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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

const MAX_ARTICLES_PER_RUN = 3;

// --- Phase 1: Ranking ---

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

// --- Phase 2: Editorial generation ---

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

export async function processNewsItems(items: RSSItem[]): Promise<GeneratedArticle[]> {
	if (!items.length) return [];

	// Fetch recent articles from DB to avoid duplicates across runs
	const recentTitles = await getRecentArticleTitles();

	// Phase 1: rank all items (with context of already-published articles)
	const ranked = await rankItems(items, recentTitles);
	if (!ranked.length) return [];

	// Take top N
	const topItems = ranked.slice(0, MAX_ARTICLES_PER_RUN);
	console.log(
		`[News] Ranked ${ranked.length} relevant items. Generating editorials for top ${topItems.length}:`,
		topItems.map((r) => `#${r.originalIndex} (score ${r.score}): ${r.reason}`).join(' | ')
	);

	// Phase 2: generate editorial for each top item (one by one for better quality)
	const generated: GeneratedArticle[] = [];
	for (const ranked of topItems) {
		const item = items[ranked.originalIndex];
		if (!item) continue;

		const article = await generateEditorial(item);
		if (article) generated.push(article);
	}

	return generated;
}

interface RankedItem {
	originalIndex: number;
	score: number;
	reason: string;
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

	const result = await model.generateContent({
		contents: [{ role: 'user', parts: [{ text: `Notizie da classificare:\n\n${itemsList}${alreadyPublished}` }] }],
		systemInstruction: { role: 'user', parts: [{ text: RANKING_PROMPT }] },
		generationConfig: { responseMimeType: 'application/json' }
	});

	let parsed: {
		ranked: Array<{ original_index: number; relevance_score: number; reason: string }>;
		discarded?: Array<{ original_index: number; reason: string }>;
	};

	try {
		parsed = JSON.parse(result.response.text());
	} catch {
		console.error('Failed to parse ranking response:', result.response.text().slice(0, 500));
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

async function generateEditorial(item: RSSItem): Promise<GeneratedArticle | null> {
	const input = `Notizia da commentare:\n\n"${item.title.slice(0, 200)}" — ${item.sourceName}\n${item.description.slice(0, 500)}`;

	const result = await model.generateContent({
		contents: [{ role: 'user', parts: [{ text: input }] }],
		systemInstruction: { role: 'user', parts: [{ text: EDITORIAL_PROMPT }] },
		generationConfig: { responseMimeType: 'application/json' }
	});

	let parsed: {
		title?: string;
		slug?: string;
		summary?: string;
		content?: string;
		tags?: string[];
	};

	try {
		parsed = JSON.parse(result.response.text());
	} catch {
		console.error('Failed to parse editorial response:', result.response.text().slice(0, 500));
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
