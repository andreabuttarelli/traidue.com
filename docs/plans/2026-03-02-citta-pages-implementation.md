# Miglioramento pagine città — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Arricchire le 8 pagine città dettagliate con contenuto narrativo unico e verificato, aggiungere noindex alle ~7.888 pagine generiche per evitare penalizzazione thin content.

**Architecture:** Aggiungere nuovi campi testuali alla struttura dati `CittaDettaglio`, aggiornare il template Svelte per renderizzarli, aggiungere meta noindex al template generico. Ogni contenuto testuale deve essere ricercato e verificato con fonti esterne.

**Tech Stack:** SvelteKit, Svelte 5 runes, TypeScript, Tailwind CSS v4, dalnulla MCP (immagini)

---

### Task 1: Aggiungere noindex alle pagine generiche

**Files:**
- Modify: `src/lib/components/seo/SEO.svelte`
- Modify: `src/routes/citta/[slug]/+page.svelte`

**Step 1: Aggiungere prop `noindex` al componente SEO**

In `src/lib/components/seo/SEO.svelte`, aggiungere la prop `noindex`:

```svelte
<script lang="ts">
	let {
		title,
		description,
		url,
		image = 'https://www.traidue.com/images/wiki/identita-di-genere.webp',
		type = 'website',
		noindex = false,
		article
	}: {
		title: string;
		description: string;
		url: string;
		image?: string;
		type?: string;
		noindex?: boolean;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			section?: string;
			tags?: string[];
		};
	} = $props();
</script>

<svelte:head>
	<title>{title} | Tra i Due</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}
	<link rel="canonical" href={url} />
	<!-- rest unchanged -->
</svelte:head>
```

**Step 2: Passare `noindex` dal template generico delle città**

In `src/routes/citta/[slug]/+page.svelte`, nel blocco `{:else}` (template generico), aggiungere `noindex={true}`:

```svelte
<!-- Template generico — trova il componente SEO nel blocco {:else} -->
<SEO
	title="Risorse trans a {data.comune.nome}"
	description="Informazioni sulle tematiche trans per le persone di {data.comune.nome}, {data.comune.regione}."
	url="https://www.traidue.com/citta/{data.comune.slug}"
	noindex={true}
/>
```

**Step 3: Verificare che la sitemap già escluda i comuni generici**

La sitemap (`src/routes/sitemap.xml/+server.ts`) filtra già con `cittaDettaglio.has(c.slug)` — nessuna modifica necessaria.

**Step 4: Commit**

```bash
git add src/lib/components/seo/SEO.svelte src/routes/citta/[slug]/+page.svelte
git commit -m "feat: add noindex to generic city pages to prevent thin content indexing"
```

---

