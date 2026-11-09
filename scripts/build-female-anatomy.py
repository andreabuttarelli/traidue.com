"""Build static/anatomy/vulva-female.glb: a real vulva and vagina fitted into the male model's silhouette.

"Pelvic Organs from MRI" (https://sketchfab.com/3d-models/pelvic-organs-from-mri-2610b30793ed47a5baa18b2994bdee6b)
by audreybyrd, licensed under CC BY 4.0: MRI of a 25-year-old woman, Oklahoma State University, 2022.
Download it from Sketchfab as glTF and pass the folder holding scene.gltf + scene.bin.

The two bodies differ (a full bladder in the MRI is twice the male one), so nothing is transplanted with one
scale. Instead, in the coordinates of static/anatomy/pelvis-male.glb (mm, +z up, -y anterior):
- the neovaginal canal is traced where the surgeon dissects it, midway between the rectum and the
  prostate / seminal vesicles, from the introitus on the skin up to the rectovesical pouch;
- the real vagina is laid along that canal (its own shape, resized to a neovagina: ~3.5 cm wide);
- the real vulva (6 cm wide) lies on the perineum with its outer surface on the skin, tilted up at the front
  so the clitoris sits ~2.5 cm below the pubic symphysis.
The canal, introitus and meatus are stored in scene extras for the viewer.
Uterus, cervix, tubes and ovaries are left out (a neovagina has none of them), and so is the skin behind
the perineal body (around the anus and the gluteal cleft), which is not vulva.

Usage: python3 scripts/build-female-anatomy.py <dir with scene.gltf> static/anatomy/pelvis-male.glb static/anatomy/vulva-female.glb
"""
import json, math, os, struct, sys

SRC, MALE, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
VAGINA_TOP = -0.160  # source units, Y: above this the uterus group widens into cervix/uterus/tubes

g = json.load(open(os.path.join(SRC, 'scene.gltf'))); buf = open(os.path.join(SRC, 'scene.bin'), 'rb').read()
def mat(n):
    if 'matrix' not in n: return [[float(i == j) for j in range(4)] for i in range(4)]
    m = n['matrix']; return [[m[c * 4 + r] for c in range(4)] for r in range(4)]
def mul(a, b): return [[sum(a[i][k] * b[k][j] for k in range(4)) for j in range(4)] for i in range(4)]
def acc(i):
    a = g['accessors'][i]; v = g['bufferViews'][a['bufferView']]
    n = {'SCALAR': 1, 'VEC3': 3}[a['type']]; fmt = {5126: 'f', 5125: 'I', 5123: 'H'}[a['componentType']]
    size = struct.calcsize(fmt); stride = v.get('byteStride', size * n); off = v.get('byteOffset', 0) + a.get('byteOffset', 0)
    return [struct.unpack_from('<' + fmt * n, buf, off + k * stride) for k in range(a['count'])]

groups = {}  # organ -> (world vertices, triangles); source is Y-up, +Z anterior
def walk(i, M, group):
    n = g['nodes'][i]; M = mul(M, mat(n)); name = n.get('name', '')
    if name[-2:-1] == '_' and name[-1].isdigit() and not name.startswith('Object'): group = name.rsplit('_', 1)[0]
    if 'mesh' in n:
        for p in g['meshes'][n['mesh']]['primitives']:
            P = acc(p['attributes']['POSITION']); I = [t[0] for t in acc(p['indices'])]
            vs, ts = groups.setdefault(group, ([], [])); b = len(vs)
            vs += [tuple(M[r][0] * x + M[r][1] * y + M[r][2] * z + M[r][3] for r in range(3)) for x, y, z in P]
            ts += [(I[k] + b, I[k + 1] + b, I[k + 2] + b) for k in range(0, len(I), 3)]
    for c in n.get('children', []): walk(c, M, group)
for r in g['scenes'][g.get('scene', 0)]['nodes']: walk(r, mat({}), None)

def subset(group, keep):
    v, t = groups[group]; return v, [tri for tri in t if all(keep(v[i]) for i in tri)]
vagina = subset('uterus-and-tubes', lambda p: p[1] < VAGINA_TOP)
vulva = groups['vulva']

