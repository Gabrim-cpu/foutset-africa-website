---
name: FOUTSET AFRICA
description: A two-plate survey sheet of the African continent — blue zone fills and an orange marker plate on pale blue-grey map paper.
colors:
  blue: "#2A78C0"
  orange: "#F07818"
  blue-deep: "#1B4F80"
  blue-abyss: "#12314F"
  blue-tint: "#A8C8E6"
  blue-wash: "#D3E2F1"
  blue-bright: "#4A94D8"
  orange-deep: "#C9640F"
  sheet: "#ECEFF2"
  sheet-deep: "#DFE5EA"
  paper: "#FFFFFF"
  ink: "#14202B"
  night: "#06090D"
  body: "#4A5A68"
  rule: "#C3CDD6"
  rule-soft: "#DAE1E7"
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 6vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  display-sheet:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 8vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.97
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline-sm:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lead-lg:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  interface:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
  measured:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "tabular-nums"
  action:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.09em"
rounded:
  sheet: "4px"
spacing:
  gutter-sm: "24px"
  gutter-lg: "40px"
  gutter-xl: "64px"
  band-sm: "64px"
  band-md: "80px"
  band-lg: "96px"
  band-xl: "112px"
  container: "92rem"
  register: "66rem"
components:
  button-action:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.sheet}"
    padding: "12px 20px"
  button-action-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.sheet}"
    padding: "16px 28px"
  button-ink-hover:
    backgroundColor: "{colors.blue-abyss}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.sheet}"
    padding: "12px 20px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  cartouche:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "20px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "10px 14px"
  language-tab:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    rounded: "{rounded.sheet}"
    padding: "6px 10px"
  language-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  sheet-label:
    textColor: "{colors.blue-deep}"
    typography: "{typography.label}"
---

# Design System: FOUTSET AFRICA

## Overview

**Creative North Star: "La Carte d'Empreinte Satellite"**

The site is printed, not composed. Every surface behaves like a coverage sheet pulled off a two-plate press: pale blue-grey map paper, a blue plate carrying the continent, its zone fills and the graticule at page scale, and an orange second plate carrying only what a second plate is for — the marker, the range ring, the measured value, the action. Registration marks sit at the corners of survey areas, deliberately drawn twice and offset half a point, because that is what a registration mark says. The scale bar in the footer is a real scale bar: 500 km per segment.

The survey is the whole of Africa, drawn in Mercator because Mercator is conformal — shapes are locally true, so the continent reads as itself rather than as a diagram of itself. What the sheet claims is graded and honest: Cameroon carries the densest fill (national coverage), the six Central African states carry a light sub-regional tint, and the other forty-three countries are context outline only. Outline asserts nothing. Range rings are true geodesic circles walked at real great-circle bearings from Douala, not round shapes drawn where a circle would have been convenient; on this projection a constant-distance ring is not a circle, and drawing it round would have been a lie about a real number.

Density comes from ruled structure, not from boxes. Sections are separated by hairlines, not by cards; lists are registers, not grids. The house has one authored moment of motion — the survey inking itself — and nothing else moves. The world is honest about what it does not have: one photograph on the whole site, carrying weight rather than filling a hole; where there is no image, there is no image, no gradient block, no ghost icon, no invented caption.

**Key Characteristics:**
- Two brand inks only; every other value is a derived tint of one of them.
- One radius, 4px, shared by every element that has an edge. Two radii would be two systems.
- Sora for headings, Manrope for running text and labels; mono strictly for measured values.
- Hairline rules and full-bleed colour bands instead of cards and shadows.
- One motion: the survey inks itself, once, from a visible default.
- The header is transparent at rest; the survey runs edge to edge beneath it.

## Colors

Two printing inks on pale paper, with every other colour derived from one of them — nothing in the palette is a new hue.

