-- Fix: PostgREST non supporta expression index per upsert onConflict
-- Sostituisce l'indice COALESCE con un constraint diretto sulle colonne
DROP INDEX idx_cache_lookup;
ALTER TABLE chat_cache ADD CONSTRAINT uq_cache_lookup UNIQUE (normalized_question, current_slug);
