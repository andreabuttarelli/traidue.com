# Auto-News: Rassegna stampa automatica

## Obiettivo
Sezione `/notizie` con editoriali generati automaticamente da notizie rilevanti, approvati via email prima della pubblicazione.

## Tematiche coperte
- Transgender, identità di genere, disforia di genere
- LGBTQ+ in generale
- Diritti civili, unioni civili
- Aborto, eutanasia, fine vita
- Dichiarazioni contrarie, leggi restrittive (commentate con spirito critico)
- Copertura globale: Italia, USA, Asia, Europa

## Architettura

### Fonti
- **Google News RSS** con query multiple (IT + EN):
  - `transgender OR transessuale OR "identità di genere" OR "disforia di genere"`
  - `"diritti civili" OR "unioni civili" OR LGBTQ OR "legge Zan"`
  - `aborto OR eutanasia OR "fine vita" OR "testamento biologico"`
  - Query EN per notizie globali: `transgender rights OR "gender identity" OR LGBTQ rights`
- **RSS di testate specifiche** (configurabili da DB): Il Post, Gay.it, Wired Italia, ecc.

### Flusso cron (2x/giorno — 8:00 e 18:00)

```
Fetch RSS → Deduplica (check source_url) → Gemini filtra rilevanti → Gemini genera editoriale → Salva bozze in DB → Email riepilogo con Resend
```

1. Fetch tutti i feed da `news_sources` (dove `active=true`)
2. Deduplica — scarta URL già presenti in `news_articles`
3. Gemini — riceve titoli+snippet, risponde con JSON: quali rilevanti + per ognuna genera titolo, riassunto, editoriale con tono critico/attivista
4. Salva ogni bozza in `news_articles` con `status=draft` e `approval_token` unico
5. Una sola email con tutte le bozze. Per ogni bozza: titolo, riassunto, link fonte, bottoni [Approva] [Scarta]
6. Se nessuna notizia rilevante → niente email

### Database (Supabase)

**`news_sources`**
- `id`, `name`, `feed_url`, `active`, `created_at`

**`news_articles`**
- `id`, `title`, `slug`, `summary`, `content` (markdown editoriale)
- `source_url`, `source_title`, `source_date`
- `status`: draft → published / rejected
- `approval_token` (UUID monouso, scade dopo 7 giorni)
- `tags` (text array)
- `created_at`, `published_at`

### Approvazione via email

- **`/api/news/approve/[token]`** — GET, imposta `status=published`, `published_at=now()`, invalida token, redirect a conferma
- **`/api/news/reject/[token]`** — GET, imposta `status=rejected`, redirect a conferma
- Token monouso, scadenza 7 giorni

### Frontend

**`/notizie`** — lista card (titolo, data, tag, riassunto), filtro per tag, paginazione 10/pagina, solo `status=published`

**`/notizie/[slug]`** — editoriale completo (markdown), link fonte originale, ShareButtons, email CTA

**Navbar** — voce "Notizie" aggiunta

### Nuove dipendenze
- `resend` — SDK invio email

### Costi stimati
- Gemini: ~$0.02-0.04/giorno → ~$1/mese
- Resend: ~60 email/mese (gratis fino a 3000)
- Supabase: già in uso, storage trascurabile
- **Totale: ~$1/mese**
