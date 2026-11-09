import it from './it.json';
import uk from './uk.json';

export type ServiceType = 'clinic' | 'consultorio' | 'association' | 'legal' | 'helpline' | 'support-group';

export interface Service {
	id: string;
	name: string;
	type: ServiceType;
	city: string;
	region: string;
	address: string | null;
	lat: number | null;
	lng: number | null;
	website: string;
	phone?: string;
	email?: string;
	description: string;
	source: string;
	verified: string;
}

export interface ServicesCountry {
	country: 'IT' | 'UK';
	center: [number, number];
	zoom: number;
	services: Service[];
}

// ponytail: country follows the site language (it → Italy, en → UK); geo-IP would need a function per request.
const byLocale: Record<string, ServicesCountry> = {
	it: { country: 'IT', center: [42.5, 12.5], zoom: 5, services: it as Service[] },
	en: { country: 'UK', center: [54.5, -3], zoom: 5, services: uk as Service[] }
};

export function getServices(locale: string): ServicesCountry | null {
	return byLocale[locale] ?? null;
}
