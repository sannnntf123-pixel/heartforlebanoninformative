import { RefObject, useEffect } from "react";

const VISIBLE_AFTER = 50;

/**
 * Draws page scroll progress on an SVG path (via stroke-dashoffset) and toggles
 * `active-scroll` on the container once the user has scrolled a little.
 */
export function useScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
  pathRef: RefObject<SVGPathElement | null>
): void {
  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const pathLength = path.getTotalLength();
    path.style.transition = "none";
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    path.getBoundingClientRect(); // force reflow so the transition below applies
    path.style.transition = "stroke-dashoffset 10ms linear";

    const update = () => {
      const scrollTop = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? scrollTop / scrollable : 0;
      path.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
      container.classList.toggle("active-scroll", scrollTop > VISIBLE_AFTER);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [containerRef, pathRef]);
}
