"use client";
import type { Locale } from "@/i18n/config";
import { formatInteger, interpolate } from "@/lib/i18n-format";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./EventGallery.module.css";
import type { GalleryPhoto } from "./queries";

type EventGalleryProps = {
  photos: GalleryPhoto[];
  /** Counter digits follow the page language (e.g. "٣ / ٨" in Arabic). */
  locale: Locale;
  t: { title: string; open: string; close: string; previous: string; next: string; counter: string };
};

/**
 * Thumbnail grid that opens a full-screen viewer. Uses the native <dialog>
 * element, so Escape, focus trapping and the backdrop come from the browser.
 * Arrow keys move between photos (mirrored in right-to-left pages).
 */
const EventGallery = ({ photos, locale, t }: EventGalleryProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const total = photos.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + total) % total)),
    [total]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const rtl = document.documentElement.dir === "rtl";
      const forward = event.key === (rtl ? "ArrowLeft" : "ArrowRight");
      step(forward ? 1 : -1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : photos[index];
  const numbers = (n: number) => ({ n: formatInteger(n, locale), total: formatInteger(total, locale) });

  return (
    <section className={styles.gallery} aria-labelledby="gallery-title">
      <h2 id="gallery-title">{t.title}</h2>
      <ul className={styles.grid}>
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => open(i)}
              aria-label={interpolate(t.open, numbers(i + 1))}
            >
              <Image
                src={photo.thumb.url}
                alt={photo.thumb.alt}
                width={photo.thumb.width}
                height={photo.thumb.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 240px"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label={t.title}
        // Clicking the dark backdrop (the dialog itself, not its content) closes it.
        onClick={(event) => event.target === event.currentTarget && close()}
      >
        {current && (
          <figure className={styles.figure}>
            <Image
              key={current.id}
              src={current.full.url}
              alt={current.full.alt}
              width={current.full.width}
              height={current.full.height}
              sizes="100vw"
              className={styles.full}
            />
            <figcaption>
              {current.full.alt && <span>{current.full.alt}</span>}
              <span className={styles.counter}>{interpolate(t.counter, numbers((index ?? 0) + 1))}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" className={`${styles.control} ${styles.closeButton}`} onClick={close} aria-label={t.close}>
          ×
        </button>
        {total > 1 && (
          <>
            <button type="button" className={`${styles.control} ${styles.prev}`} onClick={() => step(-1)} aria-label={t.previous}>
              ‹
            </button>
            <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => step(1)} aria-label={t.next}>
              ›
            </button>
          </>
        )}
      </dialog>
    </section>
  );
};

export default EventGallery;
