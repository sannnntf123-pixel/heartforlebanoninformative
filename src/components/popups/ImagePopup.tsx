"use client";
import { useDelegatedLinkClick } from "@/hooks/useDelegatedLinkClick";
import { useCallback, useState } from "react";
import Lightbox from "./Lightbox";

const IMAGE_LINK_SELECTOR = "a.img-popup";

/** Opens `<a class="img-popup" href="...">` links in an image lightbox. */
const ImagePopup = () => {
  const [src, setSrc] = useState<string | null>(null);
  const close = useCallback(() => setSrc(null), []);

  useDelegatedLinkClick(IMAGE_LINK_SELECTOR, setSrc);

  if (!src) return null;

  return (
    <Lightbox onClose={close} containerClassName="mfp-img-container">
      <div className="mfp-iframe-scaler">
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary-size preview */}
        <img className="mfp-img" src={src} alt="Gallery preview" />
      </div>
    </Lightbox>
  );
};

export default ImagePopup;
