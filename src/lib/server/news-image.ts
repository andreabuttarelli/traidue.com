import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import { supabase } from './supabase';

const BUCKET = 'news-images';
const FULL_WIDTH = 1344;
const FULL_HEIGHT = 768;
const THUMB_WIDTH = 672;
const THUMB_HEIGHT = 378;

const IMAGE_MODEL = 'gemini-3.1-flash-image-preview';

const genai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

interface NewsImageResult {
	image: string;
	thumb: string;
}

/**
 * Generates an abstract illustration for a news article using Gemini,
 * converts to WebP (full + thumb), and uploads to Supabase Storage.
 */
export async function generateAndProcessNewsImage(
	title: string,
	tags: string[],
	slug: string
): Promise<NewsImageResult | null> {
	try {
		const buffer = await generateImage(title, tags);
		if (!buffer) return null;
		return await processBuffer(buffer, slug);
	} catch (e) {
		console.error(`Image generation pipeline failed for ${slug}:`, e);
		return null;
	}
}

/**
 * Downloads a PNG from a signed URL, converts to WebP (full + thumb),
 * and uploads to Supabase Storage.
 */
export async function processNewsImage(
	signedUrl: string,
	slug: string
): Promise<NewsImageResult | null> {
	try {
		const res = await fetch(signedUrl, { signal: AbortSignal.timeout(30_000) });
		if (!res.ok) {
			console.error(`Failed to download image for ${slug}: HTTP ${res.status}`);
			return null;
		}
		const buffer = Buffer.from(await res.arrayBuffer());
		return await processBuffer(buffer, slug);
	} catch (e) {
		console.error(`Image processing failed for ${slug}:`, e);
		return null;
	}
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const STYLE_REFERENCE_URL =
	'https://vkasizlzkcvvuykoguek.supabase.co/storage/v1/object/public/news-images/generated_ref_1772026325362_0.png.jpeg';

let cachedReferenceImage: string | null = null;

async function getReferenceImage(): Promise<string | null> {
	if (cachedReferenceImage) return cachedReferenceImage;
	try {
		const res = await fetch(STYLE_REFERENCE_URL, { signal: AbortSignal.timeout(10_000) });
		if (!res.ok) return null;
		const buf = Buffer.from(await res.arrayBuffer());
		cachedReferenceImage = buf.toString('base64');
		return cachedReferenceImage;
	} catch {
		return null;
	}
}

async function generateImage(title: string, tags: string[]): Promise<Buffer | null> {
	const tagHint = tags.slice(0, 3).join(', ');
	const prompt = `Use the reference image as a STYLE GUIDE ONLY — match its soft digital painting technique: bokeh light effects, soft blurred brushwork, silhouettes and semi-abstract human figures. DO NOT copy the specific subject or composition of the reference.

Create a NEW illustration for this news headline: "${title}". Themes: ${tagHint}.

IMPORTANT — MOOD MUST MATCH THE CONTENT:
- If the news is negative (discrimination, attacks on rights, violence, bans, restrictions): use darker, desaturated tones, cold blues, grays, deep purples, shadows, isolated or oppressed figures, dramatic lighting, tension and weight. Evoke sadness, injustice, or struggle.
- If the news is positive (victories, new rights, inclusion, milestones): use warm, luminous pastels, glowing light, people together, hope and celebration.
- If the news is neutral/informational: balanced palette, neither too dark nor too bright.

The subject of the image should LOOSELY represent the topic — not literally, but evocatively. Use silhouettes, semi-abstract human figures, and symbolic visual metaphors. MUST NOT include: any text, words, letters, labels, captions, borders, frames, realistic detailed faces, or photographs.`;

	const referenceBase64 = await getReferenceImage();

	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

			if (referenceBase64) {
				parts.push({
					inlineData: { mimeType: 'image/jpeg', data: referenceBase64 }
				});
			}
			parts.push({ text: prompt });

			const result = await genai.models.generateContent({
				model: IMAGE_MODEL,
				contents: [{ role: 'user', parts }],
				config: {
					responseModalities: ['IMAGE'],
					imageConfig: {
						aspectRatio: '16:9'
					}
				}
			});

			const imageBytes = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
			if (!imageBytes) {
				console.error(`Gemini image attempt ${attempt}/${MAX_RETRIES}: no image data returned`);
				if (attempt < MAX_RETRIES) {
					await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
					continue;
				}
				return null;
			}

			return Buffer.from(imageBytes, 'base64');
		} catch (e: any) {
			console.error(`Gemini image attempt ${attempt}/${MAX_RETRIES} error:`, e?.message || e);
			if (attempt < MAX_RETRIES) {
				await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
			}
		}
	}

	return null;
}

async function processBuffer(buffer: Buffer, slug: string): Promise<NewsImageResult | null> {
	const fullBuffer = await sharp(buffer)
		.resize(FULL_WIDTH, FULL_HEIGHT, { fit: 'cover' })
		.webp({ quality: 80 })
		.toBuffer();

	const thumbBuffer = await sharp(buffer)
		.resize(THUMB_WIDTH, THUMB_HEIGHT, { fit: 'cover' })
		.webp({ quality: 75 })
		.toBuffer();

	const { error: fullError } = await supabase.storage
		.from(BUCKET)
		.upload(`${slug}.webp`, fullBuffer, {
			contentType: 'image/webp',
			upsert: true
		});

	if (fullError) {
		console.error(`Failed to upload full image for ${slug}:`, fullError.message);
		return null;
	}

	const { error: thumbError } = await supabase.storage
		.from(BUCKET)
		.upload(`${slug}-thumb.webp`, thumbBuffer, {
			contentType: 'image/webp',
			upsert: true
		});

	if (thumbError) {
		console.error(`Failed to upload thumb for ${slug}:`, thumbError.message);
		return null;
	}

	const { data: fullData } = supabase.storage.from(BUCKET).getPublicUrl(`${slug}.webp`);
	const { data: thumbData } = supabase.storage.from(BUCKET).getPublicUrl(`${slug}-thumb.webp`);

	return {
		image: fullData.publicUrl,
		thumb: thumbData.publicUrl
	};
}
