---
name: Mise
description: The IBA cocktails, found fast, in a dark bar lit by each drink.
colors:
  photo-black: "#030202"
  bone: "#ede7dc"
  ash: "#9b948a"
  soot-rule: "#2a2522"
  smoke-line: "#3b3430"
  ambient-default: "#7a4a22"
  thermal-paper: "#eef0ec"
  carbon-ink: "#15171b"
  carbon-ink-faded: "#565b62"
  paper-rule: "#c9cdc7"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(54px, 17vw, 104px)"
    fontWeight: 500
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(30px, 8.6vw, 44px)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  ticket-title:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  wordmark:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.05
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  body-strong:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.45
    fontFeature: "tnum"
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.45
  control:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
rounded:
  hairline: "1px"
  chip: "17px"
  pill-sm: "20px"
  pill: "22px"
  pill-lg: "26px"
spacing:
  chip-gap: "6px"
  sm: "12px"
  gutter: "16px"
  page: "20px"
  section: "22px"
  tab-clearance: "120px"
components:
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "0 13px"
    height: "34px"
  chip-active:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.photo-black}"
    rounded: "{rounded.chip}"
  chip-exclude-active:
    backgroundColor: "{colors.smoke-line}"
    textColor: "{colors.bone}"
    rounded: "{rounded.chip}"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-add:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.control}"
    rounded: "{rounded.pill-lg}"
    height: "52px"
  button-add-active:
    backgroundColor: "{colors.thermal-paper}"
    textColor: "{colors.carbon-ink}"
    rounded: "{rounded.pill-lg}"
  ticket-tab:
    backgroundColor: "{colors.thermal-paper}"
    textColor: "{colors.carbon-ink}"
    typography: "{typography.control}"
    padding: "0 18px 0 16px"
    height: "48px"
  ticket-slip:
    backgroundColor: "{colors.thermal-paper}"
    textColor: "{colors.carbon-ink}"
    padding: "26px 20px 34px"
    width: "440px"
  stepper:
    backgroundColor: "transparent"
    textColor: "{colors.carbon-ink}"
    rounded: "{rounded.pill}"
    height: "40px"
  search-field:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    height: "46px"
---

# Design System: Mise

## Overview

**Creative North Star: "Contraluz"**

The page is the black of the IBA photographs, and the drinks are the only light in the room. Every surface is that photo black (photo-black) so a dark bar shot sits on it without a frame: the glass floats, the page and the photo are the same darkness. Colour does not belong to the brand. It belongs to each drink: the liquid colour sampled from its photo tints its year, its ratio bar, the glow under its plate, and the ambient light rising from the bottom of the screen as it scrolls into the centre of view.

Against that dark room there is exactly one light object: the ticket (comanda). It is thermal paper with carbon ink, torn zigzag edges, a perforated tab, and it prints downward when opened. Anything that belongs to the ticket (the floating tab, the "×n" badge on a row, the "On the ticket" button state) takes the paper and ink; nothing else does.

Type is two voices. Bodoni Moda at poster scale carries names: the italic wordmark, every drink name, the ticket title. Schibsted Grotesk carries everything a bartender reads at a glance: quantities in tabular numerals, sentence-case labels, controls. Density is generous on the list (one drink per row, photo left, name right) and tight on the spec and the ticket, where the bar actually uses it.

**Key Characteristics:**
- One ground (photo black), one text tone, one muted tone; no fixed accent.
- Per-drink chroma, sampled from the photo, lifted 28% toward white for type.
- Photos blend with `lighten` into the page; no frames, no cards.
- The ticket is the only light surface, with paper edges cut by CSS masks.
- Bodoni for names, Schibsted for everything else; sentence case throughout.
- Depth by light (radial glows, blur), not by lift.

## Colors

A near-monochrome warm-black room whose only colour is lent by the drink in view, plus one cool paper object.

