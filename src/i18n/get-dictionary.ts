import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

// Each locale is its own chunk, so a page only loads the language it renders.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  ar: () => import("./dictionaries/ar").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();

export type { Dictionary };
