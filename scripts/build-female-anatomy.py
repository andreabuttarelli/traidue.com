"""Build static/anatomy/vulva-female.glb (vulva, vagina, bladder, rectum) from "Pelvic Organs from MRI".

"Pelvic Organs from MRI" (https://sketchfab.com/3d-models/pelvic-organs-from-mri-2610b30793ed47a5baa18b2994bdee6b)
by audreybyrd, licensed under CC BY 4.0: MRI of a 25-year-old woman, Oklahoma State University, 2022.
Download it from Sketchfab as glTF and pass the folder holding scene.gltf + scene.bin.

The viewer shows these organs as the reference anatomy of the result, in their own proportions (all from
the same person). The output keeps the source's anatomical axes (+Y up, +Z anterior, +X lateral), with the
origin at the centre of the vaginal opening and the anus-to-opening distance as unit; the vagina's centreline
is stored in scene extras ("centerline") for the packing, and the bladder is kept for the catheter.
Uterus, cervix, tubes and ovaries are left out (a neovagina has none of them), and so is the skin behind
the perineal body (around the anus and the gluteal cleft), which is not vulva.

Usage: python3 scripts/build-female-anatomy.py <dir with scene.gltf> static/anatomy/vulva-female.glb
"""
import json, os, struct, sys

SRC, OUT = sys.argv[1], sys.argv[2]
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
bladder = groups['bladder']
rectum = (groups['rectum'][0], [t for t in groups['rectum'][1] if all(groups['rectum'][0][i][1] < 0 for i in t)])  # low rectum only
for name, (v, t) in (('vulva', vulva), ('vagina', vagina), ('bladder', bladder), ('rectum', rectum)):
    fv = [to_frame(p) for p in v]
    meshes[name] = cluster(fv, t, 0.1)  # ~10% of the anus-opening distance (~3 mm)

# minimal glTF 2.0 binary writer (same layout as build-anatomy.py)
bin_ = bytearray(); views, accessors, gm, nodes = [], [], [], []
def view(data, target):
    while len(bin_) % 4: bin_.append(0)
    views.append({'buffer': 0, 'byteOffset': len(bin_), 'byteLength': len(data), 'target': target}); bin_.extend(data); return len(views) - 1
stats = {}
for name, (v, t) in meshes.items():
    used = sorted({i for tri in t for i in tri}); remap = {o: n for n, o in enumerate(used)}
    v = [v[i] for i in used]; t = [(remap[a], remap[b], remap[c]) for a, b, c in t]
    pa = len(accessors); accessors.append({'bufferView': view(struct.pack(f'<{len(v) * 3}f', *[c for p in v for c in p]), 34962), 'componentType': 5126, 'count': len(v), 'type': 'VEC3',
        'min': [min(p[i] for p in v) for i in range(3)], 'max': [max(p[i] for p in v) for i in range(3)]})
    ia = len(accessors); accessors.append({'bufferView': view(struct.pack(f'<{len(t) * 3}I', *[i for tri in t for i in tri]), 34963), 'componentType': 5125, 'count': len(t) * 3, 'type': 'SCALAR'})
    gm.append({'name': name, 'primitives': [{'attributes': {'POSITION': pa}, 'indices': ia}]}); nodes.append({'name': name, 'mesh': len(gm) - 1}); stats[name] = len(t)
gltf = {'asset': {'version': '2.0', 'generator': 'build-female-anatomy.py', 'copyright': '"Pelvic Organs from MRI" by audreybyrd (Sketchfab), CC BY 4.0'},
        'scene': 0, 'scenes': [{'nodes': list(range(len(nodes))), 'extras': {'centerline': [[round(c, 4) for c in p] for p in centerline]}}], 'nodes': nodes, 'meshes': gm, 'accessors': accessors, 'bufferViews': views, 'buffers': [{'byteLength': len(bin_)}]}
js = json.dumps(gltf, separators=(',', ':')).encode(); js += b' ' * (-len(js) % 4); bin_ += b'\0' * (-len(bin_) % 4)
glb = struct.pack('<III', 0x46546C67, 2, 28 + len(js) + len(bin_)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(bin_), 0x004E4942) + bytes(bin_)
os.makedirs(os.path.dirname(OUT), exist_ok=True); open(OUT, 'wb').write(glb)
print(f'{OUT}: {len(glb) // 1024} KB, triangles {stats}, unit (anus-opening) {unit:.4f}, vagina length {sum((centerline[-1][i] - centerline[0][i]) ** 2 for i in range(3)) ** 0.5:.2f} units')
