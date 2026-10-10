import { revalidateTag } from "next/cache";

/** Cache tags used by the public site's event queries (src/features/events/queries.ts). */
export const EVENTS_TAG = "events";
export const REGISTRATIONS_TAG = "registrations";

/**
 * Marks cached event data stale so published changes appear on the site
 * without a redeploy. Outside a Next.js request (e.g. the seed script)
 * there is no cache to clear, so the call is skipped.
 */
export const revalidate = (tag: string) => {
  try {
    // Expire immediately: the next visitor gets fresh data (not a stale copy).
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Not running inside Next.js (CLI scripts): nothing to revalidate.
  }
};
