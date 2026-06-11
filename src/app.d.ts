// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/**
			 * Localized paths for the current page, keyed by locale, with
			 * TRANSLATED slugs (exposed by routes whose slug differs per
			 * language, e.g. /wiki/[slug]). The LanguageSwitcher uses this
			 * when present, falling back to localizeHref(pathname).
			 */
			alternates?: Record<string, string>;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
