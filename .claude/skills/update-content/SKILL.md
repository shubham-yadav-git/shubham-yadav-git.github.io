---
name: update-content
description: How to change what shubhamy.in says - add or edit a job, education entry, skill, contact detail, social link, blog feed, or SEO metadata. Use when the owner asks to update resume, skills, about text, links, or the blog list.
---

# Updating site content

Content lives as plain constants or JSX at the top of each component. Edit the data, not the markup, where a constant exists.

| What | Where |
|---|---|
| Name, role line, lede, nav | `src/components/Masthead.jsx` |
| Headline, intro, facts list | `src/components/About.jsx` |
| Jobs (`EXPERIENCE`), education (`EDUCATION`) | `src/components/Resume.jsx` |
| Skill groups (`GROUPS`) | `src/components/Skills.jsx` |
| Email, WhatsApp, Telegram, map | `src/components/Contact.jsx` |
| Social links (`SOCIAL`) | `src/components/Footer.jsx` |
| Blog articles | `src/data/blog.json` (generated) |
| Search/social previews, JSON-LD | `index.html` |
| Sitemap, robots, manifest | `public/` |

## Rules

- **Positioning:** test engineer and backend developer. New skills go in *Testing & Quality*, *Backend* or *Infrastructure*; order each group strongest first. Don't add Android or frontend-focused items back unless the owner asks.
- **Experience** is reverse-chronological: newest job first. Each job: `title`, `date` ("2022 – Present", en dash with spaces), `org` ("Company, City, State"), `points` (past-tense sentences ending with a full stop).
- **Owner's wording:** keep it verbatim unless asked to rewrite. Fix only obvious typos, and mention them.
- **Contact details** appear in several places — About facts, Resume summary, Contact section and intro text, `index.html` JSON-LD. Change all of them together; `grep -rn` the old value first.
- **Sections:** adding or removing one means updating `App.jsx`, the `NAV_LINKS` in `Masthead.jsx`, and renumbering every `Section num`.
- **Blog:** don't hand-edit `src/data/blog.json`. Run `python3 scripts/update-blog.py`; the deploy workflow also runs it daily. The fields are `title`, `link` and `description`.
- **SEO:** if the role or focus changes, update the `<title>`, `description`, `og:*`, `twitter:*` and the JSON-LD `jobTitle`, `description` and `knowsAbout` in `index.html` to match.

After any change, run `npm run build`. Pushing to `master` deploys it.
