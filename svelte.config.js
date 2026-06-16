import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { readdirSync, readFileSync, statSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const extraLocales = ['en', 'es', 'pt'];

/**
 * Localized URLs (/en/*, /es/*, /pt/*) are rerouted to the unprefixed routes by
 * hooks.ts, so SvelteKit's default entries ('*') only enumerates the Italian
 * (unprefixed) pages. We explicitly enumerate the localized entry points; the
 * crawler then discovers the rest by following the localized links in the
 * rendered HTML (Navbar/Footer/ArticleCard use localizeHref).
 * Wiki article slugs are TRANSLATED per language, so we enumerate them from the
 * filesystem to guarantee all of them are prerendered even if crawling misses one.
 */
function localizedEntries() {
	const entries = extraLocales.flatMap((l) => [`/${l}`, `/${l}/wiki`, `/${l}/quiz`, `/${l}/glossario`]);

	// Wiki articles: src/content/wiki/{lang}/{category}/{slug}.md
	for (const locale of extraLocales) {
		const base = join(__dirname, 'src/content/wiki', locale);
		if (!existsSync(base)) continue;
		for (const category of readdirSync(base)) {
			const dir = join(base, category);
			if (!statSync(dir).isDirectory()) continue;
			for (const file of readdirSync(dir)) {
				if (file.endsWith('.md')) {
					entries.push(`/${locale}/wiki/${file.replace(/\.md$/, '')}`);
				}
			}
		}
	}

	// Quizzes: src/lib/data/quiz/{lang}/{slug}.json (same slug across languages)
	for (const locale of extraLocales) {
		const base = join(__dirname, 'src/lib/data/quiz', locale);
		if (!existsSync(base)) continue;
		for (const file of readdirSync(base)) {
			if (file.endsWith('.json')) {
				entries.push(`/${locale}/quiz/${file.replace(/\.json$/, '')}`);
			}
		}
	}

	return entries;
}

const allLocales = ['it', ...extraLocales];

function buildWikiSlugMaps() {
	const slugToKey = new Map(); // slug (any language) -> translationKey
	const keyToSlug = new Map(); // translationKey -> { lang: slug }
	for (const locale of allLocales) {
		const base = join(__dirname, 'src/content/wiki', locale);
		if (!existsSync(base)) continue;
		for (const category of readdirSync(base)) {
			const dir = join(base, category);
			if (!statSync(dir).isDirectory()) continue;
			for (const file of readdirSync(dir)) {
				if (!file.endsWith('.md')) continue;
				const slug = file.replace(/\.md$/, '');
				const head = readFileSync(join(dir, file), 'utf8').slice(0, 2000);
				const key = head.match(/^translationKey:\s*"([^"]+)"/m)?.[1] ?? slug;
				slugToKey.set(slug, key);
				if (!keyToSlug.has(key)) keyToSlug.set(key, {});
				keyToSlug.get(key)[locale] = slug;
			}
		}
	}
	return { slugToKey, keyToSlug };
}

/**
 * Remark plugin: internal /wiki/<slug> links inside the markdown content are
 * written inconsistently across translations (Italian slugs, translated slugs,
 * with or without locale prefix). Rewrite every wiki link to the slug
 * TRANSLATED into the language of the file it appears in, with the proper
 * locale prefix (none for Italian).
 */
function localizeWikiLinks() {
	const { slugToKey, keyToSlug } = buildWikiSlugMaps();
	const linkRe = /^(?:\/(?:en|es|pt))?\/wiki\/([^/#?]+)([#?].*)?$/;
	return (tree, file) => {
		const filename = String(file.filename ?? file.path ?? '').replace(/\\/g, '/');
		const m = filename.match(/\/content\/wiki\/(it|en|es|pt)\//);
		if (!m) return;
		const lang = m[1];
		const visit = (node) => {
			if (node.type === 'link' && typeof node.url === 'string') {
				const lm = node.url.match(linkRe);
				if (lm) {
					const key = slugToKey.get(lm[1]);
					const target = key ? (keyToSlug.get(key)?.[lang] ?? lm[1]) : lm[1];
					node.url = `${lang === 'it' ? '' : `/${lang}`}/wiki/${target}${lm[2] ?? ''}`;
				}
			}
			if (Array.isArray(node.children)) node.children.forEach(visit);
		};
		visit(tree);
	};
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [localizeWikiLinks],
	layout: {
		_: resolve(__dirname, 'src/lib/components/wiki/WikiLayout.svelte')
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*', ...localizedEntries()],
			// Needed so that the absolute hreflang URLs emitted by SEO.svelte are
			// treated as internal links and crawled. Must match SITE.url, which is
			// derived from the same env var (PUBLIC_SITE_URL) at build time.
			origin: (process.env.PUBLIC_SITE_URL || 'https://www.traidue.com').replace(/\/+$/, ''),
			// Fail the build on broken internal links/pages so regressions like
			// untranslated slugs or dead wiki links can't slip through silently.
			handleHttpError: 'fail'
		}
	}
};

export default config;
