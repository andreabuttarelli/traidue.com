import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RSSItem } from './rss';

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

	let parsed: {
		articles: Array<{
			relevant: boolean;
			title?: string;
			slug?: string;
			summary?: string;
			content?: string;
			tags?: string[];
			original_index: number;
		}>;
	};

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