### Primary
- **Drink Light** (per drink, from `mise/colors.json`): the sampled liquid colour of each drink (e.g. Negroni's amber, Clover Club's red). Used raw (`--c`) for glows: the ambient light at the page foot (55% mix) and the radial glow behind the drink plate (45% mix). Lifted 28% toward white (`--c2`) wherever it is type or a mark: the year on a row, the origin line under a drink name, the ratio bar segments, the row name on hover. There is no global brand accent; the primary colour is always the current drink.
- **Ambient Default** (ambient-default): the warm amber the ambient light holds before any drink is observed; drinks missing a sample fall back to a close sibling (#8a6a4a) in script.

### Neutral
- **Photo Black** (photo-black): the page, the drink sheet, the browser theme colour, and the inverse text on an active chip. Also used at 60% behind the floating close button and 82% behind the ticket overlay.
- **Bone** (bone): primary text, drink names, outlined control borders, focus outline, the active chip fill.
- **Ash** (ash): secondary text: drink count, spec meta line, fact labels, prose section headings, sub-notes under ingredients, optional lines, the inactive language toggle.
- **Soot Rule** (soot-rule): row dividers and the rule above the facts grid. The quietest line.
- **Smoke Line** (smoke-line): control strokes (chip border, search underline at rest, chip-rail separator), the active "without" chip fill, the scrollbar thumb.

### Tertiary (the ticket)
- **Thermal Paper** (thermal-paper): the ticket slip, the ticket tab, the "on the ticket" badge on a list row, the active add-to-ticket button.
- **Carbon Ink** (carbon-ink): all text and heavy rules on paper (1.5px under the ticket head and section heads), stepper and footer button strokes.
- **Faded Carbon** (carbon-ink-faded): secondary text on paper: time stamp, glass and ice line, glassware counts, total.
- **Paper Rule** (paper-rule): dotted row dividers on the ticket.

### Named Rules
**The Photo-Black Rule.** The page is exactly the black of the photographs (photo-black). Never lift it to a grey or put a panel on it; a photo should dissolve into the page, not sit on it.

**The Borrowed Colour Rule.** The only chroma on the dark side is the current drink's sampled colour: raw for light, lifted 28% for type and marks. Introducing a fixed accent hue breaks the world.

**The One Light Object Rule.** Thermal paper and carbon ink are reserved for the ticket and the things that point to it. A paper-coloured surface means "this is on the ticket".

## Typography

**Display Font:** Bodoni Moda (with Didot, serif), optical sizing on
**Body Font:** Schibsted Grotesk (with system-ui, sans-serif)

**Character:** A high-contrast Didone at poster scale against a plain, sturdy grotesk. The serif names the drink like a menu card; the grotesk measures it like a bar spec.

### Hierarchy
- **Display** (Bodoni 500, clamp 54–104px, 0.88): the drink name on its page, overlapping the bottom of the photo.
- **Headline** (Bodoni 500, clamp 30–44px, 0.96): drink names in the list; balanced wrapping.
- **Ticket Title** (Bodoni 600, 40px, 1): "Ticket" / "Comanda" at the head of the slip.
- **Wordmark** (Bodoni italic 400, 32px, 1): "Mise", top left, the only italic.
- **Title** (Bodoni 600, 22px, 1.05): drink names on ticket rows; the count numeral on the ticket tab (600, 22px).
- **Body** (Schibsted 400, 15px, 1.45): prose (method, garnish, story) at max 62ch, ticket table cells, fact values (500). Ingredient names step up to 16px.
- **Body Strong** (Schibsted 600, 15px, tabular): quantities in the pour list and mise en place.
- **Label** (Schibsted 500, 13px): spec meta line, counts, fact labels, prose section heads, origin line, chips. Ticket section heads use 600. Sub-notes drop to 12.5px.
- **Control** (Schibsted 600, 14px): pill buttons and the ticket tab; 13px on the ticket footer button. The EN/ES toggle is 600, 12px, 0.06em.

### Named Rules
**The Two Voices Rule.** Bodoni sets names (drinks, the wordmark, the ticket title, the tab count) and nothing else. Every label, number, and control is Schibsted.

**The Tabular Rule.** Every quantity, count, time, and multiplier uses tabular numerals so specs align in a column.

**The Sentence Case Rule.** Labels and section heads are sentence case at 13px, set in ash on dark or ink on paper. No uppercase, no tracked eyebrows above headings.

## Layout

Phone first, single column. The shell is a 1180px max-width wrap with a 16px gutter; the header (wordmark, count, EN/ES, underline search, horizontal chip rail) is sticky and fades into the page with a vertical gradient rather than ending on a line. The chip rail bleeds to the screen edges and scrolls horizontally with no scrollbar.

List rows are a two-column grid: photo at 44% (3:3.7 crop, scaled 1.25 from 50% 70% so the glass fills it), text bottom-aligned on the right with its divider under the text only, not under the photo. From 900px the list becomes two columns with a 32px gap. The list ends with 120px clearance so the floating tab never covers the last row.

The drink page is a full-screen sheet capped at 620px: a 4:5 plate photo, then the name pulled up over the photo by -23vw (-140px from 620px), then the pour list (4.6em quantity column), the full-width add button, a two-column facts grid, and prose. Interior gutter is 20px; section spacing is 22px.

The ticket is an overlay (blurred black at 82%) holding a slip capped at 440px, centred, with a 14px outer gutter. Safe-area insets are respected on the sticky header, the close button, and the tab.

## Elevation & Depth

Flat surfaces, depth by light. Nothing on the dark side is lifted; depth comes from the drink's colour glowing up from below (ambient radial gradient at the page foot, radial glow at the bottom of the plate, both fading to black) and from translucency (the close button and ticket overlay blur what is behind them). The only cast shadow belongs to the floating ticket tab, the paper object that hovers over the room.

### Shadow Vocabulary
- **Tab float** (`box-shadow: 0 10px 30px -8px rgba(0,0,0,.8)`): the ticket tab only.

### Named Rules
**The Light-Not-Lift Rule.** To give something presence on the dark side, light it with the drink colour; do not raise it with a shadow. Shadows are for paper hovering over the room.

## Shapes

Two forms. Controls are full pills (radius equals half the height: 17px chips, 20px ticket footer button, 22px pills, steppers and close button, 26px add button). Surfaces are square: photos, the plate, the slip, the sheet. Small marks (the "×n" badge, ratio bar segments) take a 1px hairline radius. Paper never has a rounded corner; its edges are cut: the slip's top and bottom are a 14px zigzag (conic-gradient mask), and the tab's sides are perforated with 3px semicircle punches every 12px (radial-gradient mask). Lines are 1px, solid on dark, dotted on paper, with 1.5px solid ink for heads on paper. Icons are 20px stroked SVG at 1.6 weight with round caps.

## Components

### Buttons
Outlined and quiet on dark; they turn to paper when they put something on the ticket.
- **Shape:** full pill (22px radius at 44px tall; 26px at 52px for the add button).
- **Pill:** transparent, 1px bone border, bone text, 600 14px, 0 18px padding, 8px gap to a leading icon. Used for "Clear filters" and "Watch on YouTube".
- **Add to ticket:** the pill at full width, 52px, centred, with a plus icon. Once added it fills with thermal paper and carbon ink and shows a check and "×n".
- **Focus:** 2px bone outline, 2px offset (ink on paper). No hover fills on dark.

### Chips
- **Style:** 34px tall, 0 13px, 1px smoke-line border, transparent, label type, 6px gaps, in one horizontal rail: spirits first, then a 1px separator, then "No / Sin" allergen exclusions.
- **State:** a selected spirit inverts to bone fill with photo-black text. A selected exclusion fills smoke-line, keeps bone text, takes a bone border and goes to 600, so "without" reads differently from "with".

### Inputs / Fields
- **Search:** no box. A 46px row with a 20px magnifier, a borderless 16px input and a 1px smoke-line underline that turns bone on focus. Placeholder is a warm grey (#7f776d). A clear button appears only when there is text.

### Navigation
- **Header:** italic wordmark left, count in ash, EN/ES text toggle (active in bone, inactive in ash).
- **Close / back:** 44px round button fixed top left, photo black at 60% with 8px blur; it slides away upward while scrolling down a drink page and returns on scroll up. Over the ticket it becomes paper at 12%.

### List Row (signature)
The photo, blended with `lighten` so the bar's black merges into the page, sits left; the Bodoni name and one meta line ("Base · Method · ABV · year") sit right, the year in the lifted drink tint. On hover devices the name takes the drink tint. A paper "×n" badge appears when the drink is on the ticket.

### Ratio Bar (signature)
Above the pour list, a 10px bar split into segments proportional to each ingredient's volume, 3px gaps, all in the lifted drink tint with opacity stepping down from 1 to 0.3 across lines.

### Ticket Tab (signature)
Fixed bottom centre, 48px, thermal paper, perforated sides, slip icon, the word "Ticket" and the count in Bodoni 22px. It bumps up 6px when a drink is added and hides while the ticket is open.

### Ticket Slip (signature)
Thermal paper with zigzag torn ends; head row with the Bodoni title and the time; one row per drink with name, glass and ice, and a pill stepper (40px, 1px ink border, minus / tabular count / plus); then "Mise en place", "Glassware" and "Garnish" tables under 1.5px ink heads with dotted rows; quantities bold in a fixed column, counts right-aligned in faded ink. Footer: total and an outlined "Clear ticket" pill. On open it prints: a 0.9s clip reveal from the top with a 24px drop.

### Motion
One easing for everything (`cubic-bezier(.16,1,.3,1)`): ambient colour cross-fade 0.9s, ticket print 0.9s, tab bump 0.5s, close button slide 0.35s. All motion is removed under `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** set every dark surface on photo-black (#030202) and blend drink photos with `mix-blend-mode: lighten` so they have no edge.
- **Do** take colour from the drink: raw for glows, lifted 28% toward white for type and marks.
- **Do** keep thermal paper and carbon ink for the ticket and its tokens (tab, "×n" badge, added state).
- **Do** set names in Bodoni Moda and everything else in Schibsted Grotesk with tabular numerals.
- **Do** make controls full pills and surfaces square; cut paper edges with masks, never round them.
- **Do** use the single ease `cubic-bezier(.16,1,.3,1)` and honour reduced motion.

### Don't:
- **Don't** add a fixed accent colour, neon or otherwise; the drink is the accent.
- **Don't** put photos in tiles: no borders, rounded corners, backgrounds or shadows around them.
- **Don't** use paper or a light fill for anything unrelated to the ticket.
- **Don't** raise dark-side elements with shadows; give them light instead.
- **Don't** use uppercase or tracked eyebrow labels above headings; labels are sentence case.
- **Don't** set UI labels, numbers or body copy in Bodoni.
