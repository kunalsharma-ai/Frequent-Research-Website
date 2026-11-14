"""Panel QR codes (build 62): social profiles and WhatsApp support for MyHealthOpinions, Turn2Opinion and
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
    ("myhealthopinions-youtube", "https://www.youtube.com/@MyHealthOpinions", "youtube.png"),
    ("myhealthopinions-instagram", "https://www.instagram.com/myhealthopinions/", "instagram.png"),
    ("myhealthopinions-linkedin", "https://www.linkedin.com/company/myhealthopinions/posts/?feedView=all", "linkedin.png"),
    ("myhealthopinions-facebook", "https://www.facebook.com/myhealthopinions/", "facebook.png"),
    ("myhealthopinions-whatsapp", "https://wa.me/918178200573", "mho.png"),
    ("turn2opinion-youtube", "https://www.youtube.com/@Turn2Opinion", "youtube.png"),
    ("turn2opinion-instagram", "https://www.instagram.com/turn2opinion/", "instagram.png"),
    ("turn2opinion-linkedin", "https://www.linkedin.com/company/turn2opinionpanel", "linkedin.png"),
    ("turn2opinion-facebook", "https://www.facebook.com/tryturn2opinion", "facebook.png"),
    ("turn2opinion-whatsapp", "https://wa.me/918178200573", "t2o.png"),
    ("myfrequentrewards-youtube", "https://www.youtube.com/@MyFrequentRewards", "youtube.png"),
    ("myfrequentrewards-instagram", "https://www.instagram.com/myfrequentrewards/", "instagram.png"),
    ("myfrequentrewards-linkedin", "https://www.linkedin.com/company/myfrequentrewards/", "linkedin.png"),
    ("myfrequentrewards-facebook", "https://www.facebook.com/myfrequentreswards/", "facebook.png"),
    ("myfrequentrewards-whatsapp", "https://wa.me/918178200573", "mfr.png"),
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


# ---- verification with libzbar (ctypes) ----
_z = ctypes.CDLL(ctypes.util.find_library("zbar") or "libzbar.so.0")
_z.zbar_image_scanner_create.restype = ctypes.c_void_p
_z.zbar_image_create.restype = ctypes.c_void_p
_z.zbar_image_first_symbol.restype = ctypes.c_void_p
_z.zbar_symbol_next.restype = ctypes.c_void_p
_z.zbar_symbol_get_data.restype = ctypes.c_char_p
for fn in ("zbar_image_scanner_set_config", "zbar_image_set_format", "zbar_image_set_size", "zbar_image_set_data", "zbar_scan_image", "zbar_image_first_symbol", "zbar_symbol_next", "zbar_symbol_get_data", "zbar_image_destroy", "zbar_image_scanner_destroy"):
    getattr(_z, fn).argtypes = None


def decode(img):
    g = img.convert("L")
    w, h = g.size
    data = g.tobytes()
    buf = ctypes.create_string_buffer(data, len(data))
    sc = ctypes.c_void_p(_z.zbar_image_scanner_create())
    _z.zbar_image_scanner_set_config(sc, 0, 0, 1)
    im = ctypes.c_void_p(_z.zbar_image_create())
    _z.zbar_image_set_format(im, ctypes.c_ulong(0x30303859))  # 'Y800'
    _z.zbar_image_set_size(im, ctypes.c_uint(w), ctypes.c_uint(h))
    _z.zbar_image_set_data(im, buf, ctypes.c_ulong(len(data)), None)
    _z.zbar_scan_image(sc, im)
    res = []
    s = _z.zbar_image_first_symbol(im)
    while s:
        res.append(ctypes.c_char_p(_z.zbar_symbol_get_data(ctypes.c_void_p(s))).value.decode("utf8", "replace"))
        s = _z.zbar_symbol_next(ctypes.c_void_p(s))
    return res


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
