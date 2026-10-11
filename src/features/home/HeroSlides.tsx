"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroSlide } from "./content";
import styles from "./Hero.module.css";

const SLIDE_INTERVAL_MS = 6000;

type HeroSlidesProps = {
  images: HeroSlide[];
  labels: { group: string; slide: string };
};

/** Cross-fading background photos with dot controls; auto-advances unless reduced motion. */
const HeroSlides = ({ images, labels }: HeroSlidesProps) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only the first photo loads with the page; the others are fetched once the
  // page has finished loading, so they don't compete with it for bandwidth.
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const start = () => setLoadRest(true);
    if (document.readyState === "complete") return start();
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    if (!loadRest || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % images.length),
      SLIDE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [loadRest, paused, images.length]);

  const goTo = (index: number) => {
    setActive(index);
    setPaused(true); // a manual choice stops the rotation, like the design
  };

  // A dot click before the page has loaded still shows that photo.
  const isMounted = (index: number) => index === 0 || loadRest || index === active;

  return (
    <>
      <div className={styles.slides} aria-hidden="true">
        {images.map(({ src, focus }, index) =>
          isMounted(index) ? (
            <Image
              key={src}
              src={src}
              style={{ objectPosition: focus }}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              className={index === active ? styles.slideOn : undefined}
            />
          ) : null
        )}
      </div>
      <div className={styles.dots} role="group" aria-label={labels.group}>
        {images.map(({ src }, index) => (
          <button
            key={src}
            type="button"
            aria-label={`${labels.slide} ${index + 1}`}
            aria-pressed={index === active}
            onClick={() => goTo(index)}
          >
            <i />
          </button>
        ))}
      </div>
    </>
  );
};

export default HeroSlides;
