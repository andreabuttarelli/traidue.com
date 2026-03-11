import { glossaryTerms as it } from './it';

export type { GlossaryTerm } from './it';

const glossaries: Record<string, typeof it> = { it };

export function getGlossaryTerms(lang: string = 'it'): typeof it {
	return glossaries[lang] ?? glossaries.it ?? [];
}
