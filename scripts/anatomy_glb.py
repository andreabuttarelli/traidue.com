"""Shared helpers for the anatomy build scripts: read BodyParts3D organs, decimate, write a minimal GLB.

BodyParts3D, (c) The Database Center for Life Science, CC BY 4.0. Coordinates are mm, +z up, -y anterior.
"""
import collections, glob, json, os, struct


def bodyparts(src):
    """Return read(organ name) -> (vertices, triangles) for a BodyParts3D download in src (see build-anatomy.py)."""
    def table(name, key, val):
        out = collections.defaultdict(list)
        for line in open(os.path.join(src, name), encoding='utf-8', errors='ignore').read().splitlines()[1:]:
            p = line.split('\t')
            if len(p) >= 3: out[p[key].strip()].append(p[val].strip())
        return out
    fma = {k: v[0] for k, v in table('isa_parts_list_e.txt', 2, 0).items()}
    elements = table('isa_element_parts.txt', 0, 2)
    files = {os.path.basename(f)[:-4]: f for f in glob.glob(os.path.join(src, 'obj', '**', '*.obj'), recursive=True)}

    def read(organ):
        verts, tris = [], []
        for el in elements[fma[organ]]:
            base = len(verts)
            for line in open(files[el]):
                if line.startswith('v '): verts.append(tuple(map(float, line.split()[1:4])))
                elif line.startswith('f '):
                    idx = [int(t.split('/')[0]) - 1 + base for t in line.split()[1:]]
                    tris += [(idx[0], idx[i], idx[i + 1]) for i in range(1, len(idx) - 1)]
        return verts, tris
    return read


def cluster(verts, tris, cell):
    """Vertex clustering on a grid of `cell` mm: fewer triangles, same shape at a distance."""
    key = lambda p: (round(p[0] / cell), round(p[1] / cell), round(p[2] / cell))
    ids, acc, out = {}, [], set()
    for p in verts:
        k = key(p)
        if k not in ids: ids[k] = len(acc); acc.append([0.0, 0.0, 0.0, 0])
        a = acc[ids[k]]; a[0] += p[0]; a[1] += p[1]; a[2] += p[2]; a[3] += 1
    vmap = [ids[key(p)] for p in verts]
    for t in tris:
        a, b, c = vmap[t[0]], vmap[t[1]], vmap[t[2]]
        if len({a, b, c}) == 3: out.add((a, b, c))
    return [(x / n, y / n, z / n) for x, y, z, n in acc], sorted(out)


def write_glb(path, meshes, generator, copyright, extras=None):
    """meshes: {node name: (vertices, triangles)}; unused vertices are dropped. Returns triangles per mesh."""
    bin_ = bytearray(); views, accessors, gm, nodes, stats = [], [], [], [], {}
    def view(data, target):
        while len(bin_) % 4: bin_.append(0)
        views.append({'buffer': 0, 'byteOffset': len(bin_), 'byteLength': len(data), 'target': target}); bin_.extend(data)
        return len(views) - 1
    for name, (v, t) in meshes.items():
        used = sorted({i for tri in t for i in tri})
        if not used: continue
        remap = {o: n for n, o in enumerate(used)}
        v = [tuple(round(c, 2) for c in v[i]) for i in used]; t = [(remap[a], remap[b], remap[c]) for a, b, c in t]
        pa = len(accessors); accessors.append({'bufferView': view(struct.pack(f'<{len(v) * 3}f', *[c for p in v for c in p]), 34962), 'componentType': 5126,
            'count': len(v), 'type': 'VEC3', 'min': [min(p[i] for p in v) for i in range(3)], 'max': [max(p[i] for p in v) for i in range(3)]})
        ia = len(accessors); accessors.append({'bufferView': view(struct.pack(f'<{len(t) * 3}I', *[i for tri in t for i in tri]), 34963), 'componentType': 5125, 'count': len(t) * 3, 'type': 'SCALAR'})
        gm.append({'name': name, 'primitives': [{'attributes': {'POSITION': pa}, 'indices': ia}]}); nodes.append({'name': name, 'mesh': len(gm) - 1}); stats[name] = len(t)
    scene = {'nodes': list(range(len(nodes)))}
    if extras: scene['extras'] = extras
    gltf = {'asset': {'version': '2.0', 'generator': generator, 'copyright': copyright}, 'scene': 0, 'scenes': [scene],
            'nodes': nodes, 'meshes': gm, 'accessors': accessors, 'bufferViews': views, 'buffers': [{'byteLength': len(bin_)}]}
    js = json.dumps(gltf, separators=(',', ':')).encode(); js += b' ' * (-len(js) % 4); bin_ += b'\0' * (-len(bin_) % 4)
    glb = struct.pack('<III', 0x46546C67, 2, 28 + len(js) + len(bin_)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(bin_), 0x004E4942) + bytes(bin_)
    os.makedirs(os.path.dirname(path), exist_ok=True); open(path, 'wb').write(glb)
    print(f'{path}: {len(glb) // 1024} KB, triangles {stats}')
    return stats
