import "server-only";
import config from "@payload-config";
import type { Event, Media } from "@/payload-types";
import { EVENTS_TAG } from "@/payload/hooks/revalidate";
import type { Locale } from "@/i18n/config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

/** What the public site needs to show an event (plain, serialisable data). */
export type EventSummary = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  location: string;
  category: Event["category"];
  /** ISO date, or null when the date is still to be announced. */
  date: string | null;
  cover: { url: string; alt: string; width: number; height: number } | null;
  /** 16:9 crop of the cover (focal-point aware) for large cards. */
  wide: EventSummary["cover"];
  featured: boolean;
  /** Picked for the home page spotlight. */
  showOnHome: boolean;
};

export type GalleryPhoto = {
  id: number;
  /** Large version for the full-screen viewer. */
  full: NonNullable<EventSummary["cover"]>;
  /** Square-cropped thumbnail for the grid. */
  thumb: NonNullable<EventSummary["cover"]>;
};

export type EventDetail = EventSummary & {
  description: Event["description"];
  gallery: GalleryPhoto[];
};

/**
 * Payload returns absolute URLs for its own media route; make those relative so
 * next/image treats them as local. Vercel Blob URLs (production) stay absolute.
 */
const toImageSrc = (url: string): string => {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site && url.startsWith(site)) return url.slice(site.length) || "/";
  return url.replace(/^https?:\/\/localhost(:\d+)?/, "");
};

/**
 * Adds the photo's last-change time to its URL. Photos are cached for a year
 * (browser, CDN and the image optimizer all key on the URL), so a replaced photo
 * that reuses a file name would otherwise keep showing the old picture.
 */
const withVersion = (src: string, updatedAt: string) => {
  const version = Date.parse(updatedAt);
  if (Number.isNaN(version)) return src;
  return `${src}${src.includes("?") ? "&" : "?"}v=${version}`;
};

const image = (media: Event["coverImage"], size: "card" | "banner"): EventSummary["cover"] => {
  if (!media || typeof media === "number") return null;
  const m = media as Media;
  const variant = m.sizes?.[size];
  const url = variant?.url ?? m.url;
  if (!url) return null;
  return {
    url: withVersion(toImageSrc(url), m.updatedAt),
    alt: m.alt ?? "",
    width: variant?.width ?? m.width ?? 1200,
    height: variant?.height ?? m.height ?? 800,
  };
};

const toGallery = (items: Event["gallery"]): GalleryPhoto[] =>
  (items ?? []).flatMap((item) => {
    if (!item || typeof item === "number") return [];
    const full = image(item, "banner");
    const thumb = image(item, "card");
    return full && thumb ? [{ id: item.id, full, thumb }] : [];
  });

const toSummary = (doc: Event): EventSummary => ({
  id: doc.id,
  slug: doc.slug ?? String(doc.id),
  title: doc.title,
  summary: doc.summary,
  location: doc.location,
  category: doc.category,
  date: doc.date ?? null,
  cover: image(doc.coverImage, "card"),
  wide: image(doc.coverImage, "banner"),
  featured: Boolean(doc.featured),
  showOnHome: Boolean(doc.showOnHome),
});

const published = { _status: { equals: "published" } } as const;

/**
 * Every published event in one language, oldest first. The list is small, so
 * it is fetched once and split into upcoming / past at render time.
 */
export const getPublishedEvents = unstable_cache(
  async (locale: Locale): Promise<EventSummary[]> => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "events",
      locale,
      where: published,
      sort: "date",
      depth: 1,
      pagination: false,
      overrideAccess: false,
    });
    return docs.map(toSummary);
  },
  ["published-events"],
  { tags: [EVENTS_TAG] }
);

export const getEventBySlug = unstable_cache(
  async (slug: string, locale: Locale): Promise<EventDetail | null> => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "events",
      locale,
      where: { and: [published, { slug: { equals: slug } }] },
      depth: 1,
      limit: 1,
      overrideAccess: false,
    });
    const doc = docs[0];
    if (!doc) return null;
    return {
      ...toSummary(doc),
      description: doc.description ?? null,
      gallery: toGallery(doc.gallery),
    };
  },
  ["event-by-slug"],
  { tags: [EVENTS_TAG] }
);

/** Slugs of every published event, for static generation. */
export const getEventSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "events",
      where: published,
      select: { slug: true },
      pagination: false,
      overrideAccess: false,
    });
    return docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug));
  },
  ["event-slugs"],
  { tags: [EVENTS_TAG] }
);

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * An event stays upcoming through the whole of its day. Events without a date
 * yet ("to be announced") count as upcoming.
 */
export const isUpcoming = (event: { date?: string | null }, now = new Date()) =>
  !event.date || new Date(event.date).getTime() + DAY_MS > now.getTime();

/**
 * Groups events for the events page. Each event appears once:
 * important (marked in the CMS, soonest upcoming first, then most recent past),
 * then the remaining upcoming (soonest first) and past (most recent first).
 */
export const splitEvents = (events: EventSummary[], now = new Date()) => {
  // Dated events soonest first; undated ("to be announced") ones after them.
  const upcomingAll = events
    .filter((e) => isUpcoming(e, now))
    .sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999"));
  const pastAll = events.filter((e) => !isUpcoming(e, now)).reverse();
  return {
    important: [...upcomingAll, ...pastAll].filter((e) => e.featured),
    upcoming: upcomingAll.filter((e) => !e.featured),
    past: pastAll.filter((e) => !e.featured),
    /** Every upcoming event, important or not (home page preview). */
    upcomingAll,
  };
};
