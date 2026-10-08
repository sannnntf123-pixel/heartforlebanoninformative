# Heart of Lebanon — Work Log

This file tracks the refactor and the redesign so work can be resumed at any time.
Newest status is at the top of each section. Commits are listed with `git log --oneline`.

## How to run

```bash
npm install
npm run dev -- -p 3001   # port 3000 is used by the Madi project
npm run lint             # ESLint (next/core-web-vitals + typescript)
npm run typecheck        # tsc --noEmit
```

## Done: About us page (`/en/about`, `/ar/about`)

Content supplied by the user (English only, org name "My Heart for Lebanon / قلبي للبنان").
Saved verbatim in `docs/content/about-en.md`. Arabic is a draft translation — needs review.

### Plan
- Routes `/en/about` and `/ar/about` (`src/app/[locale]/about/page.tsx`).
- Copy in its own dictionaries `src/i18n/dictionaries/about/{en,ar}.ts` (only loaded on this page).
- Move TopBar / SiteHeader / SiteFooter into the `[locale]` layout so every page shares them.
- Central `src/config/routes.ts`; header "About" → about page, "Activities" → `/about#activities`.
- Language switcher keeps the current page (`/en/about` ↔ `/ar/about`).
- Sections: page hero, Who we are (+ key facts, "Human dignity comes first"), Mission,
  Objectives (6 pillars), Activities (6), Impact (stats), Vision, closing "Together, we …".

### Checklist
- [x] Save source content, about dictionaries (EN + AR draft)
- [x] Shared shell in layout, routes config, language switcher, aria-current
- [x] About page sections + CSS modules (`src/features/about/`, `src/components/site/PageHero.tsx`)
- [x] `BidiText` isolates mixed-script runs (Arabic inside English copy and vice versa)
- [x] Cleaned an invisible 1/255-alpha layer from both logo PNGs (also ~35% smaller)
- [x] Verified EN/AR desktop + mobile, lint, typecheck, build; committed + pushed
- [ ] **Arabic About copy is a draft translation — needs review by the charity**

### Open question for the user
- Home page says "Heart of Lebanon Charity", founded **2019** by Dr. Mohammad Hadi Mourad;
  the About content says "My Heart for Lebanon", officially established **22 July 2021**.
  Not changed on the home page — needs a decision.

## Done: new bilingual home page (awaiting English font)

Source design: `~/Downloads/heart-of-lebanon 5/danbox/en-home.html` and `ar-home.html`
(screenshots in the `screenshots/` folder next to them). Official logo: `~/Downloads/heart-of-lebanon 3/brand/`.

### Decisions
- New site lives at `/en` and `/ar` (`src/app/[locale]/`), with `<html lang dir>` per locale.
  `/` redirects by `Accept-Language` (middleware).
- Old Danbox demo pages moved to the `src/app/(template)/` route group with their own root
  layout, so Bootstrap/main.css never load on the new design. Old home moved to `/index-1`.
- All copy in typed dictionaries (`src/i18n/dictionaries/en.ts`, `ar.ts`); Arabic must match
  the English shape, so a missing translation is a compile error.
- Server Components by default; client components only for header menu, hero slider,
  scroll reveal and the contact form. Contact form uses a Server Action.
- Design tokens + shared primitives in one stylesheet; each section has a CSS module.
- Images extracted from the HTML's embedded base64 into `public/images/` (deduplicated,
  3 photos × wide/card/square crops) + official logo (`logo.png`, `logo-white.png`).
- Unconfirmed content (amounts, event details, testimonials, volunteer names, address,
  phone, hours) stays as visible `[placeholder]` chips like the design, driven by `null` data.
- Links to `en-about.html` / `en-activities.html` point to in-page anchors (`#about`, `#news`)
  until those pages exist — change in `src/config/brand.ts` (`sections`).

### Checklist
- [x] Extract and name assets → `public/images/`
- [x] Pair EN/AR copy from both HTML files
- [x] Move Danbox template into `src/app/(template)/` (old home → `/index-1`)
- [x] i18n config, typed dictionaries, middleware redirect for `/`
- [x] `[locale]` root layout (fonts, metadata, hreflang), `global-not-found.tsx`
- [x] Shared primitives (`src/components/site/`: Typography, icons, ExternalButton, RevealObserver)
- [x] Sections (`src/features/home/`, `src/features/contact/`) + TopBar, SiteHeader, SiteFooter
- [x] Contact form → Server Action with server-side validation (`src/features/contact/actions.ts`)
- [x] Arabic font: **Thmanyah Sans** via `next/font/local` (`src/app/[locale]/fonts/thmanyah/`)
- [x] Verified EN + AR (desktop + mobile), lint (0 errors), typecheck, production build
- [ ] **English font: Brando** — waiting for licensed font files (woff2, weights 400/500/600/700).
      Swap point: `src/app/[locale]/fonts.ts` (`latinFont`). IBM Plex Sans is the stand-in.
- [x] Pushed to https://github.com/sannnntf123-pixel/heartforlebanoninformative (branch `main`)

### Where things live
| What | Where |
|---|---|
| Copy (EN / AR) | `src/i18n/dictionaries/en.ts`, `ar.ts` |
| About page copy | `src/i18n/dictionaries/about/en.ts`, `ar.ts` (source: `docs/content/about-en.md`) |
| Internal links | `src/config/routes.ts` |
| Links (GoFundMe, Instagram), contact details, anchors | `src/config/brand.ts` |
| Which photo goes where, campaign amounts, events, testimonials | `src/features/home/content.ts` (`null` = placeholder chip) |
| Design tokens + shared CSS | `src/styles/site.css` |
| Fonts | `src/app/[locale]/fonts.ts` |
| Contact form handler | `src/features/contact/actions.ts` (delivery not wired yet) |

## Done

### 3. Events refactor — commit `77a1804`
- Typed event data (`src/data/events.ts`) with ISO dates formatted via `Intl` in UTC.
- Reusable event cards; shared `FilterTabs`; events page tabs now really filter.

### 2. Causes refactor — commit `42bf44b`
- Typed `Cause` model (`src/data/causes.ts`); progress derived from raised/goal.
- Reusable cause cards, `SectionTitle`, `Pagination`, `staggerDelay`, `formatCurrency`.
- Causes tabs filter by category; fixed swapped slider arrows.

### 1. Foundations — commit `89b6af3`
- Hooks moved to `src/hooks/` (fixed Rules-of-Hooks violation), WOW.js lazy-loaded with types.
- Popups use document-level click delegation + shared `Lightbox` with Escape to close.
- Navigation and site details single-sourced in `src/config/`; fixed broken links.
- `DanboxLayout` → `SiteLayout` with typed variants; header split into modules.
- Root-absolute asset paths; fonts only via `next/font`; real metadata.
- ESLint + `lint`/`typecheck` scripts; all lint errors fixed.

### 0. Setup — commit `660b8bf`
- Clean `npm install`, git initialised with a baseline commit.

## Still to refactor in the Danbox template (lower priority now)
News, Team, Testimonial, About, Cta, Promo, Faq, HeroSlider, Volunter, BlogSidebar and the
detail pages still hold inline data; the remaining 4 lint warnings are `<img>` tags.
