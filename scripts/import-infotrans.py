"""Merge InfoTrans (ISS/UNAR) services into src/lib/data/services/it.json.

InfoTrans publishes its map data at https://www.infotrans.it/script/leaflet/load_json?codice_lingua=it.
Published by a public administration without an explicit licence, it is open data by default
(CAD art. 52 c.2) and is reused with attribution: every imported entry keeps `origin: "infotrans"`
and its InfoTrans page as `source`. Descriptions are generated from the structured fields; free-text
notes and staff names (REFERENTE, personal emails, private mobiles) are not imported.

Usage: python3 scripts/import-infotrans.py <load_json file> src/lib/data/services/it.json
"""
import json, math, re, sys, unicodedata

TODAY = '2026-11-09'
# Different organisations that the fuzzy match pairs with an existing entry (same building/city).
NOT_DUPLICATES = {20, 21, 38, 62, 66, 67, 122}
PERSONAL_DOMAINS_MAIL = {'info@giulialorusso.com'}  # generic local part, but a person's own domain
REGIONS = {'Emilia Romagna': 'Emilia-Romagna', 'Friuli Venezia Giulia': 'Friuli-Venezia Giulia', 'Trentino Alto Adige': 'Trentino-Alto Adige'}
GENERIC_MAIL = re.compile(r'(info|segreter|ambulatori|amb\b|cup|centro|serviz|consultori|prenota|contatt|sportell|accoglien|direzione|ufficio|staff|associaz|arcigay|agedo|trans|gender|genere|lgbt|help|ascolto|amministraz|presidenza|mail|posta)', re.I)

src_path, out_path = sys.argv[1], sys.argv[2]
src, ours = json.load(open(src_path)), json.load(open(out_path))

norm = lambda s: re.sub(r'[^a-z0-9 ]', ' ', unicodedata.normalize('NFD', s or '').encode('ascii', 'ignore').decode().lower())
toks = lambda s: {t for t in norm(s).split() if len(t) > 3}
clean = lambda s: re.sub(r'\s+', ' ', s or '').strip()
slug = lambda s: re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', norm(s))).strip('-')[:70].rstrip('-')

ITALY = (35.2, 47.2, 6.5, 18.6)  # lat min/max, lng min/max

def coords(e):
    """InfoTrans has decimal-point typos (e.g. lng 134.8 for 13.48): fix a 10x slip, else drop."""
    lat, lng = float(e['CORDX']), float(e['CORDY'])
    inside = lambda la, lo: ITALY[0] <= la <= ITALY[1] and ITALY[2] <= lo <= ITALY[3]
    for la, lo in ((lat, lng), (lat, lng / 10), (lat / 10, lng)):
        if inside(la, lo): return round(la, 5), round(lo, 5)
    return None, None

def km(a, b, c, d):
    return 6371 * 2 * math.asin(math.sqrt(math.sin(math.radians(c - a) / 2) ** 2 + math.cos(math.radians(a)) * math.cos(math.radians(c)) * math.sin(math.radians(d - b) / 2) ** 2))

def match(e):
    page = f"it-sedi-{e['ID']}-"
    for o in ours:  # already imported or already linked: exact InfoTrans page match
        if page in o['source'] or page in o.get('infotrans', ''): return o
    lat, lng = coords(e)
    if lat is None: return None
    best = None
    for o in ours:
        j = len(toks(e['NOME']) & toks(o['name'])) / max(1, len(toks(e['NOME']) | toks(o['name'])))
        if o['lat'] is None:  # national/online entries: name match only
            if j > 0.4: best = (9, o)
            continue
        score = (km(lat, lng, o['lat'], o['lng']) < 0.5) * 2 + (j > 0.25) * 2 + (norm(e['COMUNE']).strip() == norm(o['city']).strip()) + (f"it-sedi-{e['ID']}-" in o['source']) * 5
        if score >= 3 and (best is None or score > best[0]): best = (score, o)
    return None if best is None or e['ID'] in NOT_DUPLICATES else best[1]

def city(e):
    return re.sub(r'^\d{5}\s*', '', e['COMUNE'].strip()).title()

