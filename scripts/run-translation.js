
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.1-pro-preview' });

const wikiDir = 'src/content/wiki';

async function translateFile(sourcePath, targetLang) {
    const content = fs.readFileSync(sourcePath, 'utf-8');
    const category = path.dirname(sourcePath).split(path.sep).pop();
    
    const prompt = `
You are an expert translator specializing in LGBTQ+ and specifically Transgender topics.
Translate the following Markdown article from Italian to ${targetLang === 'en' ? 'English' : targetLang === 'es' ? 'Spanish' : 'Portuguese'}.

Guidelines:
1. Preserve the Markdown frontmatter structure exactly.
2. Localize the following frontmatter fields:
   - title
   - seoTitle
   - slug (URL-friendly version of the localized title, e.g., "storia-trans" -> "trans-history")
   - description
   - tags (localize the tags)
3. Keep the following frontmatter fields UNCHANGED (CRITICAL):
   - translationKey (IMPORTANT: must be exactly the same as the Italian version)
   - related (DO NOT localize these slugs, keep them exactly as in the Italian source)
   - category
   - date
   - updated
   - image (KEEP the path exactly as is, e.g., "/images/wiki/filename.webp")
   - sources (translate the titles if they are in Italian, but keep URLs as is. If titles are already in English, keep them in English)
4. Set the 'lang' field to "${targetLang}".
5. Translate the main content of the article.
   - Maintain the Markdown formatting (headings, bold, links, lists).
   - For internal wiki links like "(/wiki/slug)": KEEP them exactly as they are in Italian (e.g., "(/wiki/transizione-medica-cosa-cambia)"). DO NOT add language prefixes like "/en/", "/es/", etc. The system handles this automatically.
   - Ensure the tone is professional, scientific, empathetic, and respectful.
   - Use the correct terminology for ${targetLang}.
6. Translate the FAQ section in the frontmatter if present.

Article content:
---
${content}
---

Output only the translated Markdown content, starting with --- and ending with the content. No extra text.
`;

    const result = await model.generateContent(prompt);
    let translatedContent = result.response.text();
    translatedContent = translatedContent.replace(/^```markdown\s*/i, '');
    translatedContent = translatedContent.replace(/```\s*$/i, '');
    translatedContent = translatedContent.trim();
    
    const slugMatch = translatedContent.match(/slug:\s*"(.*?)"/);
    const localizedSlug = slugMatch ? slugMatch[1] : path.basename(sourcePath, '.md');
    
    const targetDir = path.join(wikiDir, targetLang, category);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const targetPath = path.join(targetDir, `${localizedSlug}.md`);
    fs.writeFileSync(targetPath, translatedContent);
    console.log(`Translated ${sourcePath} -> ${targetPath}`);
}

async function main() {
    const missingData = JSON.parse(fs.readFileSync('missing-translations.json', 'utf-8'));
    const batchSize = 10;

    for (const lang of ['en', 'pt', 'es']) {
        console.log(`Starting ${lang}...`);
        const files = missingData[lang];
        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            console.log(`Processing batch ${i / batchSize + 1} for ${lang}...`);
            await Promise.all(batch.map(item => 
                translateFile(item.path, lang).catch(error => {
                    console.error(`Failed to translate ${item.path} to ${lang}:`, error);
                })
            ));
        }
    }
}

main();
