import { SITE } from '$lib/site';
import it from './it.json';
import uk from './uk.json';
import es from './es.json';
import pt from './pt.json';
import br from './br.json';
import itRaw from './it.json?raw';
import ukRaw from './uk.json?raw';
import esRaw from './es.json?raw';
import ptRaw from './pt.json?raw';
import brRaw from './br.json?raw';

export type ServiceType = 'clinic' | 'consultorio' | 'association' | 'legal' | 'helpline' | 'support-group';

export interface Service {
	id: string;
	name: string;
	type: ServiceType;
	city: string | null; // null = national/online
	region: string | null;
	address: string | null;
	lat: number | null;
	lng: number | null;
	website: string | null;
	phone?: string;
	email?: string;
	description: string;
	source: string;
	verified: string;
	/** Imported from InfoTrans (ISS/UNAR) as-is: shown as "consulted on", not "verified on". */
	origin?: 'infotrans';
	/** InfoTrans page for an entry we verified ourselves. */
	infotrans?: string;
	/** Monday → Sunday, null = closed. */
	hours?: (string | null)[];
}

export interface ServicesCountry {
	country: 'IT' | 'UK' | 'ES' | 'PT' | 'BR';
	/** shown by the country switch when a language has more than one country */
	name: string;
	center: [number, number];
	zoom: number;
	services: Service[];
	file: string;
	raw: string;
}

// ponytail: countries follow the site language (it → Italy, en → UK, es → Spain, pt → Portugal and Brazil, with a
// switch); geo-IP would need a function per request. Service ids are unique within a language.
const byLocale: Record<string, ServicesCountry[]> = {
	it: [{ country: 'IT', name: 'Italia', center: [42.5, 12.5], zoom: 5, services: it as Service[], file: 'it.json', raw: itRaw }],
	en: [{ country: 'UK', name: 'United Kingdom', center: [54.5, -3], zoom: 5, services: uk as Service[], file: 'uk.json', raw: ukRaw }],
	es: [{ country: 'ES', name: 'España', center: [40.2, -3.7], zoom: 5, services: es as Service[], file: 'es.json', raw: esRaw }],
	pt: [
		{ country: 'PT', name: 'Portugal', center: [39.6, -8], zoom: 6, services: pt as Service[], file: 'pt.json', raw: ptRaw },
		{ country: 'BR', name: 'Brasil', center: [-14, -52], zoom: 4, services: br as Service[], file: 'br.json', raw: brRaw }
	]
};

/** The countries of a language, the first one is the default. */
export function getCountries(locale: string): ServicesCountry[] {
	return byLocale[locale] ?? [];
}

export function getServices(locale: string): ServicesCountry | null {
	return getCountries(locale)[0] ?? null;
}

/** The country a service belongs to, within the language. */
export function countryOf(locale: string, id: string): ServicesCountry | null {
	return getCountries(locale).find((c) => c.services.some((s) => s.id === id)) ?? null;
}

export function getService(locale: string, id: string): Service | null {
	return countryOf(locale, id)?.services.find((s) => s.id === id) ?? null;
}

/** The entry's line in the public JSON on GitHub, where anyone can propose a correction. */
export function serviceSourceUrl(locale: string, id: string): string | null {
	const country = countryOf(locale, id);
	const at = country?.raw.indexOf(`"id": "${id}"`) ?? -1;
	if (!country || at < 0) return null;
	const line = country.raw.slice(0, at).split('\n').length;
	return `${SITE.repo}/blob/main/src/lib/data/services/${country.file}#L${line}`;
}
