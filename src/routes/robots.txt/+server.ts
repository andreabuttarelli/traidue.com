import { SITE } from '$lib/site';

export const prerender = true;

const body = `User-agent: *
Allow: /

# AI Search Crawlers (allowed for citations)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# AI Training Crawlers (allowed — open source project, Apache 2.0)
User-agent: CCBot
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;

export function GET() {
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
