# Leander Robin - Portfolio

Personal portfolio site. A static React single-page app: no backend, all content lives in one JSON file.

## Stack

React 19, Vite 8, Tailwind CSS 4, react-router-dom 7, framer-motion, lucide-react, react-icons

## Pages

| Route | Content |
|---|---|
| `/` | Hero, stats, rotating "What I work on" carousel |
| `/about` | About, experience, skills / tech stack, education |
| `/contact` | Email, phone, LinkedIn, GitHub |

## Running locally

```
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview
npm run lint      # oxlint
```

## Editing content

- **Profile, experience, skills, tech stack, contact, stats:** edit `src/data/profile.json`.
- **CV:** replace `public/Leander_Robin_CV.pdf` (served at `/Leander_Robin_CV.pdf`).
- Focus-area cards, the tech tree, and social handles on the Contact page are defined in the components (`FocusCarousel.jsx`, `TechTree.jsx`, `Contact.jsx`).

## Structure

```
index.html
package.json
vite.config.js
public/          favicon.svg, Leander_Robin_CV.pdf
src/
├── main.jsx, App.jsx, index.css
├── data/profile.json
├── pages/       Home, AboutPage, ContactPage
└── components/  Hero, Highlights, FocusCarousel, About, Experience, Skills,
                 TechTree, Education, Contact, Navbar, Footer,
                 AnimatedSection, PageTransition
```
