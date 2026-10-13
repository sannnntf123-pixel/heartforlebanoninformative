/** The public site's address. */
const PRODUCTION_URL = "https://www.myheartforlebanon.org";

/**
 * Base URL for canonical links, hreflang and Open Graph. NEXT_PUBLIC_SITE_URL
 * overrides it; on Vercel (production and previews) it falls back to the real
 * domain, so search engines never see a localhost or preview address.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL ? PRODUCTION_URL : "http://localhost:3000");

/** Link-preview image (WhatsApp, Facebook, X…): the logo on brand green. */
export const shareImage = {
  url: "/images/og-logo.png",
  width: 1200,
  height: 630,
  alt: "My Heart for Lebanon",
};
