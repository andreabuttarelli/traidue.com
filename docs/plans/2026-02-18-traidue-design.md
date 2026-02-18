# Tra i Due - Design Document

**Data:** 2026-02-18
**Dominio:** traidue.com
**Licenza:** Apache 2.0

## Panoramica

Tra i Due e' un sito di informazione in italiano su tematiche trans, con un approccio wiki arricchito da quiz interattivi. Il sito punta a essere una risorsa universale: informare persone trans sul proprio percorso e educare persone cisgender, combattendo la disinformazione. Focus particolare sul lato scientifico: neurologia, genetica, biologia, nuove scoperte e dibattiti scientifici.

## Target

- Persone trans che cercano informazioni affidabili
- Persone cisgender che vogliono informarsi
- Chiunque cerchi dati scientifici su tematiche trans

## Stack Tecnico

- **Framework:** SvelteKit con prerendering statico
- **Contenuti:** mdsvex (Markdown con componenti Svelte inline)
- **Styling:** Tailwind CSS
- **Deploy:** Vercel (adapter-vercel)
- **Build:** Vite (incluso in SvelteKit)
- **Lingua:** Solo italiano

## Architettura

### Struttura Progetto

```
traidue.com/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/          # Bottoni, card, callout
│   │   │   ├── quiz/        # QuizCard, ScoreBoard
│   │   │   ├── wiki/        # TOC, ArticleNav
│   │   │   └── seo/         # Meta tags, structured data
│   │   ├── data/
│   │   │   └── quiz/        # File JSON per i quiz
│   │   └── utils/           # Helpers
│   ├── content/
│   │   └── wiki/            # Articoli .md con frontmatter
│   │       ├── terminologia/
│   │       ├── scienza/
│   │       ├── percorsi/
│   │       └── cultura/
│   ├── routes/
│   │   ├── +page.svelte              # Homepage
│   │   ├── +layout.svelte            # Layout globale
│   │   ├── wiki/
│   │   │   ├── +page.svelte          # Indice wiki
│   │   │   └── [slug]/+page.svelte   # Articolo
│   │   ├── quiz/
│   │   │   ├── +page.svelte          # Lista quiz
│   │   │   └── [slug]/+page.svelte   # Quiz
│   │   └── chi-siamo/+page.svelte    # About
│   └── app.html
├── static/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-image.png
├── svelte.config.js
├── tailwind.config.js
└── package.json
```

## Contenuti Wiki

### Formato Articoli

File `.md` con frontmatter YAML:

```markdown
---
title: "Disforia di genere: cosa dice la scienza"
slug: "disforia-di-genere-scienza"
description: "Panoramica delle ricerche scientifiche sulla disforia di genere."
category: "scienza"
tags: ["neurologia", "genetica", "disforia", "ricerca"]
date: "2026-02-18"
updated: "2026-02-18"
sources:
  - title: "Brain structure and function in gender dysphoria"
    url: "https://example.com/study"
    year: 2023
related: ["identita-di-genere", "biologia-del-sesso"]
---

Contenuto con componenti Svelte inline (callout, grafici, ecc.)
```

### Categorie

1. **Terminologia** - Glossario, definizioni, linguaggio inclusivo
2. **Scienza** - Neurologia, genetica, biologia, studi recenti, dibattiti
3. **Percorsi** - Transizione medica/legale, diritti, normative italiane
4. **Cultura** - Storia del movimento, storie personali, rappresentazione

### Funzionalita'

- Ricerca testuale client-side
- Filtro per categoria e tag
- Navigazione articoli correlati
- TOC auto-generata
- Sezione fonti con link

## Sistema Quiz

### Formato Dati (JSON)

