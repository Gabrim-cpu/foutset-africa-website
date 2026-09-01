# FOUTSET AFRICA — Design System

## 1. Visual Theme & Atmosphere

Corporate industrial confidence, not startup-flashy. The site reads as an
infrastructure/engineering consultancy — clean white space, sharp
typographic contrast, restrained color use. Two accent colors only (blue +
orange), pulled directly from the company logo, applied consistently
everywhere. Dark navy-black sections are used sparingly as punctuation
(footer, one card per grid, hero backgrounds on interior pages), never as
the default background.

Mood words: precise, trustworthy, technical, understated. Not playful, not
gradient-heavy, not glassmorphic. Sharp `rounded-2xl` cards and `rounded-full`
pills are the only two corner treatments in the whole system.

## 2. Color Palette & Roles

Exactly two brand colors, extracted pixel-for-pixel from the company logo.
**Never introduce a third accent color or a different shade of blue/orange.**
Do not use Tailwind's default palette (`blue-500`, `orange-500`, etc.) —
every color is an explicit hex value.

| Role | Hex | Usage |
|---|---|---|
| Primary (Blue) | `#2A78C0` | Links, primary text accents, outline buttons, icon fills, CTA section backgrounds, active nav dropdown items |
| Primary hover | `#22609A` | Hover state for blue buttons/links only (darkened blue, not a separate brand color) |
| Secondary (Orange) | `#F07818` | Primary filled buttons, small eyebrow labels, "AFRICA" wordmark half, footer top border gradient |
| Secondary hover | `#c9640f` | Hover state for orange buttons only |
| Ink | `#1A1A1A` | Headings, footer background, dark feature cards |
| Body text | `#555555` | Paragraph copy |
| Muted text | `#666666` / `#888888` / `#999999` | Captions, labels, footer body text (tiered by prominence) |
| Borders | `#E5E5E5` / `#F0F0F0` / `#333333` (on dark bg) | Card borders, dividers |
| Surface tints | `#F5F7FA` / `#F8F9FA` / `#E8ECF0` / `#F0F7FF` / `#CCCCCC` | Section backgrounds, image placeholders, icon badge backgrounds |

Derived tints/shades (hover states) are fine to compute from the two brand
colors. A genuinely new hue is not.

## 3. Typography Rules

Three-font system, applied **by HTML tag globally**, not per-component
utility classes. This is enforced in `app/globals.css`:

```css
h1, h2 { font-family: var(--font-heading); font-weight: 700; }   /* Merriweather Bold */
h3, h4 { font-family: var(--font-subheading); font-weight: 400; } /* Lora Regular */
body, button, input, textarea { font-family: var(--font-sans); }  /* Plus Jakarta Sans */
```

| Level | Font | Weight | Used for |
|---|---|---|---|
| Titles (`h1`, `h2`) | Merriweather | 700 (Bold) | Hero headline, section titles ("Un écosystème d'expertises.", "L'ambition au service du développement.") |
| Subtitles (`h3`, `h4`) | Lora | 400 (Regular) | Card titles, footer group labels that are genuinely content subheadings |
| Body & UI (`p`, `span`, `button`, form fields) | Plus Jakarta Sans | 400 / 700 | Paragraphs, buttons, nav links, micro-labels |

**Rule:** a `<h1>`–`<h4>` tag always gets its font from the cascade — don't
fight it with a `font-*` Tailwind utility. Conversely, small uppercase UI
chrome (nav labels, footer column headers, "01"/"02" section numbers,
eyebrow badges) should use `<p>`/`<span>`, never a heading tag, even if it
looks like one visually — those are body/UI text, not content subtitles.

Sizes in practice: hero `h1` is `text-4xl sm:text-5xl lg:text-6xl`, section
`h2` is `text-3xl sm:text-4xl`, card `h3` is `text-lg`/`text-xl`.

## 4. Component Stylings

**Buttons** — always `rounded-full`, uppercase, letter-spaced
(`tracking-wide`), `text-xs`–`text-sm font-semibold`, `px-6 py-2.5` to
`px-8 py-3.5` depending on prominence:
- Primary: `bg-[#F07818] text-white hover:bg-[#c9640f]`
- Secondary/outline: `border border-[#2A78C0] text-[#2A78C0] hover:bg-[#2A78C0] hover:text-white`

**Cards** — `rounded-2xl`, two variants:
- Light: `bg-white border border-[#E5E5E5]`, optional `hover:shadow-md`
- Dark (featured/grouped): `bg-[#1A1A1A]`, white text at full opacity for
  titles, `text-white/60` for descriptions

