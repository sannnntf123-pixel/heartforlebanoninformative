"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const SLIDE_INTERVAL_MS = 6000;

type HeroSlidesProps = {
  images: string[];
  labels: { group: string; slide: string };
};

/** Cross-fading background photos with dot controls; auto-advances unless reduced motion. */
const HeroSlides = ({ images, labels }: HeroSlidesProps) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % images.length),
      SLIDE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [paused, images.length]);

  const goTo = (index: number) => {
    setActive(index);
    setPaused(true); // a manual choice stops the rotation, like the design
  };

  return (
    <>
      <div className={styles.slides} aria-hidden="true">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className={index === active ? styles.slideOn : undefined}
          />
        ))}
      </div>
      <div className={styles.dots} role="group" aria-label={labels.group}>
        {images.map((src, index) => (
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
