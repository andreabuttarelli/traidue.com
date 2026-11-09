"""Build minimal basemaps (land, region borders, neighbours) from Natural Earth (public domain).

Usage: python3 scripts/build-basemaps.py <dir with ne_10m_admin_0_countries, ne_50m_admin_0_countries, ne_110m_admin_0_countries,
       ne_10m_admin_1_states_provinces .geojson from github.com/nvkelso/natural-earth-vector v5.1.2> src/lib/data/services
"""
import json, sys, collections

NE, OUT = sys.argv[1], sys.argv[2]
TOL = 0.008  # degrees, ~800 m: invisible below zoom ~9

def dp(pts, tol):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]
    dx, dy = b[0]-a[0], b[1]-a[1]; n = (dx*dx+dy*dy) ** .5
    best, idx = 0, 0
    for i in range(1, len(pts)-1):
        p = pts[i]
        d = abs(dy*p[0]-dx*p[1]+b[0]*a[1]-b[1]*a[0])/n if n else ((p[0]-a[0])**2+(p[1]-a[1])**2)**.5
        if d > best: best, idx = d, i
    if best <= tol: return [a, b]
    return dp(pts[:idx+1], tol)[:-1] + dp(pts[idx:], tol)

def rnd(pts): return [[round(x, 4), round(y, 4)] for x, y in pts]

def polys(geom):
    return geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']]

def area(r): return abs(sum(r[i][0]*r[i+1][1]-r[i+1][0]*r[i][1] for i in range(len(r)-1)))/2

def simplify_polys(geoms, tol, min_area):
    out = []
    for g in geoms:
        for poly in polys(g):
            rings = [dp(r, tol) for r in poly if area(r) >= min_area]
            rings = [rnd(r) for r in rings if len(r) >= 4]
            if rings: out.append(rings)
    return {'type': 'MultiPolygon', 'coordinates': out}

def bbox_overlap(g, bb):
    xs = [p[0] for poly in polys(g) for r in poly for p in r]; ys = [p[1] for poly in polys(g) for r in poly for p in r]
    return not (max(xs) < bb[0] or min(xs) > bb[2] or max(ys) < bb[1] or min(ys) > bb[3])

def internal_borders(features, group_key):
    """Edges shared by two provinces of different groups = region borders (NE shares vertices)."""
    seg = collections.defaultdict(set)
    for f in features:
        grp = f['properties'][group_key]
        for poly in polys(f['geometry']):
            for r in poly:
                for i in range(len(r)-1):
                    a, b = (round(r[i][0], 4), round(r[i][1], 4)), (round(r[i+1][0], 4), round(r[i+1][1], 4))
                    if a == b: continue
                    seg[(a, b) if a < b else (b, a)].add(grp)
    edges = [k for k, g in seg.items() if len(g) > 1]
    adj = collections.defaultdict(list)
    for a, b in edges: adj[a].append(b); adj[b].append(a)
    used, lines = set(), []
    for a, b in edges:
        if (a, b) in used: continue
        line = [a, b]; used.add((a, b))
        for end in (0, 1):  # extend both ways through degree-2 nodes
            while True:
                tip = line[-1] if end else line[0]; prev = line[-2] if end else line[1]
                nxt = [n for n in adj[tip] if n != prev and ((tip, n) if tip < n else (n, tip)) not in used]
                if len(adj[tip]) != 2 or not nxt: break
                n = nxt[0]; used.add((tip, n) if tip < n else (n, tip))
                line.append(n) if end else line.insert(0, n)
        lines.append(line)
    return {'type': 'MultiLineString', 'coordinates': [rnd(dp([list(p) for p in l], TOL)) for l in lines]}

countries10 = json.load(open(f'{NE}/ne_10m_admin_0_countries.geojson'))['features']
countries50 = json.load(open(f'{NE}/ne_50m_admin_0_countries.geojson'))['features']
countries110 = json.load(open(f'{NE}/ne_110m_admin_0_countries.geojson'))['features']
admin1 = json.load(open(f'{NE}/ne_10m_admin_1_states_provinces.geojson'))['features']

for code, a3, group, bb in (('it', 'ITA', 'region', [3, 34.5, 21.5, 48.5]), ('uk', 'GBR', 'geonunit', [-13, 48.5, 5, 61.5])):
    land = simplify_polys([f['geometry'] for f in countries10 if f['properties']['ADM0_A3'] == a3], TOL, 0.0005)
    near = [f for f in countries50 if f['properties']['ADM0_A3'] != a3 and bbox_overlap(f['geometry'], bb)]
    near_codes = {f['properties']['ADM0_A3'] for f in near}
    # Nearby countries at 50m, the rest of the world at 110m: the whole globe stays visible when zoomed out.
    world = [f for f in countries110 if f['properties']['ADM0_A3'] not in near_codes | {a3}]
    neigh = simplify_polys([f['geometry'] for f in near], TOL * 3, 0.05)
    neigh['coordinates'] += simplify_polys([f['geometry'] for f in world], TOL * 10, 0.05)['coordinates']
    borders = internal_borders([f for f in admin1 if f['properties']['adm0_a3'] == a3], group)
    fc = {'type': 'FeatureCollection', 'features': [
        {'type': 'Feature', 'properties': {'k': 'neighbour'}, 'geometry': neigh},
        {'type': 'Feature', 'properties': {'k': 'land'}, 'geometry': land},
        {'type': 'Feature', 'properties': {'k': 'border'}, 'geometry': borders}]}
    s = json.dumps(fc, separators=(',', ':'))
    open(f'{OUT}/basemap-{code}.json', 'w').write(s)
    print(code, f'{len(s)//1024} KB', 'land polys', len(land['coordinates']), 'border lines', len(borders['coordinates']), 'neighbours', len(neigh['coordinates']))
