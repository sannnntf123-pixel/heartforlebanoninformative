const dateFormats = {
  /** 13 Nov 2024 */
  short: { day: "numeric", month: "short", year: "numeric" },
  /** 24 January 2024 */
  long: { day: "numeric", month: "long", year: "numeric" },
  /** 11 */
  day: { day: "numeric" },
  /** July */
  month: { month: "long" },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

/**
 * Formats an ISO date (YYYY-MM-DD). Parsed and formatted in UTC so the server
 * and browser always render the same day (avoids hydration mismatches).
 */
export const formatDate = (
  isoDate: string,
  format: keyof typeof dateFormats = "short",
  locale: "en" | "ar" = "en"
): string =>
  new Intl.DateTimeFormat(locale === "ar" ? "ar-LB-u-nu-arab" : "en-GB", {
    ...dateFormats[format],
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));

/**
 * Event date and time in Lebanon's time zone, e.g. "Sat 14 March 2026, 10:00"
 * (or a range when the event ends on another time/day).
 */
export const formatEventDate = (start: string, end: string | null, locale: "en" | "ar" = "en"): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Beirut",
  };
  const formatter = new Intl.DateTimeFormat(locale === "ar" ? "ar-LB-u-nu-arab" : "en-GB", options);
  return end ? formatter.formatRange(new Date(start), new Date(end)) : formatter.format(new Date(start));
};

/** Day + short month for date badges (e.g. "14" / "Mar"), Lebanon time. */
export const formatDateBadge = (iso: string, locale: "en" | "ar" = "en") => {
  const tag = locale === "ar" ? "ar-LB-u-nu-arab" : "en-GB";
  const date = new Date(iso);
  return {
    day: new Intl.DateTimeFormat(tag, { day: "numeric", timeZone: "Asia/Beirut" }).format(date),
    month: new Intl.DateTimeFormat(tag, { month: "short", timeZone: "Asia/Beirut" }).format(date),
  };
};

/** Percentage of `goal` reached, clamped to 0-100 and rounded. */
export const progressPercent = (raised: number, goal: number): number =>
  goal > 0 ? Math.min(100, Math.max(0, Math.round((raised / goal) * 100))) : 0;
