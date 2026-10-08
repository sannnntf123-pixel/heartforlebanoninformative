"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = ".rv:not(.in)";

/**
 * Adds `in` to `.rv` elements as they scroll into view (see site.css).
 * One observer for the whole page keeps every section a Server Component.
 */
const RevealObserver = () => {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default RevealObserver;
