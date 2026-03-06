import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
	console.error('GEMINI_API_KEY env var required');
	process.exit(1);
}

const genai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const IMAGE_MODEL = 'gemini-3.1-flash-image-preview';

const FULL_WIDTH = 1344;
const FULL_HEIGHT = 768;
const THUMB_WIDTH = 672;
const THUMB_HEIGHT = 378;

const OUTPUT_DIR = join(import.meta.dir, '..', 'static', 'images', 'wiki');

// Use an existing wiki image as style reference
const STYLE_REF_PATH = join(OUTPUT_DIR, 'terapia-ormonale-guida.webp');

const IMAGES_TO_GENERATE = [
	{
		slug: 'disforia-di-genere',
		prompt:
			'An abstract painting about inner conflict and identity: two overlapping translucent silhouettes pulling apart and merging, warm gold and cool blue tones blending in the center, visible thick brushstrokes, textured oil paint on canvas feel'
	},
	{
		slug: 'centri-transgender-italia',
		prompt:
			'An abstract painting of a map-like composition with warm glowing nodes connected by flowing lines across an Italian peninsula shape, earthy greens, terracotta reds and warm yellows, thick expressive brushstrokes, oil paint texture'
	},
	{
		slug: 'costi-transizione',
		prompt:
			'An abstract painting about balance and resources: geometric shapes suggesting scales or balance, with coins and organic flowing forms intertwined, muted gold, deep blue and warm brown tones, thick impasto brushstrokes, oil painting texture'
	},
	{
		slug: 'bloccanti-puberta',
		prompt:
			'An abstract painting of a chrysalis or cocoon suspended in time, soft pastel colors transitioning from cool blues to warm amber, delicate translucent layers suggesting pause and protection, visible brushstrokes, oil paint texture'
	},
	{
		slug: 'carriera-alias',
		prompt:
			'An abstract painting about identity and names: flowing calligraphic forms dissolving and reforming into new shapes, warm lavender, teal and soft gold tones, a sense of transformation and self-expression, thick oil paint brushstrokes'
	},
	{
		slug: 'terapia-ormonale-non-binaria',
		prompt:
			'An abstract painting about fluidity beyond binary: a spectrum of colors flowing freely without sharp boundaries, soft purples, greens and golds merging in organic non-linear patterns, neither one thing nor another, thick expressive brushstrokes, oil paint texture'
	},
	{
		slug: 'autodeterminazione-di-genere',
		prompt:
			'An abstract painting about self-determination and freedom: a figure breaking free from geometric constraints into open flowing space, warm oranges and deep teals, a sense of liberation and autonomy, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'prevenzione-oncologica-trans',
		prompt:
			'An abstract painting about health and protection: a luminous shield-like form radiating warmth over organic body-like shapes, soft pinks, warm whites and gentle greens, a feeling of care and vigilance, thick visible brushstrokes, oil paint texture'
	},
	{
		slug: 'transizione-dopo-i-40',
		prompt:
			'An abstract painting about late blooming and renewal: a tree with deep roots sprouting vibrant new branches and blossoms, rich autumnal oranges and fresh spring greens coexisting, wisdom and new beginnings, thick expressive brushstrokes, oil paint texture'
	},
	{
		slug: 'persone-trans-anziane',
		prompt:
			'An abstract painting about aging with dignity and resilience: layered weathered textures suggesting the passage of time, warm amber, silver and deep purple tones, strength through endurance, a sense of quiet pride, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'cass-review',
		prompt:
			'An abstract painting about examination and scrutiny: a large magnifying lens shape hovering over layered documents and medical symbols, cool clinical blues and warm amber tones in tension, analytical yet human, thick visible brushstrokes, oil paint texture'
	},
	{
		slug: 'ideologia-gender',
		prompt:
			'An abstract painting about language and manipulation: words dissolving into paint, distorted text shapes being unraveled by flowing organic forms revealing truth beneath, warm golds breaking through dark greys, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'mio-figlio-trans',
		prompt:
			'An abstract painting about family embrace and unconditional love: warm protective forms cradling a smaller luminous shape, rich amber, deep blue and gentle rose tones blending together, a sense of safety and acceptance, thick expressive brushstrokes, oil paint texture'
	},
	{
		slug: 'gender-nelle-scuole',
		prompt:
			'An abstract painting of a classroom scene reimagined: open books with pages flowing upward like birds, warm sunlight streaming through windows onto diverse geometric shapes representing students, soft yellows, warm oranges and calm blues, thick expressive brushstrokes, oil paint texture'
	},
	{
		slug: 'caso-careggi',
		prompt:
			'An abstract painting of a hospital building with warm light inside contrasting with dark storm clouds gathering outside, a sense of sanctuary under pressure, terracotta, warm white and deep grey-blue tones, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'espressione-genere-bambini',
		prompt:
			'An abstract painting of children playing freely: colorful organic shapes in motion suggesting joyful movement, scattered toys and flowers, bright rainbow pastels blending with warm gold sunlight, a sense of innocence and freedom, thick expressive brushstrokes, oil paint texture'
	},
	{
		slug: 'ddl-zan',
		prompt:
			'An abstract painting about law and justice denied: a broken gavel or scales tilted to one side, torn paper forms suggesting legislation, somber deep blues and muted reds against warm amber, a sense of incompleteness, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'chirurgia-minori-trans-italia',
		prompt:
			'An abstract painting about protection and boundaries: a gentle shield-like form over smaller figures, clear defined lines suggesting rules and safeguards, soft clinical whites with warm protective amber and teal accents, thick visible brushstrokes, oil paint texture'
	},
	{
		slug: 'sterilizzazione-forzata-diritti-riproduttivi-trans',
		prompt:
			'An abstract painting about broken chains and bodily autonomy: shattered metallic chain links falling away from organic body-like forms that are blooming and growing free, deep crimson and warm gold tones against cool steel grey fragments, a sense of liberation from institutional violence, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'project-2025-trans',
		prompt:
			'An abstract painting of a massive dark blueprint document casting long shadows over small vulnerable figures below, authoritarian geometric shapes pressing down on organic flowing forms, deep navy blue and blood red against muted gold, a sense of institutional power and resistance, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'sentenza-skrmetti',
		prompt:
			'An abstract painting of a judicial gavel striking down with ripple waves spreading outward across a landscape, the impact creating fracture lines in warm protective layers, dark judicial black and cold marble grey against warm amber and soft rose tones suggesting youth, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'ordini-esecutivi-trump-trans',
		prompt:
			'An abstract painting of presidential seals and executive documents cascading down like dominoes, each one extinguishing a small warm light below, stark contrast between cold institutional white and deep authoritarian navy, scattered fragments of warm color resisting, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'tennessee-laboratorio-anti-trans',
		prompt:
			'An abstract painting of a laboratory flask or beaker containing a turbulent mixture of dark legislation-like scrolls and restrictive geometric shapes, set against a map outline suggesting a US state, ominous dark reds and institutional greys with small sparks of defiant warm gold, thick impasto brushstrokes, oil paint texture'
	},
	{
		slug: 'bathroom-bill',
		prompt:
			'An abstract painting of a door with a divided symbol splitting into two rigid halves, a figure caught between the halves unable to pass through, cold institutional tile blues and sterile whites contrasted with warm human amber tones, a sense of exclusion and absurdity, thick impasto brushstrokes, oil paint texture'
	}
];

