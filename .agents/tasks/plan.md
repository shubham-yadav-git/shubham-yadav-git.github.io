# Implementation Plan: React 18 + Vite Portfolio

## Context from Exploration

**Repo:** `shubham-yadav-git/shubham-yadav-git.github.io` — single HTML file site, no existing `package.json`.  
**Branch:** `master` (GitHub Pages serves from master root).  
**Domain:** `shubhamy.in` (CNAME file must stay at repo root).  
**Node:** v24.6.0 / npm 11.5.1 available.  
**Files that must not be touched:** `.github/workflows/update-blog.yml`, `CNAME`, `robots.txt`, `sitemap.xml`, `app-ads.txt`, `scripts/update-blog.py`, `assets/data/blog.json`, `assets/img/*`.  
**Projects section:** The nav links to `#projects` but no corresponding `<section id="projects">` exists in the current HTML. The CSS has `.project-card` / `.featured-project` rules, but they are unused stubs. The only "project" content is the WallApp subtle mention inside `#about`. The React site will add the projects section that was clearly intended.  
**Design system:** Dark theme, CSS custom properties (`--bg`, `--primary: #c9a66b`, `--muted`, etc.), Raleway headings, Open Sans body, Poppins accents, Montserrat sidebar logo. The new React version preserves every CSS variable and visual rule wholesale.  
**Deployment decision:** `gh-pages` npm package deploys the Vite `dist/` output to a `gh-pages` branch. GitHub Pages is configured on that branch. The workflow `update-blog.yml` commits to `master` (not `gh-pages`), so there is no conflict.  
**Blog workflow compatibility:** `update-blog.yml` commits `assets/data/blog.json` to `master`. Vite's `public/` directory is copied verbatim into `dist/`, so `public/assets/data/blog.json` in the React build will always reflect the latest committed version. A fresh `npm run deploy` after the workflow runs keeps them in sync. This is the simplest approach and avoids any GitHub Actions changes.

---

## Step 1 — Initialise Vite + React in-place

**What:** Run `npm create vite@latest . -- --template react` in the repo root with `--` to bypass the "directory not empty" prompt. Then install `gh-pages` and icon/animation dependencies. Delete only the Vite scaffold noise (`src/App.css`, `src/App.jsx`, `src/assets/react.svg`, `public/vite.svg`) — nothing else from the existing repo is removed.

**Decision:** Use Vite's `react` template (plain JS + JSX, not TypeScript). The existing codebase is vanilla JS; introducing TypeScript would require annotating all copied content and adds friction without benefit for a single-developer portfolio. JSX is sufficient.

**Files created/modified:**
- `package.json` — created by Vite scaffold
- `vite.config.js` — created by scaffold, then edited (see step 2)
- `index.html` — scaffold creates a new one at root; it will be replaced entirely in step 3
- `src/main.jsx` — scaffold creates; edited in step 5
- `src/App.jsx` — scaffold creates; deleted and replaced in step 4
- `.gitignore` — created by scaffold (adds `node_modules`, `dist`)

**Dependencies to install after scaffold:**
```
npm install gh-pages
npm install @fontsource/open-sans @fontsource/raleway @fontsource/poppins @fontsource/montserrat
```
These replace the Google Fonts CDN link with bundled fonts for offline reliability and eliminate an external render-blocking request.

**Verify:** `npm run dev` starts the Vite dev server without errors (the default Vite counter page loads). This confirms the scaffold worked.

---

## Step 2 — Configure `vite.config.js` and `package.json` scripts

**What:** Edit `vite.config.js` to set `base: '/'` (the site is served from the apex domain `shubhamy.in`, not a GitHub Pages subpath, because CNAME is set). Add `predeploy` and `deploy` scripts to `package.json`.

**vite.config.js final content:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
```

**package.json scripts to add:**
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist -b gh-pages"
```

The `-b gh-pages` flag pushes Vite output to the `gh-pages` branch, keeping `master` clean and leaving `update-blog.yml` untouched.

**Files modified:**
- `vite.config.js`
- `package.json`

**Verify:** `npm run build` produces a `dist/` directory with an `index.html` at its root.

---

## Step 3 — Migrate static assets to `public/`

**What:** Copy (not move) the following into `public/` so Vite serves them as-is. The originals in `assets/` remain for now — `update-blog.yml` commits directly to `assets/data/blog.json` on `master`, and that file in `public/` is what the React app fetches at runtime.

