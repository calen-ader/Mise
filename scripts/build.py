"""Check the drink data, inline it into src/template.html and write public/index.html.

Run from the repo root: python3 scripts/build.py
The build stops with a list of problems if a recipe, variation, swap or photo points at something that isn't there.
"""
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent


def load(name):
    return json.loads((root / 'data' / name).read_text())


drinks, colors, frames = load('drinks.json'), load('colors.json'), load('frames.json')
variations, swaps, glassware = load('variations.json'), load('swaps.json'), load('glassware.json')
course = load('course.json')

problems = []
ing, glasses = drinks['ing'], drinks['glass']
ids = [d['id'] for d in drinks['drinks']]
if len(ids) != len(set(ids)):
    problems.append('drink ids repeat: ' + ', '.join(sorted({i for i in ids if ids.count(i) > 1})))
for d in drinks['drinks']:
    for size in (360, 720, 1077):
        if not (root / f'public/img/{d["id"]}-{size}.webp').exists():
            problems.append(f'{d["id"]}: no photo public/img/{d["id"]}-{size}.webp')
    if d['id'] not in colors:
        problems.append(f'{d["id"]}: no colour in colors.json')
    if d['id'] not in frames:
        problems.append(f'{d["id"]}: no frame in frames.json')
    alt = d.get('glassAlt') or []
    for g in [d.get('glass'), *([alt] if isinstance(alt, str) else alt)]:
        if g and g not in glasses:
            problems.append(f'{d["id"]}: unknown glass "{g}"')
    for line in d['lines']:
        problems += [f'{d["id"]}: unknown ingredient "{i}"' for i in line['ids'] if i not in ing]
vids = [v['id'] for v in variations]
if len(vids) != len(set(vids)):
    problems.append('variation ids repeat')
for v in variations:
    if v['parent'] not in ids:
        problems.append(f'variation {v["id"]}: unknown parent "{v["parent"]}"')
    for line in v['lines']:
        problems += [f'variation {v["id"]}: unknown ingredient "{i}"' for i in line.get('ids', []) if i not in ing]
    if v.get('photo') and not (root / f'public/img/var-{v["id"]}.webp').exists():
        problems.append(f'variation {v["id"]}: no photo public/img/var-{v["id"]}.webp')
problems += [f'swaps: unknown ingredient "{i}"' for i in swaps['ing'] if i not in ing]
if problems:
    sys.exit('Data problems, nothing written:\n  ' + '\n  '.join(problems))


def inline(x):
    # a "</script>" inside some text would end the script early; "<\/" means the same in JS
    return json.dumps(x, ensure_ascii=False).replace('</', '<\\/')


t = (root / 'src/template.html').read_text()
t = t.replace('__DATA__', inline(drinks))
t = t.replace('__COLORS__', inline(colors))
t = t.replace('__GLASS__', (root / 'src/glass.js').read_text())
t = t.replace('__COURSE__', inline(course))
t = t.replace('__GLASSWARE__', inline(glassware))
t = t.replace('__SWAPS__', inline(swaps))
t = t.replace('__VARS__', inline(variations))
t = t.replace('__FRAMES__', inline(frames))
head, body = t.split('</style>', 1)
html = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
        + head + '</style></head><body>' + body + '</body></html>')
(root / 'public/index.html').write_text(html)
print(f'wrote public/index.html ({len(ids)} drinks, {len(variations)} variations)')
