-- Tabella cache risposte
CREATE TABLE chat_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  normalized_question TEXT NOT NULL,
  current_slug TEXT,
  original_question TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  hit_count INTEGER DEFAULT 0 NOT NULL
);

CREATE UNIQUE INDEX idx_cache_lookup
  ON chat_cache (normalized_question, COALESCE(current_slug, '__none__'));

CREATE INDEX idx_cache_expires ON chat_cache (expires_at);

-- Tabella analytics
CREATE TABLE chat_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  response TEXT,
  current_slug TEXT,
  cache_hit BOOLEAN DEFAULT false NOT NULL,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_analytics_created ON chat_analytics (created_at);
