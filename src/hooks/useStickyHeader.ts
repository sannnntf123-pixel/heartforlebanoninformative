import { useEffect } from "react";

const STICKY_OFFSET = 100;

/** Toggles the `sticky` class on `#header-sticky` once the page is scrolled. */
export function useStickyHeader(offset = STICKY_OFFSET): void {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("#header-sticky");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("sticky", window.scrollY >= offset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
}
