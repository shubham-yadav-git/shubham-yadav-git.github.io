# React+Vite migration of shubhamy.in portfolio

The site has been rebuilt from scratch as a React+Vite single-page application, replacing a prior static HTML structure. All eight layout sections are present and wired correctly. The full SEO head from the original site — GA tag, meta tags, canonical, OG, Twitter Card, JSON-LD — has been ported verbatim into `index.html`. The design system uses a custom CSS variable palette and IBM Plex fonts with no third-party UI framework in the bundle. A prior review flagged two issues: the `update-blog.yml` path mismatch has since been fixed; the WhatsApp link remains broken.

Watch for: **confirmed** — the WhatsApp contact link (`wa.me/?text=...`) has no phone number; clicking it opens WhatsApp to no recipient.

**Verdict**: NEEDS_CHANGES

---

## High-level view

All eight sections (Hero, About, Skills, Resume, Projects, Blog, Contact, Footer) are rendered in `App.jsx` and each has its own component file. Text content across all sections matches expected personal data — name, email, employer, education, city, social handles.

The SEO head is complete and accurate: GA tag `G-3XF5RXBDSW`, all meta tags, canonical `https://shubhamy.in/`, OG tags, Twitter Card, and the full JSON-LD `@graph` block survive verbatim into `dist/index.html`. IBM Plex Mono and Serif load via Google Fonts. No Bootstrap or icon CDN appears anywhere in the bundle; icons are inline SVGs.

The Blog component's three-tier fetch fallback (live RSS → local JSON → hardcoded array) is implemented correctly. The `update-blog.yml` workflow and `scripts/update-blog.py` both now target `public/assets/data/blog.json`, which Vite copies to `dist/` — the path mismatch from the prior review pass has been resolved.

The deployment config is clean: `vite.config.js` sets `base: '/'`, `package.json` carries `homepage: "https://shubhamy.in"` and a `deploy` script using `gh-pages -d dist`. The `dist/` folder is present with CSS and JS bundles, all `public/` assets at their correct paths, and `CNAME` containing `shubhamy.in`.

---

<details>
<summary>Issues (1)</summary>

1. **WhatsApp link missing phone number** — `Contact.jsx` line 29 uses `https://wa.me/?text=Hi%20Shubham` with no phone number. WhatsApp's deep-link spec requires `https://wa.me/<E.164-number>?text=...` to open a conversation with a specific contact. Without the number, clicking the link opens WhatsApp with no target and the visitor cannot send a message.

</details>

<details>
<summary>Details</summary>

### Broken WhatsApp contact link

`Contact.jsx` renders:

```jsx
href="https://wa.me/?text=Hi%20Shubham"
```

The `wa.me` short-link requires a phone number segment: `https://wa.me/91XXXXXXXXXX?text=Hi%20Shubham`. Without it the URL is malformed for the WhatsApp deep-link spec and in practice opens WhatsApp without a target contact, making it impossible for a visitor to reach Shubham via this channel.

</details>

---

<details>
<summary>File map</summary>

| File | What changed |
|---|---|
| `index.html` | Full SEO head: GA tag, all meta, canonical, OG, Twitter Card, JSON-LD, IBM Plex font preconnects |
| `vite.config.js` | New: React plugin, `base: '/'` |
| `package.json` | New: `homepage`, `deploy` script, React deps, gh-pages devDep |
| `src/main.jsx` | New: React root mount |
| `src/App.jsx` | New: layout shell with all 8 section components |
| `src/index.css` | New: CSS custom property palette (`--bg`, `--accent`, `--code`), global resets |
| `src/hooks/useActiveSection.js` | New: IntersectionObserver-based active section tracker |
| `src/components/Sidebar.jsx` | New: fixed sidebar with inline SVG social icons, mobile hamburger |
| `src/components/Hero.jsx` | New: typewriter animation over 3 phrases |
| `src/components/About.jsx` | New: info grid, WallApp callout |
| `src/components/Skills.jsx` | New: animated skill bars with ARIA progressbar |
| `src/components/Resume.jsx` | New: two-column timeline for education + experience |
| `src/components/Projects.jsx` | New: card grid for 4 projects |
| `src/components/Blog.jsx` | New: 3-tier RSS→JSON→hardcoded fallback, lazy-load images, load-more pagination |
| `src/components/Contact.jsx` | New: contact info items + Google Maps embed |
| `src/components/Footer.jsx` | New: copyright line |
| `public/CNAME` | Preserved: `shubhamy.in` |
| `public/assets/img/*` | Preserved: all image and favicon assets |
| `public/assets/data/blog.json` | Preserved: local blog JSON fallback |
| `.github/workflows/update-blog.yml` | Fixed: `git add` path now targets `public/assets/data/blog.json` |
| `scripts/update-blog.py` | Fixed: `OUTPUT_PATH` now writes to `public/assets/data/blog.json` |

Full diff: `git diff main` from repo root.

</details>
