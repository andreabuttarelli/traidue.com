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

ALTER TABLE chat_cache ADD CONSTRAINT uq_cache_lookup UNIQUE (normalized_question, current_slug);

CREATE INDEX idx_cache_expires ON chat_cache (expires_at);

-- Tabella analytics
CREATE TABLE chat_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  response TEXT,
  current_slug TEXT,
  cache_hit BOOLEAN DEFAULT false NOT NULL,
  response_time_ms INTEGER,
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  total_tokens INTEGER,
  estimated_cost_usd NUMERIC(10, 6),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_analytics_created ON chat_analytics (created_at);
