"""Build 65 update 26: the Frequent Research logo without the tagline, quality line and ISO lines (Kunal, 5 Nov 2026).
Composes the still images of the two new layouts from the animated layer images in src/assets/images/brand13/.
Layouts (artwork pixels, same numbers as FRL_FULL26 / FRL_HEAD26 in src/components/site/Logos13.jsx):
  full: emblem + FREQUENT / RESEARCH + "Fieldwork Solutions Private Limited"  (footer and large copies)
  head: emblem + FREQUENT / RESEARCH, larger wordmark                          (menu bar)
Run from the repo root: python3 tools/brand26/make_logo26.py"""
from PIL import Image
import os
SRC = 'src/assets/images/brand13'
OUT = 'src/assets/images/brand26'
H = 634
# emblem layers keep their positions from the original 1486 x 797 artwork (x, y in artwork pixels)
EMBLEM = [('fr-f-base', 4.0, 4.0, 582, 625), ('fr-f-swa', 45.0, 5.0, 431, 299), ('fr-f-swb', 436.0, 434.0, 136, 131),
          ('fr-f-f', 33.0, 173.0, 340, 394)]
DIV = ('fr-f-div', 611.0, 50.0, 8, 534)
LAYOUTS = {
    'full': dict(W=1697, text=[('fr-f-t1', 672, 108, 1.25), ('fr-f-t2', 668, 295, 1.25), ('fr-f-t6', 669, 469, 1.25)]),
    'head': dict(W=1899, text=[('fr-f-t1', 672, 132, 1.5), ('fr-f-t2', 668, 357, 1.5)]),
}
DARK = {'fr-f-t1', 'fr-f-t2', 'fr-f-t6', 'fr-f-div', 'fr-f-swa', 'fr-f-swb', 'fr-f-base'}  # fr-f-base-dk: build 82.3, see tools/brand82

def img(name, dark):
    p = os.path.join(SRC, name + ('-dk' if dark and name in DARK else '') + '.webp')
    return Image.open(p).convert('RGBA')

def paste(c, im, x, y, w, h):
    im = im.resize((round(w), round(h)), Image.LANCZOS)
    c.alpha_composite(im, (round(x), round(y)))

for key, L in LAYOUTS.items():
    for dark in (False, True):
        c = Image.new('RGBA', (L['W'], H), (0, 0, 0, 0))
        for n, x, y, w, h in EMBLEM + [DIV]:
            paste(c, img(n, dark), x, y, w, h)
        for n, x, y, s in L['text']:
            im = img(n, dark)
            paste(c, im, x, y, im.width * s, im.height * s)
        out = os.path.join(OUT, 'fr-%s26%s.webp' % (key, '-dk' if dark else ''))
        c.save(out, 'WEBP', quality=86, method=6)
        print(out, c.size, os.path.getsize(out))