### Task 2: Estendere l'interfaccia CittaDettaglio

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts:9-31`

**Step 1: Aggiungere nuovi campi all'interfaccia**

In `src/lib/data/citta-dettaglio.ts`, aggiungere i campi dopo `metaDescription`:

```typescript
export interface CittaDettaglio {
	slug: string;
	nome: string;
	regione: string;
	provincia: string;
	intro: string;
	metaDescription: string;
	contesto_locale: string;
	centri_gender_intro: string;
	associazioni_intro: string;
	sportelli_intro: string;
	image: string;
	centri_gender: CentroGender[];
	associazioni: Associazione[];
	sportelli: Sportello[];
	iter_sanitario: {
		intro: string;
		passi: PassoIterSanitario[];
		note_importanti: string[];
	};
	storia_queer: {
		intro: string;
		eventi: EventoStoria[];
	};
	faq: { domanda: string; risposta: string }[];
	articoli_correlati: string[];
	ultimoAggiornamento: string;
}
```

**Step 2: Aggiungere campi placeholder vuoti a tutte le 8 città**

Per ogni città nell'array `dati`, aggiungere temporaneamente:

```typescript
contesto_locale: '',
centri_gender_intro: '',
associazioni_intro: '',
sportelli_intro: '',
image: '/images/citta/{slug}.webp',
```

Questo evita errori TypeScript mentre si scrive il contenuto reale nei task successivi.

**Step 3: Commit**

```bash
git add src/lib/data/citta-dettaglio.ts
git commit -m "feat: extend CittaDettaglio interface with narrative content fields"
```

---

### Task 3: Aggiornare il template Svelte per mostrare il nuovo contenuto

**Files:**
- Modify: `src/routes/citta/[slug]/+page.svelte`

**Step 1: Aggiungere la hero image e la sezione contesto locale**

Dopo l'header hero (riga ~192) e prima della sezione centri gender, aggiungere:

```svelte
<!-- Nell'header, aggiungere l'immagine hero se disponibile -->
<header class="mb-10 sm:mb-14">
	{#if data.dettaglio.image}
		<img
			src={data.dettaglio.image}
			alt="Risorse trans a {data.comune.nome}"
			class="w-full h-48 sm:h-64 object-cover rounded-xl mb-6"
			loading="eager"
		/>
	{/if}
	<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">
		Risorse trans a {data.comune.nome}
	</h1>
	<!-- resto invariato -->
</header>

<!-- Contesto locale — DOPO l'header, PRIMA dei centri -->
{#if data.dettaglio.contesto_locale}
	<section class="mb-12 sm:mb-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-4">
			La situazione a {data.comune.nome}
		</h2>
		<p class="text-base text-primary/80 leading-relaxed max-w-3xl">
			{data.dettaglio.contesto_locale}
		</p>
	</section>
{/if}
```

**Step 2: Aggiungere intro alle sezioni centri, associazioni, sportelli**

Prima dell'elenco card di ogni sezione, aggiungere il paragrafo intro:

```svelte
<!-- Sezione centri gender — aggiungere dopo l'h2, prima del grid -->
{#if data.dettaglio.centri_gender_intro}
	<p class="text-base text-primary/80 leading-relaxed mb-6 max-w-3xl">
		{data.dettaglio.centri_gender_intro}
	</p>
{/if}

<!-- Stessa cosa per associazioni e sportelli, usando le rispettive _intro -->
```

**Step 3: Aggiornare il componente SEO per usare l'immagine della città**

```svelte
<SEO
	title={data.isRich
		? `Risorse trans a ${data.comune.nome}: centri, associazioni, iter`
		: `Risorse trans a ${data.comune.nome}`}
	description={data.dettaglio?.metaDescription ?? `Informazioni sulle tematiche trans per le persone di ${data.comune.nome}, ${data.comune.regione}.`}
	url="https://www.traidue.com/citta/{data.comune.slug}"
	image={data.dettaglio?.image ? `https://www.traidue.com${data.dettaglio.image}` : undefined}
/>
```

**Step 4: Commit**

```bash
git add src/routes/citta/[slug]/+page.svelte
git commit -m "feat: render narrative intro sections and hero images on city pages"
```

---

### Task 4: Generare immagini per le 8 città

**Files:**
- Create: `static/images/citta/milano.webp`
- Create: `static/images/citta/milano-thumb.webp`
- Create (stessa convenzione per): bologna, roma, napoli, torino, firenze, palermo, trieste

**Step 1: Creare la directory**

```bash
mkdir -p static/images/citta
```

**Step 2: Generare le immagini**

Usare dalnulla MCP con nano-banana model, stile affresco astratto. Un'immagine per città che evochi la città senza essere fotografica.

Prompt suggeriti:
- Milano: "abstract fresco of a modern Italian city with gothic spires and glass towers, warm tones"
- Bologna: "abstract fresco of medieval Italian porticos and red terracotta rooftops"
- Roma: "abstract fresco of ancient Roman columns and domes in warm ochre tones"
- Napoli: "abstract fresco of a Mediterranean bay with volcanic mountain and colorful buildings"
- Torino: "abstract fresco of elegant Baroque architecture with Alpine mountains in background"
- Firenze: "abstract fresco of Renaissance dome and Tuscan hills in earth tones"
- Palermo: "abstract fresco of Arabic-Norman architecture with Mediterranean light"
- Trieste: "abstract fresco of Austro-Hungarian harbor city with Adriatic sea"

Formati richiesti per ogni città:
- `{slug}.webp` — immagine principale (1200×630, per OG)
- `{slug}-thumb.webp` — thumbnail (400×225)

**Step 3: Commit**

```bash
git add static/images/citta/
git commit -m "feat: add hero images for 8 detailed city pages"
```

---

### Task 5: Scrivere contenuto per Milano

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Milano)

**REGOLA CRITICA: Tutto il contenuto deve essere verificato con fonti esterne. Usare WebSearch per ogni affermazione. MAI inventare dati, nomi, indirizzi, o statistiche.**

**Step 1: Ricercare e scrivere `contesto_locale` per Milano**

Ricercare: situazione servizi trans a Milano, CIG Niguarda, tessuto associativo, Milano Pride, politiche comunali.
Scrivere 3-4 frasi (150-200 parole) sulla situazione specifica.

**Step 2: Ricercare e scrivere `centri_gender_intro` per Milano**

Ricercare: funzionamento CIG Niguarda, modalità di accesso, tempi di attesa, SSN vs privato.
Scrivere 2-3 frasi su come accedere ai centri a Milano.

**Step 3: Ricercare e scrivere `associazioni_intro` per Milano**

Ricercare: panorama associazioni LGBTQ+ milanesi, cosa offrono.
Scrivere 2-3 frasi sul tessuto associativo.

**Step 4: Ricercare e scrivere `sportelli_intro` per Milano**

Ricercare: sportelli pubblici Comune di Milano, servizi anti-discriminazione.
Scrivere 2-3 frasi sui servizi pubblici.

**Step 5: Aggiungere 5 nuove FAQ targettizzate**

Aggiungere FAQ con keyword locali. Esempio:
- "Dove si trova il centro per la disforia di genere a Milano?"
- "Come si accede al CIG Niguarda?"
- "Quanto tempo ci vuole per iniziare la terapia ormonale a Milano?"
- "Ci sono associazioni per famiglie di persone trans a Milano?"
- "Il percorso di transizione a Milano è coperto dal SSN?"

**Step 6: Commit**

```bash
git add src/lib/data/citta-dettaglio.ts
git commit -m "feat: add verified narrative content for Milano city page"
```

---

### Task 6: Scrivere contenuto per Bologna

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Bologna)

Stessa struttura del Task 5. Ricercare e verificare:
- Contesto locale: MIT Bologna, storia del movimento trans a Bologna, centro ONIG
- Centri gender intro: come funziona il centro di Bologna
- Associazioni intro: MIT, Arcigay, altre realtà
- Sportelli intro: servizi pubblici del comune
- 5 nuove FAQ specifiche per Bologna

**Commit:** `feat: add verified narrative content for Bologna city page`

---

### Task 7: Scrivere contenuto per Roma

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Roma)

Ricercare e verificare:
- Contesto locale: SAIFIP/Policlinico Umberto I, situazione istituzionale, Roma Pride
- Centri gender intro: accesso SAIFIP, tempi, liste di attesa
- Associazioni intro: panorama romano
- Sportelli intro: servizi pubblici capitolini
- 5 nuove FAQ specifiche per Roma

**Commit:** `feat: add verified narrative content for Roma city page`

---

### Task 8: Scrivere contenuto per Napoli

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Napoli)

Ricercare e verificare:
- Contesto locale: situazione trans in Campania, centri disponibili, sfide specifiche
- Centri gender intro, associazioni intro, sportelli intro
- 5 nuove FAQ specifiche per Napoli

**Commit:** `feat: add verified narrative content for Napoli city page`

---

### Task 9: Scrivere contenuto per Torino

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Torino)

Ricercare e verificare:
- Contesto locale: CIDIGEM (Centro Interdipartimentale Disturbi Identità di Genere), Molinette
- Centri gender intro, associazioni intro, sportelli intro
- 5 nuove FAQ specifiche per Torino

**Commit:** `feat: add verified narrative content for Torino city page`

---

### Task 10: Scrivere contenuto per Firenze

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Firenze)

Ricercare e verificare:
- Contesto locale: AOU Careggi, percorso in Toscana
- Centri gender intro, associazioni intro, sportelli intro
- 5 nuove FAQ specifiche per Firenze

**Commit:** `feat: add verified narrative content for Firenze city page`

---

### Task 11: Scrivere contenuto per Palermo

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Palermo)

Ricercare e verificare:
- Contesto locale: situazione trans in Sicilia, centri disponibili, sfide specifiche
- Centri gender intro, associazioni intro, sportelli intro
- 5 nuove FAQ specifiche per Palermo

**Commit:** `feat: add verified narrative content for Palermo city page`

---

### Task 12: Scrivere contenuto per Trieste

**Files:**
- Modify: `src/lib/data/citta-dettaglio.ts` (sezione Trieste)

Ricercare e verificare:
- Contesto locale: situazione trans in Friuli Venezia Giulia, centri disponibili
- Centri gender intro, associazioni intro, sportelli intro
- 5 nuove FAQ specifiche per Trieste

**Commit:** `feat: add verified narrative content for Trieste city page`

---

### Task 13: Aggiungere LocalBusiness schema per le associazioni

**Files:**
- Modify: `src/routes/citta/[slug]/+page.svelte`

**Step 1: Creare lo schema LocalBusiness per le associazioni**

Dopo il `clinicSchemas` derivato (riga ~110), aggiungere:

```svelte
let associazioneSchemas = $derived(
	data.dettaglio
		? data.dettaglio.associazioni
			.filter((a) => a.indirizzo)
			.map((a) => ({
				'@context': 'https://schema.org',
				'@type': 'LocalBusiness',
				'@additionalType': 'https://schema.org/NGO',
				name: a.nome,
				description: a.descrizione,
				address: {
					'@type': 'PostalAddress',
					streetAddress: a.indirizzo,
					addressLocality: a.citta,
					addressRegion: data.dettaglio!.regione,
					addressCountry: 'IT'
				},
				...(a.telefono ? { telephone: a.telefono } : {}),
				...(a.email ? { email: a.email } : {}),
				...(a.sito ? { url: a.sito } : {})
			}))
		: []
);
```

**Step 2: Renderizzare gli schema nel head**

Dopo `{#each clinicSchemas as schema}`:

```svelte
{#each associazioneSchemas as schema}
	<StructuredData {schema} />
{/each}
```

**Step 3: Commit**

```bash
git add src/routes/citta/[slug]/+page.svelte
git commit -m "feat: add LocalBusiness structured data for associations on city pages"
```

---

### Task 14: Verifica finale

**Step 1: Build e type-check**

```bash
bun run check
```

Verificare zero errori TypeScript.

**Step 2: Verifica visuale**

```bash
bun run dev
```

Controllare:
- `/citta/milano` — verificare che intro narrative, immagine, FAQ espanse appaiano
- `/citta/roma` — stessa verifica
- `/citta/bergamo` (generico) — verificare che la pagina carichi e che nel sorgente HTML appaia `<meta name="robots" content="noindex, follow">`

**Step 3: Verifica structured data**

Ispezionare il sorgente HTML di `/citta/milano` e verificare:
- Schema `FAQPage` con tutte le FAQ (vecchie + nuove)
- Schema `MedicalClinic` per i centri
- Schema `LocalBusiness` per le associazioni
- Schema `WebPage` e `BreadcrumbList`

**Step 4: Commit finale se necessario**

```bash
git add -A
git commit -m "fix: final adjustments for city pages enrichment"
```