### Primary
- **Survey Blue** (`{colors.blue}`): the first plate. Cameroon's national fill at 92% opacity, context-country outlines at 45%, the graticule at 12–16%, marker rings. Used at page scale as area and line, never as running text.
- **Deep Blue** (`{colors.blue-deep}`): the working blue for anything with words in it — links, sheet labels, legend symbols at rest, the discipline subline on detail heroes, input focus borders. This is the accessible member of the blue family (7.3:1 on sheet).
- **Abyss Blue** (`{colors.blue-abyss}`): the hero ground, sub-regional and national country strokes, continental country lettering, and the hover state of ink-filled buttons. The footer is blue carried to its floor, not a neutral black.
- **Map Tint** (`{colors.blue-tint}`): the sub-regional fill at 60% opacity, the footer scale bar, and body text on the abyss footer.
- **Wash Blue** (`{colors.blue-wash}`): the lightest derived blue, for the faintest survey and panel grounds.
- **Night** (`{colors.night}`): Ink pushed to near-black, the footer ground. The footer's logo video blends onto it in `lighten`, under a dark veil, so the text reads in front.
- **Bright Blue** (`{colors.blue-bright}`): Survey Blue lifted for small text on Night (6.1:1; Survey Blue itself is 4.2:1 there and only sets the large footer headline and year).

### Secondary
- **Marker Orange** (`{colors.orange}`): the second plate. Geodesic range rings, routing arcs, the Douala marker, the CTA band, the 3px registration stripe above the footer, selection highlight, focus ring, caret. It is the site's only accent and it is always either a mark or an action.
- **Deep Orange** (`{colors.orange-deep}`): the hover tint for legend symbols, navigation items and small orange indications, and the error border and message colour on form fields. Used where orange must appear at small size.

### Neutral
- **Map Paper** (`{colors.sheet}`): the page ground under everything.
- **Shaded Paper** (`{colors.sheet-deep}`): the ground behind a survey band and behind an image before it loads.
- **White Paper** (`{colors.paper}`): the raised plane — cartouches, the scrolled header bar, alternating full-width sections, form fields, and the reversed-out `CAMEROUN` label on the densest fill.
- **Ink** (`{colors.ink}`): headings, emphasised body copy, the ink-filled button, ring labels, marker leader lines, and all text set on orange.
- **Body Ink** (`{colors.body}`): running paragraph text and secondary field labels.
- **Rule** (`{colors.rule}`) and **Soft Rule** (`{colors.rule-soft}`): the two hairline weights. `rule` divides sections and cartouche compartments; `rule-soft` divides rows inside a list and closes a survey band.

### Named Rules

**The Two Plates Rule.** There are exactly two inks. Every value in the palette is one of them, a darkening of one of them, or paper. Never introduce a third hue — not a green success state, not a red error. Errors are Deep Orange.

**The Ink-Not-Text Rule.** Survey Blue tops out at 4.0:1 on the sheet and Marker Orange at 2.8:1. Both are fills, strokes and marks — and, for orange, a ground. Neither ever sets small text. Text on orange is Ink (5.8:1). Links and technical labels are Deep Blue (7.3:1). Body on sheet is 6.1:1; Ink on sheet is 14.3:1.

**The Reversal-On-Density Rule.** A label that falls on the national fill reverses out to White Paper. `CAMEROUN` is set in Paper because Ink measures 2.97:1 on that fill while Paper measures 4.58:1. Measure the label against the fill it actually lands on; do not assume the page ground.

**The Inversion Rule.** An orange action inverts on hover to Ink ground with Paper text. It never darkens to Deep Orange with white text — that combination measures 3.95:1 and fails. The ink-filled button on the orange plate inverts downward instead, to Abyss Blue.

## Typography

**Display Font:** Sora (variable; falls back to system-ui, sans-serif) — `h1`–`h4` and `font-display`
**Body Font:** Manrope (variable; falls back to system-ui, sans-serif) — body, labels, buttons
**Mono Font:** JetBrains Mono (falls back to ui-monospace, monospace)

**Character:** A dense, round geometric for titles — the same drawing family as the logo lettering — over an open, highly legible grotesque for reading. Titles are semibold and tight-tracked; sheet labels are small, bold, uppercase and widely tracked; the mono appears only where a real number does.

### Hierarchy

The ramp as the build actually sets it, largest to smallest:

