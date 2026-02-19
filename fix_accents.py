#!/usr/bin/env python3
"""Fix missing Italian accents in wiki article body text."""

import re
import glob
import os

WIKI_DIR = "/Users/andreabuttarelli/Documents/GitHub/traidue.com/src/content/wiki"

# Unambiguous word replacements (these words without accent are always wrong in Italian)
SIMPLE_REPLACEMENTS = [
    # Words ending in -ità
    (r'\bidentita\b', 'identità'),
    (r'\brealta\b', 'realtà'),
    (r'\bsessualita\b', 'sessualità'),
    (r'\bfertilita\b', 'fertilità'),
    (r'\bsocieta\b', 'società'),
    (r'\bparita\b', 'parità'),
    (r'\bqualita\b', 'qualità'),
    (r'\bcitta\b', 'città'),
    (r'\buniversita\b', 'università'),
    (r'\battivita\b', 'attività'),
    (r'\bpossibilita\b', 'possibilità'),
    (r'\bnecessita\b', 'necessità'),
    (r'\bcapacita\b', 'capacità'),
    (r'\bliberta\b', 'libertà'),
    (r'\bverita\b', 'verità'),
    (r'\bvolonta\b', 'volontà'),
    (r'\bdifficolta\b', 'difficoltà'),
    (r'\bvalidita\b', 'validità'),
    (r'\bvisibilita\b', 'visibilità'),
    (r'\bmascolinita\b', 'mascolinità'),
    (r'\bfemminilita\b', 'femminilità'),
    (r'\bnormalita\b', 'normalità'),
    (r'\bcomplessita\b', 'complessità'),
    (r'\bspecificita\b', 'specificità'),
    (r'\bcomunita\b', 'comunità'),
    (r'\bgenitorialita\b', 'genitorialità'),
    (r'\bintimita\b', 'intimità'),
    (r'\bdiversita\b', 'diversità'),
    (r'\bsensibilita\b', 'sensibilità'),
    (r'\bsicurta\b', 'sicurtà'),
    (r'\bsanita\b', 'sanità'),
    (r'\bdigita\b', 'digità'),
    (r'\bpriorita\b', 'priorità'),
    (r'\bantichita\b', 'antichità'),
    (r'\bvirginita\b', 'virginità'),
    (r'\bnotorieta\b', 'notorietà'),
    (r'\bmaternita\b', 'maternità'),
    (r'\bpaternita\b', 'paternità'),
    (r'\bumanita\b', 'umanità'),
    (r'\bcuriosta\b', 'curiostà'),
    (r'\bcuriosita\b', 'curiosità'),
    (r'\bmascolinita\b', 'mascolinità'),
    (r'\bfemminilita\b', 'femminilità'),
    (r'\bvariabilita\b', 'variabilità'),
    (r'\bsoggettivita\b', 'soggettività'),
    (r'\boggettivita\b', 'oggettività'),
    (r'\bsensualita\b', 'sensualità'),
    (r'\bcriminalita\b', 'criminalità'),
    (r'\blegittimita\b', 'legittimità'),
    (r'\bfluidita\b', 'fluidità'),

    # Words ending in -tà (other patterns)
    (r'\beta\b', 'età'),
    (r'\bmeta\b', 'metà'),  # careful - "meta" can be correct (goal), but in these articles it's usually "metà"
    (r'\bvolonta\b', 'volontà'),

    # Common words with accents
    (r'\bpiu\b', 'più'),
    (r'\bperche\b', 'perché'),
    (r'\bpuo\b', 'può'),
    (r'\bcioe\b', 'cioè'),
    (r'\bgia\b', 'già'),
    (r'\bcosi\b', 'così'),
    (r'\bnonche\b', 'nonché'),
    (r'\bpoiche\b', 'poiché'),
    (r'\bbenche\b', 'benché'),
    (r'\bfinche\b', 'finché'),
    (r'\baffinche\b', 'affinché'),
    (r'\banche\b', 'anche'),  # NO - "anche" is correct without accent!

    # "ne" as "né" (neither/nor) - only in specific patterns
    # We'll handle "ne" separately because it can mean "of it" or "neither"
]

