import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the "Show on home page" checkbox, so being an important event and being
 * on the landing page are separate choices. Then: the three latest events become
 * important too, and only the original three stay on the home page.
 */
const homePageSlugs = ['together-against-breast-cancer', 'my-heart-for-lebanons-children', 'use-your-mind-mental-health']
const newlyImportantSlugs = ['shelter-visits-war-relief-2026', 'fasting-together', 'youth-academy-it-ai-english']

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "show_on_home" boolean DEFAULT false;
  ALTER TABLE "_events_v" ADD COLUMN IF NOT EXISTS "version_show_on_home" boolean DEFAULT false;`)

  // Through Payload (not SQL) so each change is saved as a new published version.
  const set = async (slugs: string[], data: { featured?: boolean; showOnHome?: boolean }) => {
    const { docs } = await payload.find({ collection: 'events', where: { slug: { in: slugs } }, depth: 0, req })
    for (const doc of docs) {
      await payload.update({ collection: 'events', id: doc.id, data: { ...data, _status: 'published' }, req })
    }
  }
  await set(homePageSlugs, { featured: true, showOnHome: true })
  await set(newlyImportantSlugs, { featured: true })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  const { docs } = await payload.find({ collection: 'events', where: { slug: { in: newlyImportantSlugs } }, depth: 0, req })
  for (const doc of docs) {
    await payload.update({ collection: 'events', id: doc.id, data: { featured: false, _status: 'published' }, req })
  }
  await db.execute(sql`
   ALTER TABLE "events" DROP COLUMN "show_on_home";
  ALTER TABLE "_events_v" DROP COLUMN "version_show_on_home";`)
}
