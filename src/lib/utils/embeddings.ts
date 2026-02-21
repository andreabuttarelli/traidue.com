export interface StoredEmbedding {
	slug: string;
	title: string;
	category: string;
	sources: { title: string; url: string; year: number }[];
	embedding: number[];
}

export function cosineSimilarity(a: number[], b: number[]): number {
	let dotProduct = 0;
	let normA = 0;
	let normB = 0;
	for (let i = 0; i < a.length; i++) {
		dotProduct += a[i] * b[i];
		normA += a[i] * a[i];
		normB += b[i] * b[i];
	}
	return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function findRelevantArticles(
	queryEmbedding: number[],
	storedEmbeddings: StoredEmbedding[],
	topK: number = 5,
	currentSlug?: string
): StoredEmbedding[] {
	const scored = storedEmbeddings.map((entry) => ({
		...entry,
		score: cosineSimilarity(queryEmbedding, entry.embedding)
	}));

	scored.sort((a, b) => b.score - a.score);

	const results = scored.slice(0, topK);

	// Always include currentSlug if provided and not already in results
	if (currentSlug && !results.find((r) => r.slug === currentSlug)) {
		const current = scored.find((r) => r.slug === currentSlug);
		if (current) {
			results.pop();
			results.unshift(current);
		}
	}

	return results;
}
