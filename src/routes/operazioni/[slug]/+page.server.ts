import { getProcedure, getProcedures, procedureSourceUrl, surgeonsFor } from '$lib/data/procedures';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	return getProcedures('it')!.map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
	const procedure = getProcedure(getLocale(), params.slug);
	if (!procedure) error(404, 'Not found');
	return { procedure, surgeons: surgeonsFor(params.slug), editUrl: procedureSourceUrl(params.slug) };
}