**Copies to make:**
```
assets/img/             → public/assets/img/        (all files verbatim)
assets/data/blog.json   → public/assets/data/blog.json
assets/css/hero-bg.jpg  → public/assets/css/hero-bg.jpg   (referenced by CSS if needed)
app-ads.txt             → public/app-ads.txt
robots.txt              → public/robots.txt
sitemap.xml             → public/sitemap.xml
CNAME                   → public/CNAME
```

`assets/img/site.webmanifest` references icon paths as `assets/img/android-chrome-*.png`. Since the manifest is at `public/assets/img/site.webmanifest`, those relative paths resolve correctly from the root — no path changes needed inside the manifest.

**Decision:** Keep `CNAME` and `robots.txt` in both repo root and `public/`. The repo root copies satisfy any direct GitHub browsing; `public/CNAME` ensures `gh-pages` deploy includes it in `dist/` so GitHub Pages respects the custom domain after every deploy.

**Files created:**
- `public/assets/img/*` (12 image/icon files)
- `public/assets/data/blog.json`
- `public/assets/css/hero-bg.jpg`
- `public/app-ads.txt`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/CNAME`

**Verify:** After `npm run build`, confirm `dist/CNAME`, `dist/robots.txt`, `dist/sitemap.xml`, `dist/app-ads.txt`, and `dist/assets/img/favicon.ico` all exist.

---

## Step 4 — Replace root `index.html` with full head content

**What:** Replace the Vite-scaffolded `index.html` with one that carries all existing `<head>` content verbatim. The `<body>` contains only `<div id="root"></div>` and the Vite module script. All vendor CSS links are removed — Bootstrap, Boxicons, Bootstrap Icons, AOS, Glightbox, Swiper — because they will be pulled in as npm packages in the next step.

**Full `<head>` contents to preserve (copy exact text from existing `index.html`):**
1. Google Analytics `<script async src="https://www.googletagmanager.com/gtag/js?id=G-3XF5RXBDSW">` + inline config script
2. All `<meta>` tags: charset, viewport, title, description, keywords, author, robots, canonical, theme-color, geo tags, OG tags, Twitter card tags
3. DNS prefetch / preconnect links
4. Favicon links (`/assets/img/favicon.ico`, `/assets/img/apple-touch-icon.png`)
5. `<link rel="manifest" href="/assets/img/site.webmanifest">`
6. The full JSON-LD `<script type="application/ld+json">` block (Person, WebSite, ProfilePage, WallApp WebApplication, 3× SoftwareApplication)
7. No Google Fonts `<link>` — fonts are now bundled via `@fontsource/*`

**Note on favicon paths:** change `assets/img/...` → `/assets/img/...` (leading slash) so they resolve correctly regardless of route.

**Files modified:**
- `index.html` (repo root)

**Verify:** `npm run dev`, open browser, check DevTools Network tab — GA script loads, favicon appears in browser tab, no 404s for manifest or icons.

---

## Step 5 — Install npm packages and configure `src/main.jsx`

**What:** Install all vendor dependencies that replace the old `assets/vendor/` folder. Then update `src/main.jsx` to import global CSS and fonts.

**npm packages to install:**
```
npm install bootstrap bootstrap-icons boxicons aos
```

**Decision on typed text:** The existing `typed.js` vendor library is replaced with a custom `useTyped` hook (step 10) implemented from scratch — it's ~30 lines and removes the need for a heavy library dependency.

**Decision on Waypoints / Swiper / GLightbox / Isotope:** These were used by the original iPortfolio template for features not present in the current content (lightbox gallery, portfolio isotope filters, testimonials slider, pure counter). None of these appear in the active (non-commented) HTML. They are dropped entirely. Skills bar animation will use an IntersectionObserver hook instead (step 11). This keeps the bundle lean.

**`src/main.jsx` imports in order:**
```js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'boxicons/css/boxicons.min.css'
import 'aos/dist/aos.css'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/raleway/300.css'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/500.css'
import '@fontsource/raleway/600.css'
import '@fontsource/raleway/700.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**Files modified:**
- `src/main.jsx`
- `package.json` (new deps added)

**Verify:** `npm run dev` — no import errors in console, fonts render correctly in the browser.

---

## Step 6 — Create `src/index.css` (global styles + CSS variables)

**What:** Create `src/index.css` containing the full content of `assets/css/style.css` verbatim. No style rules change — this preserves the exact visual design. Add one rule at the top for AOS initialization fix (AOS requires `[data-aos]` to be visible before init in React). Remove `@import` for Google Fonts (already handled via `@fontsource` in `main.jsx`).

**The only addition** is at the bottom:
```css
/* AOS default hidden state fix for React */
[data-aos] {
  pointer-events: auto !important;
}
```

**Files created:**
- `src/index.css`

**Verify:** `npm run dev` — the background gradient is dark (`#0d1318`), body font is Open Sans, headings use Raleway. Visually matches the original.