# Remove the "anche" entry - that's already correct
SIMPLE_REPLACEMENTS = [(p, r) for p, r in SIMPLE_REPLACEMENTS if r != 'anche']

# Remove "meta" - it can be "meta" (goal) which is correct
SIMPLE_REPLACEMENTS = [(p, r) for p, r in SIMPLE_REPLACEMENTS if p != r'\bmeta\b']

# Patterns where "e" clearly means "è" (is)
# These are contextual patterns where we're very confident
E_IS_PATTERNS = [
    # After common subjects: "X e Y" where Y is adjective/noun indicating "X is Y"
    # "non e" -> "non è" (almost always "is not")
    (r'\bnon e\b', 'non è'),
    # "che e" -> "che è" (that is)
    (r'\bche e\b', 'che è'),
    # "questo e" -> "questo è"
    (r'\bquesto e\b', 'questo è'),
    # "questa e" -> "questa è"
    (r'\bquesta e\b', 'questa è'),
    # "quello e" -> "quello è"
    (r'\bquello e\b', 'quello è'),
    # "quella e" -> "quella è"
    (r'\bquella e\b', 'quella è'),
    # "ci e" -> "ci è" (there is)
    (r'\bci e\b', 'ci è'),
    # "c'e" -> "c'è" (there is)
    (r"c'e\b", "c'è"),
    # "com'e" -> "com'è"
    (r"com'e\b", "com'è"),
    # "dov'e" -> "dov'è"
    (r"dov'e\b", "dov'è"),
    # "qual e" -> "qual è"
    (r'\bqual e\b', 'qual è'),
    # Pattern: noun + "e" + adjective/past participle
    # "e stato/a" -> "è stato/a"
    (r'\be stato\b', 'è stato'),
    (r'\be stata\b', 'è stata'),
    (r'\be stati\b', 'è stati'),
    (r'\be state\b', 'è state'),
    # "e il/la/un/una/lo" (is the/a)
    (r'\be il\b', 'è il'),
    (r'\be la\b', 'è la'),
    (r'\be lo\b', 'è lo'),
    (r'\be un\b', 'è un'),
    (r'\be una\b', 'è una'),
    (r'\be uno\b', 'è uno'),
    (r'\be l\'', 'è l\''),
    # "e del/della/dei/delle/degli"
    (r'\be del\b', 'è del'),
    (r'\be della\b', 'è della'),
    (r'\be dei\b', 'è dei'),
    (r'\be delle\b', 'è delle'),
    (r'\be degli\b', 'è degli'),
    # "e di" (is of)
    (r'\be di\b', 'è di'),
    # "e in" (is in)
    (r'\be in\b', 'è in'),
    # "e da" (is from/by)
    (r'\be da\b', 'è da'),
    # "e tra" / "e fra"
    (r'\be tra\b', 'è tra'),
    (r'\be fra\b', 'è fra'),
    # "e per" (is for)
    (r'\be per\b', 'è per'),
    # "e che" (is that)
    (r'\be che\b', 'è che'),
    # "e anche" (is also)
    (r'\be anche\b', 'è anche'),
    # "e molto" / "e molta" / "e molti" / "e molte"
    (r'\be molto\b', 'è molto'),
    (r'\be molta\b', 'è molta'),
    (r'\be molti\b', 'è molti'),
    (r'\be molte\b', 'è molte'),
    # "e ancora" (is still)
    (r'\be ancora\b', 'è ancora'),
    # "e sempre" (is always)
    (r'\be sempre\b', 'è sempre'),
    # "e spesso" (is often)
    (r'\be spesso\b', 'è spesso'),
    # "e possibile" (is possible)
    (r'\be possibile\b', 'è possibile'),
    # "e importante" (is important)
    (r'\be importante\b', 'è importante'),
    # "e necessario/a" (is necessary)
    (r'\be necessari', 'è necessari'),
    # "e fondamentale" (is fundamental)
    (r'\be fondamentale\b', 'è fondamentale'),
    # "e essenziale" (is essential)
    (r'\be essenziale\b', 'è essenziale'),
    # "e comune" (is common)
    (r'\be comune\b', 'è comune'),
    # "e normale" (is normal)
    (r'\be normale\b', 'è normale'),
    # "e vero/a" (is true)
    (r'\be vero\b', 'è vero'),
    (r'\be vera\b', 'è vera'),
    # "e proprio" (is really)
    (r'\be proprio\b', 'è proprio'),
    (r'\be propria\b', 'è propria'),
    # "e associat*"
    (r'\be associat', 'è associat'),
    # "e legat*"
    (r'\be legat', 'è legat'),
    # "e considerat*"
    (r'\be considerat', 'è considerat'),
    # "e noto/a"
    (r'\be noto\b', 'è noto'),
    (r'\be nota\b', 'è nota'),
    # "e reale" (is real)
    (r'\be reale\b', 'è reale'),
    # "e presente" (is present)
    (r'\be presente\b', 'è presente'),
    # "e chiaro/a" (is clear)
    (r'\be chiar', 'è chiar'),
    # "e diverso/a" (is different)
    (r'\be divers', 'è divers'),
    # "e simile" (is similar)
    (r'\be simile\b', 'è simile'),
    # "e pari" (is equal)
    (r'\be pari\b', 'è pari'),
    # "e elevat*"
    (r'\be elevat', 'è elevat'),
    # Sentence starters: "E " at beginning of sentence (after ". " or after newline)
    # These need special handling - "E" at start could be "And" or "Is"
    # We handle known patterns like "E un/una/il/la"
    # "E spesso" -> "È spesso" at sentence start
    # "ne...ne" -> "né...né"
    # Standalone "se" at start of sentence is fine
    # "e circa" (is about)
    (r'\be circa\b', 'è circa'),
    # "e quasi" (is almost)
    (r'\be quasi\b', 'è quasi'),
    # "e solo/a" (is only)
    (r'\be solo\b', 'è solo'),
    (r'\be sola\b', 'è sola'),
    # "e sufficiente" (is sufficient)
    (r'\be sufficiente\b', 'è sufficiente'),
    # "e probabile" (is probable)
    (r'\be probabile\b', 'è probabile'),
    # "e probabilmente" (is probably)
    (r'\be probabilmente\b', 'è probabilmente'),
    # "e previsto/a" (is expected)
    (r'\be previst', 'è previst'),
    # "e coperto/a" (is covered)
    (r'\be copert', 'è copert'),
    # "e compreso/a" / "e incluso/a"
    (r'\be compres', 'è compres'),
    (r'\be inclus', 'è inclus'),
    # "e dovuto/a" (is due to)
    (r'\be dovut', 'è dovut'),
    # "e riconosciut*"
    (r'\be riconosciut', 'è riconosciut'),
    # "e limitato/a"
    (r'\be limitat', 'è limitat'),
    # "e determinat*"
    (r'\be determinat', 'è determinat'),
    # "e basato/a"
    (r'\be basat', 'è basat'),
    # "e definit*"
    (r'\be definit', 'è definit'),
    # "e caratterizzat*"
    (r'\be caratterizzat', 'è caratterizzat'),
    # "e documentat*"
    (r'\be documentat', 'è documentat'),
    # "e influenzat*"
    (r'\be influenzat', 'è influenzat'),
    # "e regolat*"
    (r'\be regolat', 'è regolat'),
    # "e garantit*"
    (r'\be garantit', 'è garantit'),
    # "e tutelat*"
    (r'\be tutelat', 'è tutelat'),
    # Common adjectives after "e"
    (r'\be alto/a\b', 'è alto/a'),
    (r'\be basso/a\b', 'è basso/a'),
    # "e altissim*"
    (r'\be altissim', 'è altissim'),
    # "e relativament*"
    (r'\be relativament', 'è relativament'),
    # "e particolarmente" (is particularly)
    (r'\be particolarmente\b', 'è particolarmente'),
    # "e generalmente" (is generally)
    (r'\be generalmente\b', 'è generalmente'),
    # "e significativ*"
    (r'\be significativ', 'è significativ'),
    # "e sostanzialmente"
    (r'\be sostanzialmente\b', 'è sostanzialmente'),
    # "e praticamente"
    (r'\be praticamente\b', 'è praticamente'),
    # "e effettivamente"
    (r'\be effettivamente\b', 'è effettivamente'),
    # "e completamente"
    (r'\be completamente\b', 'è completamente'),
    # "e nativo/a"
    (r'\be nativ', 'è nativ'),
    # "e irreversibile"
    (r'\be irreversibil', 'è irreversibil'),
    # "e reversibile"
    (r'\be reversibil', 'è reversibil'),
    # "e disponibile"
    (r'\be disponibil', 'è disponibil'),
    # "e evidente"
    (r'\be evidente\b', 'è evidente'),
    # "e insufficiente"
    (r'\be insufficiente\b', 'è insufficiente'),
    # "e raro/a"
    (r'\be raro\b', 'è raro'),
    (r'\be rara\b', 'è rara'),
    # "e frequente"
    (r'\be frequente\b', 'è frequente'),
    # "e obbligatorio/a"
    (r'\be obbligatori', 'è obbligatori'),
    # "e facoltativo/a"
    (r'\be facoltativ', 'è facoltativ'),
    # "e gratuito/a"
    (r'\be gratuit', 'è gratuit'),
    # "e previsto/a"
    (r'\be previst', 'è previst'),
    # "e conosciut*"
    (r'\be conosciut', 'è conosciut'),
    # "e richiesto/a"
    (r'\be richiest', 'è richiest'),
    # "e inferiore"
    (r'\be inferiore\b', 'è inferiore'),
    # "e superiore"
    (r'\be superiore\b', 'è superiore'),
    # "ne X ne Y" -> "né X né Y"
    # This needs special handling
    # "e una possibilita" -> "è una possibilità" (already handled by "e una")
    # "e una decisione" -> "è una decisione" (already handled by "e una")
    # "e legittim*"
    (r'\be legittim', 'è legittim'),
    # "e complet*"
    (r'\be complet', 'è complet'),
    # "e pienamente"
    (r'\be pienamente\b', 'è pienamente'),
    # "e esclusivamente"
    (r'\be esclusivamente\b', 'è esclusivamente'),
    # "e personale"
    (r'\be personale\b', 'è personale'),
    # "e uguale"
    (r'\be uguale\b', 'è uguale'),
    # "e sicuro/a"
    (r'\be sicur', 'è sicur'),
    # "e al" (is at the)
    (r'\be al\b', 'è al'),
    # "e alla"
    (r'\be alla\b', 'è alla'),
    # "e allo"
    (r'\be allo\b', 'è allo'),
    # "e ai"
    (r'\be ai\b', 'è ai'),
    # "e alle"
    (r'\be alle\b', 'è alle'),
    # "e agli"
    (r'\be agli\b', 'è agli'),
]

