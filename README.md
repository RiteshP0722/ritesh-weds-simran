# Ritesh Weds Simran: Wedding Invitation Website

Next.js 15 (App Router) + TypeScript + plain CSS. Emerald & Gold theme.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Change content
All text, dates, events, families and photos are in **`data/wedding.ts`**. You don't need to touch the components.

- **Photos:** put images in `public/photos/` and set e.g. `photo: "/photos/groom.jpg"`.
- **Family lines** starting with `*` are highlighted.
- **Events** with the same `day` are grouped under one heading.
- **`whatsapp`:** a 10-digit number that receives RSVP messages.
- **`siteUrl`:** the link put in the WhatsApp invite. If left empty, the current page URL is used.

## Change colours
Edit the variables at the top of `app/globals.css` (`--paper`, `--gold`, `--card`, …).

## Project structure
```
app/
  layout.tsx        fonts, <head>, SEO / WhatsApp preview
  page.tsx          puts all sections together
  globals.css       complete theme
components/
  Hero, Welcome, Countdown, Couple, PersonCard, SaveTheDate,
  Events, Families, Story, Moments (slider), Venue, ShareJoy,
  Footer, Petals (canvas), MusicButton, RevealOnScroll,
  SectionHead, Photo, Corners
data/wedding.ts     all content
lib/utils.ts        helpers (maps link, WhatsApp, grouping)
types/wedding.ts    TypeScript types
```

## Deploy (free)
Push to GitHub, then import the repo at vercel.com. No settings needed.
