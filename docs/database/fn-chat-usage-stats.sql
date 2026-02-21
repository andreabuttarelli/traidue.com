-- Restituisce token e costo accumulati in un range di tempo
-- Uso: SELECT * FROM chat_usage_stats('2026-02-01', '2026-03-01');
CREATE OR REPLACE FUNCTION chat_usage_stats(
  from_date TIMESTAMPTZ,
  to_date TIMESTAMPTZ
)
RETURNS TABLE (
  total_requests BIGINT,
  cache_hits BIGINT,
  cache_misses BIGINT,
  sum_prompt_tokens BIGINT,
  sum_completion_tokens BIGINT,
  sum_total_tokens BIGINT,
  sum_estimated_cost_usd NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT AS total_requests,
    COUNT(*) FILTER (WHERE cache_hit)::BIGINT AS cache_hits,
    COUNT(*) FILTER (WHERE NOT cache_hit)::BIGINT AS cache_misses,
    COALESCE(SUM(prompt_tokens), 0)::BIGINT AS sum_prompt_tokens,
    COALESCE(SUM(completion_tokens), 0)::BIGINT AS sum_completion_tokens,
    COALESCE(SUM(total_tokens), 0)::BIGINT AS sum_total_tokens,
    COALESCE(SUM(estimated_cost_usd), 0)::NUMERIC AS sum_estimated_cost_usd
  FROM chat_analytics
  WHERE created_at >= from_date AND created_at < to_date;
END;
$$ LANGUAGE plpgsql STABLE;