# landmarks: vaginal opening = centre of the vagina's lowest 20 units; anus = lowest point of the rectum
vv = [vagina[0][i] for tri in vagina[1] for i in tri]
ymin, ymax = min(p[1] for p in vv), max(p[1] for p in vv)
def ring(lo, hi):
    ps = [p for p in vv if lo <= p[1] <= hi]; return [sum(p[k] for p in ps) / len(ps) for k in range(3)]
O = ring(ymin, ymin + 0.02)
anus = min(groups['rectum'][0], key=lambda p: p[1])
unit = sum((O[i] - anus[i]) ** 2 for i in range(3)) ** 0.5
to_frame = lambda p: tuple((p[i] - O[i]) / unit for i in range(3))
centerline = [to_frame(ring(y, y + 0.02)) for y in [ymin + (ymax - ymin - 0.02) * k / 7 for k in range(8)]]
# vulva: drop the skin behind the perineal body (around the anus / gluteal cleft)
vulva = (vulva[0], [t for t in vulva[1] if all(vulva[0][i][2] > anus[2] + 0.015 for i in t)])

def cluster(verts, tris, cell):
    key = lambda p: (round(p[0] / cell), round(p[1] / cell), round(p[2] / cell))
    ids, acc_, out = {}, [], set()
    for p in verts:
        k = key(p)
        if k not in ids: ids[k] = len(acc_); acc_.append([0.0, 0.0, 0.0, 0])
        a = acc_[ids[k]]; a[0] += p[0]; a[1] += p[1]; a[2] += p[2]; a[3] += 1
    vmap = [ids[key(p)] for p in verts]
    for t in tris:
        a, b, c = vmap[t[0]], vmap[t[1]], vmap[t[2]]
        if len({a, b, c}) == 3: out.add((a, b, c))
    return [(x / n, y / n, z / n) for x, y, z, n in acc_], sorted(out)

meshes = {}
for name, (v, t) in (('vulva', vulva), ('vagina', vagina)):
    meshes[name] = cluster([to_frame(p) for p in v], t, 0.1)  # ~10% of the anus-opening distance (~3 mm)

# ---- male model (mm, +z up, -y anterior) ----
mb = open(MALE, 'rb').read(); jl = struct.unpack_from('<I', mb, 12)[0]; mg = json.loads(mb[20:20 + jl]); mbin = mb[28 + jl:]
male = {}
for n in mg['nodes']:
    pr = mg['meshes'][n['mesh']]['primitives'][0]
    def macc(i):
        a = mg['accessors'][i]; v = mg['bufferViews'][a['bufferView']]; fmt = {5126: 'f', 5125: 'I', 5123: 'H'}[a['componentType']]
        k = a['count'] * (3 if a['type'] == 'VEC3' else 1)
        return struct.unpack_from(f'<{k}{fmt}', mbin, v.get('byteOffset', 0) + a.get('byteOffset', 0))
    P = macc(pr['attributes']['POSITION']); I = macc(pr['indices'])
    male[n['name']] = ([P[i:i + 3] for i in range(0, len(P), 3)], [I[i:i + 3] for i in range(0, len(I), 3)])
def mbox(name):
    v = male[name][0]; return [min(p[i] for p in v) for i in range(3)], [max(p[i] for p in v) for i in range(3)]
sub = lambda a, b: (a[0] - b[0], a[1] - b[1], a[2] - b[2])
dot = lambda a, b: a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
cross = lambda a, b: (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])
def norm(a):
    l = math.sqrt(dot(a, a)); return (a[0] / l, a[1] / l, a[2] / l)

# the full-resolution perineal skin (the 18 mm silhouette is too coarse between the thighs)
skin = [tuple(v[i] for i in t) for n in ('skin', 'skin_penile', 'skin_scrotal') for v, ts in [male[n]] for t in ts if all(abs(v[i][0]) < 20 for i in t)]
def cast(o, d):  # nearest hit distance along d (Moller-Trumbore), or None
    best = None
    for a, b, c in skin:
        e1, e2 = sub(b, a), sub(c, a); h = cross(d, e2); det = dot(e1, h)
        if abs(det) < 1e-9: continue
        f = 1 / det; s_ = sub(o, a); u = f * dot(s_, h)
        if u < 0 or u > 1: continue
        q = cross(s_, e1); w = f * dot(d, q)
        if w < 0 or u + w > 1: continue
        t = f * dot(e2, q)
        if t > 0.5 and (best is None or t < best): best = t
    return best
