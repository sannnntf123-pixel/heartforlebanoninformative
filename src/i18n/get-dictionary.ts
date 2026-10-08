import "server-only";
import type { Locale } from "./config";
import type { AboutDictionary } from "./dictionaries/about/en";
import type { Dictionary } from "./dictionaries/en";

// Each locale (and each page's copy) is its own chunk, so a page only loads
// the language and the sections it renders.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  ar: () => import("./dictionaries/ar").then((m) => m.default),
};

const aboutDictionaries: Record<Locale, () => Promise<AboutDictionary>> = {
  en: () => import("./dictionaries/about/en").then((m) => m.default),
  ar: () => import("./dictionaries/about/ar").then((m) => m.default),
};

/** Shared site copy: navigation, header, footer and the home page. */
export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();

/** About page copy. */
export const getAboutDictionary = (locale: Locale): Promise<AboutDictionary> =>
  aboutDictionaries[locale]();

export type { AboutDictionary, Dictionary };
