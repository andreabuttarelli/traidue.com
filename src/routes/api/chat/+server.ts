import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findRelevantArticles, type StoredEmbedding } from '$lib/utils/embeddings';
import { getRawArticleBySlug } from '$lib/utils/wiki';
import { glossaryTerms } from '$lib/data/glossary';
import { normalizeQuestion, getCachedResponse, setCachedResponse } from '$lib/server/chat-cache';
import { logChatInteraction } from '$lib/server/chat-analytics';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
const chatModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_LENGTH = 20;

// Rate limiting per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 richieste per minuto per IP
const DAILY_LIMIT_MAX_REQUESTS = 50; // max 50 richieste al giorno per IP
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const dailyLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): { limited: boolean; retryAfter?: number } {
	const now = Date.now();

	// Clean stale entries periodically
	if (Math.random() < 0.1) {
		for (const [key, val] of rateLimitMap) {
			if (now > val.resetAt) rateLimitMap.delete(key);
		}
		for (const [key, val] of dailyLimitMap) {
			if (now > val.resetAt) dailyLimitMap.delete(key);
		}
	}

	// Per-minute check
	const minute = rateLimitMap.get(ip);
	if (minute && now < minute.resetAt) {
		if (minute.count >= RATE_LIMIT_MAX_REQUESTS) {
			return { limited: true, retryAfter: Math.ceil((minute.resetAt - now) / 1000) };
		}
		minute.count++;
	} else {
		rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
	}

	// Daily check
	const daily = dailyLimitMap.get(ip);
	if (daily && now < daily.resetAt) {
		if (daily.count >= DAILY_LIMIT_MAX_REQUESTS) {
			return { limited: true, retryAfter: Math.ceil((daily.resetAt - now) / 1000) };
		}
		daily.count++;
	} else {
		dailyLimitMap.set(ip, { count: 1, resetAt: now + DAILY_WINDOW_MS });
	}

	return { limited: false };
}

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
- Rispondi SOLO basandoti sui contenuti degli articoli e del glossario forniti come contesto
- Se la domanda non è coperta dai contenuti, rispondi gentilmente che non hai informazioni a riguardo e suggerisci di esplorare il wiki su traidue.com
- Cita SEMPRE le pagine wiki come link markdown: [Titolo articolo](/wiki/slug). Ogni articolo nel contesto ha il suo percorso indicato tra parentesi quadre dopo il titolo (es. [/wiki/christine-jorgensen]). Usa SEMPRE questi link quando menzioni o usi informazioni da un articolo
- Se la domanda riguarda una persona e nel contesto c'è un articolo dedicato a quella persona, DEVI linkare quell'articolo
- In fondo alla risposta, se hai usato informazioni da articoli con fonti scientifiche, aggiungi un blocco con le fonti così:

<details>
<summary>Fonti scientifiche</summary>

- Titolo fonte (Anno) — URL
</details>

- Rispondi sempre in italiano
- Sii conciso ma informativo
- Non inventare informazioni non presenti nel contesto
- Se l'utente chiede su quale pagina si trova o chiede di riassumere "questa pagina", usa l'informazione sulla pagina corrente fornita nel contesto`;

export const POST: RequestHandler = async ({ request, url, getClientAddress }) => {
	const startTime = Date.now();

	// Rate limiting
	const ip = getClientAddress();
	const rateCheck = isRateLimited(ip);
	if (rateCheck.limited) {
		return json(
			{ error: 'Troppe richieste. Riprova tra poco.' },
			{
				status: 429,
				headers: { 'Retry-After': String(rateCheck.retryAfter ?? 60) }
			}
		);
	}

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

		// Cache check — only for first messages (no history)
		const isFirstMessage = validHistory.length === 0;
		if (isFirstMessage) {
			const normalized = normalizeQuestion(message);
			const cached = await getCachedResponse(normalized, validSlug);
			if (cached) {
				logChatInteraction({
					question: message,
					response: cached,
					currentSlug: validSlug,
					cacheHit: true,
					responseTimeMs: Date.now() - startTime
				});
				return new Response(cached, {
					headers: {
						'Content-Type': 'text/plain; charset=utf-8',
						'Cache-Control': 'no-cache'
					}
				});
			}
		}

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

		// Build glossary context
		const glossaryContext = glossaryTerms
			.map((t) => `- **${t.term}**: ${t.definition}${t.link ? ` [Approfondisci](${t.link})` : ''}`)
			.join('\n');

		// Add current message with context
		const currentPageInfo = validSlug
			? `L'utente si trova attualmente sulla pagina: /wiki/${validSlug}\n\n`
			: "L'utente si trova sulla homepage o su una pagina non wiki.\n\n";

		contents.push({
			role: 'user',
			parts: [
				{
					text: `${currentPageInfo}Glossario dei termini:\n\n${glossaryContext}\n\n---\n\nContesto dagli articoli del wiki:\n\n${articlesContext}\n\n---\n\nDomanda dell'utente: ${message}`
				}
			]
		});

		// Stream response
		const result = await chatModel.generateContentStream({
			contents,
			systemInstruction: { role: 'user', parts: [{ text: SYSTEM_PROMPT }] }
		});

		let fullResponse = '';

		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of result.stream) {
						const text = chunk.text();
						if (text) {
							fullResponse += text;
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

					// Post-stream: cache + analytics (fire-and-forget)
					const responseTimeMs = Date.now() - startTime;

					if (isFirstMessage && fullResponse) {
						const normalized = normalizeQuestion(message);
						setCachedResponse(normalized, message, validSlug, fullResponse).catch(() => {});
					}

					// Extract token usage from Gemini response
					const usage = (await result.response).usageMetadata;

					logChatInteraction({
						question: message,
						response: fullResponse || undefined,
						currentSlug: validSlug,
						cacheHit: false,
						responseTimeMs,
						promptTokens: usage?.promptTokenCount,
						completionTokens: usage?.candidatesTokenCount,
						totalTokens: usage?.totalTokenCount
					});
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