---

## Step 7 — Create `src/App.jsx`

**What:** The top-level app component. It renders all section components in order and initialises AOS after mount via `useEffect`. It also manages the mobile nav toggle state.

```jsx
// src/App.jsx
import { useEffect, useState } from 'react'
import AOS from 'aos'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Resume from './components/Resume.jsx'
import Projects from './components/Projects.jsx'
import Blog from './components/Blog.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false })
  }, [])

  return (
    <>
      <i
        className={`bi ${mobileNavOpen ? 'bi-x' : 'bi-list'} mobile-nav-toggle d-xl-none`}
        onClick={() => setMobileNavOpen(v => !v)}
      />
      <Header mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
      <Hero />
      <main id="main">
        <About />
        <Skills />
        <Resume />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
```

**Files created:**
- `src/App.jsx`

**Verify:** `npm run dev` — page renders without white screen; React DevTools shows component tree.

---

## Step 8 — Create `src/hooks/useActiveSection.js`

**What:** Custom hook that uses `IntersectionObserver` to track which section is currently in the viewport and returns the active section ID. This replaces the scroll-position arithmetic in `main.js`.

**Decision:** `IntersectionObserver` with `rootMargin: '-40% 0px -55% 0px'` fires when the middle strip of the viewport crosses a section boundary, which gives a natural "current section" feel matching the original `position >= section.offsetTop` logic.

```js
// src/hooks/useActiveSection.js
import { useState, useEffect } from 'react'

export default function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const observers = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [sectionIds])

  return activeId
}
```

**Files created:**
- `src/hooks/useActiveSection.js`

**Verify:** No build errors (`npm run build`). Functional verification happens when Header is tested in step 9.

---

## Step 9 — Create `src/hooks/useTyped.js`

**What:** Custom hook that replicates `typed.js` behaviour — types strings from an array, deletes them, and loops. Used by the Hero component.

```js
// src/hooks/useTyped.js
import { useState, useEffect, useRef } from 'react'

export default function useTyped(strings, { typeSpeed = 100, backSpeed = 50, backDelay = 2000 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const state = useRef({ strIdx: 0, charIdx: 0, deleting: false, timer: null })

  useEffect(() => {
    const s = state.current
    function tick() {
      const current = strings[s.strIdx]
      if (!s.deleting) {
        s.charIdx++
        setDisplayed(current.slice(0, s.charIdx))
        if (s.charIdx === current.length) {
          s.deleting = true
          s.timer = setTimeout(tick, backDelay)
          return
        }
      } else {
        s.charIdx--
        setDisplayed(current.slice(0, s.charIdx))
        if (s.charIdx === 0) {
          s.deleting = false
          s.strIdx = (s.strIdx + 1) % strings.length
        }
      }
      s.timer = setTimeout(tick, s.deleting ? backSpeed : typeSpeed)
    }
    s.timer = setTimeout(tick, typeSpeed)
    return () => clearTimeout(s.timer)
  }, [strings, typeSpeed, backSpeed, backDelay])

  return displayed
}
```

**Files created:**
- `src/hooks/useTyped.js`

**Verify:** `npm run build` — no errors. Functional verification happens in Hero (step 10).

---

## Step 10 — Create `src/hooks/useSkillsAnimation.js`

**What:** Custom hook using `IntersectionObserver` to trigger skill progress bars to animate to their target width when the skills section scrolls into view. Replaces the Waypoint logic from `main.js`.

```js
// src/hooks/useSkillsAnimation.js
import { useState, useEffect, useRef } from 'react'

export default function useSkillsAnimation() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return { ref, animated }
}
```

**Files created:**
- `src/hooks/useSkillsAnimation.js`

**Verify:** `npm run build` — no errors.

---

## Step 11 — Create `src/components/Header.jsx`

**What:** Fixed left sidebar with logo card, social links, and nav. Uses `useActiveSection` hook to highlight the current section. Clicking a nav link scrolls smoothly and closes the mobile nav.

**Sections tracked:** `['hero', 'about', 'skills', 'resume', 'projects', 'blog', 'contact']`

The logo card replicates the `.opt4-card` with wavy SVG line decoration. Social links are identical to the original. Nav items are identical (Home, About, Resume, Projects, Blog, Contact).

Smooth scroll on nav click: `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`.

