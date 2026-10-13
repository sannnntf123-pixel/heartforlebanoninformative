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

## Done: removed the Danbox template (2026-10-10)

- Deleted the 18 template demo pages (`src/app/(template)`), 74 unreachable source files
  (template components, data, hooks, layout), `public/assets` (8.2 MB of template CSS, fonts and
  images), the default Next.js SVGs, and 5 packages only the template used
  (react-bootstrap, swiper, wowjs, react-countup, react-player).
- Found by tracing imports from the real site's entry points; old URLs now return 404.
- Lint is now clean (the remaining `<img>` warnings were all in template code).

## Done: three more events (2026-10-11)
- Migration `20261011_151256_add_more_events` (regular, not Important): shelter visits for
  displaced families (dated 1 Mar 2026, "March–April 2026"), "Fasting Together" Ramadan/Lent food
  aid (no year given), Youth Academy for IT/AI/English ("winter 2025", no exact date).
- Shared helper `src/migrations/lib/import-events.ts` (uploads without a shared req).
- Open: dates for Fasting Together, Youth Academy and the Tim Hassan conference (undated = "upcoming").

## Done: events spotlight + the charity's three featured events (2026-10-11)
- Landing page: events spotlight right after the hero (1 large lead card + 2), showing
  "Important" events, falling back to upcoming ones.
- Data migration `20261011_144712_add_featured_events` adds 3 events (EN/AR, cover + gallery)
  from `content/events/<slug>/`: breast cancer campaign with Elissa (27 Oct 2021), children's
  heart screening (ongoing, every Saturday, no date), "Use Your Mind" mental-health conference
  with Tim Hassan (date not provided yet). Idempotent: skips existing slugs.
- Image sizes now crop around the focal point (faces stay in frame); undated events show no date line.
- Open: date of the mental-health conference.
- Bug found in production: every featured-event photo showed the breast-cancer cover. Cause: the
  migration shared one `req` across uploads and the Vercel Blob plugin re-reads `req.file`.
  Repaired by migration `20261011_145629_fix_featured_event_photos` (re-uploads each file, keeps ids);
  the original migration no longer shares `req`. Media changes now refresh event pages.

## Done: event groups, one optional date, gallery; sign-up removed (2026-10-10)
- Events page: Important (CMS "Important event" tick) → Upcoming (incl. undated) → Past; each event once.
- One optional `date` per event (day only, Lebanon time); no date = "Date to be announced".
  Migration renames `start_date` → `date`, so existing dates are kept.
- Cover photo required to publish; new per-event photo gallery with a full-screen viewer
  (native <dialog>, arrow keys mirror in Arabic).
- Sign-up removed entirely: form, Server Action, Registrations collection and its table.
- Hand-fixed the generated migration (DROP CONSTRAINT IF EXISTS after a CASCADE) — it failed as generated.

## Done: events published after a deploy returned 404 (2026-10-10)
- Cause: `dynamicParams = false` on the `[locale]` layout also applied to `/events/[slug]`.
- Fix: removed it (the layout already 404s unknown locales). Live `/en/events/new-event` now works.
- Charity data request doc: https://claude.ai/code/artifact/7c7b8109-44ed-41eb-8073-80fb2bd7f633

## Done: fixed photo uploads on Vercel (2026-10-10)
- Symptom: "There was a problem while uploading the file" in /admin; `/api/media` returned 500.
- Cause: with a Blob token (Vercel) the storage plugin adds `prefix` + `_objectkey` columns to
  `media`; locally (no token) it didn't, so the migrations lacked them and production crashed.
- Fix: `alwaysInsertFields: true` (same schema everywhere) + migration
  `20261010_153529_media_storage_prefix`; `clientUploads: true` (browser → Blob, no 4.5 MB limit).
- Verified on a production-like database with the plugin on: "No schema changes detected".

## Done: QA test report (2026-10-10)
Report doc: https://claude.ai/code/artifact/26eaea74-04ce-47a9-acd4-9f77afafeca4
23 issues: 1 critical (dead GoFundMe link), 5 high (contact form delivers nothing, name/date
mismatch, first-visitor-admin on fresh deploy, uploads > 4.5 MB fail on Vercel, Arabic-digit
phone numbers rejected), 10 medium, 7 low. Fix order is at the end of the report.

## Done: Events CMS with Payload

Decisions (agreed with the user):
- Payload CMS 3 installed inside this Next.js project; admin at `/admin` (route group `(payload)`).
- Database: Postgres (local Homebrew PostgreSQL 16 for dev; Neon via Vercel Marketplace in prod).
- Media: Vercel Blob in prod (local disk in dev).
- Content in English + Arabic (Payload localization, Arabic RTL). Admin UI in EN or AR per editor.
- Events page: upcoming + past events archive; detail page `/[locale]/events/[slug]`.
- Basic sign-up: visitors register on the event page (name, phone, email optional, attendees);
  registrations are stored in a `registrations` collection visible to editors.
- Requirement found: Payload 3.90 needs Next >=16.3.3 (15.5 unsupported) and React >=19.2.1,
  so Next.js is upgraded to 16.4 / React 19.3 first, as its own commit.

