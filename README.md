# Ritesh Weds Simran: Wedding Invitation Website

Next.js 15 (App Router) + TypeScript + plain CSS. Wine & gold hero with a 3D arch photo slideshow, ivory & peach pages, and 3D motion (tap-to-open doors, tilt cards, gold timeline, rotating photo ring).

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Change content
All text, dates, events, families and photos are in **`data/wedding.ts`**. You don't need to touch the components.

- **Photos:** put images in `public/photos/` and set e.g. `photo: "/photos/dulha.jpg"`.
- Every text is `{ hi, en }`; family names show in Hindi in both languages.
- **Events** are grouped under the day whose `id` matches their `day`.
- **`siteUrl`:** the link put in the WhatsApp invite. If left empty, the current page URL is used.

## Change colours
Edit the variables at the top of `app/globals.css` (`--ivory`, `--peach`, `--wine`, `--gold`, …).

## Project structure
```
app/
  layout.tsx        fonts, <head>, SEO / WhatsApp preview
  page.tsx          puts all sections together
  globals.css       complete theme
components/
  Gate (tap-to-open 3D doors), Hero (3D arch slideshow), Mandala,
  Invitation, PersonCard, Countdown, Events (timeline), Venue (स्नेहभोज + map),
  Families, Moments (3D photo ring), ShareJoy, Footer, Petals (canvas),
  MusicButton, RevealOnScroll (reveal/tilt/parallax), TopControls,
  SectionHead, Photo, Corners
data/wedding.ts     all content
lib/utils.ts        helpers (maps link, WhatsApp, grouping)
types/wedding.ts    TypeScript types
```

## Deploy (free)
Push to GitHub, then import the repo at vercel.com. No settings needed.
