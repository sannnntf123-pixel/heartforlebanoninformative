import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";

/**
 * Both fonts are self-hosted by next/font: no third-party request at runtime,
 * files are preloaded, and `size-adjust` fallbacks prevent layout shift.
 */

/** English UI font. */
export const latinFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

/**
 * Arabic UI font: Thmanyah Sans (free for personal and commercial use, see
 * ./fonts/thmanyah/LICENSE.pdf). Only the weights the design uses are bundled;
 * CSS weight 600 resolves to Bold.
 */
export const arabicFont = localFont({
  src: [
    { path: "./fonts/thmanyah/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/thmanyah/thmanyahsans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/thmanyah/thmanyahsans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
  // Both locales share one layout, so a preload hint would make English pages
  // download ~235 KB of Arabic glyphs too. Without it, the browser fetches the
  // files only when Arabic text is rendered.
  preload: false,
});