async function getStyleReference(): Promise<string | null> {
	if (!existsSync(STYLE_REF_PATH)) {
		console.warn('Style reference image not found, generating without reference');
		return null;
	}
	const buf = readFileSync(STYLE_REF_PATH);
	// Convert WebP to PNG for Gemini
	const pngBuf = await sharp(buf).png().toBuffer();
	return pngBuf.toString('base64');
}

async function generateImage(
	prompt: string,
	styleRef: string | null
): Promise<Buffer | null> {
	const fullPrompt = `Use the reference image as a STYLE GUIDE ONLY — match its abstract oil painting / fresco technique: thick visible brushstrokes, impasto texture, warm and cool color contrasts, abstract and evocative composition. DO NOT copy the specific subject of the reference.

Create a NEW abstract painting: ${prompt}

CRITICAL RULES:
- MUST NOT include any text, words, letters, numbers, labels, captions, watermarks
- MUST NOT include borders, frames, or UI elements
- MUST NOT include realistic human faces or photographs
- Abstract and evocative, like an Italian Renaissance fresco reinterpreted in a modern abstract style
- Full bleed composition filling the entire canvas`;

	const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> =
		[];

	if (styleRef) {
		parts.push({ inlineData: { mimeType: 'image/png', data: styleRef } });
	}
	parts.push({ text: fullPrompt });

	for (let attempt = 1; attempt <= 3; attempt++) {
		try {
			const result = await genai.models.generateContent({
				model: IMAGE_MODEL,
				contents: [{ role: 'user', parts }],
				config: {
					responseModalities: ['IMAGE'],
					imageConfig: { aspectRatio: '16:9' }
				}
			});

			const imageBytes =
				result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
			if (!imageBytes) {
				console.error(`  Attempt ${attempt}/3: no image data returned`);
				if (attempt < 3) await new Promise((r) => setTimeout(r, 3000 * attempt));
				continue;
			}

			return Buffer.from(imageBytes, 'base64');
		} catch (e: any) {
			console.error(`  Attempt ${attempt}/3 error:`, e?.message || e);
			if (attempt < 3) await new Promise((r) => setTimeout(r, 3000 * attempt));
		}
	}
	return null;
}

async function processAndSave(buffer: Buffer, slug: string): Promise<void> {
	const fullPath = join(OUTPUT_DIR, `${slug}.webp`);
	const thumbPath = join(OUTPUT_DIR, `${slug}-thumb.webp`);

	const fullBuffer = await sharp(buffer)
		.resize(FULL_WIDTH, FULL_HEIGHT, { fit: 'cover' })
		.webp({ quality: 80 })
		.toBuffer();

	const thumbBuffer = await sharp(buffer)
		.resize(THUMB_WIDTH, THUMB_HEIGHT, { fit: 'cover' })
		.webp({ quality: 75 })
		.toBuffer();

	writeFileSync(fullPath, fullBuffer);
	writeFileSync(thumbPath, thumbBuffer);

	console.log(`  Saved: ${fullPath} (${(fullBuffer.length / 1024).toFixed(0)}KB)`);
	console.log(`  Saved: ${thumbPath} (${(thumbBuffer.length / 1024).toFixed(0)}KB)`);
}

async function main() {
	console.log('Loading style reference...');
	const styleRef = await getStyleReference();

	for (const { slug, prompt } of IMAGES_TO_GENERATE) {
		const fullPath = join(OUTPUT_DIR, `${slug}.webp`);
		if (existsSync(fullPath)) {
			console.log(`Skipping ${slug} (already exists)`);
			continue;
		}

		console.log(`\nGenerating: ${slug}...`);
		const buffer = await generateImage(prompt, styleRef);
		if (!buffer) {
			console.error(`FAILED: ${slug}`);
			continue;
		}

		await processAndSave(buffer, slug);
		console.log(`Done: ${slug}`);

		// Small delay between requests
		await new Promise((r) => setTimeout(r, 2000));
	}

	console.log('\nAll done!');
}

main().catch(console.error);
