<p align="center">
  <a href="https://www.transwiki.co">
    <img src="docs/readme/logo.svg" alt="TransWiki" width="300">
  </a>
</p>

<p align="center">
  <strong>Evidence-based, open-source information about trans topics, in four languages.</strong><br>
  <sub>🇮🇹 Informazione scientifica sulle tematiche trans: articoli, quiz, servizi e operazioni, con fonti peer-reviewed.</sub>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-5BCEFA" alt="License: Apache-2.0"></a>
  <a href="https://svelte.dev/docs/kit"><img src="https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white" alt="SvelteKit 2"></a>
  <img src="https://img.shields.io/badge/languages-it%20%C2%B7%20en%20%C2%B7%20es%20%C2%B7%20pt-F5A9B8" alt="Languages: it, en, es, pt">
  <a href="https://github.com/andreabuttarelli/traidue.com/actions/workflows/deploy.yml"><img src="https://github.com/andreabuttarelli/traidue.com/actions/workflows/deploy.yml/badge.svg" alt="Deploy"></a>
</p>

<p align="center">
  <a href="https://www.transwiki.co"><b>🌐 www.transwiki.co</b></a>
  &nbsp;·&nbsp;
  <a href="https://www.transwiki.co/wiki">Wiki</a>
  &nbsp;·&nbsp;
  <a href="https://www.transwiki.co/servizi">Services</a>
  &nbsp;·&nbsp;
  <a href="https://www.transwiki.co/operazioni">Procedures</a>
  &nbsp;·&nbsp;
  <a href="https://www.transwiki.co/llms.txt">llms.txt</a>
</p>

---

## ✨ What it is

TransWiki is a free reference on gender identity, transition, rights and culture. Every claim is backed by sources cited in the article itself, so readers can check the evidence rather than take it on trust.

- **Evidence-based**: each article carries a `sources` list of peer-reviewed studies, guidelines and laws.
- **Open source**: code, articles and datasets live in this repo. Anyone can spot an error and propose a fix.
- **Multilingual**: Italian (source language), English, Spanish and Portuguese, with translated URLs.

## 🧭 Features

| | Feature | Route | Where it lives |
|---|---|---|---|
| 📚 | **Wiki**: 148 articles per language, each with its sources | `/wiki`, `/wiki/[slug]` | [`src/content/wiki/{it,en,es,pt}`](src/content/wiki) |
| 🧠 | **Quizzes** to test what you know | `/quiz`, `/quiz/[slug]` | [`src/lib/data/quiz`](src/lib/data/quiz) |
| 📖 | **Glossary** of key terms | `/glossario` | [`src/lib/data/glossary`](src/lib/data/glossary) |
| 🗺️ | **Services map**: 166 services in Italy and 48 in the UK, built from InfoTrans open data plus verified entries, with a page per service and an "edit on GitHub" link | `/servizi`, `/servizi/[id]`, `/en/servizi` | [`src/lib/data/services`](src/lib/data/services) |
| 🩺 | **Procedures**: 15 gender-affirming procedures with peer-reviewed evidence, risks, recovery, costs and verified surgeons | `/operazioni`, `/operazioni/[slug]` | [`src/lib/data/procedures`](src/lib/data/procedures) |
| 🧬 | **3D vaginoplasty viewer**: interactive and step by step, built from real anatomy (BodyParts3D) | `/operazioni/vaginoplastica` | [`src/lib/components/procedures`](src/lib/components/procedures), [`static/anatomy`](static/anatomy) |
| 🤖 | **AI-readable**: an `llms.txt` index and the raw Markdown of every article | `/llms.txt`, `/wiki/[slug]/raw` | [`src/routes/llms.txt`](src/routes/llms.txt), [`src/routes/wiki/[slug]/raw`](src/routes/wiki/%5Bslug%5D/raw) |
| 🔎 | **SEO**: sitemap, robots.txt, hreflang, generated Open Graph images | `/sitemap.xml`, `/robots.txt`, `/og/[slug].png` | [`src/routes/sitemap.xml`](src/routes/sitemap.xml) |

English, Spanish and Portuguese pages live under `/en`, `/es` and `/pt`. Italian is unprefixed.

## 🤝 Contributing data

All data is plain files in this repo, so a correction is a pull request.

**Services and procedures.** Each service and each procedure is one JSON entry:

| Dataset | File |
|---|---|
| Services in Italy | [`src/lib/data/services/it.json`](src/lib/data/services/it.json) |
| Services in the UK | [`src/lib/data/services/uk.json`](src/lib/data/services/uk.json) |
| Procedures | [`src/lib/data/procedures/it.json`](src/lib/data/procedures/it.json) |
| Surgeons | [`src/lib/data/procedures/surgeons.json`](src/lib/data/procedures/surgeons.json) |

