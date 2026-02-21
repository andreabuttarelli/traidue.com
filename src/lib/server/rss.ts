import { supabase } from './supabase';

interface RSSItem {
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

	const allItems: RSSItem[] = [];

	for (const source of sources) {
		try {
			const res = await fetch(source.feed_url);
			const xml = await res.text();
			const items = parseRSS(xml, source.name);
			allItems.push(...items);
		} catch (e) {
			console.error(`RSS fetch failed for ${source.name}:`, e);
		}
	}

	return allItems;
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
	const { data: existing } = await supabase
		.from('news_articles')
		.select('source_url')
		.in('source_url', urls);

	const existingUrls = new Set(existing?.map((e) => e.source_url) ?? []);
	return items.filter((i) => !existingUrls.has(i.link));
}