# "né...né" pattern
NE_PATTERNS = [
    (r'\bne un\b(?! po)', 'né un'),  # né un (but not "ne un po'")
    # "ne...ne" in the specific double negation pattern
]


def split_frontmatter(content):
    """Split content into frontmatter and body, return (frontmatter, body, second_delimiter_pos)."""
    # Find the second ---
    first = content.find('---')
    if first == -1:
        return None, content, 0
    second = content.find('---', first + 3)
    if second == -1:
        return None, content, 0
    end_of_frontmatter = second + 3
    return content[:end_of_frontmatter], content[end_of_frontmatter:], end_of_frontmatter


def apply_replacements(body):
    """Apply accent fixes to body text."""
    original = body

    # Apply simple word replacements (case-insensitive for the pattern, preserve case)
    for pattern, replacement in SIMPLE_REPLACEMENTS:
        # Case-sensitive replacement
        body = re.sub(pattern, replacement, body)
        # Also handle uppercase first letter (e.g., "Piu" -> "Più")
        if pattern.startswith(r'\b'):
            cap_pattern = pattern[:2] + pattern[2].upper() + pattern[3:]
            cap_replacement = replacement[0].upper() + replacement[1:]
            body = re.sub(cap_pattern, cap_replacement, body)

    # Apply "e" -> "è" patterns
    for pattern, replacement in E_IS_PATTERNS:
        body = re.sub(pattern, replacement, body)
        # Also handle uppercase "E" at start
        if pattern.startswith(r'\be '):
            # Handle "E " at sentence boundaries (after ". " or after "\n")
            cap_pattern = pattern.replace(r'\be ', r'\bE ')
            cap_replacement = replacement.replace('è ', 'È ')
            body = re.sub(cap_pattern, cap_replacement, body)

    # Handle "ne...ne" -> "né...né" pattern
    # "ne X ne Y" where it's clearly "neither X nor Y"
    body = re.sub(r'\bne un miracolo ne\b', 'né un miracolo né', body)
    body = re.sub(r'\bne un orrore\b', 'né un orrore', body)
    body = re.sub(r'\bne la complessita\b', 'né la complessità', body)
    body = re.sub(r'\bne la realta\b', 'né la realtà', body)
    # Generic "né...né" at sentence level would need more context

    # Handle sentence-starting "E " that means "È " (is)
    # Pattern: after period+space or after newline, "E " followed by words that indicate "is"
    # ". E " or "\nE " where it means "is"
    starters = [
        'un', 'una', 'uno', 'il', 'la', 'lo', 'l\'',
        'spesso', 'importante', 'fondamentale', 'possibile',
        'necessario', 'necessaria', 'probabile', 'raro', 'rara',
        'comune', 'normale', 'vero', 'vera', 'proprio', 'propria',
        'questo', 'questa', 'quello', 'quella',
        'stato', 'stata', 'stati', 'state',
        'tra', 'fra',
    ]
    for word in starters:
        # After period + space
        body = re.sub(r'\. E ' + re.escape(word) + r'\b', '. È ' + word, body)
        # After newline
        body = re.sub(r'\nE ' + re.escape(word) + r'\b', '\nÈ ' + word, body)

    return body


def process_file(filepath):
    """Process a single markdown file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter, body, pos = split_frontmatter(content)
    if frontmatter is None:
        print(f"  SKIP (no frontmatter): {filepath}")
        return False

    new_body = apply_replacements(body)

    if new_body != body:
        new_content = frontmatter + new_body
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        # Count changes
        import difflib
        old_lines = body.splitlines()
        new_lines = new_body.splitlines()
        changes = 0
        for old, new in zip(old_lines, new_lines):
            if old != new:
                changes += 1
        print(f"  FIXED ({changes} lines changed): {os.path.basename(filepath)}")
        return True
    else:
        print(f"  OK (no changes needed): {os.path.basename(filepath)}")
        return False


def main():
    files = sorted(glob.glob(os.path.join(WIKI_DIR, "**/*.md"), recursive=True))
    print(f"Found {len(files)} markdown files")
    print()

    changed = 0
    for filepath in files:
        result = process_file(filepath)
        if result:
            changed += 1

    print(f"\nTotal files changed: {changed}/{len(files)}")


if __name__ == "__main__":
    main()