Every service and procedure page has a **"Modifica su GitHub"** (edit on GitHub) link that opens the exact line of its entry. Edit it, include a `source` URL that backs the change, and open a PR.

**Wiki articles.** Articles are Markdown with YAML frontmatter in `src/content/wiki/<lang>/<category>/<slug>.md`, where the category is one of `terminologia`, `scienza`, `percorsi`, `cultura` or `persone`. To propose one:

1. Copy an existing article in the same category as a template.
2. Fill in the frontmatter (`title`, `description`, `category`, `tags`, `date`) and a `sources` list with `title`, `url` and `year`.
3. Give translations the same `translationKey` so the language switcher links them together.
4. Open a PR. If you'd rather not write the Markdown yourself, open an issue with the topic and your sources.

## 🛠️ Tech stack

| Layer | Tooling |
|---|---|
| Framework | [SvelteKit 2](https://svelte.dev/docs/kit) with Svelte 5, Markdown via [mdsvex](https://github.com/pngwn/MDsveX) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| i18n | [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) (`messages/{it,en,es,pt}.json`) |
| Maps | [Leaflet](https://leafletjs.com) + markercluster on a vector basemap from [Natural Earth](https://www.naturalearthdata.com), no tile server |
| 3D | [Three.js](https://threejs.org) |
| OG images | satori + resvg-js |
| Hosting | Fully prerendered static output on [Vercel](https://vercel.com) |
| CI/CD | GitHub Actions ([`deploy.yml`](.github/workflows/deploy.yml)) builds the site and uploads the prebuilt output to Vercel: production on `main`, previews on PRs |

## 🚀 Local development

Requires [Bun](https://bun.sh) (npm works too).

```sh
bun install
bun run dev        # dev server at http://localhost:5173
```

```sh
bun run build      # prerender the whole site
bun run preview    # serve the production build
bun run check      # svelte-check type checking
```

The site builds without any environment variable. These optional `PUBLIC_*` vars are read at build time:

| Variable | Purpose | Default |
|---|---|---|
| `PUBLIC_SITE_URL` | Canonical origin, also used as the prerender origin | `https://www.transwiki.co` |
| `PUBLIC_SITE_DOMAIN` | Domain shown in copy | `transwiki.co` |
| `PUBLIC_SITE_BRAND` | Brand name in UI, SEO and structured data | `TransWiki` |
| `PUBLIC_CONTACT_EMAIL` | Public contact email | `info@traidue.com` |
| `PUBLIC_INSTAGRAM_URL` | Social profile in structured data | `https://www.instagram.com/transwiki.co` |
| `PUBLIC_FIREBASE_*` | Firebase web config for consent-gated analytics (`API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID`, `APP_ID`, `MEASUREMENT_ID`) | unset: analytics off |

## 🧰 Data scripts

Python scripts that regenerate the bundled datasets. Each one documents its inputs in its docstring.

| Script | What it does |
|---|---|
| [`scripts/import-infotrans.py`](scripts/import-infotrans.py) | Merges InfoTrans (ISS/UNAR) services into `services/it.json`, de-duplicating against existing entries and skipping personal contact data |
| [`scripts/build-basemaps.py`](scripts/build-basemaps.py) | Builds the simplified Italy and UK basemaps (land, region borders, neighbours) from Natural Earth GeoJSON |
| [`scripts/build-anatomy.py`](scripts/build-anatomy.py) | Builds `static/anatomy/pelvis-male.glb` from BodyParts3D OBJ files, one node per anatomical structure |

```sh
python3 scripts/import-infotrans.py <load_json file> src/lib/data/services/it.json
python3 scripts/build-basemaps.py <natural-earth geojson dir> src/lib/data/services
python3 scripts/build-anatomy.py <bodyparts3d dir> static/anatomy/pelvis-male.glb
```

## 📜 Data sources and licences

| Source | Used for | Licence |
|---|---|---|
| [BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/), © The Database Center for Life Science | 3D anatomy model | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| [InfoTrans](https://www.infotrans.it) (ISS / UNAR) | Part of the Italian services map; imported entries keep their InfoTrans page as `source` | Open data by default as Italian public-administration data (CAD art. 52), reused with attribution |
| [Natural Earth](https://www.naturalearthdata.com) | Map basemaps | Public domain |
| Peer-reviewed literature, guidelines, laws | Wiki articles and procedures | Cited in the `sources` of each article and procedure |

The project itself is released under the **[Apache License 2.0](LICENSE)**.

## ⚠️ Disclaimer

TransWiki is for **information only and is not medical, legal or psychological advice**. Content on procedures, hormones and services does not replace a consultation with qualified professionals. Service details can change, so always confirm with the provider.

<p align="center">
  <sub>Made with 🩵🩷🤍 for the trans community · <a href="https://www.transwiki.co">transwiki.co</a></sub>
</p>
