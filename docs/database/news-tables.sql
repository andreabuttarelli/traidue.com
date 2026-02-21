-- Fonti RSS configurabili
CREATE TABLE news_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  feed_url TEXT NOT NULL UNIQUE,
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Articoli/bozze news
CREATE TABLE news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  source_url TEXT NOT NULL UNIQUE,
  source_title TEXT NOT NULL,
  source_date TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'rejected')),
  approval_token UUID DEFAULT gen_random_uuid(),
  image TEXT,
  thumb TEXT,
  tags TEXT[] DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  published_at TIMESTAMPTZ
);

CREATE INDEX idx_news_status ON news_articles (status);
CREATE INDEX idx_news_published ON news_articles (published_at DESC);
CREATE INDEX idx_news_token ON news_articles (approval_token) WHERE approval_token IS NOT NULL;
CREATE INDEX idx_news_source_url ON news_articles (source_url);

-- Seed fonti iniziali
INSERT INTO news_sources (name, feed_url) VALUES
  ('Google News IT - Trans', 'https://news.google.com/rss/search?q=transgender+OR+transessuale+OR+%22identit%C3%A0+di+genere%22+OR+%22disforia+di+genere%22&hl=it&gl=IT&ceid=IT:it'),
  ('Google News IT - Diritti', 'https://news.google.com/rss/search?q=%22diritti+civili%22+OR+%22unioni+civili%22+OR+LGBTQ+OR+%22legge+Zan%22&hl=it&gl=IT&ceid=IT:it'),
  ('Google News IT - Vita', 'https://news.google.com/rss/search?q=aborto+OR+eutanasia+OR+%22fine+vita%22+OR+%22testamento+biologico%22&hl=it&gl=IT&ceid=IT:it'),
  ('Google News EN - Global', 'https://news.google.com/rss/search?q=transgender+rights+OR+%22gender+identity%22+OR+%22LGBTQ+rights%22&hl=en&gl=US&ceid=US:en'),
  ('Erin In The Morning', 'https://www.erininthemorning.com/feed');
