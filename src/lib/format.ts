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

/** Event day in Lebanon, e.g. "Sat 14 March 2026" / "السبت ١٤ آذار ٢٠٢٦". */
export const formatEventDate = (iso: string, locale: "en" | "ar" = "en"): string =>
  new Intl.DateTimeFormat(locale === "ar" ? "ar-LB-u-nu-arab" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Beirut",
  }).format(new Date(iso));

/** Day + short month for date badges (e.g. "14" / "Mar"), Lebanon time. */
export const formatDateBadge = (iso: string, locale: "en" | "ar" = "en") => {
  const tag = locale === "ar" ? "ar-LB-u-nu-arab" : "en-GB";
  const date = new Date(iso);
  return {
    day: new Intl.DateTimeFormat(tag, { day: "numeric", timeZone: "Asia/Beirut" }).format(date),
    month: new Intl.DateTimeFormat(tag, { month: "short", timeZone: "Asia/Beirut" }).format(date),
  };
};
