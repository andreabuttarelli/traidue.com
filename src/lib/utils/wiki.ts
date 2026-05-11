export interface WikiArticle {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	date: string;
	updated: string;
	image?: string;
	sources: { title: string; url: string; year: number }[];
	faq?: { question: string; answer: string }[];
	media?: { type: string; title: string; url?: string; year?: number }[];
	changelog?: { date: string; changes: string[] }[];
	related: string[];
	lang?: string;
	translationKey?: string;
}

export interface WikiEntry {
	metadata: WikiArticle;
	default: import('svelte').Component;
}

const modules = import.meta.glob<WikiEntry>('/src/content/wiki/**/*.md', { eager: true });

function getLangFromPath(path: string): string {
	// path: /src/content/wiki/{lang}/{category}/{slug}.md
	const parts = path.split('/');
	return parts[4] ?? 'it';
}

export function getAllArticles(lang: string = 'it'): WikiArticle[] {
	const articles: WikiArticle[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const fileLang = getLangFromPath(path);
		if (fileLang !== lang) continue;

		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		articles.push({
			...module.metadata,
			slug,
			lang: fileLang
		});
	}

	return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string, lang: string = 'it'): WikiEntry | null {
	for (const [path, module] of Object.entries(modules)) {
		const fileLang = getLangFromPath(path);
		if (fileLang !== lang) continue;

		const fileSlug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (fileSlug === slug) {
			return module;
		}
	}

	return null;
}

export function getRawArticleBySlug(slug: string, lang: string = 'it'): string | null {
	const rawModules = import.meta.glob<string>('/src/content/wiki/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	for (const [path, content] of Object.entries(rawModules)) {
		const fileLang = getLangFromPath(path);
		if (fileLang !== lang) continue;

		const fileSlug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (fileSlug === slug) {
			return content;
		}
	}

	return null;
}

export function getTranslationSlugMap(lang: string): Record<string, string> {
	const map: Record<string, string> = {};
	for (const [path, module] of Object.entries(modules)) {
		const fileLang = getLangFromPath(path);
		if (fileLang !== lang) continue;
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const key = module.metadata?.translationKey;
		if (key) {
			map[key] = slug;
		}
	}
	return map;
}

export function getTranslations(translationKey: string): Record<string, WikiArticle> {
	const result: Record<string, WikiArticle> = {};

	for (const [path, module] of Object.entries(modules)) {
		if (module.metadata?.translationKey === translationKey) {
			const lang = getLangFromPath(path);
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			result[lang] = { ...module.metadata, slug, lang };
		}
	}

	return result;
}
