import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

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

async function main() {
	const files = getMarkdownFiles(WIKI_DIR);
	console.log(`Found ${files.length} articles`);

	const embeddings: ArticleEmbedding[] = [];
	const batchSize = 10;

	for (let i = 0; i < files.length; i += batchSize) {
		const batch = files.slice(i, i + batchSize);
		const results = await Promise.all(
			batch.map(async (filePath) => {
				const content = readFileSync(filePath, 'utf-8');
				const frontmatter = parseFrontmatter(content);
				const slug = filePath.split('/').pop()!.replace('.md', '');
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
					embedding
				};
			})
		);
		embeddings.push(...results);
		console.log(`Processed ${Math.min(i + batchSize, files.length)}/${files.length}`);
	}

	writeFileSync(OUTPUT_FILE, JSON.stringify(embeddings));
	const sizeMB = (Buffer.byteLength(JSON.stringify(embeddings)) / 1024 / 1024).toFixed(2);
	console.log(`Saved ${embeddings.length} embeddings to ${OUTPUT_FILE} (${sizeMB} MB)`);
}

main().catch(console.error);
