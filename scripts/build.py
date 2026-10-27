"""Inline the drink data into src/template.html and write public/index.html.

Run from the repo root: python3 scripts/build.py
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent
t = (root / 'src/template.html').read_text()
t = t.replace('__DATA__', (root / 'data/drinks.json').read_text())
t = t.replace('__COLORS__', (root / 'data/colors.json').read_text())
t = t.replace('__GLASS__', (root / 'src/glass.js').read_text())
t = t.replace('__COURSE__', (root / 'data/course.json').read_text())
t = t.replace('__GLASSWARE__', (root / 'data/glassware.json').read_text())
t = t.replace('__SWAPS__', (root / 'data/swaps.json').read_text())
t = t.replace('__FRAMES__', (root / 'data/frames.json').read_text())
head, body = t.split('</style>', 1)
html = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
        + head + '</style></head><body>' + body + '</body></html>')
(root / 'public/index.html').write_text(html)
print('wrote public/index.html')
