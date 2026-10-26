# Mise

A phone-first finder for the 102 official IBA cocktails, built for bartending students. English and Spanish.

- Filters that know what is hidden inside a bottle (excluding citrus also catches orange liqueurs and bitters).
- Every drink with its IBA photo, spec, glass, ice, technique, estimated strength, history and video.
- A ticket (comanda): add drinks, set covers, get the combined mise en place, glassware and garnish.

## Run it

```
python3 scripts/build.py        # inlines data/ into src/template.html -> public/index.html
python3 -m http.server -d public
```

## Layout

- `src/template.html`: the app (vanilla HTML/CSS/JS).
- `data/drinks.json`: built drink data. `data/colors.json`: each drink's colour, sampled from its photo.
- `data/iba-2026.json`, `data/photos.json`: the IBA source data and photo mapping.
- `scripts/build_data.py` + `scripts/meta_*.py`: rebuild `drinks.json` from the IBA data (`python3 scripts/build_data.py data/iba-2026.json data/drinks.json`).
- `public/`: what gets deployed (Vercel runs `scripts/build.py`).
- `DESIGN.md`, `PRODUCT.md`: design system and product record.

Photos and recipes are from the International Bartenders Association (iba-world.com).
