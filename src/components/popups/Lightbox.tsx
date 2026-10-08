"use client";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ReactNode, useEffect } from "react";

type LightboxProps = {
  onClose: () => void;
  containerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

/** Magnific-popup styled overlay; closes on backdrop click, outside click or Escape. */
const Lightbox = ({
  onClose,
  containerClassName = "",
  contentClassName = "",
  children,
}: LightboxProps) => {
  const contentRef = useClickOutside<HTMLDivElement>(onClose);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="mfp-bg mfp-ready" onClick={onClose} />
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        style={{ overflow: "hidden auto" }}
      >
        <div
          className={`mfp-container mfp-s-ready mfp-iframe-holder ${containerClassName}`}
        >
          <div className={`mfp-content ${contentClassName}`} ref={contentRef}>
            <button
              title="Close (Esc)"
              aria-label="Close"
              type="button"
              className="mfp-close"
              onClick={onClose}
            >
              ×
            </button>
            {children}
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </>
  );
};

export default Lightbox;
