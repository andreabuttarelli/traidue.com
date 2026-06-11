import { glossaryTerms as it } from './it';
import { glossaryTerms as en } from './en';
import { glossaryTerms as es } from './es';
import { glossaryTerms as pt } from './pt';

export type { GlossaryTerm } from './it';

const glossaries: Record<string, typeof it> = { it, en, es, pt };

export function getGlossaryTerms(lang: string = 'it'): typeof it {
	return glossaries[lang] ?? glossaries.it ?? [];
}
