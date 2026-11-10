import { SITE } from '$lib/site';
import it from './it.json';
import uk from './uk.json';
import es from './es.json';
import pt from './pt.json';
import itRaw from './it.json?raw';
import ukRaw from './uk.json?raw';
import esRaw from './es.json?raw';
import ptRaw from './pt.json?raw';

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
	country: 'IT' | 'UK' | 'ES' | 'PT';
	center: [number, number];
	zoom: number;
	services: Service[];
	file: string;
	raw: string;
}

// ponytail: country follows the site language (it → Italy, en → UK, es → Spain, pt → Portugal); geo-IP would need a function per request.
const byLocale: Record<string, ServicesCountry> = {
	it: { country: 'IT', center: [42.5, 12.5], zoom: 5, services: it as Service[], file: 'it.json', raw: itRaw },
	en: { country: 'UK', center: [54.5, -3], zoom: 5, services: uk as Service[], file: 'uk.json', raw: ukRaw },
	es: { country: 'ES', center: [40.2, -3.7], zoom: 5, services: es as Service[], file: 'es.json', raw: esRaw },
	pt: { country: 'PT', center: [39.6, -8], zoom: 6, services: pt as Service[], file: 'pt.json', raw: ptRaw }
};

export function getServices(locale: string): ServicesCountry | null {
	return byLocale[locale] ?? null;
}

export function getService(locale: string, id: string): Service | null {
	return getServices(locale)?.services.find((s) => s.id === id) ?? null;
}

/** The entry's line in the public JSON on GitHub, where anyone can propose a correction. */
export function serviceSourceUrl(locale: string, id: string): string | null {
	const country = getServices(locale);
	const at = country?.raw.indexOf(`"id": "${id}"`) ?? -1;
	if (!country || at < 0) return null;
	const line = country.raw.slice(0, at).split('\n').length;
	return `${SITE.repo}/blob/main/src/lib/data/services/${country.file}#L${line}`;
}
