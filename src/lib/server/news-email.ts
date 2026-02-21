import { RESEND_API_KEY, NEWS_NOTIFICATION_EMAIL } from '$env/static/private';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export interface NewsDraft {
	id: string;
	title: string;
	summary: string;
	content: string;
	tags: string[];
	sourceUrl: string;
	sourceTitle: string;
	approvalToken: string;
	image?: string;
	thumb?: string;
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function sanitizeUrl(url: string): string {
	try {
		const parsed = new URL(url);
		if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return url;
	} catch {}
	return '#';
}

function markdownToSimpleHtml(md: string): string {
	return md
		.replace(/^## (.+)$/gm, '<h3 style="margin: 16px 0 8px; font-size: 15px; font-weight: 600;">$1</h3>')
		.replace(/^### (.+)$/gm, '<h4 style="margin: 12px 0 6px; font-size: 14px; font-weight: 600;">$1</h4>')
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/\n\n/g, '</p><p style="margin: 0 0 12px; line-height: 1.6;">')
		.replace(/\n/g, '<br>');
}

export async function sendNewsDigest(drafts: NewsDraft[], baseUrl: string): Promise<void> {
	if (!drafts.length) return;

	const articlesHtml = drafts
		.map(
			(d) => `
<div style="margin-bottom: 40px; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
  ${
		d.thumb
			? `<img src="${sanitizeUrl(d.thumb)}" alt="" width="672" height="378" style="width: 100%; height: auto; display: block;" />`
			: ''
	}
  <div style="padding: 24px;">
    <div style="margin-bottom: 12px;">
      ${d.tags.map((t) => `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; border: 1px solid #ddd; font-size: 11px; color: #666; margin-right: 6px; margin-bottom: 4px;">${escapeHtml(t)}</span>`).join('')}
    </div>

    <h2 style="margin: 0 0 10px; font-size: 20px; color: #111; line-height: 1.3;">${escapeHtml(d.title)}</h2>

    <p style="margin: 0 0 16px; color: #555; font-size: 14px; font-style: italic; line-height: 1.5;">${escapeHtml(d.summary)}</p>

    <div style="padding: 16px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; margin-bottom: 16px; color: #333; font-size: 14px;">
      <p style="margin: 0 0 12px; line-height: 1.6;">${markdownToSimpleHtml(escapeHtml(d.content))}</p>
    </div>

    <p style="margin: 0 0 20px; font-size: 12px; color: #999;">
      Fonte: <a href="${sanitizeUrl(d.sourceUrl)}" style="color: #999; text-decoration: underline;">${escapeHtml(d.sourceTitle)}</a>
    </p>

    <div style="text-align: center;">
      <a href="${baseUrl}/api/news/approve/${d.approvalToken}"
         style="display: inline-block; padding: 12px 32px; background: #111; color: #fff; text-decoration: none; border-radius: 6px; margin-right: 12px; font-size: 14px; font-weight: 500;">
        Approva e pubblica
      </a>
      <a href="${baseUrl}/api/news/reject/${d.approvalToken}"
         style="display: inline-block; padding: 12px 32px; background: #fff; color: #111; text-decoration: none; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; font-weight: 500;">
        Scarta
      </a>
    </div>
  </div>
</div>`
		)
		.join('');

	await resend.emails.send({
		from: 'Andrea from Dal Nulla <noreply@dalnulla.com>',
		to: NEWS_NOTIFICATION_EMAIL,
		subject: `${drafts.length === 1 ? '1 notizia' : `${drafts.length} notizie`} da approvare — traidue.com`,
		html: `
<div style="font-family: -apple-system, Inter, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px;">
  <div style="margin-bottom: 32px; text-align: center;">
    <h1 style="font-size: 24px; margin: 0 0 6px; color: #111;">Nuove notizie da approvare</h1>
    <p style="margin: 0; color: #888; font-size: 14px;">${drafts.length === 1 ? '1 editoriale generato' : `${drafts.length} editoriali generati`} — leggi e decidi</p>
  </div>
  ${articlesHtml}
  <p style="margin-top: 32px; color: #bbb; font-size: 11px; text-align: center;">
    traidue.com · Le bozze non approvate verranno ignorate.
  </p>
</div>`
	});
}
