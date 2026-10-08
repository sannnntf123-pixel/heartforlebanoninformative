"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useRef } from "react";

const ScrollTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  useScrollProgress(buttonRef, pathRef);

  return (
    <button
      ref={buttonRef}
      type="button"
      className="scroll-up"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg
        className="scroll-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
        aria-hidden="true"
      >
        <path ref={pathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </button>
  );
};

export default ScrollTop;