def kind(e):
    n = norm(e['NOME'])
    if re.search(r'lenford|avvocat|legal', n): return 'legal'
    if re.search(r'agedo|genitori', n): return 'support-group'
    if re.search(r'consultorio', n): return 'consultorio'
    return 'clinic' if e['CLASS'] == 'ssn' else 'association'

def hours(e):
    out = []
    for i in range(1, 8):
        v = (e[f'ORARIO{i}'] or '').strip()
        out.append(None if not v or v.lower() == 'chiuso' else re.sub(r'(\d{1,2})[.:](\d{2})(?::\d{2})?', r'\1:\2', v).replace('/', '–'))
    return out if any(out) else None

def email(e):
    # Allowlist: keep only addresses that clearly belong to the organisation, never to a person.
    m = (e['EMAIL'] or '').strip().split(';')[0].strip()
    local = norm(m.split('@')[0]).replace(' ', '')
    org = any(t in local for t in toks(e['NOME']) if len(t) > 4)
    return m if '@' in m and (GENERIC_MAIL.search(local) or org) and m not in PERSONAL_DOMAINS_MAIL else None

def phone(e):
    p = re.sub(r'[^\d+]', '', e['CELLULARE'] or '')
    if not p or (e['CLASS'] != 'ssn' and p.lstrip('+').removeprefix('39').startswith('3')): return None  # private mobiles of volunteers
    return p if p.startswith('+') else f'+39 {p}'

def description(e):
    c = city(e)
    if e['CLASS'] == 'ssn':
        s = f'Servizio del Servizio Sanitario Nazionale a {c}' + (' (struttura privata convenzionata).' if e['CATEGORIA'] == 'Privato in convenzione' else '.')
    else:
        s = f'Associazione o collettivo a {c}.'
        if e['SOSTEGNO'] == 'Si': s += ' Offre sostegno e accompagnamento.'
    if e['PSICO_DIAGNOSI'] == 'Si': s += ' Rilascia la valutazione psicologica per il percorso di affermazione di genere.'
    cost = (e['PSICO_COSTO'] or '').strip()
    if cost: s += f' Percorso psicologico: {"gratuito" if cost.lower().startswith("gratuit") else "con ticket" if cost.lower() == "ticket" else cost}.'
    if e['TESSERA'] == 'Si': s += ' Alcuni servizi richiedono la tessera associativa.'
    g = [x for x in (e['LINEE_GUIDA'] or '').split(',') if x and x not in ('ALTRO', 'Non Applicabile')]
    if g: s += f' Linee guida: {", ".join(x.title() if x == "ENDOCRINE SOCIETY" else x for x in g)}.'
    return s

added = enriched = 0
ids = {o['id'] for o in ours}
for e in sorted(src, key=lambda e: e['ID']):
    url = f"https://www.infotrans.it/{e['HREF']}"
    dup = match(e)
    if dup:
        if dup['source'] != url: dup['infotrans'] = url
        if dup['address'] is None:  # we had no visiting address; InfoTrans has one
            dup.update(address=f"{clean(e['INDIRIZZO'])}, {city(e)} ({e['PROVINCIA']})", lat=coords(e)[0], lng=coords(e)[1])
        if hours(e) and 'hours' not in dup: dup['hours'] = hours(e)
        enriched += 1
        continue
    sid = base = slug(f"{e['NOME']} {e['COMUNE']}")
    n = 2
    while sid in ids: sid, n = f'{base}-{n}', n + 1
    ids.add(sid)
    entry = {
        'id': sid,
        'name': clean(e['NOME']),
        'type': kind(e),
        'city': city(e),
        'region': REGIONS.get(e['REGIONE'], e['REGIONE']),
        'address': f"{clean(e['INDIRIZZO'])}, {city(e)} ({e['PROVINCIA']})",
        'lat': coords(e)[0],
        'lng': coords(e)[1],
        'website': None,
        'description': description(e),
        'source': url,
        'verified': TODAY,
        'origin': 'infotrans'
    }
    if phone(e): entry['phone'] = phone(e)
    if email(e): entry['email'] = email(e)
    if hours(e): entry['hours'] = hours(e)
    ours.append(entry)
    added += 1

json.dump(ours, open(out_path, 'w'), ensure_ascii=False, indent=2)
open(out_path, 'a').write('\n')
print(f'enriched {enriched}, added {added}, total {len(ours)}')