- **Display** (Sora 600, `clamp(2.375rem, 6vw, 4.75rem)`, 1.02, -0.04em): the page headline, one per page.
- **Display Sheet** (700, `clamp(1.875rem, 8vw, 4.75rem)`, uppercase): the expertise detail hero verb, scaled lower at the bottom so the longest verb survives a 390px viewport in one piece. Its discipline subline is `clamp(1.125rem, 2.4vw, 1.75rem)`, 600, normal-case, Deep Blue.
- **Headline** (Sora 600, `clamp(1.75rem, 3.4vw, 2.75rem)`, 1.08, -0.035em): section titles set by `h2`.
- **Statement** (700, 2rem, 1.08): the upper half of the detail-intro pair, from `sm` up. The largest fixed (non-clamp) size in the build.
- **Headline Small** (700, 1.75rem, 1.1): the base of the detail-intro statement (`1.75rem` → `2rem` at `sm`) and the upper half of the expertise lead entry (`1.5rem` → `1.75rem` at `sm`). Both live as responsive pairs, never as fixed sizes.
- **Title** (700, 1.5rem): a lead register entry heading and the mobile-menu link. Its base size is `1.5rem`; `1.75rem` is where its pair lands at `sm`.
- **Title Small** (600, 1.1875rem, 1.25): the default `h3`, entry and row headings inside registers.
- **Subtitle** (600, 1rem, 1.3): the default `h4`.
- **Lead Large** (400, 1.125rem, 1.65): the hero subtitle at `lg` and up, and a section's opening paragraph.
- **Lead** (400, 1.0625rem, 1.65): the hero subtitle below `lg` and detail subtitles. Cap at 38–46ch.
- **Body** (400, 1rem, 1.65, Body Ink): the document default set on `body`. Prose caps at 62–70ch.
- **Interface** (500, 0.9375rem): the dense in-component text step — legend rows, dropdown rows, footer links, form-field values. The most-used size in the build after body.
- **Measured** (JetBrains Mono, 0.8125rem, tabular figures): bands, throughput, contention ratios, distances, coordinates, addresses.
- **Action** (700, 0.8125rem, 0.09em tracking, uppercase): every button and link-button label.
- **Label** (Manrope 700, 0.6875rem, 0.12em tracking, uppercase, Deep Blue): the `sheet-label`, the site's universal small caption. Legend headings, field labels, measured-value keys, footer column heads, navigation items, language tabs. Always a `<p>`, `<span>` or `<dt>`, never a heading element.

**In-sheet lettering** is set in SVG attribute units, not CSS rem: country names at `15 × textScale`, ring labels at `13 × textScale`. The sheet is reproduced at wildly different physical sizes, so its lettering is scaled to the reproduction (`textScale` 2.2–2.4 on mobile bands) the way a printed map is, not to the coordinate system. A rem-based CSS class would override the SVG attribute and flatten every label to one size.

**Steps the build uses that this ramp treats as redundant, recorded as findings rather than dropped:** `0.75rem` (one use, the desktop header contact button — it should be Action at `0.8125rem` or Label at `0.6875rem`), `0.875rem` (one use, the expertise sub-list row — it should be Interface at `0.9375rem`), `0.625rem` (one use, the footer scale-bar caption — a deliberate micro-caption under a 160px graphic, defensible but not a system step), and `1.25rem`/`1.375rem` (one use each, the detail-domain `h3` and the contact-form `h2` — both sit unclaimed between Title Small and Title). New surfaces should not reach for these five; they are the ramp's loose ends, not steps in it.

### Named Rules

**The Two-Families Rule.** Sora sets headings and any large display text that is not a heading element (add `font-display`: menu entries, the footer year, the 404 code). Manrope sets everything read at length and every small label. No third text family; no `font-stretch` — neither face has a width axis.

**The Measured-Mono Rule.** The mono is reserved for genuinely measured values — a distance, a band, a rate, a coordinate. It is never a costume for technical-sounding prose, and never for a place name (the hero legend sets its place name in Body Ink for exactly this reason). It carries no colour of its own by design: the class is declared after Tailwind's utilities, so a colour baked into it would beat every `text-*` at the call site and break it on the dark footer.

**The Measure-On-The-Element Rule.** A `ch` cap belongs on the text element itself, never on a wrapper. `ch` resolves against the carrying element's own font-size, so a `max-w-[54ch]` on a 16px wrapper throttles a 48px heading to a fraction of its intended measure. This has now caused four real line-break regressions across two passes; both of the most recent were fixed by moving the cap off the wrapper `div` onto the `h1`/`p` itself. Use `rem` caps for headings (`max-w-[36rem]`) and `ch` caps directly on paragraphs. If you find a `max-w-[Nch]` on a `div`, it is a bug.

## Layout

A single centred container at `92rem` with a three-step gutter: 24px at base, 40px from `lg`, 64px from `xl`. Vertical bands run 64–80px at base and 80–112px from `lg`.

