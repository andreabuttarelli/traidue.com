-- Aggiunta feed Reddit come sorgenti news
INSERT INTO news_sources (name, feed_url) VALUES
  ('Reddit r/transgender', 'https://www.reddit.com/r/transgender.rss'),
  ('Reddit r/trans', 'https://www.reddit.com/r/trans.rss'),
  ('Reddit r/transgenderUK', 'https://www.reddit.com/r/transgenderUK.rss'),
  ('Reddit r/ArtificialIntelligence', 'https://www.reddit.com/r/ArtificialInteligence.rss'),
  ('Reddit r/lgbt', 'https://www.reddit.com/r/lgbt.rss'),
  ('Reddit r/scotus', 'https://www.reddit.com/r/scotus.rss'),
  ('Reddit r/europe', 'https://www.reddit.com/r/europe.rss')
ON CONFLICT (feed_url) DO NOTHING;
