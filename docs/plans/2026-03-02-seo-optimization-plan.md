# SEO Optimization & Content Gap Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Optimize all 119 existing wiki articles for keyword coverage and create 5 high-priority new articles to fill the biggest content gaps.

**Architecture:** Two-phase approach. Phase A: batch-optimize frontmatter (seoTitle, description, tags) of all existing articles using keyword research data. Phase B: create new articles for Tier 1 content gaps. Each article follows existing mdsvex conventions with YAML frontmatter, sourced FAQ schema, and evidence-based content.

**Tech Stack:** SvelteKit, mdsvex, YAML frontmatter, structured data (Article + FAQPage schema)

**Reference:** Keyword research in `docs/plans/2026-03-02-keyword-research.md`

---

## Phase A: Optimize Existing Articles

The optimization for each article consists of:
1. Add `seoTitle` (keyword-optimized question/query format) if missing
2. Rewrite `description` to include primary + secondary keywords (max 160 chars)
3. Expand `tags` to cover keyword variants from research
4. Add/improve `faq` entries to target People Also Ask queries

### Task 1: Optimize terminologia articles (8 articles)

**Files:**
- Modify: `src/content/wiki/terminologia/identita-di-genere.md` (frontmatter only)
- Modify: `src/content/wiki/terminologia/che-cose-il-genere.md` (frontmatter only)
- Modify: `src/content/wiki/terminologia/che-cose-il-sesso-biologico.md` (frontmatter only)
- Modify: `src/content/wiki/terminologia/persone-non-binarie.md` (frontmatter only)
- Modify: `src/content/wiki/terminologia/linguaggio-inclusivo.md` (frontmatter only)
- Modify: all other terminologia/*.md (frontmatter only)

**Step 1: Read each file's frontmatter and apply these optimizations**

For each article, update frontmatter using keyword research (Cluster 7, 8, 22). Rules:

- `identita-di-genere.md`:
  - Add seoTitle: `"Cos'è l'identità di genere? Significato e differenza con il sesso biologico"`
  - Update description: `"Cos'è l'identità di genere, come si forma, e perché è diversa dal sesso biologico e dall'orientamento sessuale. Definizione, sviluppo e cosa dice la scienza."`
  - Update tags: `["identità di genere", "significato", "sesso biologico", "orientamento sessuale", "genere", "transgender", "definizione"]`

- `che-cose-il-genere.md`:
  - Keep seoTitle as is (already has one)
  - Update description to include "differenza tra sesso e genere" keyword
  - Add tags: `"differenza sesso genere"`, `"ruolo di genere"`, `"espressione di genere"`

- `che-cose-il-sesso-biologico.md`:
  - Keep seoTitle as is
  - Add keyword "quanti sessi biologici esistono" to description
  - Add tags: `"cromosomi"`, `"XX XY"`, `"dimorfismo sessuale"`

- `persone-non-binarie.md`:
  - Keep seoTitle as is
  - Update description to include "non binary significato" and "come capire se sono non binario"
  - Add tags: `"non binary"`, `"genderqueer"`, `"agender"`, `"enby"`, `"pronomi"`

- `linguaggio-inclusivo.md`:
  - Keep seoTitle as is
  - Update description to include "schwa", "pronomi neutri italiano"
  - Add tags: `"schwa"`, `"pronomi neutri"`, `"italiano inclusivo"`, `"scrittura inclusiva"`

- For any other terminologia articles: read, add seoTitle if missing (question format targeting main keyword), expand tags with keyword variants

**Step 2: Run dev server to verify no build errors**

Run: `bun run dev` (check for markdown compilation errors)
Expected: No errors

**Step 3: Commit**

```bash
git add src/content/wiki/terminologia/
git commit -m "seo: optimize terminologia articles frontmatter with keyword research data"
```

---

### Task 2: Optimize scienza articles (29 articles)

**Files:**
- Modify: all `src/content/wiki/scienza/*.md` (frontmatter only)

**Step 1: Read each file and apply optimizations**

Key keyword mappings from Clusters 2, 3, 4, 9, 14, 16:

- `basi-biologiche-identita-di-genere.md`:
  - Add seoTitle: `"Esistono basi biologiche dell'identità di genere? Cosa dice la scienza"`
  - Update description: include "cervello transgender", "genetica transgender", "si nasce trans"
  - Add tags: `"cervello"`, `"epigenetica"`, `"gemelli"`, `"neuroimaging"`, `"biologia"`

- `terapia-ormonale-guida.md`:
  - Keep seoTitle
  - Update description: include "come iniziare terapia ormonale transgender", "TOS", "SSN gratuita"
  - Add tags: `"TOS"`, `"estradiolo"`, `"testosterone"`, `"SSN"`, `"gratuita"`, `"AIFA"`, `"come iniziare"`

- `terapia-ormonale-a-vita.md`:
  - Keep seoTitle
  - Include "terapia ormonale transgender a vita" and "rischi lungo termine" in description
  - Add tags: `"lungo termine"`, `"rischi"`, `"effetti collaterali"`, `"durata"`

- `corpo-cambia-dopo-ormoni.md`:
  - Keep seoTitle
  - Include "effetti testosterone ftm", "effetti estrogeni mtf", "timeline", "prima e dopo" in description
  - Add tags: `"timeline"`, `"prima e dopo"`, `"mtf"`, `"ftm"`, `"testosterone"`, `"estrogeni"`, `"cambiamenti fisici"`

- `detransizione.md`:
  - Add seoTitle: `"Quante persone detransizionano? Dati, cause e percentuali reali"`
  - Include "detransizione percentuale", "pentiti cambio sesso" in description
  - Add tags: `"percentuale"`, `"pentiti"`, `"rimpianto"`, `"dati"`, `"ritransizione"`

- `chirurgia-affermazione-di-genere.md`:
  - Add seoTitle: `"Chirurgia di affermazione di genere: tipi, percorso e cosa aspettarsi"`
  - Include "operazione cambio sesso", "chirurgia transgender Italia" in description
  - Add tags: `"operazione"`, `"cambio sesso"`, `"Italia"`, `"SSN"`, `"tipi di intervento"`

- `vaginoplastica-come-funziona.md`:
  - Keep seoTitle
  - Include "vaginoplastica transgender", "tempi recupero", "complicanze" in description
  - Add tags: `"procedura"`, `"recupero"`, `"dilatazione"`, `"lembo peno-scrotale"`, `"colonvaginoplastica"`

- `vaginoplastica-risultati.md`:
  - Keep seoTitle
  - Include "vaginoplastica prima e dopo", "profondità", "sensibilità" in description
  - Add tags: `"risultati"`, `"prima e dopo"`, `"sensibilità"`, `"profondità"`, `"soddisfazione"`

- `falloplastica-risultati.md`:
  - Keep seoTitle
  - Include "falloplastica risultati", "metoidioplastica vs falloplastica" in description
  - Add tags: `"risultati"`, `"metoidioplastica"`, `"lembo radiale"`, `"complicanze"`

- `chirurgia-mtf.md`:
  - Keep seoTitle
  - Include "chirurgia mtf Italia", "orchiectomia", "femminilizzazione viso FFS" in description
  - Add tags: `"mtf"`, `"orchiectomia"`, `"FFS"`, `"mastoplastica additiva"`, `"Italia"`

- `chirurgia-ftm.md`:
  - Keep seoTitle
  - Include "mastectomia ftm", "top surgery", "metoidioplastica" in description
  - Add tags: `"ftm"`, `"mastectomia"`, `"top surgery"`, `"metoidioplastica"`, `"isterectomia"`

- `salute-mentale-persone-trans.md`:
  - Add seoTitle: `"Come sta la salute mentale delle persone trans? Dati e fattori di rischio"`
  - Include "depressione transgender", "suicidio", "minority stress" in description
  - Add tags: `"depressione"`, `"ansia"`, `"suicidio"`, `"minority stress"`, `"benessere"`, `"statistiche"`

- `teoria-gender.md`:
  - Keep seoTitle (already good: "La teoria gender esiste davvero?")
  - Include "ideologia gender", "gender nelle scuole" in description
  - Add tags: `"ideologia gender"`, `"scuola"`, `"bufala"`, `"gender studies"`

- `contagio-sociale-trans.md`:
  - Keep seoTitle
  - Include "ROGD", "contagio sociale trans mito" in description
  - Add tags: `"ROGD"`, `"Littman"`, `"mito"`, `"debunking"`

- `sport-e-persone-trans.md`:
  - Add seoTitle: `"Persone trans nello sport: è davvero un vantaggio? Cosa dice la scienza"`
  - Include "atleti trans", "trans sport femminile", "regole CIO" in description
  - Add tags: `"atleti trans"`, `"olimpiadi"`, `"CIO"`, `"testosterone"`, `"regolamenti"`, `"vantaggio fisico"`

- `quante-persone-trans.md`:
  - Keep seoTitle
  - Include "quante persone trans in Italia", "percentuale transgender" in description

- `fertilita-persone-trans.md`:
  - Keep seoTitle
  - Include "preservazione fertilità", "crioconservazione", "gravidanza uomo trans" in description
  - Add tags: `"crioconservazione"`, `"ovociti"`, `"sperma"`, `"gravidanza"`, `"trapianto utero"`

- `sicurezza-transizione.md`:
  - Keep seoTitle
  - Include "transizione di genere è sicura", "rischi terapia ormonale" in description

- For remaining scienza articles: same pattern — read, add seoTitle if missing, expand description with target keywords, expand tags

**Step 2: Run dev server to verify**

Run: `bun run dev`
Expected: No errors

**Step 3: Commit**

```bash
git add src/content/wiki/scienza/
git commit -m "seo: optimize scienza articles frontmatter with keyword research data"
```

---

### Task 3: Optimize percorsi articles (14 articles)

**Files:**
- Modify: all `src/content/wiki/percorsi/*.md` (frontmatter only)

**Step 1: Read each file and apply optimizations**

Key keyword mappings from Clusters 1, 5, 6, 15, 21:

- `iniziare-transizione.md`:
  - Keep seoTitle (already good)
  - Update description: include "cambio sesso", "come cambiare sesso in Italia", "fasi transizione"
  - Add tags: `"cambio sesso"`, `"primi passi"`, `"fasi"`, `"tempi"`, `"come iniziare"`

- `legge-164-italia.md`:
  - Add seoTitle: `"Legge 164/1982: come funziona la rettificazione di genere in Italia?"`
  - Include "rettifica sesso senza intervento", "cambio genere senza operazione" in description
  - Add tags: `"rettificazione anagrafica"`, `"cambio sesso"`, `"senza operazione"`, `"sentenza"`, `"Corte Costituzionale"`

- `cambio-documenti-trans.md`:
  - Keep seoTitle
  - Include "cambio nome transgender", "cambio codice fiscale", "rettifica anagrafica" in description
  - Add tags: `"codice fiscale"`, `"carta identità"`, `"patente"`, `"passaporto"`, `"anagrafe"`, `"rettifica"`

- `privacy-identita-di-genere.md`:
  - Add seoTitle: `"Privacy e identità di genere: come sono protetti i dati delle persone trans?"`
  - Include "GDPR", "protezione dati persone trans" in description

- `transizione-sociale.md`:
  - Keep seoTitle
  - Include "transizione di genere senza operazione", "coming out", "nome scelto" in description

- `ddl-disforia.md`:
  - Keep seoTitle
  - Include "bloccanti pubertà Italia", "minori trans legislazione" in description
  - Add tags: `"bloccanti"`, `"pubertà"`, `"minori"`, `"legislazione"`, `"triptorelina"`

- `persone-trans-e-lavoro.md`:
  - Keep seoTitle
  - Include "discriminazione lavoro trans", "curriculum transgender", "colloquio" in description
  - Add tags: `"colloquio"`, `"curriculum"`, `"discriminazione"`, `"inclusione"`, `"diritti lavorativi"`

- `nascondere-essere-trans.md`:
  - Keep seoTitle
  - Include "stealth transgender", "passing" in description

- `costituzione-diritti-trans.md`:
  - Keep seoTitle
  - Include "Costituzione italiana persone trans", "articoli Costituzione" in description

- `diritti-trans-mancanti.md`:
  - Keep seoTitle
  - Include "autodeterminazione di genere Italia", "diritti mancanti" in description

- `trans-e-sanita.md`:
  - Keep seoTitle
  - Include "discriminazione transgender sanità", "accesso cure" in description

- For remaining percorsi articles: same pattern

**Step 2: Run dev server to verify**

Run: `bun run dev`
Expected: No errors

**Step 3: Commit**

```bash
git add src/content/wiki/percorsi/
git commit -m "seo: optimize percorsi articles frontmatter with keyword research data"
```

---

### Task 4: Optimize cultura articles (61 articles)

**Files:**
- Modify: all `src/content/wiki/cultura/*.md` (frontmatter only)

**Step 1: Read each file and apply optimizations**

This is the largest batch. Key keyword mappings from Clusters 10-13, 15, 17-20:

**Coming out cluster:**
- `coming-out-trans.md`: Add seoTitle: `"Coming out trans: come farlo, quando e cosa aspettarsi"`. Tags: add `"famiglia"`, `"lavoro"`, `"consigli"`, `"paura"`
- `coming-out-trans-adulti.md`: Tags: add `"adulti"`, `"tardi"`, `"30 anni"`, `"40 anni"`
- `coming-out-trans-in-coppia.md`: Tags: add `"relazione"`, `"partner"`, `"coppia"`, `"dire al partner"`
- `coming-out-figlio-trans.md`: Tags: add `"genitori"`, `"mio figlio"`, `"accettazione"`, `"AGEDO"`
- `sono-trans.md`: Tags: add `"come capire"`, `"test"`, `"segnali"`, `"dubbi"`

**Family cluster:**
- `figlio-trans-cosa-fare.md`: Tags: add `"mio figlio è trans"`, `"mia figlia è trans"`, `"accettare"`, `"AGEDO"`
- `famiglie-e-persone-trans.md`: Add seoTitle: `"Famiglie e persone trans: come supportare chi ami"`. Tags: add `"supporto"`, `"AGEDO"`, `"genitori"`
- `bambini-trans.md`: Already well optimized. Add tag `"disforia di genere bambini"`
- `genitorialita-trans.md`: Tags: add `"gravidanza uomo trans"`, `"adozione"`, `"genitore trans"`

**Dating/relationships cluster:**
- `dating-persone-trans.md`: Tags: add `"app incontri"`, `"come conoscere"`, `"dating"`
- `partner-trans.md`: Add seoTitle: `"Relazione con persona trans: cosa sapere e come viverla"`
- `stare-con-una-ragazza-trans.md`: Tags: add `"la mia ragazza è trans"`, `"consigli"`
- `stare-con-un-ragazzo-trans.md`: Tags: add `"il mio ragazzo è trans"`, `"consigli"`
- `attrazione-donne-trans.md`: Tags: add `"mi piacciono le donne trans"`, `"orientamento"`, `"nome"`
- `attrazione-uomini-trans.md`: Tags: add `"mi piacciono gli uomini trans"`, `"orientamento"`
- `donna-trans-lesbica.md`: Tags: add `"lesbica"`, `"orientamento sessuale"`, `"donna trans"`
- `uomo-trans-gay.md`: Tags: add `"gay"`, `"orientamento sessuale"`, `"uomo trans"`
- `dove-incontrare-persone-trans.md`: Tags: add `"app"`, `"social"`, `"comunità"`, `"eventi"`

**Film/media cluster:**
- `euphoria-serie-tv.md`: Tags: add `"HBO"`, `"Jules"`, `"Hunter Schafer"`, `"recensione"`
- `pose-serie-tv.md`: Tags: add `"FX"`, `"ballroom"`, `"New York"`, `"recensione"`
- `paris-is-burning.md`: Tags: add `"documentario"`, `"voguing"`, `"ballroom culture"`
- `disclosure-documentario.md`: Tags: add `"Netflix"`, `"rappresentazione mediatica"`, `"Hollywood"`
- `the-danish-girl.md`: Tags: add `"film"`, `"Lili Elbe"`, `"Eddie Redmayne"`
- All other media articles: add relevant tags

**Rights/politics cluster:**
- `situazione-trans-italia.md`: Add seoTitle: `"Qual è la situazione dei diritti trans in Italia oggi?"`
- `diritti-trans-mancanti.md`: Keep seoTitle. Tags: add `"autodeterminazione"`, `"legge mancante"`
- `politica-italiana-diritti-trans.md`: Add seoTitle: `"Come si posizionano i partiti italiani sui diritti trans?"`
- `diritti-trans-nel-mondo.md`: Add seoTitle: `"Diritti delle persone trans nel mondo: la mappa aggiornata"`

**Religion/feminism cluster:**
- `religioni-e-persone-trans.md`: Add seoTitle: `"Cosa dicono le religioni sulle persone transgender?"`
- `femminismo-e-donne-trans.md`: Tags: add `"TERF"`, `"trans escludente"`, `"transfemminismo"`, `"gender critical"`
- `donne-trans-sono-donne.md`: Tags: add `"validità"`, `"identità"`, `"femminismo"`

**History cluster:**
- `persone-trans-nella-storia.md`: Tags: add `"antichità"`, `"culture"`, `"terzo genere"`
- `storia-movimento-trans.md`: Add seoTitle: `"La storia del movimento transgender: dalle origini a oggi"`
- `condizione-trans-prima-1982.md`: Tags: add `"legge 164"`, `"prima della legge"`, `"repressione"`

**Other cultura articles:** Read each, add seoTitle if missing, expand tags with relevant keyword variants

**Step 2: Run dev server to verify**

Run: `bun run dev`
Expected: No errors

**Step 3: Commit**

```bash
git add src/content/wiki/cultura/
git commit -m "seo: optimize cultura articles frontmatter with keyword research data"
```

---

### Task 5: Optimize persone articles (11 articles)

**Files:**
- Modify: all `src/content/wiki/persone/*.md` (frontmatter only)

**Step 1: Read each file and apply optimizations**

Key keyword mappings from Cluster 18:

- `marsha-p-johnson.md`: Tags: add `"Stonewall"`, `"attivismo"`, `"New York"`, `"storia LGBT"`
- `sylvia-rivera.md`: Tags: add `"STAR"`, `"Stonewall"`, `"attivismo"`, `"latine"`
- `lili-elbe.md`: Tags: add `"The Danish Girl"`, `"prima transizione"`, `"storia"`, `"arte"`
- `christine-jorgensen.md`: Tags: add `"prima donna trans famosa"`, `"America"`, `"anni '50"`
- `marcella-di-folco.md`: Tags: add `"Italia"`, `"politica"`, `"MIT"`, `"attivismo italiano"`
- `valentina-petrillo.md`: Tags: add `"atletica"`, `"paralimpiadi"`, `"sport"`, `"Italia"`
- `lynn-conway.md`: Tags: add `"informatica"`, `"microelettronica"`, `"VLSI"`, `"Michigan"`
- `coccinelle.md`: Tags: add `"Francia"`, `"spettacolo"`, `"Parigi"`, `"anni '60"`
- `alan-l-hart.md`: Tags: add `"medicina"`, `"raggi X"`, `"tubercolosi"`, `"pioniere"`
- `renee-richards.md`: Tags: add `"tennis"`, `"sport"`, `"pioniera"`, `"tribunale"`
- `frances-thompson.md`: Tags: add `"storia"`, `"Guerra Civile"`, `"Memphis"`, `"attivismo"`

**Step 2: Run dev server to verify**

Run: `bun run dev`
Expected: No errors

**Step 3: Commit**

```bash
git add src/content/wiki/persone/
git commit -m "seo: optimize persone articles frontmatter with keyword research data"
```

---

## Phase B: Create New Tier 1 Articles

These are the 5 highest-priority content gaps identified in the keyword research.

### Task 6: Create disforia-di-genere.md (HEAD TERM: 3k-8k/mese)

**Files:**
- Create: `src/content/wiki/terminologia/disforia-di-genere.md`

**Step 1: Write the article**

This is the single most important content gap. "Disforia di genere" is the highest-volume head term with no dedicated page.

Frontmatter:
```yaml
---
title: "Disforia di genere: cos'è, sintomi e diagnosi"
seoTitle: "Cos'è la disforia di genere? Significato, sintomi e differenza con l'incongruenza di genere"
slug: "disforia-di-genere"
description: "Cos'è la disforia di genere, come si manifesta, quali sono i criteri diagnostici del DSM-5, la differenza con l'incongruenza di genere dell'ICD-11, e perché non è una malattia mentale."
category: "terminologia"
tags: ["disforia di genere", "significato", "sintomi", "diagnosi", "DSM-5", "incongruenza di genere", "ICD-11", "identità di genere", "come capire", "test"]
date: "2026-03-02"
updated: "2026-03-02"
image: "/images/wiki/disforia-di-genere.webp"
sources:
  - title: "Diagnostic and Statistical Manual of Mental Disorders, 5th Edition, Text Revision (DSM-5-TR)"
    url: "https://psychiatry.org/psychiatrists/practice/dsm"
    year: 2022
  - title: "ICD-11 — Gender Incongruence (HA60)"
    url: "https://icd.who.int/browse/2024-01/mms/en#411470068"
    year: 2019
  - title: "Gender Incongruence is No Longer a Mental Disorder"
    url: "https://www.mentalhealthjournal.org/articles/gender-incongruence-is-no-longer-a-mental-disorder.html"
    year: 2020
  - title: "Standards of Care for the Health of Transgender and Gender Diverse People, Version 8 (WPATH)"
    url: "https://www.tandfonline.com/doi/full/10.1080/26895269.2022.2100644"
    year: 2022
  - title: "Guidelines for Psychological Practice With Transgender and Gender Nonconforming People (APA)"
    url: "https://www.apa.org/practice/guidelines/transgender.pdf"
    year: 2015
  - title: "Endocrine Treatment of Gender-Dysphoric/Gender-Incongruent Persons (Endocrine Society)"
    url: "https://academic.oup.com/jcem/article/102/11/3869/4157558"
    year: 2017
faq:
  - question: "Cos'è la disforia di genere?"
    answer: "La disforia di genere è la sofferenza che una persona può provare quando il genere assegnato alla nascita non corrisponde alla propria identità di genere. Non è una malattia mentale: dal 2019, l'OMS classifica la condizione come 'incongruenza di genere' nel capitolo salute sessuale dell'ICD-11, fuori dai disturbi mentali."
  - question: "Come si manifesta la disforia di genere?"
    answer: "Può manifestarsi come disagio verso le proprie caratteristiche sessuali, desiderio di avere le caratteristiche del genere sentito, sofferenza nell'essere percepiti nel genere assegnato, e malessere legato al nome e ai pronomi. L'intensità varia da persona a persona e può cambiare nel tempo."
  - question: "Disforia di genere e incongruenza di genere sono la stessa cosa?"
    answer: "No. L'incongruenza di genere (ICD-11) è la condizione in sé: la discrepanza tra identità di genere e sesso assegnato. La disforia di genere (DSM-5) è la sofferenza clinicamente significativa che può derivarne. Si può essere transgender senza provare disforia."
  - question: "La disforia di genere è una malattia mentale?"
    answer: "No. L'OMS l'ha rimossa dai disturbi mentali nel 2019 con l'ICD-11. Il DSM-5 la classifica come condizione a sé, non come disturbo di personalità o psicosi. La sofferenza associata è spesso causata dallo stigma sociale e dalla mancanza di accesso alle cure, non dall'identità in sé."
  - question: "Come si diagnostica la disforia di genere?"
    answer: "Il DSM-5-TR richiede una marcata incongruenza tra genere sentito e genere assegnato, della durata di almeno sei mesi, associata a sofferenza clinicamente significativa. La diagnosi viene fatta da professionisti della salute mentale esperti in identità di genere, attraverso colloqui clinici."
related:
  - identita-di-genere
  - iniziare-transizione
  - bambini-trans
  - salute-mentale-persone-trans
media:
  - type: libro
    title: "Gender Trouble"
    year: 1990
---
```

Content structure (H2 sections):
1. `## Introduzione` — definizione in linguaggio accessibile
2. `## Cosa significa "disforia di genere"` — etimologia, significato clinico vs colloquiale
3. `## Come si manifesta` — sintomi negli adulti, negli adolescenti, nei bambini. NON usare liste che iniziano con `<` (break Svelte)
4. `## I criteri diagnostici` — DSM-5-TR criteri per adulti e per bambini, spiegati
5. `## Disforia di genere vs incongruenza di genere` — DSM-5 vs ICD-11, differenze chiave
6. `## Non è una malattia mentale` — depatologizzazione OMS 2019, storia del cambiamento
7. `## Come si affronta` — percorsi possibili (transizione sociale, ormonale, chirurgica, supporto psicologico)
8. `## La disforia non è uguale per tutti` — variabilità, non-linearità, non tutti i trans provano disforia
9. `## In Italia` — centri specializzati, percorso diagnostico, SSN

Write full article content (2000-3000 words), evidence-based, with numbered source references [1], [2], etc.

**Step 2: Generate OG image placeholder**

Note: image generation is separate — for now create article without image or use a placeholder path.

**Step 3: Run dev server to verify**

Run: `bun run dev`
Navigate to: `http://localhost:5173/wiki/disforia-di-genere`
Expected: Page renders correctly with FAQ schema

**Step 4: Commit**

```bash
git add src/content/wiki/terminologia/disforia-di-genere.md
git commit -m "feat: add disforia-di-genere article (highest-volume keyword gap)"
```

---

### Task 7: Create centri-transgender-italia.md (HIGH transactional intent)

**Files:**
- Create: `src/content/wiki/percorsi/centri-transgender-italia.md`

**Step 1: Write the article**

Frontmatter:
```yaml
---
title: "Centri per la disforia di genere in Italia: la mappa completa"
seoTitle: "Dove iniziare la transizione in Italia? Centri e servizi per regione"
slug: "centri-transgender-italia"
description: "Elenco aggiornato dei centri specializzati in identità di genere in Italia, regione per regione: ospedali, ambulatori, endocrinologi, psicologi e associazioni transgender."
category: "percorsi"
tags: ["centri", "Italia", "mappa", "endocrinologo", "psicologo", "ONIG", "SAIFIP", "CIDIGem", "SSN", "dove andare", "regioni"]
date: "2026-03-02"
updated: "2026-03-02"
image: "/images/wiki/centri-transgender-italia.webp"
sources:
  - title: "ONIG - I centri italiani"
    url: "https://www.onig.it/i-centri-italiani/"
    year: 2025
  - title: "Infotrans - Mappa dei servizi dedicati alle persone transgender in Italia"
    url: "https://www.infotrans.it/it-schede-3-mappa_servizi_transgender"
    year: 2024
  - title: "Azione Trans - Centri di transizione in Italia"
    url: "https://azionetrans.org/centri-di-transizione/"
    year: 2025
faq:
  - question: "Dove posso iniziare la transizione in Italia?"
    answer: "In Italia esistono centri pubblici specializzati in identità di genere in diverse regioni. I principali sono il SAIFIP a Roma, il CIDIGem a Torino, il centro di Careggi a Firenze, e il Centro Sui Generis a Milano. Si può accedere tramite il medico di base o direttamente, a seconda del centro."
  - question: "I centri per la disforia di genere sono gratuiti?"
    answer: "I centri pubblici del SSN offrono percorsi gratuiti o con ticket. I tempi di attesa possono essere lunghi (mesi o anni). In alternativa, esistono professionisti privati specializzati, ma i costi sono a carico del paziente."
  - question: "Serve l'impegnativa del medico di base?"
    answer: "Dipende dal centro. Alcuni accettano accesso diretto, altri richiedono impegnativa. È consigliabile contattare il centro scelto per informazioni aggiornate sulle modalità di accesso."
  - question: "Esistono centri per minori transgender?"
    answer: "Sì. Alcuni centri hanno percorsi dedicati ai minori, come Careggi a Firenze e il SAIFIP a Roma. L'accesso per i minori richiede generalmente il coinvolgimento dei genitori o tutori legali."
related:
  - iniziare-transizione
  - terapia-ormonale-guida
  - cambio-documenti-trans
  - trans-e-sanita
---
```

Content structure:
1. `## Introduzione` — come orientarsi nel sistema italiano
2. `## Come funziona il percorso` — breve overview (link a iniziare-transizione per dettagli)
3. `## I centri pubblici regione per regione` — H3 per macro-regione (Nord-Ovest, Nord-Est, Centro, Sud e Isole), con nome centro, ospedale, indirizzo, contatti, servizi offerti
4. `## Professionisti privati` — come trovare endocrinologi e psicologi specializzati
5. `## Associazioni e supporto` — AGEDO, MIT, Arcigay sportelli trans, gruppi di auto-aiuto
6. `## Consigli pratici` — cosa portare alla prima visita, domande da fare, tempistiche

Write full article (2000-3000 words). Research actual centers from infotrans.it e ONIG.

**Step 2: Run dev server to verify**

Run: `bun run dev`
Expected: Page renders

**Step 3: Commit**

```bash
git add src/content/wiki/percorsi/centri-transgender-italia.md
git commit -m "feat: add centri-transgender-italia article (transactional keyword gap)"
```

---

### Task 8: Create costi-transizione.md (HIGH transactional intent)

**Files:**
- Create: `src/content/wiki/percorsi/costi-transizione.md`

**Step 1: Write the article**

Frontmatter:
```yaml
---
title: "Quanto costa la transizione di genere in Italia"
seoTitle: "Quanto costa la transizione in Italia? Costi di ormoni, chirurgia e documenti"
slug: "costi-transizione"
description: "Costi della transizione di genere in Italia: terapia ormonale (gratuita SSN o 30-80 euro/mese), chirurgia, avvocato per rettificazione, e cosa copre il Servizio Sanitario Nazionale."
category: "percorsi"
tags: ["costi", "quanto costa", "transizione", "SSN", "gratuita", "terapia ormonale costo", "chirurgia costo", "avvocato", "rettificazione", "operazione cambio sesso costi"]
date: "2026-03-02"
updated: "2026-03-02"
image: "/images/wiki/costi-transizione.webp"
sources:
  - title: "AIFA - Determine 104272/2020 e 104273/2020 (erogabilità farmaci ormonali a carico SSN)"
    url: "https://www.aifa.gov.it/"
    year: 2020
  - title: "Infotrans - Il trattamento ormonale di affermazione di genere"
    url: "https://www.infotrans.it/it-schede-11-trattamento_ormonale_transgender"
    year: 2024
  - title: "Infotrans - Il procedimento di rettifica del genere in Italia"
    url: "https://www.infotrans.it/it-schede-39-rettifica_genere_italia"
    year: 2024
faq:
  - question: "Quanto costa la terapia ormonale transgender in Italia?"
    answer: "Dal 2020, la terapia ormonale per la transizione di genere è erogabile a carico del SSN grazie alle determine AIFA. Privatamente, i costi variano da 30 a 80 euro al mese per i farmaci, più le visite endocrinologiche."
  - question: "Quanto costa l'operazione di cambio sesso in Italia?"
    answer: "Attraverso il SSN, gli interventi chirurgici di affermazione di genere sono coperti (con ticket e tempi di attesa). Privatamente, una vaginoplastica può costare tra 15.000 e 30.000 euro, una mastectomia FTM tra 4.000 e 8.000 euro."
  - question: "Quanto costa l'avvocato per la rettificazione anagrafica?"
    answer: "I costi legali per la rettificazione di genere variano da 1.500 a 5.000 euro, a seconda del professionista e della complessità del caso. Alcuni avvocati specializzati offrono tariffe agevolate. È possibile accedere al gratuito patrocinio se i requisiti di reddito sono soddisfatti."
  - question: "La transizione di genere è gratuita in Italia?"
    answer: "Parzialmente. Il SSN copre terapia ormonale, percorso psicologico nei centri pubblici, e chirurgia. I costi a carico del paziente includono ticket, eventuali visite private per ridurre le attese, spese legali per la rettificazione, e interventi estetici non coperti (es. epilazione laser, FFS)."
related:
  - iniziare-transizione
  - terapia-ormonale-guida
  - chirurgia-affermazione-di-genere
  - cambio-documenti-trans
  - centri-transgender-italia
---
```

Content structure:
1. `## Introduzione` — panoramica costi, cosa copre il SSN e cosa no
2. `## Terapia ormonale` — costi SSN vs privato, farmaci specifici con prezzi indicativi
3. `## Percorso psicologico` — centri pubblici gratuiti vs privato
4. `## Chirurgia` — costi per tipo di intervento (SSN vs privato), H3 per vaginoplastica, mastectomia, falloplastica, FFS, altri
5. `## Rettificazione anagrafica` — costi avvocato, contributo unificato, gratuito patrocinio
6. `## Altri costi` — epilazione laser, logopedia, binder/protesi, documenti
7. `## Come risparmiare` — SSN, gratuito patrocinio, associazioni che offrono supporto

Write full article (2000-3000 words) with dati concreti e range di prezzo.

**Step 2: Run dev server to verify**

**Step 3: Commit**

```bash
git add src/content/wiki/percorsi/costi-transizione.md
git commit -m "feat: add costi-transizione article (transactional keyword gap)"
```

---

### Task 9: Create bloccanti-puberta.md (TRENDING: 500-1.5k/mese)

**Files:**
- Create: `src/content/wiki/scienza/bloccanti-puberta.md`

**Step 1: Write the article**

Frontmatter:
```yaml
---
title: "Bloccanti della pubertà: cosa sono, come funzionano e cosa dice la scienza"
seoTitle: "Bloccanti della pubertà per minori trans: sono sicuri? Cosa dice la ricerca"
slug: "bloccanti-puberta"
description: "Cosa sono i bloccanti della pubertà (triptorelina), come funzionano, perché si usano nella disforia di genere, effetti collaterali, reversibilità e situazione in Italia."
category: "scienza"
tags: ["bloccanti pubertà", "triptorelina", "pubertà", "minori", "disforia di genere", "reversibile", "effetti collaterali", "AIFA", "GnRH", "sicurezza"]
date: "2026-03-02"
updated: "2026-03-02"
image: "/images/wiki/bloccanti-puberta.webp"
sources:
  - title: "Pubertal Suppression for Transgender Youth and Risk of Suicidal Ideation"
    url: "https://pubmed.ncbi.nlm.nih.gov/31974216/"
    year: 2020
  - title: "Young Adult Psychological Outcome After Puberty Suppression and Gender Reassignment"
    url: "https://pubmed.ncbi.nlm.nih.gov/25201798/"
    year: 2014
  - title: "Puberty Suppression in Adolescents With Gender Identity Disorder: A Prospective Follow-Up Study"
    url: "https://pubmed.ncbi.nlm.nih.gov/20646177/"
    year: 2011
  - title: "WPATH Standards of Care Version 8 — Adolescent Chapter"
    url: "https://www.tandfonline.com/doi/full/10.1080/26895269.2022.2100644"
    year: 2022
  - title: "Endocrine Society Clinical Practice Guideline"
    url: "https://academic.oup.com/jcem/article/102/11/3869/4157558"
    year: 2017
  - title: "Ensuring Comprehensive Care and Support for Transgender and Gender-Diverse Children and Adolescents (AAP)"
    url: "https://publications.aap.org/pediatrics/article/142/4/e20182162/37381/"
    year: 2018
  - title: "Mental Health Outcomes in Transgender and Nonbinary Youths Receiving Gender-Affirming Care"
    url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2789423"
    year: 2022
faq:
  - question: "Cosa sono i bloccanti della pubertà?"
    answer: "Sono farmaci (agonisti del GnRH, come la triptorelina) che sospendono temporaneamente lo sviluppo puberale. Sono usati da oltre 40 anni in pediatria per la pubertà precoce e, dal 2009, anche per la disforia di genere nei minori, per dare tempo al giovane di esplorare la propria identità senza l'angoscia di cambiamenti corporei irreversibili."
  - question: "I bloccanti della pubertà sono reversibili?"
    answer: "Sì. Alla sospensione del trattamento, la pubertà riprende il suo corso naturale. A differenza della terapia ormonale cross-sex (testosterone o estrogeni), i bloccanti non inducono cambiamenti permanenti. Le principali linee guida internazionali (WPATH, Endocrine Society, AAP) li definiscono un intervento reversibile."
  - question: "Quali sono gli effetti collaterali dei bloccanti della pubertà?"
    answer: "Gli effetti documentati includono possibile riduzione della densità minerale ossea durante il trattamento (che si normalizza alla sospensione o all'avvio della terapia ormonale) e possibili effetti sull'umore. Gli studi di follow-up a lungo termine mostrano che i benefici sulla salute mentale superano i rischi."
  - question: "I bloccanti della pubertà sono legali in Italia?"
    answer: "Sì. L'AIFA ha autorizzato l'uso della triptorelina per la disforia di genere con una determina specifica. Tuttavia, il DDL in discussione potrebbe introdurre nuove restrizioni. Attualmente, i bloccanti sono prescrivibili in centri specializzati con equipe multidisciplinare."
related:
  - bambini-trans
  - adolescenti-trans
  - ddl-disforia
  - disforia-di-genere
  - iniziare-transizione
---
```

Content structure:
1. `## Introduzione` — cosa sono, perché se ne parla
2. `## Come funzionano` — meccanismo d'azione GnRH, stadi Tanner
3. `## Per chi sono indicati` — criteri, età, equipe multidisciplinare
4. `## Reversibilità` — cosa succede alla sospensione, confronto con TOS
5. `## Effetti collaterali e rischi` — densità ossea, umore, fertilità, studi
6. `## Cosa dice la ricerca` — risultati su salute mentale, suicidio, follow-up
7. `## Le linee guida internazionali` — WPATH, Endocrine Society, AAP
8. `## La situazione in Italia` — AIFA, triptorelina, DDL disforia, Careggi
9. `## Il dibattito` — critiche e risposte evidence-based

Write full article (2000-3000 words), heavily sourced.

**Step 2: Run dev server to verify**

**Step 3: Commit**

```bash
git add src/content/wiki/scienza/bloccanti-puberta.md
git commit -m "feat: add bloccanti-puberta article (trending keyword gap)"
```

---

### Task 10: Create carriera-alias.md (500-1.5k/mese)

**Files:**
- Create: `src/content/wiki/percorsi/carriera-alias.md`

**Step 1: Write the article**

Frontmatter:
```yaml
---
title: "Carriera alias: cos'è e come attivarla a scuola e in università"
seoTitle: "Cos'è la carriera alias? Come funziona a scuola e all'università in Italia"
slug: "carriera-alias"
description: "Cos'è la carriera alias, come si attiva nelle scuole e nelle università italiane, quali diritti garantisce, e come richiederla: guida pratica per studenti, genitori e docenti."
category: "percorsi"
tags: ["carriera alias", "scuola", "università", "nome scelto", "studenti trans", "come attivare", "diritti", "registro", "documenti"]
date: "2026-03-02"
updated: "2026-03-02"
image: "/images/wiki/carriera-alias.webp"
sources:
  - title: "MIUR - Note e circolari sulla carriera alias"
    url: "https://www.miur.gov.it/"
    year: 2023
  - title: "Infotrans - La carriera alias nelle scuole e nelle università"
    url: "https://www.infotrans.it/"
    year: 2024
  - title: "Rete Lenford - Guida carriera alias"
    url: "https://www.retelenford.it/"
    year: 2023
faq:
  - question: "Cos'è la carriera alias?"
    answer: "La carriera alias è un accordo tra lo studente (o i genitori se minorenne) e l'istituto scolastico o universitario, che permette di usare il nome scelto — anziché quello anagrafico — nel registro, nelle comunicazioni interne, nel badge e nella vita quotidiana della scuola."
  - question: "Come si attiva la carriera alias a scuola?"
    answer: "Si presenta una richiesta scritta alla dirigenza scolastica. Per i minorenni serve il consenso dei genitori. Non è richiesta alcuna diagnosi medica né certificato. La scuola predispone un protocollo interno per l'uso del nome scelto nel registro elettronico e nelle comunicazioni."
  - question: "La carriera alias è un diritto?"
    answer: "Non esiste una legge nazionale che la imponga. È una prassi adottata volontariamente dalle singole scuole e università. Molte università italiane l'hanno formalizzata (tra cui Bologna, Torino, Milano, Padova), mentre nelle scuole superiori la diffusione è più disomogenea."
  - question: "La carriera alias cambia i documenti ufficiali?"
    answer: "No. La carriera alias modifica solo i documenti interni dell'istituto (registro, badge, email istituzionale). Non ha effetto sui documenti legali come la pagella ufficiale, il diploma o il codice fiscale. Per quelli serve la rettificazione anagrafica tramite tribunale."
related:
  - cambio-documenti-trans
  - transizione-sociale
  - nascondere-essere-trans
  - sono-trans
---
```

Content structure:
1. `## Introduzione` — cos'è in parole semplici
2. `## Come funziona` — cosa cambia concretamente (registro, email, badge, comunicazioni)
3. `## Come attivarla a scuola` — procedura step by step, documenti necessari, minori vs maggiorenni
4. `## Come attivarla in università` — procedura, elenco università che la offrono
5. `## Cosa non cambia` — limiti: non modifica documenti ufficiali, diploma, codice fiscale
6. `## I diritti dello studente` — privacy, bagni, sport scolastico, gite
7. `## Se la scuola rifiuta` — a chi rivolgersi, associazioni, strumenti legali
8. `## Domande frequenti di genitori e docenti`

Write full article (1500-2500 words).

**Step 2: Run dev server to verify**

**Step 3: Commit**

```bash
git add src/content/wiki/percorsi/carriera-alias.md
git commit -m "feat: add carriera-alias article (high-volume keyword gap)"
```

---

### Task 11: Final build verification and combined commit

**Step 1: Run full build**

Run: `bun run build`
Expected: Build completes without errors

**Step 2: Verify new pages render**

Run: `bun run preview`
Check all 5 new URLs:
- `/wiki/disforia-di-genere`
- `/wiki/centri-transgender-italia`
- `/wiki/costi-transizione`
- `/wiki/bloccanti-puberta`
- `/wiki/carriera-alias`

**Step 3: Verify sitemap includes new pages**

Check: `/sitemap.xml` should list all new pages

**Step 4: Final status check**

Run: `git status` and `git log --oneline -10`
Expected: All changes committed in clean, atomic commits
