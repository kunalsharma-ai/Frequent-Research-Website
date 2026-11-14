"""Build 65: Sampledge X (https://x.com/SampledgeX). Same renderer and libzbar check as build 63 (make_qr_b63.py).
Build 63: Frequent Research Threads + Sampledge social / WhatsApp support codes (links exactly as supplied).
Build 62 original: panel QR codes: social profiles and WhatsApp support for MyHealthOpinions, Turn2Opinion and
MyFrequentRewards, exactly as supplied for the QR & Connect page (the MyFrequentRewards Facebook link is used as given).
Based on make_qr_extra.py (build 52): Sampledge, website, WhatsApp and the six footer social profiles.
Same look as make_qr.py (navy modules, error correction H, logo plate ~24%), but needs only Pillow + reportlab
(reportlab's QR encoder) and verifies every file with the system libzbar through ctypes — for build machines where
segno/opencv cannot be installed. Build tooling only; nothing here ships to the browser.
Usage: python3 tools/qr/make_qr_panels.py tools/qr/logos src/assets/images/qr
"""
import sys, ctypes, ctypes.util
from PIL import Image, ImageDraw
from reportlab.graphics.barcode import qrencoder as qe

src, out = sys.argv[1], sys.argv[2]
NAVY = (11, 20, 55)
Q = [
    ("sampledge-x", "https://x.com/SampledgeX", "x.png"),
]


def matrix(url):
    q = qe.QRCode(None, qe.QRErrorCorrectLevel.H)
    q.addData(url)
    q.make()
    n = q.getModuleCount()
    return [[bool(q.isDark(r, c)) for c in range(n)] for r in range(n)]


def render(m, logo_file):
    n = len(m)
    border = 2
    sc = max(6, round(330 / (n + 2 * border)))  # dense codes (long URLs) get larger modules
    W = (n + 2 * border) * sc
    img = Image.new("RGBA", (W, W), "white")
    d = ImageDraw.Draw(img)
    for r in range(n):
        for c in range(n):
            if m[r][c]:
                x, y = (c + border) * sc, (r + border) * sc
                d.rectangle([x, y, x + sc - 1, y + sc - 1], fill=NAVY)
    box = int(W * (0.24 if n <= 41 else 0.13))  # version 8+ has an alignment pattern in the centre: keep the logo small
    plate = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    ImageDraw.Draw(plate).rounded_rectangle([0, 0, box - 1, box - 1], radius=int(box * 0.22), fill="white")
    lg = Image.open(f"{src}/{logo_file}").convert("RGBA")
    bb = lg.getbbox()
    lg = lg.crop(bb) if bb else lg
    pad = int(box * 0.14)
    lg.thumbnail((box - 2 * pad, box - 2 * pad), Image.LANCZOS)
    plate.alpha_composite(lg, ((box - lg.size[0]) // 2, (box - lg.size[1]) // 2))
    img.alpha_composite(plate, ((W - box) // 2, (W - box) // 2))
    return img.convert("RGB")


# ---- verification: zxing-cpp (pip install zxing-cpp); build 63 used libzbar, which this build machine lacks ----
import zxingcpp


def decode(img):
    return [r.text for r in zxingcpp.read_barcodes(img)]


ok = True
for name, url, logo in Q:
    img = render(matrix(url), logo)
    img.quantize(colors=64, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(f"{out}/{name}.png", optimize=True)
    saved = Image.open(f"{out}/{name}.png").convert("RGB")
    checks = []
    for s in (saved.size[0], 200):
        t = saved.resize((s, s), Image.LANCZOS)
        canvas = Image.new("RGB", (s + 40, s + 40), "white")
        canvas.paste(t, (20, 20))
        checks.append(url in decode(canvas))
    print(name, "decode", checks)
    ok &= all(checks)
print("ALL OK" if ok else "DECODE FAILURE")
sys.exit(0 if ok else 1)
