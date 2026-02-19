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
	related: string[];
}

export interface WikiEntry {
	metadata: WikiArticle;
	default: import('svelte').Component;
}

export function getAllArticles(): WikiArticle[] {
	const modules = import.meta.glob<WikiEntry>('/src/content/wiki/**/*.md', { eager: true });
	const articles: WikiArticle[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		articles.push({
			...module.metadata,
			slug
		});
	}

	return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): WikiEntry | null {
	const modules = import.meta.glob<WikiEntry>('/src/content/wiki/**/*.md', { eager: true });

	for (const [path, module] of Object.entries(modules)) {
		const fileSlug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (fileSlug === slug) {
			return module;
		}
	}

	return null;
}

export function getRawArticleBySlug(slug: string): string | null {
	const modules = import.meta.glob<string>('/src/content/wiki/**/*.md', { eager: true, query: '?raw', import: 'default' });

	for (const [path, content] of Object.entries(modules)) {
		const fileSlug = path.split('/').pop()?.replace('.md', '') ?? '';
		if (fileSlug === slug) {
			return content;
		}
	}

	return null;
}
