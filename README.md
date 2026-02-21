# Tra i Due

Informazione scientifica sulle tematiche trans, in italiano. Articoli, quiz e glossario basati su fonti peer-reviewed.

**[www.traidue.com](https://www.traidue.com)**

## Tech Stack

- **Framework** — SvelteKit con Svelte 5
- **Styling** — Tailwind CSS v4
- **Content** — mdsvex (markdown + Svelte)
- **Deploy** — Vercel (adapter-vercel)
- **OG Images** — satori + resvg-js (generazione dinamica)

## Contenuti

| Sezione | Quantità |
|---------|----------|
| Articoli wiki | 113 |
| Categorie | 5 (terminologia, scienza, percorsi, cultura, persone) |
| Quiz | 1 |
| Termini glossario | 18 |

## Struttura

```
src/
├── content/wiki/          # Articoli markdown con frontmatter YAML
│   ├── terminologia/
│   ├── scienza/
│   ├── percorsi/
│   ├── cultura/
│   └── persone/
├── lib/
│   ├── components/        # Componenti Svelte (SEO, UI, Wiki, Quiz)
│   ├── data/              # Quiz JSON, dati regioni/comuni
│   └── utils/             # Utility per wiki, quiz, SEO
└── routes/
    ├── wiki/[slug]/       # Pagine articolo
    ├── quiz/[slug]/       # Pagine quiz
    ├── glossario/         # Glossario con schema DefinedTermSet
    ├── og/[slug].png/     # OG image dinamiche
    ├── giovani/           # Pagina risorse giovani
    ├── chi-siamo/         # Chi siamo
    └── sitemap.xml/       # Sitemap dinamica
```

## Sviluppo

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
bun run preview
```

## Licenza

Tutti i diritti riservati.
