# Design: Miglioramento pagine città per SEO

Data: 2 marzo 2026

## Problema

- ~7.888 pagine comuni generiche con thin content (solo "guida in arrivo" + 6 articoli generici)
- Google non indicizza molte pagine, penalizzazione per thin content
- Le 8 città con guida dettagliata hanno contenuto strutturato (elenchi) ma poco testo narrativo
- Le keyword "trans + [città]" hanno intento di ricerca problematico → la strategia locale generica non funziona

## Decisioni

1. **Solo 8 città ricche vengono indicizzate** (Milano, Bologna, Roma, Napoli, Torino, Firenze, Palermo, Trieste)
2. **Pagine generiche**: noindex + contenuto minimo, nessun 404
3. **Approccio**: arricchire contenuto narrativo delle 8 città (no sotto-pagine, no mappa)
4. **Fonti**: tutto il contenuto deve essere verificabile con fonti esterne affidabili, mai inventato
5. **Immagini**: generate con stile wiki (dalnulla MCP, nano-banana, affresco astratto)

## Modifiche tecniche

### 1. noindex per pagine generiche

Aggiungere `<meta name="robots" content="noindex, follow">` al template generico nel componente SEO.
Il `follow` permette a Google di seguire i link interni verso pagine wiki indicizzate.

### 2. Nuovi campi dati in CittaDettaglio

```typescript
interface CittaDettaglio {
  // campi esistenti invariati...

  // NUOVI:
  contesto_locale: string;          // Situazione trans specifica della città
  centri_gender_intro: string;      // Intro sezione centri
  associazioni_intro: string;       // Intro sezione associazioni
  sportelli_intro: string;          // Intro sezione sportelli
}
```

### 3. Contenuto narrativo per sezione

Per ogni città, aggiungere paragrafi introduttivi e contestuali:
- **Contesto locale** (dopo hero): clima politico, rete di supporto, punti di forza
- **Intro centri**: come funzionano, tempi di attesa, come accedere
- **Intro associazioni**: tessuto associativo locale
- **Intro sportelli**: servizi pubblici disponibili

### 4. FAQ espanse (8-10 per città)

Targettizzare keyword locali:
- "Centri disforia di genere a [città]"
- "Quanto tempo ci vuole per [percorso] a [città]"
- "Associazioni trans a [città]"
- "Come iniziare la transizione a [città]"
- "Iter sanitario trans [regione]"

### 5. Link interni inline

Nel testo narrativo, inserire link a pagine wiki pertinenti.
Esempio: "Per chi inizia il [percorso di affermazione di genere](/wiki/percorsi/iniziare-transizione) a Milano..."

### 6. Structured data aggiuntivi

- `LocalBusiness` schema per associazioni
- FAQ espanse riflesse nel `FAQPage` schema

### 7. Immagini

Hero image per ogni città, stile affresco astratto (come wiki articles).
Generare via dalnulla MCP con nano-banana model.

## Città coinvolte

1. Milano (Lombardia)
2. Bologna (Emilia Romagna)
3. Roma (Lazio)
4. Napoli (Campania)
5. Torino (Piemonte)
6. Firenze (Toscana)
7. Palermo (Sicilia)
8. Trieste (Friuli Venezia Giulia)
