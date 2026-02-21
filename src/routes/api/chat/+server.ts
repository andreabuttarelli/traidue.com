import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findRelevantArticles, type StoredEmbedding } from '$lib/utils/embeddings';
import { getRawArticleBySlug } from '$lib/utils/wiki';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
const chatModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_LENGTH = 20;

let embeddingsCache: StoredEmbedding[] | null = null;

async function loadEmbeddings(origin: string): Promise<StoredEmbedding[]> {
	if (embeddingsCache) return embeddingsCache;
	try {
		const res = await fetch(new URL('/embeddings.json', origin));
		if (!res.ok) throw new Error(`Failed to fetch embeddings: ${res.status}`);
		embeddingsCache = await res.json();
		return embeddingsCache!;
	} catch (e) {
		console.error('Failed to load embeddings:', e);
		throw new Error('Embeddings not available');
	}
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

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		const { message, history, currentSlug } = await request.json();

		if (!message || typeof message !== 'string') {
			return json({ error: 'Message is required' }, { status: 400 });
		}

		if (message.length > MAX_MESSAGE_LENGTH) {
			return json({ error: 'Message too long' }, { status: 400 });
		}

		const validSlug = typeof currentSlug === 'string' ? currentSlug : undefined;

		const validHistory = Array.isArray(history)
			? history
					.filter(
						(m: unknown): m is { role: string; content: string } =>
							typeof m === 'object' &&
							m !== null &&
							typeof (m as any).role === 'string' &&
							typeof (m as any).content === 'string'
					)
					.slice(-MAX_HISTORY_LENGTH)
			: [];

		const embeddings = await loadEmbeddings(url.origin);

		// Embed the user query
		const queryResult = await embeddingModel.embedContent(message);
		const queryEmbedding = queryResult.embedding.values;

		// Find relevant articles
		const relevant = findRelevantArticles(queryEmbedding, embeddings, 5, validSlug);

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

		for (const msg of validHistory) {
			contents.push({
				role: msg.role === 'assistant' ? 'model' : 'user',
				parts: [{ text: msg.content }]
			});
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
			systemInstruction: { role: 'user', parts: [{ text: SYSTEM_PROMPT }] }
		});

		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of result.stream) {
						const text = chunk.text();
						if (text) {
							controller.enqueue(new TextEncoder().encode(text));
						}
					}
				} catch (e) {
					console.error('Stream error:', e);
					controller.enqueue(
						new TextEncoder().encode('\n\n[Errore durante la generazione della risposta]')
					);
				} finally {
					controller.close();
				}
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'no-cache'
			}
		});
	} catch (e) {
		console.error('Chat API error:', e);
		const message =
			e instanceof Error && e.message === 'Embeddings not available'
				? 'Il servizio non è al momento disponibile'
				: 'Errore interno del server';
		return json({ error: message }, { status: 500 });
	}
};
