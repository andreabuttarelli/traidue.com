# Wiki Articles Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Write 9 in-depth wiki articles (2000-3000 words each) in Italian about trans topics, with 8-15 web-searched sources per article.

**Architecture:** Each article is a standalone Markdown file with YAML frontmatter, stored in `src/content/wiki/{category}/`. Articles are loaded via `import.meta.glob` in `src/lib/utils/wiki.ts`. No code changes needed — only new/modified `.md` files.

**Tech Stack:** Markdown with YAML frontmatter, mdsvex for rendering

**Design doc:** `docs/plans/2026-02-18-wiki-articles-design.md`

---

## Common Instructions for ALL Tasks

Every article task follows the same workflow:

1. **Web search** for 8-15 sources (peer-reviewed, institutional, recent 2022-2026)
2. **Write the article** in Italian, 2000-3000 words, tone: neutral-expository
3. **Format:** YAML frontmatter + Markdown body with `##` sections
4. **Verify build:** `npm run build` must succeed
5. **Commit** the article

**Frontmatter template:**

```yaml
---
title: "..."
slug: "..."
description: "... (150-160 chars for SEO)"
category: "scienza|percorsi|cultura|terminologia"
tags: ["...", "...", "..."]
date: "2026-02-18"
updated: "2026-02-18"
sources:
  - title: "Source Name"
    url: "https://..."
    year: 2024
related: ["other-article-slug"]
---
```

**Writing guidelines:**
- Use `##` for main sections, `###` for subsections
- Bold key terms on first use
- Cite sources inline where relevant (e.g., "Secondo uno studio pubblicato su The Lancet (2023)...")
- End with a "Stato attuale" or "Il dibattito" section summarizing where things stand
- No emojis, no exclamation marks, neutral encyclopedic tone
- All text in Italian

**Source quality rules:**
- Prefer: peer-reviewed journals (Lancet, Nature, JAMA, etc.), WHO, APA, governmental reports
- Accept: major newspapers for context, official statistics (ISTAT, Eurostat, UNAR)
- Avoid: blogs, opinion pieces, advocacy-only sources
- Every source URL must be real and verifiable via web search

---

## Task 1: Article — Basi biologiche dell'identità di genere

**File:** Create `src/content/wiki/scienza/basi-biologiche-identita-di-genere.md`

**Step 1: Research sources**

Web search for:
- "biological basis gender identity research"
- "twin studies gender identity heritability"
- "brain structure transgender neuroimaging"
- "prenatal hormones gender identity"
- "epigenetics gender identity"
- "genetics gender identity GWAS"

Collect 10-15 sources from peer-reviewed journals.

**Step 2: Write the article**

Sections:
1. Introduzione — Perché la scienza studia le basi biologiche dell'identità di genere
2. Geni e cromosomi: oltre XX e XY — Variazioni cromosomiche, intersessualità, limiti del binarismo biologico
3. Ormoni prenatali e differenziazione cerebrale — Teoria dell'esposizione ormonale prenatale, studi su CAH
4. Studi sui gemelli — Concordanza nei gemelli monozigoti vs dizigoti, stime di ereditabilità
5. Neuroimaging: differenze nella struttura cerebrale — Studi MRI su persone trans, limiti metodologici
6. Epigenetica — Modifiche epigenetiche e identità di genere
7. Perché non esiste un singolo "gene del genere" — Modello multifattoriale, interazione geni-ambiente
8. Consenso scientifico attuale — Cosa dicono le principali istituzioni (APA, Endocrine Society, WHO)

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add src/content/wiki/scienza/basi-biologiche-identita-di-genere.md
git commit -m "content: add article on biological basis of gender identity"
```

---

## Task 2: Article — Ricerche recenti sull'identità di genere (2022-2026)

**File:** Create `src/content/wiki/scienza/ricerche-recenti-identita-genere.md`

**Step 1: Research sources**

Web search for:
- "transgender research 2024 2025 2026"
- "gender identity neuroscience recent studies"
- "GWAS gender identity genome wide"
- "puberty blockers evidence review 2024"
- "hormone therapy transgender mental health outcomes"
- "gender identity persistence desistance longitudinal"

Collect 10-15 sources, prioritizing 2023-2026 publications.

**Step 2: Write the article**

Sections:
1. Introduzione — Il panorama della ricerca sull'identità di genere è in rapida evoluzione
2. Nuovi studi di neuroimaging — fMRI e DTI, risultati recenti
3. Genetica: GWAS e studi genomici — Studi su larga scala, risultati e limiti
4. Salute mentale: effetti della terapia ormonale — Meta-analisi recenti, qualità della vita
5. Desistenza e persistenza: cosa dicono i dati — Studi longitudinali, critica ai vecchi dati
6. Adolescenti trans: evidenze sulla puberty suppression — Evidenze, dibattito Cass Review
7. Meta-analisi recenti — Revisioni sistematiche, stato dell'arte

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/scienza/ricerche-recenti-identita-genere.md
git commit -m "content: add article on recent gender identity research (2022-2026)"
```

