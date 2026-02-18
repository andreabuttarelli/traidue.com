# Wiki Articles Design - Articoli approfonditi con fonti

## Obiettivo

Creare 9 articoli wiki approfonditi (2000-3000 parole ciascuno) su temi controversi e rilevanti legati alle tematiche trans. Ogni articolo include 8-15 fonti cercate sul web e verificate.

## Parametri

- **Profondità:** 2000-3000 parole, 8-15 fonti per articolo
- **Tono:** Neutrale-espositivo. Presenta tutti i lati del dibattito con evidenze scientifiche. Non prende posizione esplicita ma lascia parlare i dati.
- **Fonti:** Cercate sul web, aggiornate al 2024-2026, peer-reviewed o istituzionali (WHO, APA, Lancet, Nature, ecc.)
- **Lingua:** Italiano
- **Formato:** Markdown con frontmatter YAML

## Struttura comune

Ogni articolo segue questo schema:

1. **Introduzione** (200-300 parole) — Contesto e perché il tema è rilevante
2. **Sezione centrale** (1200-2000 parole) — 3-5 sottosezioni con dati, studi, fatti
3. **Stato attuale / Dibattito** (300-500 parole) — Posizioni diverse, evidenze pro/contro
4. **Fonti** — 8-15 fonti nel frontmatter YAML

## Frontmatter

```yaml
title: "Titolo completo dell'articolo"
slug: "slug-url"
description: "Descrizione SEO 150-160 caratteri"
category: "scienza|percorsi|cultura|terminologia"
tags: ["tag1", "tag2", "tag3"]
date: "2026-02-18"
updated: "2026-02-18"
sources:
  - title: "Titolo fonte"
    url: "https://..."
    year: 2024
related: ["slug-articolo-correlato"]
```

## Piano articoli

### 1. `sport-e-persone-trans` → `src/content/wiki/scienza/sport-e-persone-trans.md`
- **Titolo:** Persone trans nello sport: regolamenti, scienza e dibattito
- **Categoria:** scienza
- **Sezioni:** Fisiologia e performance atletica · Evoluzione delle regole IOC (2003→2021→2023) · Testosterone e vantaggi competitivi: cosa dicono gli studi · Politiche delle federazioni (FIFA, World Athletics, nuoto) · Il dibattito attuale
- **Keyword SEO:** "persone trans sport", "transgender atleti"
- **Related:** basi-biologiche-identita-di-genere

### 2. `diritti-trans-internazionali` → `src/content/wiki/percorsi/diritti-trans-internazionali.md`
- **Titolo:** Diritti delle persone trans nel mondo: una mappa globale
- **Categoria:** percorsi
- **Sezioni:** Paesi con pieno riconoscimento giuridico · Autodeterminazione di genere (Argentina, Malta, Danimarca) · Paesi con restrizioni crescenti (USA, UK, Russia) · Africa e Asia: panorama eterogeneo · Organizzazioni internazionali (ONU, Corte Europea)
- **Keyword SEO:** "diritti trans mondo", "leggi transgender"
- **Related:** legge-164-italia, situazione-trans-italia

### 3. `privacy-identita-di-genere` → `src/content/wiki/percorsi/privacy-identita-di-genere.md`
- **Titolo:** Privacy e identità di genere: normative e tutele
- **Categoria:** percorsi
- **Sezioni:** Il diritto alla privacy nell'identità di genere · GDPR e dati sensibili · Deadnaming e outing: implicazioni legali · Documenti e anagrafe · Tutele nei luoghi di lavoro e scuola
- **Keyword SEO:** "privacy transgender", "deadnaming legge"
- **Related:** legge-164-italia, diritti-trans-internazionali