Sections alternate ground — Map Paper, White Paper, Map Paper — and every section boundary is a `border-t border-rule` hairline. There is no card-grid page scaffold anywhere. Content sits either in a two-column ruled split (`lg:grid-cols-[1.05fr_0.95fr]`, `lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]`, `lg:grid-cols-[minmax(0,1fr)_20rem]`) or in a vertical register of hairline-separated rows. Registers are bounded to `66rem` even inside the wide container: a marginal column stranded 300px from its text reads as a defect, not as margin.

The responsive break is `lg`, and it is a re-composition rather than a reflow. Below `lg`, the survey is a full-width band and the legend cartouche **overlays** it (`-mt-16` on the block that follows the band): the legend belongs to the map, not to the text that comes after it. At `lg` and up the survey occupies a bleed panel on the right (from `left-[34%]` to `right-[-10%]`) while the headline sits in the quiet zone on the left, capped at `min(46rem, 50%)`, and the legend cartouche sits at the end of Douala's leader line. The two arrangements are written as separate blocks, not one grid bent into shape.

The hero survey bands **do not reserve header height** on either the homepage or the expertise sheets. The header is transparent at rest, so the sheet runs edge to edge underneath it and the continent is not clipped by a bar that is not there.

**The Left-Aligned Continent Rule.** Desktop sheets set `preserveAspectRatio="xMinYMid meet"`. The continent's viewBox is portrait (`0 0 1000 1107.93`); centring it inside a landscape panel pushed Cameroon under the legend cartouche. Left-align the sheet in its panel and let the empty Atlantic fall off the right edge.

**The Layered Cascade Rule.** Everything in `globals.css` beyond `@theme` lives inside `@layer base` or `@layer components`. Unlayered CSS beats every layered Tailwind utility regardless of specificity, so an unlayered `.measured` or `a { color }` would win over a `text-paper` at the call site and silently break colour on the footer and on buttons. A future edit that removes the layer wrappers breaks the palette everywhere at once.

**The Define-Once Geometry Rule.** Country path data is declared exactly once per page, in `SheetDefs`, mounted in the locale layout; every sheet references it through SVG `<use href="#geo-XXX">`. The continent is 21.7 KB of path data and the sheet renders twice per page (a below-`lg` composition and an above-`lg` one). Inlining the paths would double every page's HTML for an audience explicitly on weak connections. Any new sheet, panel or thumbnail that needs country geometry references the shared defs; it never re-emits a `d` attribute.

## Elevation & Depth

The sheet is flat. Depth comes from ground changes (Map Paper to White Paper to the Abyss Blue footer) and from hairline rules, not from stacked surfaces. Shadow is used three times in the whole system and only where a plane genuinely floats above the page: the legend cartouche, the navigation dropdown, and the header once it has scrolled. All three are the same shadow idea — ink-tinted, pushed far down, heavily negative-spread so no edge glow appears.

### Shadow Vocabulary
- **Cartouche lift** (`box-shadow: 0 18px 44px -22px rgba(20,32,43,0.5)`): the legend cartouche resting over the survey.
- **Panel lift** (`box-shadow: 0 20px 44px -26px rgba(20,32,43,0.55)`): the navigation legend dropdown.
- **Header settle** (`box-shadow: 0 10px 24px -18px rgba(20,32,43,0.55)`): the header past 20px of scroll only.

### Named Rules

**The Flat Sheet Rule.** A shadow means "this plane is above the paper". Sections, cards, images, form fields and buttons are never shadowed. If a new element wants a shadow, it probably wants a hairline border instead.

**The Header-Earns-Its-Paper Rule.** The header has no ground of its own. At rest it is transparent with a transparent bottom border and no shadow, so the survey shows through it. Past 20px of scroll it acquires all three at once — White Paper ground, Rule border, Header settle shadow — over a 300ms transition on `background-color, border-color, box-shadow`. Paper under the bar is a response to scroll, never a default.

## Shapes

**One radius: 4px (`--radius-sheet`), and it is shared.** Buttons, the language tabs, form fields, the menu toggle and the `.cartouche` all take it. The client asked for slightly rounded actions; a single token carries that request everywhere so the house stays one system rather than two. Full-bleed bands, survey panels, section grounds and the registration stripe have no radius because they have no edge to round — that is a consequence of being full-bleed, not a second corner rule.

The recurring form is the **cartouche**: a White Paper block with a 1px Rule border at 4px radius, compartmented internally by more Rule hairlines (a titled head, a body, a ruled foot holding the action). It is the site's structural brick and appears as the hero legend, the navigation dropdown and the contact form.

