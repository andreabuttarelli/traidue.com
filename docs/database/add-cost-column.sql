-- Aggiunge colonna costo stimato in USD
ALTER TABLE chat_analytics ADD COLUMN estimated_cost_usd NUMERIC(10, 6);
