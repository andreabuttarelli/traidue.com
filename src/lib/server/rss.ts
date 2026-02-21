import { supabase } from './supabase';

export interface RSSItem {
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

	const results = await Promise.allSettled(
		sources.map(async (source) => {
			const res = await fetch(source.feed_url, { signal: AbortSignal.timeout(10_000) });
			if (!res.ok) {
				throw new Error(`HTTP ${res.status} for ${source.name}`);
			}
			const xml = await res.text();
			return parseRSS(xml, source.name);
		})
	);

	const allItems: RSSItem[] = [];
	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		if (result.status === 'fulfilled') {
			allItems.push(...result.value);
		} else {
			console.error(`RSS fetch failed for ${sources[i].name}:`, result.reason);
		}
	}

	// Keep only items from the last 48 hours
	const cutoff = Date.now() - 48 * 60 * 60 * 1000;
	return allItems.filter((item) => {
		if (!item.pubDate) return true; // no date = keep (let Gemini decide)
		const parsed = new Date(item.pubDate).getTime();
		return !isNaN(parsed) && parsed >= cutoff;
	});
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
	const { data: existing, error } = await supabase
		.from('news_articles')
		.select('source_url')
		.in('source_url', urls);

	if (error) {
		console.error('Deduplication query failed:', error.message);
		return [];
	}

	const existingUrls = new Set(existing?.map((e) => e.source_url) ?? []);
	return items.filter((i) => !existingUrls.has(i.link));
}
