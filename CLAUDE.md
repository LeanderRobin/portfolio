# CLAUDE.md

Personal portfolio site for **Leander Robin** (Data Scientist / Applied AI-ML Engineer). Static React SPA, no backend. Not a git repo yet. Folder structure is intentionally flat and minimal (modeled on github.com/MilynDsilva/Portfolio): only files the current code needs, no extra scaffolding.

## Layout

```
portfolio/
├── index.html, package.json, vite.config.js, .oxlintrc.json, .gitignore
├── public/                 # favicon.svg, Leander_Robin_CV.pdf (served at /Leander_Robin_CV.pdf)
└── src/
    ├── main.jsx, App.jsx, index.css
    ├── data/profile.json   # SOURCE OF TRUTH for CV content (incl. stats)
    ├── pages/              # Home (/), AboutPage (/about), ContactPage (/contact)
    └── components/         # Hero, Highlights, FocusCarousel, About, Experience,
                            # Skills, TechTree, Education, Contact, Navbar, Footer,
                            # AnimatedSection, PageTransition
```

React 19 + Vite 8 + Tailwind 4 + framer-motion + react-router-dom 7.

## Commands

```
npm run dev | build | lint | preview
```

Dev server on http://localhost:5173.

## Data flow

`src/data/profile.json` is imported in `App.jsx` and passed as a `profile` prop to pages and components. To change CV content or stats, edit that JSON.

## Hardcoded in components (not in profile.json)

- Focus-area cards in `FocusCarousel.jsx`
- Tech icons/lists in `TechTree.jsx`
- LinkedIn/GitHub display handles in `Contact.jsx`
- Nav links in `Navbar.jsx`

## Design

- Dark theme: background `#0c071c`, violet -> blue gradients (`from-violet-500 to-blue-400`), section headings `text-blue-400`.
- Fonts: Sora (headings), Manrope (body), loaded from Google Fonts in `index.html`.
- Framer Motion for page transitions, staggered entrances, shared nav underline, scroll-in sections.
- Colors are Tailwind classes scattered across components (no central theme tokens); a palette change means a find/replace across `src`. The background hex is also in `App.jsx`, `Navbar.jsx`, `index.css`.

## History / decisions

- Removed the floating tech tags from the Hero and deleted `FloatingTags.jsx`.
- Removed the "Built with FastAPI & React" footer text.
- Tried a red/rose palette, then reverted to the original violet/blue.
- Converted to a fully static site: the FastAPI backend was replaced by `src/data/profile.json`, the CV moved into `public/`, and the fetch layer (`useProfile`, `ProfileContext`) was removed. Frontend was flattened from `frontend/` to the repo root.

## Plans / caveats

- Goal: private GitHub repo, hosted on GitHub Pages (or Cloudflare/Netlify if the repo stays private on the free plan), mapped to the domain `leander.in`. Not done yet.
- BrowserRouter is used, so a static host needs an SPA fallback (404.html copy on GitHub Pages) for deep links like `/about`.
- Experience data includes a current role at CodeCraft ("Jul 2026 - Present"), preceded by Infosys (Feb-Jul 2026).