**Icons** — hand-built inline SVG, never an icon library/font. Stroke-based,
`fill="none" stroke="currentColor" strokeWidth={1.5}`, `viewBox="0 0 24 24"`.
Icon color is `#F07818` (orange) when paired with body copy, or
`text-white/20`–`/30` when used as a large decorative watermark on a dark or
gradient background.

**Navigation** — fixed header, `h-16`, `bg-white/95 backdrop-blur-sm`
until scrolled then `bg-white shadow-sm`. Dropdown menus use `group-hover` +
`group-focus-within` CSS (no JS state), flush `top-full` positioning, white
panel with `rounded-2xl border border-[#E5E5E5] shadow-lg`.

**Placeholder imagery** — where a real photo isn't supplied yet, use a
`bg-gradient-to-br from-[#2A78C0] to-[#1A1A1A]` block with a large
low-opacity (`white/20`–`/30`) line-icon centered in it. Never leave a bare
gray box.

## 5. Layout Principles

- Container: `mx-auto max-w-7xl px-6 lg:px-8` — used on every section, no
  exceptions.
- Section vertical rhythm: `py-20` to `py-24` for standard sections, `pt-32
  lg:pt-40` for the first section under the fixed header (hero, page-level
  `h1` sections).
- Grid gaps: `gap-6` between cards, `gap-8`–`gap-16` between major columns
  (text/image splits).
- Two-column splits (`lg:grid-cols-2`) are the default for text+image or
  text+card layouts; collapse to a single column below `lg`.
- Card grids follow an explicit asymmetric pattern established on the
  homepage and reused on every expertise detail page: 2 equal feature cards,
  then a `lg:grid-cols-[1fr_2fr]` row (one compact card + one wide dark
  card) — not a uniform 3-up grid.

## 6. Depth & Elevation

Flat by default. Elevation is used sparingly and only for interactive
affordance, never decoratively:
- `hover:shadow-md` on clickable light cards
- `shadow-lg` on the nav dropdown panel only
- No elevation on static content cards, no glassmorphism, no colored glows

## 7. Do's and Don'ts

**Do:**
- Reuse `#2A78C0` / `#F07818` exactly — check this file before adding any
  new color.
- Let heading tags inherit font/weight from the global CSS rule.
- Use `rounded-full` for every button, `rounded-2xl` for every card.
- Build new icons as inline SVG matching the existing stroke style.
- Keep the same asymmetric card-grid pattern for any new "domains/services"
  grid rather than inventing a new grid shape.

**Don't:**
- Don't introduce a new blue, orange, or any other accent hue.
- Don't apply `font-light`/`font-medium`/etc. utilities directly to `h1`–`h4`
  — it's dead weight, the cascade already sets the weight.
- Don't use a heading tag for small uppercase UI labels (nav items, footer
  column headers, eyebrow badges) — use `p`/`span`.
- Don't add drop shadows, gradients-as-decoration, or rounded corners other
  than `2xl`/`full` without a specific reason.
- Don't fabricate stock photography — use the established gradient+icon
  placeholder pattern until a real asset is supplied.

## 8. Responsive Behavior

Mobile-first Tailwind breakpoints, only `sm:`, `md:`, `lg:` are used
project-wide (no `xl:`/`2xl:` overrides so far):
- `md:` — nav switches from the hamburger/full-screen mobile menu to the
  inline desktop nav + language switcher + CTA button (`hidden md:flex`).
- `lg:` — two-column section layouts collapse to one column below this;
  hero/detail-page image panels stack below their text column.
- `sm:` — used for intermediate type-scale and grid-column bumps
  (`sm:text-4xl`, `sm:grid-cols-2`, `sm:grid-cols-3`).

Mobile menu is a full-screen white overlay (`fixed inset-0 z-40`) with
staggered fade/slide-in per item, not a slide-out drawer.

## 9. Agent Prompt Guide

Quick copy-paste reference for prompting an agent to extend this site:

> Build using the FOUTSET AFRICA design system (see DESIGN.md): brand blue
> `#2A78C0` and brand orange `#F07818` only, plus the existing neutral
> grayscale — no other colors. Headings (`h1`/`h2`) render in Merriweather
> Bold and subtitles (`h3`/`h4`) in Lora Regular automatically via global
> CSS — don't add font-weight utilities to them. Body text, buttons, and
> forms use Plus Jakarta Sans. Buttons are `rounded-full`, cards are
> `rounded-2xl`. Container is `mx-auto max-w-7xl px-6 lg:px-8`. Icons are
> hand-drawn inline SVG (stroke, `currentColor`, 24×24 viewBox) — never an
> icon library. All user-facing strings go into `messages/fr.json` and
> `messages/en.json` (next-intl), never hardcoded in components.

Color swatch reference:
```
Blue   #2A78C0  (hover: #22609A)
Orange #F07818  (hover: #c9640f)
Ink    #1A1A1A
Body   #555555
```
