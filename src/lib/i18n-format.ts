import type { Locale } from "@/i18n/config";
import type { CSSProperties } from "react";

// Arabic copy uses Eastern Arabic digits (٢٠١٩), matching the design.
const numberLocale: Record<Locale, string> = {
  en: "en",
  ar: "ar-u-nu-arab",
};

/** Whole number in the locale's digits, without grouping (e.g. years). */
export const formatInteger = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(numberLocale[locale], { useGrouping: false }).format(value);

/** Whole-dollar amount in the locale's digits (e.g. "$4,407" in English). */
export const formatMoney = (amount: number, locale: Locale): string =>
  new Intl.NumberFormat(numberLocale[locale], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

/** Fills `{name}` tokens in a dictionary string. */
export const interpolate = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);

/** Stagger index for reveal animations: cards in a row animate one after another. */
export const staggerStyle = (index: number, perRow = 3) =>
  ({ "--i": index % perRow }) as CSSProperties;