---

## Task 3: Article — Persone trans nello sport

**File:** Create `src/content/wiki/scienza/sport-e-persone-trans.md`

**Step 1: Research sources**

Web search for:
- "transgender athletes policy IOC 2023"
- "testosterone athletic performance transgender"
- "World Athletics transgender policy"
- "transgender sports science review"
- "FIFA transgender inclusion policy"
- "swimming FINA transgender rules"

Collect 10-15 sources.

**Step 2: Write the article**

Sections:
1. Introduzione — Lo sport come terreno di dibattito sull'inclusione trans
2. Fisiologia e performance atletica — Differenze fisiologiche, effetti della terapia ormonale sulle prestazioni
3. Evoluzione delle regole IOC — Dal 2003 al Framework 2021, i principi attuali
4. Testosterone e vantaggi competitivi: cosa dicono gli studi — Studi Harper, Roberts, meta-analisi
5. Politiche delle federazioni — FIFA, World Athletics, World Aquatics, rugby, ciclismo
6. Il dibattito attuale — Posizioni a confronto, equità vs inclusione, proposte alternative (categorie aperte)

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/scienza/sport-e-persone-trans.md
git commit -m "content: add article on transgender athletes and sports policy"
```

---

## Task 4: Article — La legge 164/1982 in Italia

**File:** Create `src/content/wiki/percorsi/legge-164-italia.md`

**Step 1: Research sources**

Web search for:
- "legge 164 1982 rettificazione sesso Italia"
- "sentenza corte costituzionale 221 2015 transgender"
- "cambio genere Italia procedura tribunale"
- "autodeterminazione genere proposta legge Italia"
- "Italian law gender recognition transgender"

Collect 8-12 sources (Italian legal sources, court rulings, comparative law).

**Step 2: Write the article**

Sections:
1. Introduzione — La legge 164/1982 come pioniera in Europa
2. Contesto storico e approvazione — L'Italia tra i primi paesi, il dibattito parlamentare
3. Cosa prevede la legge — Testo, requisiti, procedura originale
4. La sentenza della Corte Costituzionale 221/2015 — Fine dell'obbligo di sterilizzazione
5. L'iter oggi: tribunale, perizie, tempi — Procedura attuale passo per passo, tempi medi, differenze regionali
6. Proposte di riforma e autodeterminazione — DDL Zan, proposte successive, modello argentino
7. Confronto con altri paesi europei — Self-ID vs modello medico-giuridico

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/percorsi/legge-164-italia.md
git commit -m "content: add article on Italian gender recognition law (164/1982)"
```

---

## Task 5: Article — Diritti trans nel mondo

**File:** Create `src/content/wiki/percorsi/diritti-trans-internazionali.md`

**Step 1: Research sources**