The second recurring form is the **hairline register**: a stack of rows separated by Soft Rule, opened and closed by Rule, with no background of its own. Lists, domain entries, contact details and the expertise index are all registers.

Accent is applied as a left rule, not a fill: measured values and standout paragraphs carry a 1px Marker Orange left border with 14px of padding. Emphasis is a mark in the margin, the way a surveyor annotates.

## Components

### Buttons
- **Shape:** 4px radius (`{rounded.sheet}`), no border on filled variants.
- **Action (primary):** Marker Orange ground, Ink label, uppercase Action type. Padding 10px/20px in the header, 12px/20px in the legend foot, 14px/24px full-width on the form.
- **Hover / Focus:** ground goes to Ink, label to Paper, 200ms colour transition. Focus is the global 2px Marker Orange outline at 3px offset.
- **Ink (on the orange plate):** Ink ground, Paper label, 16px/28px, with an inline arrow that nudges right on hover; hover ground goes to Abyss Blue.
- **Outline:** 1px Ink border on the section ground, Ink label; hover fills to Ink with Paper label. Used for "open sheet" on lead register entries.

### Cards / Containers
There are no cards. The container is the **cartouche**: 4px corners, White Paper ground, 1px Rule border, internal compartments divided by Rule hairlines, 20px horizontal padding for list bodies and 24–32px for form bodies. Shadow only when it floats over the survey (see Elevation & Depth).

### Inputs / Fields
- **Style:** 1px Rule border on White Paper, 4px radius, 10px/14px padding, 0.9375rem Ink text, Body Ink placeholder. Labels sit above the field in sheet-label type. The select uses an inline SVG chevron in Body Ink, never a native arrow.
- **Hover / Focus:** border darkens to Body Ink on hover; on focus the border becomes Deep Blue and the native outline is suppressed in favour of the global orange focus-visible ring.
- **Error:** border and message both Deep Orange, message at 0.8125rem directly under the field, wired through `aria-invalid` and `aria-describedby`.

### Navigation
The header is the sheet's title cartouche, but only once you have moved: fixed, 4.25rem tall, transparent at rest, White Paper with a Rule hairline and Header settle shadow past 20px of scroll.

The primary nav is **absolutely centred on the viewport** (`absolute left-1/2 -translate-x-1/2`), not centred in the leftover flex space. The logo on the left and the action cluster on the right have different widths, so flex centring put the menu visibly off-axis. Because the nav is out of flow, the action cluster is pushed right with `ml-auto` at every width.

Items are sheet labels that shift to Deep Orange on hover. The expertise dropdown is a cartouche legend — stroke symbol, name, legend code per row — appearing on hover and on `focus-within`. The client logo sits at the left at `h-9`, displayed as supplied. An orange quote action is present at every width, including a compact `h-10` variant below `md`, because the quote is what a mobile visitor came for.

**Language tabs:** two lettered codes, FR and EN, in a single 4px-radius Rule-bordered group with `overflow-hidden` and a Rule divider between them; the active tab is Ink ground with Paper text. No flags — a language is not a country.

### Coverage Sheet (signature)
The survey is the site's signature component and the reason the world is not decoration. It renders 50 African countries from real public-domain borders in a Mercator projection (viewBox `0 0 1000 1107.93`), a 10° graticule of meridians and parallels, orange geodesic range rings that are true kilometres from Douala, orange routing arcs to real regional cities, and a stamped orange-and-ink marker at Douala.

Its coverage claim is graded and each grade means something:
- **National** — Cameroon alone, Survey Blue at 92% with an Abyss Blue stroke. The densest fill on the sheet.
- **Sub-regional** — Chad, Central African Republic, Equatorial Guinea, Gabon, Congo, DR Congo: Map Tint at 60% with a Deep Blue stroke.
- **Context** — the remaining 43 countries: outline only, Survey Blue at 45% opacity, no fill. Outline situates; it claims nothing.

Rings are computed by `geodesicRing`, which walks real great-circle bearings so the ring lands where the distance actually falls; ring labels are placed by `geodesicPoint` at a real bearing of 200°, out over the Gulf of Guinea, because that is the only quadrant where labels neither stack on each other nor collide with country names. Each expertise gets its own configuration: rings where reach is the subject, arcs where logistics is, nothing where the zone alone says it.