pro, sph, sv = mbox('prostate'), mbox('anal_sphincter'), mbox('seminal_vesicles')
anus = (0.0, (sph[0][1] + sph[1][1]) / 2, sph[0][2])
def on_skin(y):  # first skin hit going down from inside the pelvis
    return (0.0, y, pro[0][2] - cast((0.0, y, pro[0][2]), (0, 0, -1)))
introitus = on_skin(anus[1] - 30)  # centre of the opening, 3 cm in front of the anus, at the front of the perineum
S = 60 / (max(p[0] for p in meshes['vulva'][0]) - min(p[0] for p in meshes['vulva'][0]))  # vulva 6 cm wide
OUTER = 0.25  # the vulva's outer surface lies this far (vulva units) below its opening
opening = (0.0, introitus[1], introitus[2] + OUTER * S)

# canal: midway between the rectum's front wall and the prostate / vesicles' back wall, up to the rectovesical pouch
def wall(names, z, front):
    ys = [p[1] for n in names for p in male[n][0] if abs(p[0]) < 12 and abs(p[2] - z) < 5]
    return (min(ys) if front else max(ys)) if ys else None
mids = []
for z in range(round(introitus[2]) + 20, round(sv[1][2]) + 1, 4):
    r_, a_ = wall(['rectum', 'anal_sphincter'], z, True), wall(['prostate', 'seminal_vesicles', 'bladder'], z, False)
    if r_ is not None and a_ is not None: mids.append((z, (r_ + a_) / 2))
# least-squares line y(z) through the midpoints (the walls are bumpy), from the opening to 3 cm above the vesicles (~11 cm deep)
mz = sum(z for z, _ in mids) / len(mids); my = sum(y for _, y in mids) / len(mids)
slope = sum((z - mz) * (y - my) for z, y in mids) / sum((z - mz) ** 2 for z, _ in mids)
top = sv[1][2] + 30
canal = [opening] + [(0.0, my + slope * (z - mz), z) for z in (opening[2] + 35 + (top - opening[2] - 35) * k / 3 for k in range(4))]
arc = [0.0]
for a, b in zip(canal, canal[1:]): arc.append(arc[-1] + math.dist(a, b))
L = arc[-1]
def along(t):  # point and tangent at arc fraction t of the canal
    d = min(max(t, 0), 1) * L
    k = max(i for i in range(len(arc) - 1) if arc[i] <= d) if d < L else len(arc) - 2
    a, b = canal[k], canal[k + 1]; u = (d - arc[k]) / (arc[k + 1] - arc[k]); tg = norm(sub(b, a))
    return tuple(a[i] + (b[i] - a[i]) * u for i in range(3)), tg

# vagina along the canal: each vertex keeps its position along the female centreline and its cross-section offset
cl = centerline; clen = [0.0]
for a, b in zip(cl, cl[1:]): clen.append(clen[-1] + math.dist(a, b))
vv, vt = meshes['vagina']
def local(p):  # position along the female centreline (0..1) and cross-section offsets (lateral, anterior)
    best = None
    for k in range(len(cl) - 1):
        a, b = cl[k], cl[k + 1]; ab = sub(b, a); u = max(0, min(1, dot(sub(p, a), ab) / dot(ab, ab)))
        q = tuple(a[i] + ab[i] * u for i in range(3)); d = math.dist(p, q)
        if best is None or d < best[0]: best = (d, k, u, q, norm(ab))
    _, k, u, q, tg = best
    off = sub(p, q)
    return (clen[k] + u * (clen[k + 1] - clen[k])) / clen[-1], off[0], off[2] * tg[1] - off[1] * tg[2]