Web search for:
- "transgender rights world map 2024"
- "gender recognition laws worldwide"
- "Argentina gender identity law self-determination"
- "anti-trans legislation USA 2024 2025"
- "transgender rights Europe ECHR"
- "ILGA World trans legal mapping"

Collect 10-15 sources.

**Step 2: Write the article**

Sections:
1. Introduzione — Un panorama frammentato e in rapida evoluzione
2. Paesi con pieno riconoscimento giuridico — Legislazioni più avanzate
3. Autodeterminazione di genere — Argentina (2012), Malta (2015), Danimarca (2014), altri
4. Paesi con restrizioni crescenti — USA (stato per stato), UK (dibattito post-Cass), Russia, Ungheria
5. Africa e Asia — Panorama eterogeneo: India (terzo genere), Iran (paradosso), Africa subsahariana
6. Organizzazioni internazionali — Risoluzioni ONU, sentenze CEDU, Yogyakarta Principles

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/percorsi/diritti-trans-internazionali.md
git commit -m "content: add article on transgender rights worldwide"
```

---

## Task 6: Article — Privacy e identità di genere

**File:** Create `src/content/wiki/percorsi/privacy-identita-di-genere.md`

**Step 1: Research sources**

Web search for:
- "privacy transgender GDPR personal data"
- "deadnaming legal implications Europe"
- "outing transgender workplace law"
- "gender identity documents privacy Italy"
- "transgender privacy rights school"

Collect 8-12 sources.

**Step 2: Write the article**

Sections:
1. Introduzione — L'identità di genere come dato ultrasensibile
2. Il diritto alla privacy nell'identità di genere — Fondamenti giuridici, CEDU art. 8
3. GDPR e dati sensibili — Classificazione, trattamento, consenso
4. Deadnaming e outing: implicazioni legali — Definizioni, casi giuridici, danni
5. Documenti e anagrafe — Gestione dei documenti durante la transizione, il problema del "doppio nome"
6. Tutele nei luoghi di lavoro e scuola — Normativa italiana ed europea, buone pratiche

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/percorsi/privacy-identita-di-genere.md
git commit -m "content: add article on privacy and gender identity"
```

---

## Task 7: Article — La situazione trans in Italia oggi

**File:** Create `src/content/wiki/cultura/situazione-trans-italia.md`

**Step 1: Research sources**

Web search for:
- "transgender Italy statistics ISTAT"
- "persone trans Italia discriminazione UNAR"
- "CIG centri identità genere Italia liste attesa"
- "DDL Zan transgender protezione"
- "transgender lavoro discriminazione Italia"
- "Arcigay report transgender 2024"

Collect 10-15 sources (ISTAT, UNAR, Arcigay, giornali per contesto).

**Step 2: Write the article**

Sections:
1. Introduzione — Una realtà spesso invisibile nelle statistiche
2. Dati e statistiche disponibili — Stime popolazione trans, lacune nei dati ufficiali
3. Accesso alla sanità — CIG (Centri di Identità di Genere), liste d'attesa, copertura SSN, differenze regionali
4. Discriminazione e violenza — Dati UNAR e Arcigay, hate crimes, tasso di vittime
5. DDL Zan e il dibattito politico — Cosa prevedeva, perché è stato affossato, conseguenze
6. Lavoro, casa, scuola: le sfide quotidiane — Discriminazione lavorativa, accesso agli alloggi, bullismo
7. Associazioni e supporto — MIT, Arcigay, consultori, helpline

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/cultura/situazione-trans-italia.md
git commit -m "content: add article on transgender situation in Italy today"
```

---

## Task 8: Article — Storia del movimento trans

**File:** Create `src/content/wiki/cultura/storia-movimento-trans.md`

**Step 1: Research sources**

Web search for:
- "transgender history movement timeline"
- "Magnus Hirschfeld Institut für Sexualwissenschaft"
- "Stonewall riots Marsha P Johnson Sylvia Rivera"
- "transgender rights history Europe"
- "MIT Movimento Identità Trans Italy history"
- "ICD-11 transgender declassification WHO 2019"

Collect 10-15 sources.

**Step 2: Write the article**

Sections:
1. Introduzione — Una storia di resistenza e conquiste
2. Prima di Stonewall: Magnus Hirschfeld e il primo istituto — L'Institut für Sexualwissenschaft (1919), distruzione nazista
3. Stonewall e Marsha P. Johnson — Le rivolte del 1969, protagonisti, impatto
4. Gli anni '70-'80: prime leggi e visibilità — Svezia (1972), Italia (1982), primi personaggi pubblici
5. Il movimento in Italia — MIT (1979), legge 164, attivismo italiano
6. Anni 2000: depatologizzazione e nuove identità — DSM-5, ICD-11, non-binary, espansione del linguaggio
7. Oggi: backlash e nuove sfide — Reazioni anti-trans, social media, nuova generazione di attivismo

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/cultura/storia-movimento-trans.md
git commit -m "content: add article on history of transgender movement"
```