```json
{
  "slug": "quanto-ne-sai-di-identita-di-genere",
  "title": "Quanto ne sai di identita' di genere?",
  "description": "Metti alla prova le tue conoscenze.",
  "category": "terminologia",
  "questions": [
    {
      "text": "Domanda...",
      "options": ["A", "B", "C", "D"],
      "correct": 2,
      "explanation": "Spiegazione scientifica..."
    }
  ],
  "levels": [
    { "min": 0, "max": 30, "label": "Principiante", "message": "..." },
    { "min": 31, "max": 70, "label": "Informato/a", "message": "..." },
    { "min": 71, "max": 100, "label": "Esperto/a", "message": "..." }
  ]
}
```

### Flusso

1. Scelta quiz dalla lista
2. Domande una alla volta
3. Feedback immediato + spiegazione dopo ogni risposta
4. Barra di progresso
5. Risultato finale: punteggio %, livello, suggerimenti articoli
6. Possibilita' condivisione risultato

Punteggio calcolato client-side, non salvato.

## SEO Strategy

### SEO Tecnica

- Prerendering statico di tutte le pagine
- Meta tags completi: title, description, og:*, twitter:*
- Sitemap XML auto-generata a build time
- robots.txt ottimizzato
- Canonical URLs
- Core Web Vitals ottimali (target Lighthouse 95+)

### Structured Data (Schema.org)

- `Article` per articoli wiki
- `FAQPage` per pagine FAQ
- `Quiz` / `Question` per quiz (rich snippets)
- `WebSite` + `SearchAction` per ricerca interna
- `BreadcrumbList` per navigazione

### Contenuto SEO

- URL semantiche: `/wiki/disforia-di-genere-scienza`
- Heading hierarchy corretta (un solo h1 per pagina)
- Alt text su tutte le immagini
- Link interni tra articoli correlati
- Link esterni a fonti autorevoli

### Performance

- Immagini WebP/AVIF con lazy loading
- Font minimo (1-2 weight, preload)
- Zero JS non essenziale

### Open Graph / Social

- Immagini OG personalizzate per ogni articolo
- Card Twitter/Facebook complete

## Design Visivo

### Filosofia

Minimal, pulito, stile editoriale. Autorevolezza scientifica + accoglienza.

### Palette Colori

- **Primario:** Blu profondo (#1a1a2e) - autorita', fiducia
- **Accento:** Rosa tenue (#f4a4b8) - richiamo discreto ai colori trans
- **Background:** Bianco caldo (#fafaf8)
- **Testo:** Grigio scuro (#2d2d2d)
- **Secondari:** Grigi intermedi per bordi, card, separatori

### Tipografia

- **Headings:** Sans-serif geometrico (Inter, Space Grotesk)
- **Body:** Sans-serif leggibile (Inter, Source Sans Pro)
- Line-height 1.7+ per body text
- Dimensioni generose

### Layout

- Larghezza max contenuto: ~720px per articoli
- Navbar fissa: Logo | Wiki | Quiz | Chi Siamo
- Footer: link utili, licenza, contatti
- Sidebar TOC su desktop, collapsible su mobile

### Componenti UI

- Card con ombra sottile e bordi arrotondati
- Callout colorati per note/avvertenze/info
- Tag/Badge per categorie
- Progress bar animata per quiz
- Transizioni morbide tra pagine

### Responsive

- Mobile-first
- Breakpoint: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- Hamburger menu su mobile

## Pagine

1. **Homepage (/)** - Hero, articoli in evidenza, quiz in evidenza, categorie
2. **Wiki Index (/wiki)** - Ricerca, filtri, lista card articoli
3. **Articolo (/wiki/[slug])** - Breadcrumb, TOC, contenuto, fonti, correlati
4. **Quiz Index (/quiz)** - Card quiz con titolo, descrizione, n. domande
5. **Quiz (/quiz/[slug])** - Intro, domande, feedback, risultato
6. **Chi Siamo (/chi-siamo)** - Missione, metodologia, contatti

## Authoring

Contenuti generati con AI e revisionati da persone. Wiki in Markdown, landing pages in Svelte.
