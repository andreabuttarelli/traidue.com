# Chatbot RAG Wiki — Design

## Obiettivo

Chatbot integrato nel sito traidue.com che risponde a domande degli utenti basandosi sui contenuti wiki (~130 articoli). Usa Gemini per embeddings e generazione risposte.

## Architettura

```
Build time:
  Script → legge tutti gli articoli markdown
         → genera embeddings con gemini-embedding-001
         → salva in static/embeddings.json

Runtime (per ogni domanda):
  Client (ChatSidebar.svelte)
    ↓ POST { message, history[], currentSlug? }
  /api/chat/+server.ts
    1. Carica embeddings.json
    2. Embed domanda utente (Gemini)
    3. Cosine similarity → top 5 articoli
    4. Se currentSlug presente, lo include sempre nel contesto
    5. Fetch markdown grezzo degli articoli rilevanti
    6. Prompt a Gemini Flash con contesto + history
    7. Stream risposta al client
```

## Componenti UI

### ChatButton.svelte
- Bottone tondo fisso in basso a destra
- Icona chat, click apre/chiude la sidebar
- Z-index alto per rimanere sopra il contenuto

### ChatSidebar.svelte
- Sidebar a destra che spinge il contenuto (non overlay)
- Larghezza fissa (~380px desktop, full-width mobile)
- Header con titolo + bottone chiudi
- Area messaggi scrollabile (user/bot alternati)
- Input in basso con invio
- Stato di caricamento durante la risposta
- Renderizza markdown nelle risposte (link wiki, details per fonti)
- Conversazione in `$state` — si resetta al refresh pagina

### Layout modificato
- `+layout.svelte` wrappa il contenuto in container flex
- Quando sidebar aperta: contenuto si restringe con CSS transition
- Mobile: sidebar prende tutto lo schermo

## API Endpoint

### POST /api/chat/+server.ts

**Request:**
```json
{
  "message": "string",
  "history": [{ "role": "user|assistant", "content": "string" }],
  "currentSlug": "string | null"
}
```

**Response:** Streaming text (ReadableStream)

**Logica:**
1. Embed la domanda con `gemini-embedding-001`
2. Calcola cosine similarity con tutti gli embeddings pre-calcolati
3. Prendi i top 5 articoli più rilevanti
4. Se `currentSlug` è fornito, includi sempre quell'articolo (anche se non nei top 5)
5. Carica il markdown grezzo di ciascun articolo
6. Componi il prompt con system message + contesto articoli + history + domanda
7. Chiama Gemini Flash in streaming
8. Ritorna lo stream

**Variabili d'ambiente:**
- `GEMINI_API_KEY` in `.env` (accesso via `$env/static/private`)

## Embeddings

### Script: scripts/generate-embeddings.ts

- Legge tutti i file `.md` da `src/content/wiki/**/*.md`
- Per ogni articolo estrae: titolo, descrizione, contenuto markdown (troncato a ~8000 chars)
- Chiama `gemini-embedding-001` per generare il vettore
- Salva in `static/embeddings.json`:
  ```json
  [
    {
      "slug": "disforia-di-genere",
      "title": "Disforia di genere",
      "category": "scienza",
      "embedding": [0.123, -0.456, ...]
    }
  ]
  ```
- Comando: `bun run generate-embeddings`
- Da eseguire prima di ogni deploy quando ci sono articoli nuovi/modificati

## Citazioni

### Livello 1 — Link wiki (sempre visibili inline)
Il bot cita le pagine wiki come link markdown nelle risposte.

### Livello 2 — Fonti scientifiche (collapsible)
In fondo alla risposta, un blocco `<details>` chiuso di default elenca le fonti accademiche (dal campo `sources[]` del frontmatter) degli articoli usati come contesto.

## System Prompt

```
Sei l'assistente di traidue.com, un sito informativo su identità di genere
e tematiche transgender. Rispondi SOLO basandosi sui contenuti degli articoli
forniti come contesto. Se la domanda non è coperta dai contenuti, rispondi
gentilmente che non hai informazioni a riguardo e suggerisci di esplorare il wiki.

Nelle risposte:
- Cita le pagine wiki come link markdown: [Titolo articolo](/wiki/slug)
- In fondo alla risposta, elenca le fonti scientifiche degli articoli usati
  dentro un blocco <details> con summary "Fonti scientifiche"
- Rispondi sempre in italiano
- Sii conciso ma informativo
```

## Limiti e scope

- Risponde SOLO a domande coperte dai contenuti wiki
- Domande fuori tema: risposta gentile di rifiuto
- Nessuna persistenza della conversazione tra sessioni
- Nessuna autenticazione utente

## Costi stimati

| Voce | Costo |
|---|---|
| Embedding 130 articoli (una tantum) | ~$0.01 |
| Embedding per query utente | ~$0.0001 |
| Gemini Flash per risposta | ~$0.005-0.02 |
| **Costo per domanda** | **~$0.01-0.02** |