Mobile nav: the `mobileNavOpen` prop from `App.jsx` adds/removes `mobile-nav-active` class on `<body>` via `useEffect`.

**Files created:**
- `src/components/Header.jsx`

**Verify:** `npm run dev` — sidebar renders, nav links highlight as you scroll, mobile toggle opens/closes sidebar on narrow viewport.

---

## Step 12 — Create `src/components/Hero.jsx`

**What:** Full-viewport hero section. Uses `useTyped` hook with strings `['reliable test automation', 'robust testing frameworks', 'better developer workflows']`. Renders the badge, hero name (`hero-name` class, hidden on desktop per existing CSS), typed text, and action buttons.

```jsx
// structure mirrors existing HTML exactly:
// <section id="hero">
//   <div class="hero-container" data-aos="fade-in">
//     <div class="hero-card">
//       <span class="hero-badge">SDET · Software Development Engineer in Test</span>
//       <h1 class="hero-name">Shubham Yadav</h1>
//       <p>I build <span class="typed">{typedText}</span></p>
//       <div class="hero-actions">…buttons…</div>
//     </div>
//   </div>
// </section>
```

The typed span has a CSS border-bottom for the underline effect — this is already in `style.css` for `.typed`.

**Files created:**
- `src/components/Hero.jsx`

**Verify:** `npm run dev` — typed animation cycles through the three strings, badge and buttons display correctly.

---

## Step 13 — Create `src/components/About.jsx`

**What:** About section with the `#about` id. Replicates the existing content: role info list, blog/city/degree/email/website list, and the WallApp subtle mention block (`.wallapp-subtle`). No content changes.

Note: `.wallapp-subtle` styles are defined in `style.css` and carried over verbatim.

**Files created:**
- `src/components/About.jsx`

**Verify:** `npm run dev` — About section renders with correct layout, WallApp links open correctly.

---

## Step 14 — Create `src/components/Skills.jsx`

**What:** Skills section using `useSkillsAnimation` hook. Each skill bar is rendered as a React component. The `animated` boolean from the hook controls the `style={{ width: animated ? `${val}%` : '1px' }}` on each `.progress-bar`.

**Skills data (12 items, preserve exact names and values from the HTML):**

Left column:
- Python Automation — 90%
- Linux & System Operations — 90%
- Docker — 85%
- Jenkins & CI/CD — 60%
- JavaScript — 75%
- Test Automation / SDET — 90%

Right column:
- AWS Cloud Operations — 80%
- Backend Development — 80%
- API Testing — 80%
- PostgreSQL & Redis — 70%
- Frontend Automation — 80%
- Android App Development — 70%

The skills data can be a const array in the component file.

**Files created:**
- `src/components/Skills.jsx`

**Verify:** `npm run dev` — scroll to skills, bars animate from 0 to their target widths.

---

## Step 15 — Create `src/components/Resume.jsx`

**What:** Resume section with Summary, Education (2 items), and Professional Experience (2 items). All text content is preserved verbatim from the existing HTML.

**Files created:**
- `src/components/Resume.jsx`

**Verify:** `npm run dev` — resume renders with timeline left-border dots, date badges, and responsive two-column layout.

---

## Step 16 — Create `src/components/Projects.jsx`

**What:** Adds the `#projects` section that was referenced in the nav but missing from the HTML. The CSS rules for `.project-card`, `.featured-project`, `.project-badge`, `.project-tags`, `.project-links` are already present in `style.css`.

**Decision:** The only project content found in the existing site is WallApp (mentioned in About, JSON-LD, and meta). The Projects section will showcase WallApp as a featured project plus two Android apps (NeatPDF, Sky ToDo) that are listed in the JSON-LD. This satisfies the nav link that already exists and uses only content that is already present in the site — no new information is invented.

**Projects data (from JSON-LD and WallApp references):**
1. **WallApp** (featured) — wallpaper curation web app, `wallapp.shubhamy.in`, Play Store `com.sky.wallapp`, tags: Android, Web, Kotlin
2. **NeatPDF** — business PDF app, Play Store `com.neatpdf.android`, tags: Android, Java/Kotlin
3. **Sky ToDo** — productivity todo app, Play Store `com.sky.todo`, tags: Android, Kotlin

**Files created:**
- `src/components/Projects.jsx`

**Verify:** `npm run dev` — Projects section renders with three cards, WallApp card has `.featured-project` class, all links open correctly.

---

## Step 17 — Create `src/components/Blog.jsx`

