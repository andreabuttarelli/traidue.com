import { getService, getServices, serviceSourceUrl } from '$lib/data/services';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';

export const prerender = true;

// Italian ids; the UK ones (/en/servizi/<id>) are listed in svelte.config.js.
export function entries() {
	return getServices('it')!.services.map((s) => ({ id: s.id }));
}

export function load({ params }) {
	const locale = getLocale();
	const service = getService(locale, params.id);
	if (!service) error(404, 'Not found');
	return { service, country: getServices(locale)!.country, sourceUrl: serviceSourceUrl(locale, params.id) };
}
