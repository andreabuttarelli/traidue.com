import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { createHash } from 'crypto';

const WIKI_DIR = 'src/content/wiki';
const OUTPUT_FILE = 'static/embeddings.json';
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
	console.error('GEMINI_API_KEY not set in environment');
	process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });

interface ArticleEmbedding {
	slug: string;
	title: string;
	category: string;
	sources: { title: string; url: string; year: number }[];
	embedding: number[];
	hash?: string;
}

function getMarkdownFiles(dir: string): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir)) {
		const fullPath = join(dir, entry);
		if (statSync(fullPath).isDirectory()) {
			files.push(...getMarkdownFiles(fullPath));
		} else if (entry.endsWith('.md')) {
			files.push(fullPath);
		}
	}
	return files;
}

function parseFrontmatter(content: string): Record<string, any> {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const frontmatter: Record<string, any> = {};
	let currentArray: any[] | null = null;
	let currentObject: Record<string, any> | null = null;

	for (const line of match[1].split('\n')) {
		// Handle array items with object properties
		if (currentArray !== null && /^\s+-\s+\w+:/.test(line)) {
			const objMatch = line.match(/^\s+-\s+(\w+):\s*"?(.+?)"?\s*$/);
			if (objMatch) {
				currentObject = { [objMatch[1]]: objMatch[2] };
				currentArray.push(currentObject);
				continue;
			}
		}
		if (currentObject && /^\s+\w+:/.test(line) && !/^\s+-/.test(line)) {
			const propMatch = line.match(/^\s+(\w+):\s*"?(.+?)"?\s*$/);
			if (propMatch) {
				const val = propMatch[2];
				currentObject[propMatch[1]] = isNaN(Number(val)) ? val : Number(val);
				continue;
			}
		}
		// Handle simple array items
		if (currentArray !== null && /^\s+-\s/.test(line)) {
			const val = line.replace(/^\s+-\s*"?/, '').replace(/"?\s*$/, '');
			currentObject = null;
			currentArray.push(val);
			continue;
		}
		// Handle top-level key
		const keyMatch = line.match(/^(\w+):\s*(.*)/);
		if (keyMatch) {
			currentObject = null;
			const [, key, rawVal] = keyMatch;
			const val = rawVal.replace(/^"/, '').replace(/"$/, '').trim();
			if (val === '') {
				currentArray = [];
				frontmatter[key] = currentArray;
			} else if (val.startsWith('[')) {
				// Inline array like tags: ["a", "b"]
				frontmatter[key] = val.replace(/[\[\]"]/g, '').split(',').map(s => s.trim());
				currentArray = null;
			} else {
				frontmatter[key] = val;
				currentArray = null;
			}
		}
	}
	return frontmatter;
}

function extractBody(content: string): string {
	const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
	// Remove markdown syntax for cleaner embedding
	return withoutFrontmatter
		.replace(/^#{1,6}\s+/gm, '')  // headings
		.replace(/\*\*(.+?)\*\*/g, '$1')  // bold
		.replace(/\*(.+?)\*/g, '$1')  // italic
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links
		.replace(/!\[.*?\]\(.*?\)/g, '')  // images
		.replace(/```[\s\S]*?```/g, '')  // code blocks
		.replace(/\n{3,}/g, '\n\n')
		.trim()
		.slice(0, 8000);
}

function fileHash(content: string): string {
	return createHash('md5').update(content).digest('hex');
}

async function main() {
	const forceAll = process.argv.includes('--force');
	const files = getMarkdownFiles(WIKI_DIR);
	console.log(`Found ${files.length} articles`);

	// Load existing embeddings
	let existing: ArticleEmbedding[] = [];
	const existingBySlug = new Map<string, ArticleEmbedding>();
	if (!forceAll && existsSync(OUTPUT_FILE)) {
		try {
			existing = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
			for (const e of existing) {
				existingBySlug.set(e.slug, e);
			}
			console.log(`Loaded ${existing.length} existing embeddings`);
		} catch {
			console.log('Could not parse existing embeddings, regenerating all');
		}
	}

	// Determine which files need (re)generation
	const allSlugs = new Set<string>();
	const toProcess: { filePath: string; slug: string; content: string }[] = [];

	for (const filePath of files) {
		const content = readFileSync(filePath, 'utf-8');
		const slug = filePath.split('/').pop()!.replace('.md', '');
		allSlugs.add(slug);

		const hash = fileHash(content);
		const prev = existingBySlug.get(slug);

		if (prev?.hash === hash) {
			// Content unchanged, skip
			continue;
		}

		toProcess.push({ filePath, slug, content });
	}

	// Remove embeddings for deleted articles
	const kept = existing.filter(e => allSlugs.has(e.slug) && !toProcess.some(p => p.slug === e.slug));

	if (toProcess.length === 0) {
		console.log('All embeddings are up to date, nothing to do');
		// Still write in case deleted articles need to be removed
		if (kept.length !== existing.length) {
			writeFileSync(OUTPUT_FILE, JSON.stringify(kept));
			console.log(`Removed ${existing.length - kept.length} stale embeddings`);
		}
		return;
	}

	console.log(`${toProcess.length} articles need embedding (${files.length - toProcess.length} cached)`);

	const newEmbeddings: ArticleEmbedding[] = [];
	const batchSize = 10;

	for (let i = 0; i < toProcess.length; i += batchSize) {
		const batch = toProcess.slice(i, i + batchSize);
		const results = await Promise.all(
			batch.map(async ({ filePath, slug, content }) => {
				const frontmatter = parseFrontmatter(content);
				const category = relative(WIKI_DIR, filePath).split('/')[0];
				const body = extractBody(content);
				const textToEmbed = `${frontmatter.title || slug}\n${frontmatter.description || ''}\n${body}`;

				const result = await model.embedContent(textToEmbed);
				const embedding = result.embedding.values;

				return {
					slug,
					title: frontmatter.title || slug,
					category,
					sources: Array.isArray(frontmatter.sources) ? frontmatter.sources : [],
					embedding,
					hash: fileHash(content)
				};
			})
		);
		newEmbeddings.push(...results);
		console.log(`Processed ${Math.min(i + batchSize, toProcess.length)}/${toProcess.length}`);
	}

	const final = [...kept, ...newEmbeddings];
	writeFileSync(OUTPUT_FILE, JSON.stringify(final));
	const sizeMB = (Buffer.byteLength(JSON.stringify(final)) / 1024 / 1024).toFixed(2);
	console.log(`Saved ${final.length} embeddings to ${OUTPUT_FILE} (${sizeMB} MB) — ${newEmbeddings.length} new/updated, ${kept.length} cached`);
}

main().catch(console.error);
