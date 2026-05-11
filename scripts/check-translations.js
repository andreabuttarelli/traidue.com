
import fs from 'fs';
import path from 'path';

const wikiDir = 'src/content/wiki';
const languages = ['en', 'pt', 'es'];
const sourceLang = 'it';

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.md')) {
            results.push(file);
        }
    });
    return results;
}

function getTranslationKey(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/translationKey:\s*"(.*?)"/);
    return match ? match[1] : null;
}

const sourceFiles = getFiles(path.join(wikiDir, sourceLang));
const sourceData = sourceFiles.map(file => {
    const key = getTranslationKey(file);
    return {
        path: file,
        key: key,
        category: path.dirname(file).split(path.sep).pop()
    };
});

const missing = {};

languages.forEach(lang => {
    missing[lang] = [];
    const langFiles = getFiles(path.join(wikiDir, lang));
    const langKeys = new Set(langFiles.map(file => getTranslationKey(file)));

    sourceData.forEach(item => {
        if (!langKeys.has(item.key)) {
            missing[lang].push(item);
        }
    });
});

console.log(JSON.stringify(missing, null, 2));
