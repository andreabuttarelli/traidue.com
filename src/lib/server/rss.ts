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
			const res = await fetch(source.feed_url, {
				signal: AbortSignal.timeout(10_000),
				headers: { 'User-Agent': 'traidue.com/1.0 (news aggregator)' }
			});
			if (!res.ok) {
				throw new Error(`HTTP ${res.status} for ${source.name}`);
			}
			const xml = await res.text();
			return parseFeed(xml, source.name);
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

function parseFeed(xml: string, sourceName: string): RSSItem[] {
	const isAtom = /<feed[\s>]/.test(xml);
	return isAtom ? parseAtom(xml, sourceName) : parseRSS(xml, sourceName);
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

function parseAtom(xml: string, sourceName: string): RSSItem[] {
	const items: RSSItem[] = [];
	const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
	let match;

	while ((match = entryRegex.exec(xml)) !== null) {
		const block = match[1];
		const title = extractTag(block, 'title');
		const link = extractAtomLink(block);
		const pubDate = extractTag(block, 'updated') || extractTag(block, 'published');
		const description = extractTag(block, 'content') || extractTag(block, 'summary');

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

function extractAtomLink(xml: string): string | null {
	// Prefer <link rel="alternate" href="..."/> (attribute order varies)
	const altMatch = /<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/.exec(xml)
		|| /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["']/.exec(xml);
	if (altMatch) return altMatch[1];

	// Fallback: first <link href="..."/>
	const hrefMatch = /<link[^>]*href=["']([^"']+)["']/.exec(xml);
	return hrefMatch ? hrefMatch[1] : null;
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
	const existingUrls = new Set<string>();

	// Batch in groups of 30 to avoid PostgREST URL length limits
	for (let i = 0; i < urls.length; i += 30) {
		const batch = urls.slice(i, i + 30);
		const { data, error } = await supabase
			.from('news_articles')
			.select('source_url')
			.in('source_url', batch);

		if (error) {
			console.error('Deduplication query failed:', error.message);
			return [];
		}
		for (const row of data ?? []) existingUrls.add(row.source_url);
	}

	return items.filter((i) => !existingUrls.has(i.link));
}