### Checklist
- [x] Upgrade Next 15.5 → 16.4, React 19.3 (`middleware.ts` → `proxy.ts`, ESLint flat config)
- [x] Payload + Postgres adapter + Lexical + Vercel Blob storage; project is now ESM (`"type": "module"`)
- [x] Collections: Users (admin/editor; first user = admin), Media, Events (EN/AR, drafts), Registrations
- [x] Admin at `/admin` (`src/app/(payload)`), generated types, initial migration (tested on empty DB)
- [x] Events page: upcoming + past archive; detail page `/[locale]/events/[slug]` with JSON-LD; home preview
- [x] Sign-up: Server Action, validation, honeypot, capacity / deadline / past checks; stored in Registrations
- [x] Publishing or signing up expires the cache immediately (`revalidateTag(tag, { expire: 0 })`)
- [x] Seed script (local only), `.env.example`, `README.md`, `docs/editing-events.md` (EN/AR)
- [x] Verified locally: admin (EN/AR fields, sign-ups list), site EN/AR, sign-up flow, access rules, build

### Next steps for the user
- Create the Vercel project + Neon + Blob (see README "Deploying to Vercel").
- Delete the `[Sample]` events after the first real ones exist (they only exist locally anyway).
- Optional later: email notification to the charity on each sign-up (needs an email provider, e.g. Resend).

## Done: Events and Contact pages (`/en/events`, `/en/contact` + Arabic)

- Events page: page banner, all upcoming events (shared `src/features/events/EventGrid.tsx`),
  "Take part" call to action → contact page. Landing page shows a 4-event preview + "View all events".
- Contact page: page banner, contact-channel cards (`src/features/contact/ContactChannels.tsx`),
  map + form (same `Contact` component with its own heading). Landing page keeps its contact section.
- Header/footer: added "Events"; "Contact" now links to the contact page (`src/config/routes.ts`).
- Copy in `eventsPage` / `contactPage` in `src/i18n/dictionaries/{en,ar}.ts`.

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

## Important vs home page (2026-10-11)
- New CMS checkbox **Show on home page** (`showOnHome`), separate from **Important event**; the home spotlight shows events with it ticked (fallback: important, then upcoming).
- Migration `20261011_152513_events_show_on_home`: column + all six charity events Important; only the original three on the home page.
- Earlier data migration now adds that column first (on the pool, outside the transaction) so a fresh database still migrates.

## Home sections from real event content (2026-10-11)
- Donate band → **ImpactBand**: 10,000 screenings / 30+ shelters / 30+ municipalities, each linking to its event; CTA to the events page (GoFundMe link is dead). Removed donation amounts from `brand.ts`.
- Testimonials (placeholders) → **EventQuotes**: messages from the charity's own event write-ups, with event cover and link; skips unpublished events.
- Volunteers → "Our team in the field": chosen gallery photos (`fieldPhotos` in content.ts) captioned per event, linking to it; Join us card kept.
- News → latest 3 events not in the spotlight (newest first), real date/category/link; updates automatically.

## Campaigns section removed (2026-10-11)
- Home "Campaigns that need your support" (placeholder amounts, dead donate links) removed with its copy, content and unused helpers (`formatMoney`, `progressPercent`).

## Performance pass (2026-10-11)
Measured live first: HTML cached at the edge (fine), ~190 KB br JS (mostly framework), but every event photo went through `/api/media/file` (serverless, uncached, 0.6–1.5 s each).
- Blob storage `disablePayloadAccessControl: true` → photo URLs point straight at the Blob CDN.
- next/image: AVIF + WebP, 30-day optimizer cache (event URLs are versioned), `qualities: [45, 75]`.
- Hero: only the first slide loads with the page; the other two mount after `load`; rotation starts then.
- Removed `priority` from the spotlight lead image (below the hero, competed with the LCP image).
- Quotes background at quality 45 (under a dark overlay); `transition: all` → explicit properties; dropped `filter` on animated hero slides.

## Mobile hero photo (2026-10-13)
- First hero slide uses a portrait photo on phones (<768px) via <picture> + getImageProps: each device downloads only its own photo. Crop focus per size through CSS vars (--focus / --focus-mobile).
- Fix: with reduced motion the hero copy stayed invisible (entrance animation disabled but opacity 0 kept); the hidden start state now only applies with motion allowed.

## Contact form removed (2026-10-13)
- Charity contact: email info@myheartforlebanon.org, location Lebanon, no phone (`brand.contact.email`).
- Removed ContactForm, server action and schema; home Contact section now shows email / location / Instagram + "Email us" button.
- Contact page: hero + channel cards (Email, Location, Instagram, GoFundMe). Footer: Location + Email (phone/hours placeholders gone). FAQ volunteer answer points to the email.
- Contact section: map placeholder replaced by an event photo (`contactPhoto` in content.ts: children heart campaign, gallery photo 6) with a "Lebanon" chip.
- Email corrected to info@myheartforlebanon.org. Hero "Watch our work" play button removed (with its CSS, copy and PlayIcon).
- Favicon from the logo (heart portion of the wordmark, readable at tab size): src/app/favicon.ico (32px PNG-in-ICO), [locale]/icon.png 192px, [locale]/apple-icon.png 180px on white.
