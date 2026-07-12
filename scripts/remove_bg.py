#!/usr/bin/env python3
"""Edge-seeded flood-fill background removal for the True Coastal logo.

Removes the outer cream background while preserving the white
"EXTERIOR HOME SERVICES" text inside the mark (interior whites are never
touched because the fill only propagates from the image border).
"""
import sys
from collections import deque
from PIL import Image

SRC = sys.argv[1]
DST = sys.argv[2]
# Background reference color (sampled cream) + tolerances
BG = (238, 230, 209)
HARD = 46   # <= this distance from BG => fully transparent
SOFT = 66   # between HARD and SOFT => partial alpha (anti-alias edge)

def dist2(c, ref):
    return (c[0]-ref[0])**2 + (c[1]-ref[1])**2 + (c[2]-ref[2])**2

im = Image.open(SRC).convert("RGBA")
w, h = im.size
px = im.load()

HARD2 = HARD*HARD
SOFT2 = SOFT*SOFT

visited = bytearray(w*h)
q = deque()

def seed(x, y):
    i = y*w + x
    if not visited[i]:
        visited[i] = 1
        q.append((x, y))

# Seed from every border pixel
for x in range(w):
    seed(x, 0); seed(x, h-1)
for y in range(h):
    seed(0, y); seed(w-1, y)

while q:
    x, y = q.popleft()
    r, g, b, a = px[x, y]
    d = dist2((r, g, b), BG)
    if d <= SOFT2:
        if d <= HARD2:
            px[x, y] = (r, g, b, 0)
        else:
            # linear feather between HARD and SOFT
            frac = (d - HARD2) / float(SOFT2 - HARD2)
            px[x, y] = (r, g, b, int(max(0, min(255, frac*255))))
        # keep spreading to neighbours
        if x > 0:   seed(x-1, y)
        if x < w-1: seed(x+1, y)
        if y > 0:   seed(x, y-1)
        if y < h-1: seed(x, y+1)

# Crop to non-transparent bounding box (+ small padding)
bbox = im.getbbox()
if bbox:
    pad = 12
    l, t, r, b = bbox
    l = max(0, l-pad); t = max(0, t-pad)
    r = min(w, r+pad); b = min(h, b+pad)
    im = im.crop((l, t, r, b))

im.save(DST)
print(f"saved {DST} size={im.size}")
