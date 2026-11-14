"""Build 82.3 (Kunal, 12 Nov 2026): "when background is dark, the Frequent Research round circle should be
transparent, not white". The emblem's globe is filled with flat white between its grid lines; on dark backgrounds
that reads as a white disc. This makes night versions of the emblem base (fr-f-base-dk, fr-i-base-dk) where only
that flat white globe filling is transparent (with a soft edge). The grid lines, nodes, the silver R/F, the swooshes
and every colour stay exactly as in the original; the day versions are not touched.
A filling area = a large flat white region inside the globe circle that is not part of the silver letters (their
shine is graded, never flat white over a large area). Run from frontend/: python3 tools/brand82/globe_clear.py
Writes a check image to tools/brand82/check-<name>.png."""
from PIL import Image, ImageFilter
import numpy as np, os
from collections import deque

SRC = 'src/assets/images/brand13'
HERE = os.path.dirname(os.path.abspath(__file__))
N4 = ((1, 0), (-1, 0), (0, 1), (0, -1))
JOBS = {'fr-f-base': 500, 'fr-i-base': 500}


def comps(mask):
    H, W = mask.shape
    seen = np.zeros_like(mask, bool)
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


def run(name, minsize):
    im = Image.open(os.path.join(SRC, name + '.webp')).convert('RGBA')
    a = np.asarray(im).astype(np.int16)
    rgb, al = a[..., :3], a[..., 3]
    lo, hi = rgb.min(-1), rgb.max(-1)
    flat = (lo > 228) & (al > 200) & ((hi - lo) < 14)
    # local flatness: neighbours must be white too (silver shine is a gradient)
    clear = np.zeros(flat.shape, bool)
    for px in comps(flat):
        if len(px) < minsize:
            continue
        ys = np.array([p[0] for p in px]); xs = np.array([p[1] for p in px])
        v = a[ys, xs, :3].min(-1)
        if v.std() > 6:  # graded = metal shine, keep
            continue
        clear[ys, xs] = True
    # soft edge: grow a little and feather, so anti-aliased white fringes go too
    m = Image.fromarray((clear * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    mk = np.asarray(m).astype(np.float32) / 255
    whiteness = np.clip((lo.astype(np.float32) - 170) / 70, 0, 1)  # only whitish pixels fade
    out = a.copy().astype(np.float32)
    out[..., 3] = al * (1 - mk * whiteness)
    res = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), 'RGBA')
    res.save(os.path.join(SRC, name + '-dk.webp'), 'WEBP', lossless=True, quality=100, method=6)
    chk = Image.new('RGBA', res.size, (11, 20, 80, 255)); chk.alpha_composite(res)
    chk.save(os.path.join(HERE, 'check-' + name + '.png'))
    print(name, 'cleared px', int(clear.sum()))


for n, s in JOBS.items():
    run(n, s)
