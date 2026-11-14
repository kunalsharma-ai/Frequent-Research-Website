"""Build 81.2 (Kunal, 12 Nov 2026): his original logo, unchanged, except that the white filling inside the letters'
holes (the bowl of R, the inside of Q, the small letters of the Fieldwork line) is made transparent, so the background
shows through as it should. Colours, shapes and every other pixel stay exactly as in the original.
A hole = a large flat white area completely surrounded by the letter, found on the light-theme image; the dark-theme
image uses the same holes (same letter shapes), so the white letters of the dark version are never touched.
Run from frontend/: python3 tools/brand81/clear_counters.py  (then python3 tools/brand26/make_logo26.py)
Originals are kept beside this script as *.orig.webp the first time it runs."""
from PIL import Image
import numpy as np, os, shutil
from collections import deque
SRC = 'src/assets/images/brand13'
HERE = os.path.dirname(os.path.abspath(__file__))
NAMES = ['fr-f-t1', 'fr-f-t2', 'fr-f-t6']
MIN = {'fr-f-t1': 300, 'fr-f-t2': 300, 'fr-f-t6': 60}  # smallest hole (pixels); smaller white spots are chrome shine
N4 = ((1, 0), (-1, 0), (0, 1), (0, -1))

def comps(mask):
    H, W = mask.shape; seen = np.zeros_like(mask, bool)
    for y in range(H):
        for x in range(W):
            if mask[y, x] and not seen[y, x]:
                q = deque([(y, x)]); seen[y, x] = True; px = []
                while q:
                    cy, cx = q.popleft(); px.append((cy, cx))
                    for dy, dx in N4:
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not seen[ny, nx]:
                            seen[ny, nx] = True; q.append((ny, nx))
                yield px

def light_of(a):
    return a[..., :3].min(-1)

def holes(a, minsize):
    H, W = a.shape[:2]; rgb = a[..., :3]; al = a[..., 3]; light = light_of(a)
    white = (light > 200) & (al > 200) & ((rgb.max(-1) - light) < 40)
    clear = np.zeros((H, W), bool); count = 0
    for px in comps(white):
        if len(px) < minsize: continue
        enclosed = True
        for y, x in px:
            for dy, dx in N4:
                ny, nx = y + dy, x + dx
                if not (0 <= ny < H and 0 <= nx < W) or al[ny, nx] < 120:
                    enclosed = False; break
            if not enclosed: break
        if enclosed:
            count += 1
            for y, x in px: clear[y, x] = True
    return clear, count

def apply(a, clear):
    light = light_of(a)
    clear = clear & (light > 170)          # only where this image is light there too
    rim = clear.copy()
    for _ in range(2):
        g = rim.copy()
        g[1:, :] |= rim[:-1, :]; g[:-1, :] |= rim[1:, :]; g[:, 1:] |= rim[:, :-1]; g[:, :-1] |= rim[:, 1:]
        rim = g
    rim &= ~clear
    out = a.copy()
    out[clear, 3] = 0
    f = np.clip((light - 150) / 80.0, 0, 1)
    out[rim, 3] = (out[rim, 3] * (1 - f[rim])).astype(np.int32)
    return out

for n in NAMES:
    a = {}
    for v in ('', '-dk'):
        p = os.path.join(SRC, n + v + '.webp'); keep = os.path.join(HERE, n + v + '.orig.webp')
        if not os.path.exists(keep): shutil.copy(p, keep)
        a[v] = np.array(Image.open(keep).convert('RGBA')).astype(np.int32)
    clear, count = holes(a[''], MIN[n])
    for v in ('', '-dk'):
        Image.fromarray(apply(a[v], clear).astype(np.uint8), 'RGBA').save(os.path.join(SRC, n + v + '.webp'), 'WEBP', quality=95, method=6)
    print(n, 'holes cleared:', count)
