/**
 * Central, host-aware site configuration.
 *
 * The same codebase is deployed to multiple domains (traidue.com, transwiki.co).
 * Each deployment sets the PUBLIC_SITE_* env vars in its own Vercel project; when
 * unset (e.g. local dev or the traidue.com project) we fall back to the Tra i Due
 * defaults. Because the site is fully prerendered, these are resolved at BUILD time.
 *
 * `$env/dynamic/public` is used (rather than `static`) so that a var that isn't
 * set on a given deployment resolves to `undefined` and falls through to the
 * default below, instead of failing the build. For a fully prerendered site these
 * are still resolved at build time.
 */
import { env } from '$env/dynamic/public';

const url = (env.PUBLIC_SITE_URL ?? 'https://www.traidue.com').replace(/\/+$/, '');

export const SITE = {
	/** Full canonical origin, no trailing slash. e.g. https://www.traidue.com */
	url,
	/** Bare domain for display inside copy. e.g. traidue.com */
	domain: env.PUBLIC_SITE_DOMAIN ?? 'traidue.com',
	/** Brand name shown in UI, SEO and structured data. e.g. Tra i Due */
	brand: env.PUBLIC_SITE_BRAND ?? 'Tra i Due',
	/** Public contact email. */
	email: env.PUBLIC_CONTACT_EMAIL ?? 'info@traidue.com',
	/** Source code repository — shared across all deployments (host-independent). */
	repo: 'https://github.com/andreabuttarelli/traidue.com',
	/** Social profile linked from structured data. */
	instagram: env.PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/transwiki.co',
	/** Default Open Graph / social share image (absolute URL). */
	get ogImage() {
		return `${url}/images/wiki/identita-di-genere.webp`;
	}
};

/** Build an absolute URL on this site's origin from a path (e.g. "/wiki"). */
export function siteUrl(path = ''): string {
	if (!path) return SITE.url;
	return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
}
