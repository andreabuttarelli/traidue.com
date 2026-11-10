import { getCountries } from '$lib/data/services';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	const countries = getCountries(getLocale());
	if (!countries.length) error(404, 'Not found');
	return { countries };
}
