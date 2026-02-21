-- Aggiunge colonne per tracciare i token Gemini
ALTER TABLE chat_analytics ADD COLUMN prompt_tokens INTEGER;
ALTER TABLE chat_analytics ADD COLUMN completion_tokens INTEGER;
ALTER TABLE chat_analytics ADD COLUMN total_tokens INTEGER;