---

## Task 9: Article — Identità di genere (RISCRITTURA)

**File:** Modify `src/content/wiki/terminologia/identita-di-genere.md`

**Step 1: Research sources**

Web search for:
- "gender identity definition WHO APA"
- "gender identity vs biological sex science"
- "gender spectrum non-binary science"
- "gender identity development children adolescents"
- "gender dysphoria ICD-11 DSM-5"

Collect 10-15 sources.

**Step 2: Rewrite the article completely**

Replace the current ~100-word placeholder with a full 2000-3000 word article.

Sections:
1. Introduzione — Cos'è l'identità di genere e perché è importante comprenderla
2. Definizione e concetti chiave — Identità di genere, espressione di genere, orientamento sessuale: le differenze
3. Differenza tra sesso biologico e genere — Cromosomi, ormoni, anatomia vs identità, ruolo sociale
4. Lo spettro di genere — Non-binary, genderfluid, agender, two-spirit, esperienze diverse
5. Come si sviluppa l'identità di genere — Sviluppo nell'infanzia e adolescenza, studi longitudinali
6. Disforia di genere e incongruenza di genere — DSM-5 vs ICD-11, differenze, depatologizzazione
7. Cosa dicono le principali istituzioni — WHO, APA, Endocrine Society, posizioni ufficiali
8. Stato attuale — Evoluzione della comprensione, questioni aperte

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/wiki/terminologia/identita-di-genere.md
git commit -m "content: rewrite gender identity article with full depth and sources"
```

---

## Task 10: Final verification and cross-linking

**Step 1: Verify all articles build**

Run: `npm run build`
Expected: Build succeeds, all 9 articles are picked up by `import.meta.glob`.

**Step 2: Verify article count**

Run: `npm run dev` and visit `/wiki` — should show 9 articles.

**Step 3: Verify related links work**

Check that `related` slugs in frontmatter match actual article slugs across all 9 articles.

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "content: verify and fix cross-links across all wiki articles"
```

---

## Task Summary

| Task | Article | Category | Dependencies |
|------|---------|----------|-------------|
| 1 | Basi biologiche identità di genere | scienza | - |
| 2 | Ricerche recenti (2022-2026) | scienza | - |
| 3 | Persone trans nello sport | scienza | - |
| 4 | Legge 164/1982 Italia | percorsi | - |
| 5 | Diritti trans nel mondo | percorsi | - |
| 6 | Privacy e identità di genere | percorsi | - |
| 7 | Situazione trans in Italia | cultura | - |
| 8 | Storia del movimento trans | cultura | - |
| 9 | Identità di genere (riscrittura) | terminologia | - |
| 10 | Verifica finale e cross-linking | - | 1-9 |

**All tasks 1-9 are independent and can be executed in parallel.**
Task 10 depends on all others completing first.
