import { useEffect, useRef } from "react";

/**
 * Intercepts clicks on any `<a>` matching `selector`, anywhere in the document,
 * including links rendered after mount. Calls `onMatch` with the link's href.
 */
export function useDelegatedLinkClick(
  selector: string,
  onMatch: (href: string) => void
): void {
  const onMatchRef = useRef(onMatch);

  useEffect(() => {
    onMatchRef.current = onMatch;
  }, [onMatch]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>(selector);
      if (!link) return;
      event.preventDefault();
      onMatchRef.current(link.href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [selector]);
}
