import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

export function renderMarkdown(content: string): string {
	const html = marked.parse(content, { async: false }) as string;
	return sanitizeHtml(html, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			img: ['src', 'alt', 'width', 'height', 'loading', 'decoding']
		}
	});
}
