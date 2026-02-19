# Growth Strategy Design — traidue.com

## Context

Il sito ha 23 articoli wiki, 1 quiz, glossario, SEO solido (structured data, sitemap, hreflang, FAQ schema). Manca ogni meccanismo di crescita attiva: niente social sharing, niente newsletter, niente analytics, niente community engagement. L'obiettivo e far parlare della piattaforma attraverso SEO + social + passaparola associazioni.

## Approach: "Il sito che si fa condividere"

Rendere il sito stesso un motore di crescita organica prima di aprire canali social esterni.

---

## Priorita 1 — Homepage + Engagement

### 1a. Ridisegno sezione Miti + Quiz

Stato attuale: sezione "Ecco cosa dicono. Ecco cosa dice la scienza." (3 miti) e sezione quiz separate.

Nuovo layout:
- Layout a due colonne su desktop (lg:grid-cols-2)
- Colonna sinistra: i 3 miti (come ora)
- Colonna destra: card quiz grande con hook "E tu quanto ne sai?" e CTA diretto al quiz
- Su mobile: miti sopra, quiz sotto

### 1b. Pulsanti di condivisione sugli articoli

Aggiungere in WikiLayout.svelte, dopo l'header dell'articolo:
- Twitter/X (pre-compilato con titolo + URL)
- WhatsApp (link diretto con testo)
- Telegram (link diretto)
- Copia link (gia presente, manteniamo)

Stile: bottoni discreti, icone, inline con i tag.

### 1c. Risultati quiz condivisibili

Dopo il completamento del quiz:
- Mostrare il punteggio con messaggio personalizzato
- Bottone "Condividi il tuo risultato" che genera un testo tipo: "Ho fatto 8/10 al quiz sull'identita di genere su traidue.com — E tu?"
- Stessi canali: Twitter, WhatsApp, Telegram, copia testo

### 1d. CTA associazioni

Aggiungere in chi-siamo e/o footer:
- "Sei un'associazione o un professionista? Scrivici a info@traidue.com"
- Semplice, nessun form, solo CTA testuale

---

## Priorita 2 — Raccolta Email

### Form "Resta aggiornato"

- Posizione: footer del sito (visibile su ogni pagina) + fine di ogni articolo wiki
- Campi: solo email
- Storage: file JSON locale in una server action SvelteKit, oppure servizio gratuito (Buttondown free tier, Formspree)
- Nessun invio automatico per ora — solo raccolta
- Testo: "Nuovi articoli e aggiornamenti. Niente spam, solo fatti."
- GDPR: checkbox consenso + link privacy policy

### Decisione tecnica

Opzione consigliata: Formspree free tier (nessun backend da gestire, export CSV, GDPR-ready). Alternativa: API route SvelteKit che salva in un file JSON (zero dipendenze esterne).

---

## Priorita 3 — Contenuti Social-Ready

### OG Images dinamiche

Stato attuale: tutte le pagine usano `/og-image.png` statico.

Obiettivo: generare OG image per ogni articolo con:
- Titolo dell'articolo
- Numero di fonti
- Logo Tra i Due
- Background colorato (basato sulla categoria)

Implementazione: endpoint `/og/[slug].png` che genera immagine con @vercel/og o satori.

### Quote condivisibili

Ogni articolo potrebbe avere 1-2 "pull quotes" — dati chiave evidenziati e cliccabili per condividere. Questo e un nice-to-have, non prioritario.

---

## Fuori scope (per ora)

- Account social (Instagram, TikTok, Twitter) — da aprire dopo che il sito e pronto
- Directory associazioni — solo CTA email per ora
- Analytics — coerente con la privacy policy attuale
- Commenti / forum — troppo presto
- Video content

---

## File da modificare

### Priorita 1
- `src/routes/+page.svelte` — ridisegno sezione miti+quiz
- `src/lib/components/wiki/WikiLayout.svelte` — pulsanti condivisione
- `src/lib/components/quiz/QuizPlayer.svelte` — risultato condivisibile
- `src/routes/chi-siamo/+page.svelte` — CTA associazioni
- `src/lib/components/ui/Footer.svelte` — CTA associazioni

### Priorita 2
- `src/lib/components/ui/Footer.svelte` — form email
- `src/lib/components/wiki/WikiLayout.svelte` — form email fine articolo
- Nuovo: `src/routes/api/subscribe/+server.ts` — endpoint raccolta email (se locale)

### Priorita 3
- Nuovo: `src/routes/og/[slug].png/+server.ts` — OG image dinamiche
- `src/lib/components/seo/SEO.svelte` — URL OG image dinamico per articoli

## Success Criteria

- Ogni articolo ha bottoni di condivisione funzionanti
- Homepage mostra miti + quiz affiancati con hook coinvolgente
- Quiz permette di condividere il risultato
- Form email presente nel footer e raccoglie indirizzi
- CTA associazioni visibile in chi-siamo e footer
