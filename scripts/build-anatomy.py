"""Build static/anatomy/pelvis-male.glb from BodyParts3D (CC BY 4.0).

BodyParts3D, (c) The Database Center for Life Science, licensed under CC Attribution 4.0 International.
Download isa_parts_list_e.txt, isa_element_parts.txt and isa_BP3D_4.0_obj_99.zip from
https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/ and unzip the OBJ files into <dir>/obj.

Usage: python3 scripts/build-anatomy.py <dir> static/anatomy/pelvis-male.glb
One node per structure (named below); the body skin is cropped to the genital/perineal region.
"""
import collections, glob, json, os, struct, sys

SRC, OUT = sys.argv[1], sys.argv[2]
PARTS = {  # node name -> BodyParts3D (isa) organ name
    'bladder': 'urinary bladder', 'prostate': 'prostate', 'urethra': 'urethra', 'rectum': 'rectum',
    'seminal_vesicles': 'seminal vesicle', 'anal_sphincter': 'external anal sphincter',
    'sacrum': 'sacrum', 'hip_right': 'right hip bone', 'hip_left': 'left hip bone',
    'corpora_cavernosa': 'corpus cavernosum of penis', 'corpus_spongiosum': 'corpus spongiosum of penis',
    'glans': 'glans penis', 'testes': 'testis', 'epididymides': 'epididymis',
    'dorsal_artery': 'dorsal artery of penis', 'dorsal_vein': 'deep dorsal vein of penis', 'skin': 'skin',
}

def table(name, key, val):
    out = collections.defaultdict(list)
    for line in open(os.path.join(SRC, name), encoding='utf-8', errors='ignore').read().splitlines()[1:]:
        p = line.split('\t')
        if len(p) >= 3: out[p[key].strip()].append(p[val].strip())
    return out

fma_by_name = {k: v[0] for k, v in table('isa_parts_list_e.txt', 2, 0).items()}
elements = table('isa_element_parts.txt', 0, 2)
files = {os.path.basename(f)[:-4]: f for f in glob.glob(os.path.join(SRC, 'obj', '**', '*.obj'), recursive=True)}

def read_obj(path):
    v, f = [], []
    for line in open(path):
        if line.startswith('v '): v.append(tuple(map(float, line.split()[1:4])))
        elif line.startswith('f '):
            idx = [int(t.split('/')[0]) - 1 for t in line.split()[1:]]
            f += [(idx[0], idx[i], idx[i + 1]) for i in range(1, len(idx) - 1)]
    return v, f

meshes = {}
for node, organ in PARTS.items():
    verts, tris = [], []
    for el in elements[fma_by_name[organ]]:
        v, f = read_obj(files[el]); base = len(verts)
        verts += v; tris += [(a + base, b + base, c + base) for a, b, c in f]
    meshes[node] = (verts, tris)

# crop the whole-body skin to a box around the genitals and perineum
gv = [p for n in ('corpora_cavernosa', 'glans', 'testes', 'anal_sphincter', 'prostate') for p in meshes[n][0]]
lo = [min(p[i] for p in gv) for i in range(3)]; hi = [max(p[i] for p in gv) for i in range(3)]
pad = [40, 40, 30]
inside = lambda p: all(lo[i] - pad[i] <= p[i] <= hi[i] + pad[i] for i in range(3))
sv, st = meshes['skin']
meshes['body_full'] = (sv, st)
st = [t for t in st if all(inside(sv[i]) for i in t)]

# split the cropped skin: penile (around shaft + glans), scrotal (around the testes), the rest (perineum)
def box(names, grow):
    pts = [p for n in names for p in meshes[n][0]]
    return [min(p[i] for p in pts) - grow for i in range(3)], [max(p[i] for p in pts) + grow for i in range(3)]
def within(b, p): return all(b[0][i] <= p[i] <= b[1][i] for i in range(3))
centroid = lambda t: tuple(sum(sv[i][k] for i in t) / 3 for k in range(3))
scrotal_box = box(['testes', 'epididymides'], 14)
penile_box = box(['corpora_cavernosa', 'glans', 'corpus_spongiosum'], 7)
groups = {'skin_scrotal': [], 'skin_penile': [], 'skin': []}
for t in st:
    c = centroid(t)
    groups['skin_scrotal' if within(scrotal_box, c) else 'skin_penile' if within(penile_box, c) else 'skin'].append(t)
for k, v in groups.items(): meshes[k] = (sv, v)

# translucent whole-body silhouette: the full skin, decimated by vertex clustering on an 18 mm grid
def cluster(verts, tris, cell):
    key = lambda p: (round(p[0] / cell), round(p[1] / cell), round(p[2] / cell))
    ids, acc, out = {}, [], set()
    for p in verts:
        k = key(p)
        if k not in ids: ids[k] = len(acc); acc.append([0.0, 0.0, 0.0, 0])
        a = acc[ids[k]]; a[0] += p[0]; a[1] += p[1]; a[2] += p[2]; a[3] += 1
    vmap = [ids[key(p)] for p in verts]
    for t in tris:
        a, b, c = vmap[t[0]], vmap[t[1]], vmap[t[2]]
        if a != b and b != c and a != c: out.add((a, b, c))
    return [(x / n, y / n, z / n) for x, y, z, n in acc], sorted(out)
