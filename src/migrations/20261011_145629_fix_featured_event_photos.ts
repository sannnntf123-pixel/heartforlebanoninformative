import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import fs from "fs";
import path from "path";

/**
 * Repairs the photos of the three featured events.
 *
 * The previous migration passed one shared `req` to every upload. With Vercel
 * Blob, the storage plugin reads the file from `req.file` (or a copy cached in
 * `req.context`), so every upload after the first stored the first file's
 * bytes: all 25 photos showed the breast-cancer campaign cover.
 *
 * This re-uploads the correct file into each existing media document, keeping
 * every id (events keep pointing at the same media). Each update gets its own
 * request (no `req` passed), which is what prevents the bug. Safe to re-run.
 */

const slugs = ["together-against-breast-cancer", "my-heart-for-lebanons-children", "use-your-mind-mental-health"];

const contentDir = (slug: string) => path.resolve(process.cwd(), "content/events", slug);

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  for (const slug of slugs) {
    const { docs } = await payload.find({
      collection: "events",
      where: { slug: { equals: slug } },
      depth: 0,
      limit: 1,
      draft: true,
    });
    const event = docs[0];
    if (!event) {
      payload.logger.info(`Event "${slug}" not found, skipping`);
      continue;
    }

    const dir = contentDir(slug);
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
    const cover = files.find((f) => f.startsWith("cover."));
    const gallery = files.filter((f) => !f.startsWith("cover."));

    const pairs: [number | null | undefined, string | undefined][] = [
      [typeof event.coverImage === "number" ? event.coverImage : event.coverImage?.id, cover],
      ...(event.gallery ?? []).map(
        (item, i): [number | undefined, string | undefined] => [
          typeof item === "number" ? item : item?.id,
          gallery[i],
        ]
      ),
    ];

    let fixed = 0;
    for (const [mediaId, file] of pairs) {
      if (!mediaId || !file) continue;
      // No `req`: each upload must get a fresh request (see note above).
      await payload.update({
        collection: "media",
        id: mediaId,
        data: {},
        filePath: path.join(dir, file),
      });
      fixed++;
    }
    payload.logger.info(`Re-uploaded ${fixed} photos for "${slug}"`);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Nothing to undo: the files are simply correct now.
}
