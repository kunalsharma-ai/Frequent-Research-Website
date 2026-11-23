"""Build 82.8 (Kunal, 21 Nov): the silver R in the dark-mode logo files had a band cut out of it.

The night (-dk) copies were made by removing white. That also removed the white highlights on the R's leg, so the
page background showed through the letter. This script puts those pixels back from the day copy. It changes nothing
else: the background of the globe (the large white area joined to it) stays transparent, and colours are not
changed. White pixels that are enclosed by the artwork are part of the letter, so they come back.
Usage: python3 tools/brand828/fix_r_leg.py   (keeps the originals in tools/brand828/orig/ the first time)
"""
import os, sys
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..', 'src', 'assets', 'images')
FILES = ['brand26/fr-head26', 'brand26/fr-full26', 'brand13/fr-i-base', 'brand13/fr-f-base']

def flood(allowed, seeds):
    """pixels of `allowed` connected (4-way) to any seed pixel"""
    out = np.zeros_like(allowed)
    out[seeds & allowed] = True
    while True:
        g = out.copy()
        g[1:, :] |= out[:-1, :]; g[:-1, :] |= out[1:, :]; g[:, 1:] |= out[:, :-1]; g[:, :-1] |= out[:, 1:]
        g &= allowed
        if (g == out).all(): return out
        out = g

for n in FILES:
    lp = os.path.join(ROOT, n + '.webp'); dp = os.path.join(ROOT, n + '-dk.webp'); op = os.path.join(os.path.dirname(__file__), 'orig', os.path.basename(n) + '-dk.orig.webp')
    if not os.path.exists(op): Image.open(dp).save(op, lossless=True)
    L = np.array(Image.open(lp).convert('RGBA')).astype(int)
    D = np.array(Image.open(op).convert('RGBA')).astype(int)
    holes = (L[..., 3] > 200) & (D[..., 3] < 200)
    white = holes & (L[..., :3].min(axis=2) >= 200)
    # the globe's background: the largest white area. Seeds: hole pixels on the border of the white region that
    # touch transparent pixels of the day copy or the picture edge are not available here, so use the biggest blob:
    # pick seeds where a 25 px square is entirely white (only the open background is that wide)
    k = 25
    c = np.pad(white, 1).cumsum(0).cumsum(1)
    full = (c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]) == k * k
    seeds = np.zeros_like(white)
    seeds[:full.shape[0], :full.shape[1]] = full
    bg = flood(white, seeds)
    fix = holes & ~bg
    out = D.copy()
    out[fix] = L[fix]
    Image.fromarray(out.astype(np.uint8), 'RGBA').save(dp, quality=95, method=6)
    print(n, 'pixels restored:', int(fix.sum()), 'background kept transparent:', int(bg.sum()))
