import { useEffect } from "react";

/**
 * Initialises WOW.js scroll-reveal animations (`.wow` elements).
 * The library touches `window`, so it is loaded lazily on the client only.
 */
export function useWowAnimation(): void {
  useEffect(() => {
    let cancelled = false;

    import("wowjs").then((mod) => {
      if (cancelled) return;
      const WOW = mod.WOW ?? mod.default?.WOW;
      new WOW().init();
    });

    return () => {
      cancelled = true;
    };
  }, []);
}
