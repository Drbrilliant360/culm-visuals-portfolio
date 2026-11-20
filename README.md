# Culm Visuals — Portfolio

Portfolio site for **Culm Visuals**, a creative design studio in Dar es Salaam.

**Stack:** Vite · React 19 · Tailwind CSS v4 · Motion · GSAP + ScrollTrigger · Lenis · Anime.js · Hugeicons

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

Requires Node 20+.

## Deploy (Vercel)

`vercel.json` is included (Vite preset, long-lived asset caching, basic security headers).

1. Import this repo at <https://vercel.com/new>.
2. Leave the defaults — framework **Vite**, build `npm run build`, output `dist`.
3. Deploy.

Or from the CLI: `npx vercel` then `npx vercel --prod`.

## Editing content

- All text, projects, case studies, services, clients, tools and contact details: `src/data/content.js`
- Colours and fonts (design tokens): `src/index.css` under `@theme`
- Poster images: `public/work/` · Tool logos: `public/tools/`

## Credits & notes

- Poster artwork shown on the site belongs to the respective clients and is displayed as portfolio work.
- Tool logos (Adobe, Canva, CapCut) are trademarks of their owners and are used only to name the tools used.
  Logo files come from Iconify "logos" (CC0), Devicon (MIT) and theSVG (MIT).
- Fonts: Instrument Serif and Manrope via Fontsource (SIL OFL).
