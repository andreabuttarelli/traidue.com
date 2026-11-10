import { SITE } from '$lib/site';
import it from './it.json';
import itRaw from './it.json?raw';
import surgeonsData from './surgeons.json';

export interface Source {
	title: string;
	url: string;
	year: number | null;
}

export interface Procedure {
	slug: string;
	name: string;
	aka?: string[];
	category: 'femminilizzante' | 'mascolinizzante' | 'altro';
	area: string;
	summary: string;
	techniques?: { name: string; description: string }[];
	eligibility?: string | null;
	hospitalStay?: string | null;
	recovery?: string | null;
	risks?: string[];
	/** Peer-reviewed findings, one claim per item, each with its PubMed link. */
	evidence?: { claim: string; url: string; year: number | null }[];
	costs: { ssn: string | null; private: string | null };
	providers?: string[];
	sources: Source[];
	/** Common fears, as people ask them on Reddit, with a balanced answer and its medical sources. */
	fears?: Fear[];
	/** English search terms for more first-hand experiences on Reddit */
	redditQuery?: string;
}

export interface Fear {
	q: string;
	a: string;
	/** checked: false = found through search (via mirrors), not yet opened on reddit.com */
	reddit: { title: string; subreddit: string; url: string; checked: boolean }[];
	sources: Source[];
}

export interface Surgeon {
	id: string;
	name: string;
	institution: string;
	city: string;
	country: string;
	sector: 'pubblico' | 'privato' | 'entrambi';
	procedures: string[];
	url: string;
	source: string;
	verified: string;
}

// ponytail: Italian only for now; the UK (en) pages can reuse these types with their own json.
const byLocale: Record<string, Procedure[]> = { it: it as Procedure[] };

export const surgeons = surgeonsData as Surgeon[];

// Public: navbar, hero search, sitemap, indexed. Set to false to keep the pages by direct link only (noindex),
// e.g. while a new batch of medical content waits for review.
export const PROCEDURES_PUBLIC = true;
// the animated 3D procedures (set to dev to show them on the local dev server only)
export const PROCEDURES_3D = true;

export function getProcedures(locale: string): Procedure[] | null {
	return byLocale[locale] ?? null;
}

export function getProcedure(locale: string, slug: string): Procedure | null {
	return getProcedures(locale)?.find((p) => p.slug === slug) ?? null;
}

export function surgeonsFor(slug: string): Surgeon[] {
	return surgeons.filter((s) => s.procedures.includes(slug));
}

/** The procedure's line in the public JSON on GitHub, for corrections. */
export function procedureSourceUrl(slug: string): string {
	const at = itRaw.indexOf(`"slug": "${slug}"`);
	const line = at < 0 ? 1 : itRaw.slice(0, at).split('\n').length;
	return `${SITE.repo}/blob/main/src/lib/data/procedures/it.json#L${line}`;
}
