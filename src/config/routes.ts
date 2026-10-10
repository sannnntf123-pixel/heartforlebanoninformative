import type { Locale } from "@/i18n/config";

/** Every internal link on the public site, per locale. */
export const routes = (locale: Locale) => ({
  home: `/${locale}`,
  about: `/${locale}/about`,
  activities: `/${locale}/about#activities`,
  events: `/${locale}/events`,
  contact: `/${locale}/contact`,
});

export type Routes = ReturnType<typeof routes>;
