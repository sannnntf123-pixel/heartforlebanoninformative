import "server-only";
import config from "@payload-config";
import type { Event, Media } from "@/payload-types";
import { EVENTS_TAG, REGISTRATIONS_TAG } from "@/payload/hooks/revalidate";
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
  startDate: string;
  endDate: string | null;
  cover: { url: string; alt: string; width: number; height: number } | null;
  featured: boolean;
};

export type EventDetail = EventSummary & {
  description: Event["description"];
  banner: EventSummary["cover"];
  registration: { enabled: boolean; capacity: number | null; deadline: string | null };
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

const image = (media: Event["coverImage"], size: "card" | "banner"): EventSummary["cover"] => {
  if (!media || typeof media === "number") return null;
  const m = media as Media;
  const variant = m.sizes?.[size];
  const url = variant?.url ?? m.url;
  if (!url) return null;
  return {
    url: toImageSrc(url),
    alt: m.alt ?? "",
    width: variant?.width ?? m.width ?? 1200,
    height: variant?.height ?? m.height ?? 800,
  };
};

const toSummary = (doc: Event): EventSummary => ({
  id: doc.id,
  slug: doc.slug ?? String(doc.id),
  title: doc.title,
  summary: doc.summary,
  location: doc.location,
  category: doc.category,
  startDate: doc.startDate,
  endDate: doc.endDate ?? null,
  cover: image(doc.coverImage, "card"),
  featured: Boolean(doc.featured),
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
      sort: "startDate",
      depth: 1,
      pagination: false,
      joins: false,
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
      joins: false,
      overrideAccess: false,
    });
    const doc = docs[0];
    if (!doc) return null;
    return {
      ...toSummary(doc),
      description: doc.description ?? null,
      banner: image(doc.coverImage, "banner"),
      registration: {
        enabled: doc.registration?.enabled ?? false,
        capacity: doc.registration?.capacity ?? null,
        deadline: doc.registration?.deadline ?? null,
      },
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

/** People already signed up for an event (sum of `attendees`). */
export const getRegisteredCount = unstable_cache(
  async (eventId: number): Promise<number> => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "registrations",
      where: { event: { equals: eventId } },
      select: { attendees: true },
      pagination: false,
      depth: 0,
    });
    return docs.reduce((sum, doc) => sum + (doc.attendees ?? 0), 0);
  },
  ["registered-count"],
  { tags: [REGISTRATIONS_TAG] }
);

/** An event is upcoming until it ends (or until it starts, if it has no end). */
export const isUpcoming = (event: { startDate: string; endDate?: string | null }, now = new Date()) =>
  new Date(event.endDate ?? event.startDate) >= now;

export const splitEvents = (events: EventSummary[], now = new Date()) => ({
  upcoming: events.filter((e) => isUpcoming(e, now)),
  past: events.filter((e) => !isUpcoming(e, now)).reverse(),
});
