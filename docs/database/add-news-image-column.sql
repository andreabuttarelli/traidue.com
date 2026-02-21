-- Aggiunge colonne immagine agli articoli news
ALTER TABLE news_articles ADD COLUMN image TEXT;
ALTER TABLE news_articles ADD COLUMN thumb TEXT;
