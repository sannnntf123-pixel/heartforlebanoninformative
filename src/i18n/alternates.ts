import type { Metadata } from "next";
import { locales, type Locale } from "./config";

/**
 * Canonical URL plus hreflang links to every language version of a page.
 * `path` is the part after the locale, e.g. "" for home or "/about".
 */
export const pageAlternates = (locale: Locale, path: string): Metadata["alternates"] => ({
  canonical: `/${locale}${path}`,
  languages: {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/en${path}`,
  },
});
