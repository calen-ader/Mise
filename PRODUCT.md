# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Static HTML/CSS/JS (Fede, 2026-10-26). Astro was offered for per-drink URLs and link previews; revisit when the repo is set up.

## Users
Bartending students in Fede's course (Argentina, Spanish- and English-speaking). They use it on a phone, behind a bar or on the way to class, to find, choose and study a drink fast. Fede (the course member who curates it) also uses it as a portfolio piece.

## Product Purpose
Mise is a faster, sharper way to find and choose the official IBA cocktails than iba-world.com. Success means a student can go from "no citrus, gin, stirred" to the right drink and its spec in seconds, in English or Spanish.

## Positioning
The filters know what is hidden inside a bottle: excluding orange also catches orange liqueurs and bitters, with a declared/common/possible strictness switch. Every drink adds what IBA leaves out: glass, ice, technique (in the course's own terms), estimated ABV, purpose, and history.

## Operating Context
Phone first, one hand, often in dim bar light or on the move. Course vocabulary: Directo / Refrescado / Shakeado; aperitivo / refrescante / digestivo; mise en place, service terms (86, marche, voy atrás). Students compare drinks, practise specs, and prep shifts.

## Capabilities and Constraints
- 102 IBA drinks (2026 list), 97 with IBA YouTube videos, 102 IBA photos (dark bar shots, 2:3 portrait).
- Filters: allergens with hidden components, include/exclude ingredients, base spirit, technique, glass, ice, flavour, strength, category, era, purpose.
- EN/ES on every string. ml/oz and serving multiplier.
- Planned: variations nested in their parent with a switch to list separately; shift list (drinks × covers → mise en place); bar prep (syrups, shrubs, cordials, óleo saccharum) and a service glossary; quiz mode; non-IBA drinks labelled by source; course drinks curated by Fede (class submissions are future).
- YouTube embeds work only once hosted (the Artifact viewer blocks iframes).

## Brand Commitments
- Name: Mise (from mise en place). Repo: github.com/calen-ader/Mise.
- Fede's binding visual notes (2026-10-26): keep the high-contrast serif (Bodoni Moda) from the "Carta" exploration and the gradient cards from "Contraluz"; use the IBA photos. Earlier colour picks read as "too AI". Copy and layout must be terse and sharp, as if designed by hand, never explanatory.
- Premium, portfolio grade. Big editorial and dramatic, but not a common AI look.

## Evidence on Hand
- data/iba-2026.json, data/photos/*.webp + photos.json (IBA photos; Grand Margarita reuses Tommy's photo), build/drinks.json.
- Course PDFs (teacher Guillermo Ubilla) for technique, glassware, prep and service terms.
- No testimonials, users, or metrics exist; do not invent them.

## Product Principles
1. Answer first: the drink, then the spec, then everything else.
2. Trust the filter: hidden ingredients are surfaced with honest confidence, never overstated.
3. Bilingual parity: nothing ships in one language only.
4. Built for the bar: thumb reach, dim light, glanceable specs.
5. Say less: labels over sentences.
