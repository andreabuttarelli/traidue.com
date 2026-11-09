import { getProcedures, surgeons } from '$lib/data/procedures';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	const procedures = getProcedures(getLocale());
	if (!procedures) error(404, 'Not found');
	return { procedures, surgeons };
}
