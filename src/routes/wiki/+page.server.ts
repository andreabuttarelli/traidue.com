import { getAllArticles } from '$lib/utils/wiki';

export function load() {
	const articles = getAllArticles();
	const categories = [...new Set(articles.map((a) => a.category))];
	const tags = [...new Set(articles.flatMap((a) => a.tags))];
	return { articles, categories, tags };
}
