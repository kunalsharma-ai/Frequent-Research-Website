"""Branded QR codes (error correction H) with a centred logo; every output is decode-verified with OpenCV.
Build tooling only (segno, Pillow, opencv). Usage: python3 make_qr.py <logo_dir> <out_dir>"""
import sys, io, segno, numpy as np, cv2
from PIL import Image, ImageDraw
src, out = sys.argv[1], sys.argv[2]
NAVY = '#0B1437'
# name, url, logo file, crop box (fraction of width) or None
Q = [
 ('google-share','https://share.google/Q2u2ukm6YPPESkJTb','google.png',None),
 ('panel-frequent-research','https://panels.frequentresearch.com/','fr-badge.png',None),
 ('panel-turn2opinion','https://www.turn2opinion.com/','t2o.png','wide'),
 ('panel-myfrequentrewards','https://www.myfrequentrewards.com/','mfr.png',(0.0,0.0,0.235,0.75)),
 ('panel-myhealthopinions','https://www.myhealthopinions.com/','mho.png',(0.0,0.05,0.27,1.0)),
 ('social-linkedin','https://www.linkedin.com/company/frequentresearch','linkedin.png',None),
 ('social-instagram','https://www.instagram.com/frequentresearchfield','instagram.png',None),
 ('social-youtube','https://www.youtube.com/@frequentresearch','youtube.png',None),
 ('social-facebook','https://www.facebook.com/FrequentResearchFieldwork','facebook.png',None),
 ('social-x','https://x.com/frequentrfs','x.png',None),  # build 52: matches the footer link
 ('social-pinterest','https://pin.it/1ApfR1BQk','pinterest.png',None),  # build 52: matches the footer link
]
def logo(f, crop):
    im = Image.open(f'{src}/{f}').convert('RGBA')
    if crop and crop != 'wide':
        w, h = im.size; im = im.crop((int(crop[0]*w), int(crop[1]*h), int(crop[2]*w), int(crop[3]*h)))
    bb = im.getbbox(); im = im.crop(bb) if bb else im
    return im
ok = True
for name, url, f, crop in Q:
    q = segno.make(url, error='h', boost_error=False)
    buf = io.BytesIO(); sc = max(5, round(280 / (q.symbol_size(scale=1, border=2)[0])))   # whole-pixel modules: crisp, compresses well
    q.save(buf, kind='png', scale=sc, border=2, dark=NAVY, light='white'); buf.seek(0)
    base = Image.open(buf).convert('RGBA'); W = base.size[0]
    box = int(W * 0.24)                       # logo plate ~24% of width (well inside EC-H budget)
    bw, bh = (int(W * 0.46), int(W * 0.15)) if crop == 'wide' else (box, box)   # wordmark: wide, short plate
    plate = Image.new('RGBA', (bw, bh), (0, 0, 0, 0)); d = ImageDraw.Draw(plate)
    d.rounded_rectangle([0, 0, bw - 1, bh - 1], radius=int(min(bw, bh) * 0.22), fill='white')
    lg = logo(f, crop); pad = int(min(bw, bh) * 0.14); lg.thumbnail((bw - 2 * pad, bh - 2 * pad), Image.LANCZOS)
    plate.alpha_composite(lg, ((bw - lg.size[0]) // 2, (bh - lg.size[1]) // 2))
    base.alpha_composite(plate, ((W - bw) // 2, (W - bh) // 2))
    img = base.convert('RGB')
    img.quantize(colors=64, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(f'{out}/{name}.png', optimize=True)
    img = Image.open(f'{out}/{name}.png').convert('RGB')   # verify the file actually written
    # verify: decode at the delivered size and at a phone-like small size
    res = []
    for s in (img.size[0], 200):
        a = np.array(img.resize((s, s), Image.LANCZOS))
        a = cv2.copyMakeBorder(a, 20, 20, 20, 20, cv2.BORDER_CONSTANT, value=(255, 255, 255))
        t, _, _ = cv2.QRCodeDetector().detectAndDecode(a); res.append(t == url)
    print(name, 'version', q.version, 'decode', res); ok &= all(res)
print('ALL OK' if ok else 'DECODE FAILURE'); sys.exit(0 if ok else 1)
