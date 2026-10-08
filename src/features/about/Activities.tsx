import {
  BasketIcon,
  CapIcon,
  HeartPulseIcon,
  HomeHeartIcon,
  RibbonIcon,
  WomanIcon,
} from "@/components/site/icons";
import { BidiText, SectionHeading } from "@/components/site/Typography";
import type { Locale } from "@/i18n/config";
import type { AboutDictionary } from "@/i18n/get-dictionary";
import Image from "next/image";
import type { ComponentType } from "react";
import styles from "./Activities.module.css";
import { aboutPagePhotos, activityOrder } from "./content";

type ActivityId = (typeof activityOrder)[number];

type ActivityCopy = {
  title: string;
  highlight: { value: string; label: string } | null;
  paragraphs: string[];
  quote: { intro: string; text: string } | null;
};

const icons: Record<ActivityId, ComponentType> = {
  youth: CapIcon,
  breastCancer: RibbonIcon,
  childrenHeart: HeartPulseIcon,
  women: WomanIcon,
  refugees: HomeHeartIcon,
  occasions: BasketIcon,
};

type PhotoId = keyof typeof aboutPagePhotos.activities;
const hasPhoto = (id: ActivityId): id is PhotoId => id in aboutPagePhotos.activities;

const Activities = ({ locale, a }: { locale: Locale; a: AboutDictionary }) => {
  const act = a.activities;
  return (
    <section className="sec sec--alt" id="activities">
      <div className="wrap">
        <SectionHeading kicker={act.kicker} title={act.title} />
        <div className={styles.list}>
          {activityOrder.map((id) => {
            const copy: ActivityCopy = act.items[id];
            const Icon = icons[id];
            const photo = hasPhoto(id)
              ? { src: aboutPagePhotos.activities[id], alt: act.imageAlts[id] }
              : null;
            const headingId = `activity-${id}`;

            return (
              <article key={id} className={`${styles.item} rv`} aria-labelledby={headingId}>
                <div className={styles.media}>
                  {photo && (
                    <Image
                      className={styles.photo}
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1100px) 100vw, 420px"
                    />
                  )}
                  <div className={`${styles.panel} ${photo ? styles.overPhoto : ""}`}>
                    <span className={styles.icon}>
                      <Icon />
                    </span>
                    {copy.highlight && (
                      <p className={styles.stat}>
                        <b dir="ltr">{copy.highlight.value}</b>
                        <span>{copy.highlight.label}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.body}>
                  <h3 id={headingId}>{copy.title}</h3>
                  {copy.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      <BidiText text={paragraph} lang={locale} />
                    </p>
                  ))}
                  {copy.quote && (
                    <figure className={styles.quote}>
                      {copy.quote.intro && <figcaption>{copy.quote.intro}</figcaption>}
                      <blockquote>
                        <p>{copy.quote.text}</p>
                      </blockquote>
                    </figure>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Activities;