loc = [local(p) for p in vv]
# the MRI vagina is collapsed (flat): open its cross-section to a neovagina ~3.5 cm wide and ~2.5 cm deep
def spread(vals):  # 5th-95th percentile width: the ends of the segmentation have a few far outliers
    v = sorted(vals); return v[len(v) * 95 // 100] - v[len(v) * 5 // 100]
used = {i for tri in vt for i in tri}  # the vertex list still holds the cut-away uterus and tubes
wl, wa = spread([loc[i][1] for i in used]), spread([loc[i][2] for i in used])
def vag(l):
    t, lat, ant = l
    pt, mt = along(t)
    n = (0.0, -mt[2], mt[1])  # sagittal normal of the canal, pointing anterior (-y)
    if n[1] > 0: n = (0.0, -n[1], -n[2])
    return (pt[0] + lat * 35 / wl, pt[1] + n[1] * ant * 25 / wa, pt[2] + n[2] * ant * 25 / wa)
meshes['vagina'] = ([vag(l) for l in loc], vt)

# vulva: rigid, outer surface on the skin, front tilted up by TILT (female up/ant -> male +z / -y)
TILT = math.radians(27)
def place(p):
    ant = p[2] * math.cos(TILT) - p[1] * math.sin(TILT); up = p[1] * math.cos(TILT) + p[2] * math.sin(TILT)
    return (opening[0] + p[0] * S, opening[1] - ant * S, opening[2] + up * S)
meshes['vulva'] = ([place(p) for p in meshes['vulva'][0]], meshes['vulva'][1])
meatus = place((0, 0.1, 0.55))

# minimal glTF 2.0 binary writer (same layout as build-anatomy.py)
bin_ = bytearray(); views, accessors, gm, nodes = [], [], [], []
def view(data, target):
    while len(bin_) % 4: bin_.append(0)
    views.append({'buffer': 0, 'byteOffset': len(bin_), 'byteLength': len(data), 'target': target}); bin_.extend(data); return len(views) - 1
stats = {}
for name, (v, t) in meshes.items():
    v = [tuple(round(c, 2) for c in p) for p in v]
    used = sorted({i for tri in t for i in tri}); remap = {o: n for n, o in enumerate(used)}
    v = [v[i] for i in used]; t = [(remap[a], remap[b], remap[c]) for a, b, c in t]
    pa = len(accessors); accessors.append({'bufferView': view(struct.pack(f'<{len(v) * 3}f', *[c for p in v for c in p]), 34962), 'componentType': 5126, 'count': len(v), 'type': 'VEC3',
        'min': [min(p[i] for p in v) for i in range(3)], 'max': [max(p[i] for p in v) for i in range(3)]})
    ia = len(accessors); accessors.append({'bufferView': view(struct.pack(f'<{len(t) * 3}I', *[i for tri in t for i in tri]), 34963), 'componentType': 5125, 'count': len(t) * 3, 'type': 'SCALAR'})
    gm.append({'name': name, 'primitives': [{'attributes': {'POSITION': pa}, 'indices': ia}]}); nodes.append({'name': name, 'mesh': len(gm) - 1}); stats[name] = len(t)
gltf = {'asset': {'version': '2.0', 'generator': 'build-female-anatomy.py', 'copyright': '"Pelvic Organs from MRI" by audreybyrd (Sketchfab), CC BY 4.0'},
        'scene': 0, 'scenes': [{'nodes': list(range(len(nodes))), 'extras': {'canal': [[round(c, 1) for c in p] for p in canal], 'meatus': [round(c, 1) for c in meatus]}}], 'nodes': nodes, 'meshes': gm, 'accessors': accessors, 'bufferViews': views, 'buffers': [{'byteLength': len(bin_)}]}
js = json.dumps(gltf, separators=(',', ':')).encode(); js += b' ' * (-len(js) % 4); bin_ += b'\0' * (-len(bin_) % 4)
glb = struct.pack('<III', 0x46546C67, 2, 28 + len(js) + len(bin_)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(bin_), 0x004E4942) + bytes(bin_)
os.makedirs(os.path.dirname(OUT), exist_ok=True); open(OUT, 'wb').write(glb)
print(f'{OUT}: {len(glb) // 1024} KB, triangles {stats}, canal {L:.0f} mm {[[round(c) for c in p] for p in canal]}, slope {slope:.2f}, vulva {S:.1f} mm/unit, opening {[round(c) for c in opening]}, meatus {[round(c) for c in meatus]}')
