---
name: site-design
description: Design system for shubhamy.in — a classic, typeset, single-column look. Use before any visual change to the site - styling, layout, new sections, colours, fonts, components, dark mode, mobile fixes, or "make it look better".
---

# shubhamy.in design system

The site should read like a well-set printed CV or a page from a technical book: timeless, quiet, typographic. It must not look like a UI kit, a SaaS landing page or a portfolio template.

## Principles

1. **Type does the work.** Hierarchy comes from size, weight, italics, small caps and spacing — not from boxes, shadows or colour.
2. **One column, one measure.** Content sits in a centered column `max-width: var(--measure)` (42rem). No sidebars, no multi-column page grids. Two-column grids are allowed only *inside* a section (Skills, the `.facts` list).
3. **Rules, not cards.** Separate things with 1px lines (`var(--rule)`). Never use cards, rounded panels, drop shadows, gradients or background fills to group content.
4. **Restraint with colour.** Ink on paper. The single accent (`--accent`, oxblood) is used only for section numbers, link hover, focus and text selection.
5. **Nothing moves.** No typing effects, scroll animations, parallax, counters or hover lifts. Only the link underline-colour transition (120ms) is allowed.
6. **Text over icons.** Social and external links are written out as words (`GitHub`, `LinkedIn`). No icon fonts, no SVG icon rows, no emoji.
7. **Content over chrome.** The page should lead with testing and backend experience; decoration never competes with it.

## Tokens (`src/index.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#faf8f3` | `#161512` | page background |
| `--ink` | `#1c1a16` | `#e6e1d6` | body text, headings |
| `--muted` | `#6a645a` | `#a19a8c` | intros, orgs, secondary text |
| `--faint` | `#9a9385` | `#6f695e` | labels, numbers, leaders |
| `--rule` | `#ddd6c8` | `#34312a` | hairlines, link underlines |
| `--accent` | `#8a2b1d` | `#d68a74` | section numbers, hover, focus |

Dark mode follows `prefers-color-scheme` only; there is no toggle. Every new colour must be a token defined in both themes. Never hard-code a hex value in a rule.

## Typography

- **Serif** `--font-serif` (Source Serif 4, optical sizing on) for everything readable. Root size 18px, line-height 1.6.
- **Mono** `--font-mono` (IBM Plex Mono) at `0.72rem` for small metadata only: dates, labels in `.facts`, nav, section numbers, percentages. Uppercase + letter-spacing for labels. Never set body copy in mono.
- **Small caps** (`font-variant-caps: all-small-caps; letter-spacing: 0.1–0.12em; font-weight: 600`) for section titles and sub-headings.
- **Italic** for the lede, intros of a personal voice, organisation names and text-style buttons.
- Weights: 400 and 600 only. Fonts are loaded in `index.html`; add a weight there before using it.

## Components (reuse before inventing)

- `Section` (`src/components/Section.jsx`) — every top-level section. Gives `§n` number (hangs in the left margin ≥900px), small-caps title, optional muted intro. Renumber all sections when adding or removing one.
- `.subhead` — small-caps sub-heading inside a section.
- `.entry` — dated item: title + mono date on one line, italic org below, then `.entry__list` (en-dash bullets) or `.entry__desc`.
- `.facts` — `<dl>` label/value grid with mono uppercase labels.
- `.leader` — name ····· value row with dotted leader (Skills).
- `.articles` / `.article` — numbered list (`01`, `02`) separated by rules.
- `.text-button` — buttons look like italic underlined text, never filled pills.
- Links — inherit text colour with a `--rule` underline; hover turns `--accent`.

## Layout and spacing

- Section padding `56px 0`, bottom border `1px var(--rule)`. Masthead top padding 96px.
- Spacing steps in use: 4, 6, 8, 16, 24, 32, 40, 56, 96px. Stay on them.
- Breakpoints: 640px (grids collapse to one column) and 900px (section numbers move into the margin). Side gutter 24px.
- Must work at 360px wide with no horizontal scroll.

## Print

`@media print` turns the page into a one-column CV: hides nav, CTAs, map, blog and buttons. Keep new interactive or decorative elements out of print.

## Don't

- Progress bars, star ratings, skill meters, badges or pills
- Hero background images, profile photo frames, gradients, glassmorphism
- Icon libraries, emoji, animated cursors, typewriter text
- Cards, shadows, border-radius on content blocks
- New fonts or a second accent colour
- Sticky headers or floating buttons

## Checking a change

1. `npm run build` must pass.
2. Look at it light, dark and at ~390px width. With headless Chrome:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --blink-settings=preferredColorScheme=1 --window-size=1280,2000 --screenshot=out.png http://localhost:4173/` (use `preferredColorScheme=0` for dark). Headless Chrome has a ~500px minimum window, so for mobile load the page inside a 390px-wide `<iframe>`.
3. Ask: would this look out of place in a well-designed printed book? If yes, remove it.
