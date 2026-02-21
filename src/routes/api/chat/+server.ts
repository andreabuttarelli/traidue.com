import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findRelevantArticles, type StoredEmbedding } from '$lib/utils/embeddings';
import { readFileSync } from 'fs';
import { getRawArticleBySlug } from '$lib/utils/wiki';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
const chatModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

let embeddingsCache: StoredEmbedding[] | null = null;

function loadEmbeddings(): StoredEmbedding[] {
	if (embeddingsCache) return embeddingsCache;
	const data = readFileSync('static/embeddings.json', 'utf-8');
	embeddingsCache = JSON.parse(data);
	return embeddingsCache!;
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

export const POST: RequestHandler = async ({ request }) => {
	const { message, history, currentSlug } = await request.json();

	if (!message || typeof message !== 'string') {
		return json({ error: 'Message is required' }, { status: 400 });
	}

	const embeddings = loadEmbeddings();

	// Embed the user query
	const queryResult = await embeddingModel.embedContent(message);
	const queryEmbedding = queryResult.embedding.values;

	// Find relevant articles
	const relevant = findRelevantArticles(queryEmbedding, embeddings, 5, currentSlug || undefined);

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

	// Add history
	if (Array.isArray(history)) {
		for (const msg of history) {
			contents.push({
				role: msg.role === 'assistant' ? 'model' : 'user',
				parts: [{ text: msg.content }]
			});
		}
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
			for await (const chunk of result.stream) {
				const text = chunk.text();
				if (text) {
					controller.enqueue(new TextEncoder().encode(text));
				}
			}
			controller.close();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache'
		}
	});
};
