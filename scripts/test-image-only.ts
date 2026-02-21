import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import * as fs from 'fs';

const envText = fs.readFileSync('.env', 'utf-8');
const env: Record<string, string> = {};
for (const line of envText.split('\n')) {
	const t = line.trim();
	if (!t || t.startsWith('#')) continue;
	const eq = t.indexOf('=');
	if (eq === -1) continue;
	env[t.slice(0, eq)] = t.slice(eq + 1).replace(/^["']|["']$/g, '');
}

const genai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const title = "L'UE per le donne trans: un segnale globale, un monito per l'Italia";
const tags = 'transgender, diritti-civili, internazionale';

const prompt = `Abstract impasto oil painting on dark canvas inspired by: "${title}". Themes: ${tags}. STYLE: thick palette knife strokes, heavy paint texture, dark moody background with vivid color splashes and gold/orange accents scattered across, abstract forms that vaguely evoke the theme without being literal, paint drips and splatters, full canvas coverage edge to edge. MUST NOT include: any text, words, letters, labels, captions, borders, frames, empty space, realistic human faces or photographs.`;

console.log('Generating image...');
const result = await genai.models.generateContent({
	model: 'gemini-2.5-flash-image',
	contents: [{ role: 'user', parts: [{ text: prompt }] }],
	config: {
		responseModalities: ['IMAGE'],
		imageConfig: { aspectRatio: '16:9' }
	}
});

const imageBytes = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
if (!imageBytes) {
	console.error('No image data returned');
	process.exit(1);
}

const buffer = Buffer.from(imageBytes, 'base64');
const webp = await sharp(buffer).resize(1344, 768, { fit: 'cover' }).webp({ quality: 80 }).toBuffer();
const outPath = 'test-news-image.webp';
fs.writeFileSync(outPath, webp);
console.log(`Done! Image saved: ${outPath} (${(webp.length / 1024).toFixed(0)}KB)`);
console.log('Open with: open test-news-image.webp');
