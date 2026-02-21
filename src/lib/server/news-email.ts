import { RESEND_API_KEY, NEWS_NOTIFICATION_EMAIL } from '$env/static/private';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

interface NewsDraft {
	id: string;
	title: string;
	summary: string;
	sourceUrl: string;
	approvalToken: string;
}

export async function sendNewsDigest(drafts: NewsDraft[], baseUrl: string): Promise<void> {
	if (!drafts.length) return;

	const articlesHtml = drafts
		.map(
			(d) => `
<div style="margin-bottom: 32px; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
  <h2 style="margin: 0 0 8px; font-size: 18px;">${d.title}</h2>
  <p style="margin: 0 0 12px; color: #555;">${d.summary}</p>
  <p style="margin: 0 0 16px; font-size: 13px;">
    <a href="${d.sourceUrl}" style="color: #777;">Fonte originale</a>
  </p>
  <div>
    <a href="${baseUrl}/api/news/approve/${d.approvalToken}"
       style="display: inline-block; padding: 8px 20px; background: #111; color: #fff; text-decoration: none; border-radius: 4px; margin-right: 8px;">
      Approva
    </a>
    <a href="${baseUrl}/api/news/reject/${d.approvalToken}"
       style="display: inline-block; padding: 8px 20px; background: #fff; color: #111; text-decoration: none; border-radius: 4px; border: 1px solid #ccc;">
      Scarta
    </a>
  </div>
</div>`
		)
		.join('');

	await resend.emails.send({
		from: 'traidue.com <notizie@traidue.com>',
		to: NEWS_NOTIFICATION_EMAIL,
		subject: `${drafts.length} notizie da approvare — traidue.com`,
		html: `
<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 22px; margin-bottom: 24px;">Nuove notizie da approvare</h1>
  ${articlesHtml}
  <p style="margin-top: 32px; color: #999; font-size: 12px;">
    Le bozze non approvate entro 7 giorni verranno ignorate.
  </p>
</div>`
	});
}
