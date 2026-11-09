import { getServices } from '$lib/data/services';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	const services = getServices(getLocale());
	if (!services) error(404, 'Not found');
	return { services };
}