bv, bt = cluster(sv, meshes['body_full'][1], 18)
del meshes['body_full']

# Split the external male genitals off the silhouette. The legs are cut like an anatomical pelvis model: just
# under the perineum, and in front of it along the underside of the vulva that replaces the genitals (from the
# opening on the perineum to the commissure under the pubis, as in build-female-anatomy.py). From step 7 the
# outline of the body then ends on the vulva; before that, the part between the two cuts stays with the genitals.
def in_genitals(t):
    c = [sum(bv[i][k] for i in t) / 3 for k in range(3)]
    return abs(c[0]) < 48 and c[1] < -112 and 655 < c[2] < 770
sph = meshes['anal_sphincter'][0]
leg_cut = min(p[2] for p in sph) - 25
anus_y = (min(p[1] for p in sph) + max(p[1] for p in sph)) / 2
y_open = anus_y - 38  # vaginal opening, 3.8 cm in front of the anus and 1 cm under the perineal skin
z_open = max(p[2] for p in sv if abs(p[0]) < 4 and abs(p[1] - (anus_y - 30)) < 4 and p[2] < min(q[2] for q in meshes['prostate'][0])) - 10
pub = [p for n in ('hip_left', 'hip_right') for p in meshes[n][0] if abs(p[0]) < 10]
y_com, z_com = min(p[1] for p in pub) - 25, min(p[2] for p in pub) - 5  # front commissure, 2.5 cm in front of the symphysis
def cut(y):  # height of the female outline at y (3 mm under the vulva, so it stays outside)
    if y >= y_open: return leg_cut
    return max(leg_cut, z_open - 3 + (y - y_open) * (z_com - z_open) / (y_com - y_open))
genital, rest = [], []
for t in bt:
    c = [sum(bv[i][k] for i in t) / 3 for k in range(3)]
    if c[2] < leg_cut and not in_genitals(t): continue
    # by corner, not centre: the 18 mm triangles would otherwise leave teeth hanging under the vulva
    hangs = any(bv[i][2] < cut(bv[i][1]) - 4 for i in t)
    (genital if in_genitals(t) or hangs else rest).append(t)
meshes['body'] = (bv, rest)
meshes['body_genital'] = (bv, genital)
print('silhouette genital tris', len(genital), 'opening', round(y_open), round(z_open), 'commissure', round(y_com), round(z_com))

def compact(verts, tris):
    used = sorted({i for t in tris for i in t}); remap = {o: n for n, o in enumerate(used)}
    return [verts[i] for i in used], [(remap[a], remap[b], remap[c]) for a, b, c in tris]

# --- minimal glTF 2.0 binary writer: positions + indices, one mesh/node per part
bin_ = bytearray(); views, accessors, gmeshes, nodes = [], [], [], []
def add_view(data, target):
    while len(bin_) % 4: bin_.append(0)
    views.append({'buffer': 0, 'byteOffset': len(bin_), 'byteLength': len(data), 'target': target}); bin_.extend(data)
    return len(views) - 1
stats = {}
for node, (v, t) in meshes.items():
    v, t = compact(v, t)
    if not t: continue
    pos = struct.pack(f'<{len(v) * 3}f', *[c for p in v for c in p])
    idx = struct.pack(f'<{len(t) * 3}I', *[i for tri in t for i in tri])
    pa = len(accessors); accessors.append({'bufferView': add_view(pos, 34962), 'componentType': 5126, 'count': len(v), 'type': 'VEC3',
        'min': [min(p[i] for p in v) for i in range(3)], 'max': [max(p[i] for p in v) for i in range(3)]})
    ia = len(accessors); accessors.append({'bufferView': add_view(idx, 34963), 'componentType': 5125, 'count': len(t) * 3, 'type': 'SCALAR'})
    gmeshes.append({'name': node, 'primitives': [{'attributes': {'POSITION': pa}, 'indices': ia}]})
    nodes.append({'name': node, 'mesh': len(gmeshes) - 1}); stats[node] = len(t)
gltf = {'asset': {'version': '2.0', 'generator': 'build-anatomy.py', 'copyright': 'BodyParts3D, (c) The Database Center for Life Science, CC BY 4.0'},
        'scene': 0, 'scenes': [{'nodes': list(range(len(nodes)))}], 'nodes': nodes, 'meshes': gmeshes,
        'accessors': accessors, 'bufferViews': views, 'buffers': [{'byteLength': len(bin_)}]}
js = json.dumps(gltf, separators=(',', ':')).encode()
js += b' ' * (-len(js) % 4); bin_ += b'\0' * (-len(bin_) % 4)
glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bin_)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(bin_), 0x004E4942) + bytes(bin_)
os.makedirs(os.path.dirname(OUT), exist_ok=True); open(OUT, 'wb').write(glb)
print(f'{OUT}: {len(glb) // 1024} KB, triangles per part: {stats}')
print('bbox of genitals (mm):', [round(x) for x in lo], [round(x) for x in hi])
