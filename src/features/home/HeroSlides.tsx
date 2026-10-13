"use client";
import Image, { getImageProps } from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import type { HeroSlide } from "./content";
import styles from "./Hero.module.css";

const SLIDE_INTERVAL_MS = 6000;
/** Phones get a slide's portrait photo when it has one. */
const MOBILE_QUERY = "(max-width: 767px)";

type SlideImageProps = { slide: HeroSlide; priority: boolean; className?: string };

/**
 * One background photo. With a mobile variant it renders <picture>, so the
 * browser downloads only the photo that matches the screen.
 */
const SlideImage = ({ slide, priority, className }: SlideImageProps) => {
  // Crop focus per screen size; Hero.module.css picks the right one.
  const style = { "--focus": slide.focus, "--focus-mobile": slide.mobile?.focus } as CSSProperties;
  const common = { alt: "", fill: true, sizes: "100vw", priority, className, style };
  if (!slide.mobile) return <Image {...common} src={slide.src} />;

  const mobile = getImageProps({ ...common, src: slide.mobile.src }).props;
  const { props } = getImageProps({ ...common, src: slide.src });
  return (
    <picture>
      <source media={MOBILE_QUERY} srcSet={mobile.srcSet} sizes={mobile.sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from next/image */}
      <img {...props} alt="" />
    </picture>
  );
};

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
        {images.map((slide, index) =>
          isMounted(index) ? (
            <SlideImage
              key={slide.src}
              slide={slide}
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
