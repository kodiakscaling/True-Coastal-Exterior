#!/usr/bin/env python3
"""Background removal that clears BOTH the outer cream background and the
enclosed letter counters (e.g. the inside of the "O" in COASTAL), while
protecting the white "EXTERIOR HOME SERVICES" text.

Uses a global cream color-key (not edge flood-fill) so enclosed same-color
regions are removed too. Whitish pixels are protected so the white ribbon
text and the marlin's white highlights survive.
"""
import sys
from PIL import Image

SRC = sys.argv[1]
DST = sys.argv[2]

BG = (238, 230, 209)   # sampled cream background
HARD = 44              # <= this dist from cream => fully transparent
SOFT = 52              # feather band upper bound (kept < white's ~55 dist)
WHITE_MIN = 222        # protect pixels whose min channel >= this (white text)

HARD2 = HARD * HARD
SOFT2 = SOFT * SOFT

im = Image.open(SRC).convert("RGBA")
w, h = im.size
px = im.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        # Protect whitish pixels (white ribbon text, marlin highlights)
        if min(r, g, b) >= WHITE_MIN:
            continue
        d = (r - BG[0]) ** 2 + (g - BG[1]) ** 2 + (b - BG[2]) ** 2
        if d <= HARD2:
            px[x, y] = (r, g, b, 0)
        elif d <= SOFT2:
            frac = (d - HARD2) / float(SOFT2 - HARD2)
            px[x, y] = (r, g, b, int(max(0, min(255, frac * 255))))

# Crop to content + small padding
bbox = im.getbbox()
if bbox:
    pad = 12
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(w, r + pad); b = min(h, b + pad)
    im = im.crop((l, t, r, b))

im.save(DST)
print(f"saved {DST} size={im.size}")
