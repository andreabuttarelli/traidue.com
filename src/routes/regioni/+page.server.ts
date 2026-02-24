import regioni from '$lib/data/regioni.json';
import { regioniDettaglio } from '$lib/data/regioni-dettaglio';

export const prerender = true;

export function load() {
	return {
		regioni: regioni.map((r) => ({
			...r,
			isRich: regioniDettaglio.has(r.slug)
		}))
	};
}
