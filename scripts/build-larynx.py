"""Build static/anatomy/larynx.glb from BodyParts3D (CC BY 4.0), for tracheal shave and glottoplasty.

Same download as build-anatomy.py. Parts (mm, +z up, -y anterior):
- thyroid / thyroid_prominence: the thyroid cartilage, with its anterior-superior angle (the "Adam's apple")
  split off: what a tracheal shave removes. The cut stays above the insertion of the vocal folds.
- vocal_folds / vocal_front: the vocal ligaments, with their anterior third split off (what a Wendler
  glottoplasty joins together to shorten the vibrating folds); glottic_web: the membrane that closes them.
- cricoid, arytenoids, epiglottis, hyoid, trachea, mandible, vertebrae, neck (skin).

Usage: python3 scripts/build-larynx.py <dir> static/anatomy/larynx.glb
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from anatomy_glb import bodyparts, cluster, write_glb

SRC, OUT = sys.argv[1], sys.argv[2]
read = bodyparts(SRC)
centroid = lambda v, t: [sum(v[i][k] for i in t) / 3 for k in range(3)]

meshes = {}
for name, organ, cell in (('cricoid', 'cricoid cartilage', 0.8), ('arytenoids', 'arytenoid cartilage', 0.6), ('epiglottis', 'epiglottis', 0.8),
                          ('hyoid', 'hyoid bone', 0.8), ('trachea', 'trachea', 1.2), ('mandible', 'mandible', 2.0)):
    meshes[name] = cluster(*read(organ), cell)
vert = ([], [])
for organ in ('third cervical vertebra', 'fourth cervical vertebra', 'fifth cervical vertebra', 'sixth cervical vertebra'):
    v, t = cluster(*read(organ), 1.5); b = len(vert[0]); vert[0].extend(v); vert[1].extend((a + b, c + b, d + b) for a, c, d in t)
meshes['vertebrae'] = vert

# vocal folds: anterior end at the thyroid cartilage (anterior commissure), posterior end at the arytenoids
fv, ft = cluster(*read('vocal ligament'), 0.4)
y_front, y_back = min(p[1] for p in fv), max(p[1] for p in fv)
front = lambda t: centroid(fv, t)[1] < y_front + (y_back - y_front) / 3
meshes['vocal_folds'] = (fv, [t for t in ft if not front(t)])
meshes['vocal_front'] = (fv, [t for t in ft if front(t)])
z_folds = max(p[2] for p in fv)
# the web a glottoplasty creates: it closes the V between the two folds from the front up to one third
used = [fv[i] for t in ft for i in t]
mean = lambda ps: tuple(sum(p[k] for p in ps) / len(ps) for k in range(3))
tip = mean([p for p in used if p[1] < y_front + 1])
third = y_front + (y_back - y_front) / 3
left, right = mean([p for p in used if p[0] < 0 and abs(p[1] - third) < 0.8]), mean([p for p in used if p[0] > 0 and abs(p[1] - third) < 0.8])
meshes['glottic_web'] = ([tip, left, right], [(0, 1, 2)])

# thyroid prominence: the front of the cartilage at the midline, from 3 mm above the vocal folds to the notch
tv, tt = cluster(*read('thyroid cartilage'), 0.6)
y_ant = min(p[1] for p in tv)
prominence = lambda t: (lambda c: abs(c[0]) < 14 and c[2] > z_folds + 3 and c[1] < y_ant + 7)(centroid(tv, t))
meshes['thyroid'] = (tv, [t for t in tt if not prominence(t)])
meshes['thyroid_prominence'] = (tv, [t for t in tt if prominence(t)])

# translucent neck: the skin around the larynx, from under the chin to the collarbones
sv, st = read('skin')
lo, hi = (-80, -200, 1320), (80, 20, 1500)
st = [t for t in st if all(lo[k] <= sv[i][k] <= hi[k] for i in t for k in range(3))]
meshes['neck'] = cluster(sv, st, 5)

write_glb(OUT, meshes, 'build-larynx.py', 'BodyParts3D, (c) The Database Center for Life Science, CC BY 4.0')
print(f'vocal folds {y_back - y_front:.1f} mm long at z {z_folds:.0f}; prominence from z {z_folds + 3:.0f}, front {y_ant:.0f}')
