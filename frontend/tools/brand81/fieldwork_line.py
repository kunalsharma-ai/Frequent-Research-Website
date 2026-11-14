"""Build 81.2 (Kunal, 12 Nov 2026): a fresh, clean drawing of the logo's "— Fieldwork Solutions Private Limited —" line
(the original image had a light/white fill and speckles around the letters). Solid colour on a transparent background,
same size and place as the original layer (805 x 47), one colour for the light theme and one for dark.
Run from frontend/: python3 tools/brand81/fieldwork_line.py  (then python3 tools/brand26/make_logo26.py)"""
from PIL import Image, ImageDraw, ImageFont
import os
SRC = 'src/assets/images/brand13'
FONT = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
TEXT = 'Fieldwork Solutions Private Limited'
W, H, K = 805, 47, 4          # final size, drawn at K times and scaled down for smooth edges
for name, col in (('fr-f-t6', (30, 50, 138)), ('fr-f-t6-dk', (199, 210, 254))):
    f = ImageFont.truetype(FONT, 40 * K)
    tw = f.getbbox(TEXT)
    t = Image.new('L', (tw[2] + 40 * K, 60 * K), 0)
    ImageDraw.Draw(t).text((20 * K, 6 * K), TEXT, font=f, fill=255)
    t = t.crop(t.getbbox())
    # the words fill the middle, dashes either side, like the original
    dash_w, gap = 34 * K, 9 * K
    words_w = W * K - 2 * (dash_w + gap)
    th = round(H * K * 0.80)
    t = t.resize((words_w, th), Image.LANCZOS)
    m = Image.new('L', (W * K, H * K), 0)
    y0 = (H * K - th) // 2
    m.paste(t, (dash_w + gap, y0))
    d = ImageDraw.Draw(m)
    dy = H * K // 2; lw = round(3.2 * K)
    d.rectangle((0, dy - lw // 2, dash_w, dy + lw // 2), fill=255)
    d.rectangle((W * K - dash_w, dy - lw // 2, W * K, dy + lw // 2), fill=255)
    m = m.resize((W, H), Image.LANCZOS)
    out = Image.new('RGBA', (W, H), col + (0,))
    out.putalpha(m)
    out.save(os.path.join(SRC, name + '.webp'), 'WEBP', lossless=True)
    print(name, out.size)