**What:** Blog section with RSS fetch logic ported from `assets/js/blog.js`. All logic becomes a React functional component using `useState` and `useEffect`.

**State:**
- `articles: []` — loaded articles
- `visible: 6` — current visible count

**Fetch logic (mirrors `blog.js` exactly):**
1. Try `https://api.rss2json.com/v1/api.json?rss_url=...` with `cache: 'no-store'`
2. On failure, try `fetch('/assets/data/blog.json')`
3. On failure, use the hardcoded `fallbackArticles` array (same 5 entries as `blog.js`)

**Article card:** rendered as JSX, preserving the exact same DOM structure (`.card`, `.card-img-top`, `.card-body`, `.card-title a`, `.card-text`) and the `normalizeImageUrl` / `stripHtml` helper functions.

**`#articles` container:** uses the CSS `column-count: 3` masonry layout already in `style.css`.

**Load more button:** increments `visible` by 3, hidden when all articles are shown.

**Files created:**
- `src/components/Blog.jsx`

**Verify:** `npm run dev` — blog cards appear (either from live feed or fallback), Load More button works, images lazy-load.

---

## Step 18 — Create `src/components/Contact.jsx`

**What:** Contact section with location, email, WhatsApp, Telegram, and Google Maps embed. Content is verbatim from the existing HTML. The commented-out contact form is not included (it was already removed in the original).

**Files created:**
- `src/components/Contact.jsx`

**Verify:** `npm run dev` — all four contact entries display, Google Maps iframe loads.

---

## Step 19 — Create `src/components/Footer.jsx` and `src/components/BackToTop.jsx`

**What:** Two small components.

`Footer.jsx`: fixed 300px-wide footer at bottom-left (per CSS) with copyright text.
```jsx
<footer id="footer">
  <div className="container">
    <div className="copyright">&copy; Copyright <strong><span>Shubham Yadav</span></strong></div>
  </div>
</footer>
```

`BackToTop.jsx`: fixed back-to-top button. Uses `useEffect` + scroll listener to toggle `.active` class when `window.scrollY > 100`. Click handler scrolls to top.

```jsx
// scroll listener adds 'active' class; click scrolls to top
```

**Files created:**
- `src/components/Footer.jsx`
- `src/components/BackToTop.jsx`

**Verify:** `npm run dev` — footer visible on desktop, back-to-top button appears after scrolling down 100px.

---

## Step 20 — Full build verification

**What:** Run the full build and confirm all output files are correct.

**Commands to run in order:**
```bash
npm run build
```

**Expected outcomes:**
- `dist/` directory is created
- `dist/index.html` exists and contains the GA script tag and JSON-LD block
- `dist/assets/img/favicon.ico` exists
- `dist/assets/data/blog.json` exists
- `dist/CNAME` contains `shubhamy.in`
- `dist/robots.txt` exists
- `dist/sitemap.xml` exists
- `dist/app-ads.txt` exists
- No build errors in terminal output

**Optional local preview:**
```bash
npm run preview
```
Serves `dist/` locally; open `http://localhost:4173` and verify all six sections render, typed animation works, skill bars animate, blog loads from RSS or fallback.

---

## Step 21 — Deploy to GitHub Pages

**What:** Run the deploy script which builds and pushes `dist/` to the `gh-pages` branch.

```bash
npm run deploy
```

This runs `predeploy` (`npm run build`) then `gh-pages -d dist -b gh-pages`.

**After deploy:** GitHub will serve the `gh-pages` branch at `shubhamy.in` (CNAME is in `dist/CNAME`). The `master` branch retains the source code. `update-blog.yml` continues to commit `assets/data/blog.json` to `master`; to pick up new blog posts in production, re-run `npm run deploy`.

**Verify:** 
- `git branch -a` shows `remotes/origin/gh-pages` branch created
- Visit `https://shubhamy.in` — site loads with new React version
- Check `https://shubhamy.in/assets/data/blog.json` — accessible (200 OK)

---

## Notes on what is NOT changed

- `.github/workflows/update-blog.yml` — untouched, commits to `assets/data/blog.json` on `master`
- `scripts/update-blog.py` — untouched
- `CNAME`, `robots.txt`, `sitemap.xml`, `app-ads.txt` — remain at repo root AND copied to `public/`
- `assets/data/blog.json` — remains at its original path for the workflow; also copied to `public/` for the React app
- `assets/img/*` — remain in place; copied to `public/` for Vite build
- All text content (bio, resume entries, skills, contact details) — preserved verbatim
- All SEO meta tags, GA tag, JSON-LD — preserved verbatim in new `index.html`
