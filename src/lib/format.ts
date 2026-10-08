const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Formats a whole-dollar amount, e.g. 4407 -> "$4,407". */
export const formatCurrency = (amount: number): string =>
  currencyFormatter.format(amount);

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

/** Percentage of `goal` reached, clamped to 0-100 and rounded. */
export const progressPercent = (raised: number, goal: number): number =>
  goal > 0 ? Math.min(100, Math.max(0, Math.round((raised / goal) * 100))) : 0;