Country labels are only drawn where they fit. At continental scale Gabon, Congo and Central African Republic are unlabelled — too small to letter without colliding — and are read from the legend cartouche instead. A map letters what it can letter.

Its motion is the site's only authored moment: strokes ink in via `ink-stroke` (SVG stroke-dash, 900–1100ms), the marker stamps via `ink-stamp` (460ms), fills and labels arrive via `ink-settle` (400–700ms), all on the single `--ease-ink` curve (`cubic-bezier(0.16, 1, 0.3, 1)`) and all `backwards`-filled from a visible default, so the drawing is complete and correct with animation disabled. `prefers-reduced-motion: reduce` collapses every animation and transition to 0.01ms globally.

### Legend Symbol and Registration Marks
Legend entries are drawn with stroke symbols — a three-node link, a stepped source line, a transmitted pair, a survey point, a routing arc — one 1.7-unit weight, round caps, no box and no fill. They read Deep Blue at rest and Deep Orange on hover or where they mark a lead entry. Registration marks are drawn twice, blue then orange offset half a point, and their box is always positioned by the caller.

### Graticule
Two graticules, one idea. In CSS, `.graticule` is an 88px grid of 12%-blue hairlines used as the ground beneath survey areas and page heads. In the sheet itself, the graticule is drawn as real meridians and parallels every 10° at 16% opacity. The project's `codex-grid-background` detector rule is waived inline for `.graticule` with the reason recorded in `globals.css`: the rule reserves the pattern for map, plan and measurement surfaces, and this is one. Do not extend the graticule to non-survey surfaces; the waiver covers a map ground, not a decorative texture.

## Do's and Don'ts

### Do:
- **Do** keep the palette to the two inks and their derived tints; errors are Deep Orange, not red.
- **Do** set text on orange in Ink, links and technical labels in Deep Blue, and invert orange actions to Ink and Paper on hover.
- **Do** measure a label against the fill it lands on — `CAMEROUN` reverses to Paper because Ink is 2.97:1 on the national fill.
- **Do** use the single 4px `--radius-sheet` token on every element that has an edge; one radius, one system.
- **Do** set large non-heading display text with `font-display` so it stays in Sora.
- **Do** reserve the mono for genuinely measured values, and leave it colourless so the call site can set its colour.
- **Do** put `ch` measures on the text element itself and `rem` measures on headings.
- **Do** reference country geometry through `<use href="#geo-XXX">` from the shared `SheetDefs`; never re-emit path data.
- **Do** let the header be transparent at rest and earn its paper, border and shadow on scroll.
- **Do** left-align the continent in a desktop panel (`xMinYMid meet`) so Douala clears the legend.
- **Do** display the client logo as supplied, at `h-9` in the header and `h-10` in the footer, with no recolouring, cropping or re-treatment.
- **Do** state absence plainly: no photograph, no caption and no number is better than an invented one.

### Don't:
- **Don't** set small text in Survey Blue (4.0:1) or Marker Orange (2.8:1), and never pair Deep Orange with white (3.95:1).
- **Don't** introduce a second radius. 4px is the whole corner vocabulary; a pill or a 12px card would be a second system.
- **Don't** reach for `0.625rem`, `0.75rem`, `0.875rem`, `1.25rem` or `1.375rem` — each appears exactly once and none is a step in the ramp.
- **Don't** put a `max-w-[Nch]` on a wrapper `div`; it throttles the heading inside it.
- **Don't** build a card grid, a numbered section, or an eyebrow/kicker line above a heading — the index is a ruled register and headings stand alone.
- **Don't** fill an empty slot with a gradient block, a ghost icon, or a placeholder image.
- **Don't** shadow a section, image, field or button; shadow is reserved to the three planes that genuinely float.
- **Don't** put a symbol or icon inside a box, circle or tile; marks sit directly on the paper.
- **Don't** add a second animation. The survey inks itself and nothing else moves.
- **Don't** draw a range ring as a round shape. On Mercator a constant-distance ring is not a circle; walk the bearings.
- **Don't** fill a context country or letter a country too small to carry its name; the sheet claims only what it can back.
- **Don't** show the graticule on a surface that is not a map, plan or measurement ground — that is the exact scope of the detector waiver.
- **Don't** draw coverage the company cannot evidence: no EIRP contours, no per-zone throughput, no irradiance, no invented coordinates or place captions.