### 4. `legge-164-italia` → `src/content/wiki/percorsi/legge-164-italia.md`
- **Titolo:** La legge 164/1982: rettificazione di genere in Italia
- **Categoria:** percorsi
- **Sezioni:** Contesto storico e approvazione · Cosa prevede la legge · La sentenza della Corte Costituzionale 221/2015 · L'iter oggi: tribunale, perizie, tempi · Proposte di riforma e autodeterminazione · Confronto con altri paesi europei
- **Keyword SEO:** "legge 164 cambio sesso", "rettificazione genere Italia"
- **Related:** diritti-trans-internazionali, situazione-trans-italia, privacy-identita-di-genere

### 5. `situazione-trans-italia` → `src/content/wiki/cultura/situazione-trans-italia.md`
- **Titolo:** La situazione delle persone trans in Italia oggi
- **Categoria:** cultura
- **Sezioni:** Dati e statistiche disponibili · Accesso alla sanità (CIG, liste d'attesa) · Discriminazione e violenza (dati UNAR, Arcigay) · DDL Zan e il dibattito politico · Lavoro, casa, scuola: le sfide quotidiane · Associazioni e supporto
- **Keyword SEO:** "transgender Italia", "persone trans Italia situazione"
- **Related:** legge-164-italia, diritti-trans-internazionali

### 6. `storia-movimento-trans` → `src/content/wiki/cultura/storia-movimento-trans.md`
- **Titolo:** Storia del movimento trans: dalle rivolte di Stonewall a oggi
- **Categoria:** cultura
- **Sezioni:** Prima di Stonewall: Magnus Hirschfeld e il primo istituto · Stonewall e Marsha P. Johnson · Gli anni '70-'80: prime leggi e visibilità · Il movimento in Italia: dal MIT al riconoscimento · Anni 2000: depatologizzazione e nuove identità · Oggi: backlash e nuove sfide
- **Keyword SEO:** "storia transgender", "movimento trans storia"
- **Related:** situazione-trans-italia, diritti-trans-internazionali

### 7. `basi-biologiche-identita-di-genere` → `src/content/wiki/scienza/basi-biologiche-identita-di-genere.md`
- **Titolo:** Le basi biologiche dell'identità di genere
- **Categoria:** scienza
- **Sezioni:** Geni e cromosomi: oltre XX e XY · Ormoni prenatali e differenziazione cerebrale · Studi sui gemelli · Neuroimaging: differenze nella struttura cerebrale · Epigenetica · Perché non esiste un singolo "gene del genere" · Consenso scientifico attuale
- **Keyword SEO:** "cause biologiche transgender", "identità genere biologia"
- **Related:** ricerche-recenti-identita-genere, identita-di-genere

### 8. `ricerche-recenti-identita-genere` → `src/content/wiki/scienza/ricerche-recenti-identita-genere.md`
- **Titolo:** Le ultime ricerche sull'identità di genere (2022-2026)
- **Categoria:** scienza
- **Sezioni:** Nuovi studi di neuroimaging · Genetica: GWAS e studi genomici · Salute mentale: effetti della terapia ormonale · Desistenza e persistenza: cosa dicono i dati · Adolescenti trans: evidenze sulla puberty suppression · Meta-analisi recenti
- **Keyword SEO:** "ricerche transgender 2024", "studi identità genere recenti"
- **Related:** basi-biologiche-identita-di-genere, identita-di-genere

### 9. `identita-di-genere` → `src/content/wiki/terminologia/identita-di-genere.md` (RISCRITTURA)
- **Titolo:** Identità di genere: cos'è e cosa sappiamo
- **Categoria:** terminologia
- Riscrittura completa dell'articolo esistente con la stessa profondità degli altri (2000-3000 parole, 8-15 fonti)
- **Related:** basi-biologiche-identita-di-genere, ricerche-recenti-identita-genere

## Strategia di implementazione

Ogni articolo richiede:
1. Web search per fonti aggiornate
2. Scrittura del contenuto in italiano
3. Compilazione frontmatter con fonti verificate
4. Cross-linking con `related` tra articoli

Gli articoli possono essere scritti in parallelo (nessuna dipendenza tra loro).
