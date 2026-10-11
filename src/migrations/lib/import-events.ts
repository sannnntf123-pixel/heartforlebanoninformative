import fs from "fs";
import path from "path";
import type { Payload } from "payload";

/**
 * Shared helper for data migrations that add events with their photos.
 * Photos live in content/events/<slug>/: cover.jpg plus numbered gallery photos.
 */

export type EventCopy = { title: string; summary: string; location: string; body: string[]; photoAlt: string };

export type EventToImport = {
  slug: string;
  category: "medical" | "health" | "food" | "youth" | "women" | "community";
  /** ISO date, or null when the charity hasn't given one. */
  date: string | null;
  featured: boolean;
  /** Focal point (percent) for the cover, so faces survive cropping. */
  coverFocus?: { x: number; y: number };
  en: EventCopy;
  ar: EventCopy;
};

/** Minimal Lexical rich-text document from plain paragraphs. */
const richText = (paragraphs: string[], direction: "ltr" | "rtl") => ({
  root: {
    type: "root",
    format: "" as const,
    indent: 0,
    version: 1,
    direction,
    children: paragraphs.map((text) => ({
      type: "paragraph",
      format: "",
      indent: 0,
      version: 1,
      direction,
      textFormat: 0,
      children: [{ type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 }],
    })),
  },
});

export const eventContentDir = (slug: string) => path.resolve(process.cwd(), "content/events", slug);

/**
 * Creates each event (English, then Arabic) with its cover and gallery.
 * Skips events whose slug already exists, so it is safe to re-run.
 *
 * Uploads are deliberately made without a shared `req`: with Vercel Blob, the
 * storage plugin reads `req.file`, so a shared request makes every upload
 * store the first file (see migration 20261011_145629_fix_featured_event_photos).
 */
export async function importEvents(payload: Payload, events: EventToImport[]): Promise<void> {
  for (const event of events) {
    const existing = await payload.find({
      collection: "events",
      where: { slug: { equals: event.slug } },
      limit: 1,
      depth: 0,
      draft: true,
    });
    if (existing.totalDocs > 0) {
      payload.logger.info(`Event "${event.slug}" already exists, skipping`);
      continue;
    }

    const dir = eventContentDir(event.slug);
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
    const coverFile = files.find((f) => f.startsWith("cover."));
    const galleryFiles = files.filter((f) => !f.startsWith("cover."));
    if (!coverFile) throw new Error(`Missing cover photo in ${dir}`);

    const upload = async (file: string, index: number | null, focus?: { x: number; y: number }) => {
      const suffix = index === null ? "" : ` (${index})`;
      const media = await payload.create({
        collection: "media",
        locale: "en",
        data: {
          alt: `${event.en.photoAlt}${suffix}`,
          ...(focus ? { focalX: focus.x, focalY: focus.y } : {}),
        },
        filePath: path.join(dir, file),
      });
      await payload.update({
        collection: "media",
        id: media.id,
        locale: "ar",
        data: { alt: `${event.ar.photoAlt}${suffix}` },
      });
      return media.id;
    };

    const coverId = await upload(coverFile, null, event.coverFocus);
    const galleryIds: number[] = [];
    for (const [i, file] of galleryFiles.entries()) {
      galleryIds.push(await upload(file, i + 1));
    }

    const created = await payload.create({
      collection: "events",
      locale: "en",
      data: {
        title: event.en.title,
        summary: event.en.summary,
        location: event.en.location,
        description: richText(event.en.body, "ltr"),
        slug: event.slug,
        category: event.category,
        date: event.date,
        coverImage: coverId,
        gallery: galleryIds,
        featured: event.featured,
        _status: "published",
      },
    });
    await payload.update({
      collection: "events",
      id: created.id,
      locale: "ar",
      data: {
        title: event.ar.title,
        summary: event.ar.summary,
        location: event.ar.location,
        description: richText(event.ar.body, "rtl"),
        _status: "published",
      },
    });
    payload.logger.info(`Added event "${event.slug}" with ${galleryIds.length} gallery photos`);
  }
}

/** Deletes the given events and the photos they use (migration `down`). */
export async function removeEvents(payload: Payload, slugs: string[]): Promise<void> {
  for (const slug of slugs) {
    const { docs } = await payload.find({ collection: "events", where: { slug: { equals: slug } }, depth: 0, draft: true });
    for (const doc of docs) {
      const mediaIds = [doc.coverImage, ...(doc.gallery ?? [])].filter((id): id is number => typeof id === "number");
      await payload.delete({ collection: "events", id: doc.id });
      for (const id of mediaIds) await payload.delete({ collection: "media", id });
    }
  }
}
