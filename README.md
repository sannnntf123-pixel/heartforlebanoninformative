# Heart of Lebanon — website

Bilingual (English / Arabic) charity website built with **Next.js 16**, with an
events CMS (**Payload 3**) living in the same project.

| URL | What |
|---|---|
| `/en`, `/ar` | Public site (home, about, events, contact) |
| `/en/events/[slug]` | Event page with photo gallery |
| `/admin` | CMS: events, photos, users |

## Local development

Requirements: Node 20+, PostgreSQL 16 (e.g. `brew install postgresql@16`).

```bash
npm install
createdb heartlebanon_dev
cp .env.example .env       # fill in DATABASE_URI and PAYLOAD_SECRET
npm run seed               # optional: admin account + sample events
npm run dev -- -p 3001
```

The database schema is created automatically in development.

| Command | Purpose |
|---|---|
| `npm run lint` / `npm run typecheck` | Code checks |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing a collection |
| `npm run migrate:create` | Create a migration after changing a collection (commit it) |
| `npm run seed` | Local only: admin from `.env` + `[Sample]` events |

## Deploying to Vercel

1. **Import** the GitHub repository in Vercel (framework: Next.js; no build settings to change —
   Vercel runs the `vercel-build` script, which applies database migrations then builds).
2. **Database:** Project → Storage → *Create* → **Neon (Postgres)**. It sets `DATABASE_URL`
   automatically (the app also accepts `DATABASE_URI`).
3. **Photos:** Project → Storage → *Create* → **Blob**. This adds `BLOB_READ_WRITE_TOKEN`.
4. **Secrets:** add **`PAYLOAD_SECRET`** (`openssl rand -hex 32`) and **`NEXT_PUBLIC_SITE_URL`**
   (e.g. `https://heartoflebanon.org`).
5. **Deploy**, then open `https://<your-domain>/admin` and create the first account —
   it automatically becomes the **admin**. Invite editors from *Users*.

> After changing a collection in `src/payload/collections`, run `npm run migrate:create`
> and commit the new file in `src/migrations` — production only changes through migrations.

## Where things live

| What | Where |
|---|---|
| Site copy (EN / AR) | `src/i18n/dictionaries/` |
| CMS collections | `src/payload/collections/` (Events, Media, Users) |
| Event queries + caching | `src/features/events/queries.ts` |
| Brand links, routes | `src/config/brand.ts`, `src/config/routes.ts` |
| Editor guide | `docs/editing-events.md` |
| Work log | `PROGRESS.md` |
