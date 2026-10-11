import { SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import { getPublishedEvents } from "@/features/events/queries";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import { eventQuotesBackground } from "./content";
import styles from "./EventQuotes.module.css";

/**
 * Messages taken from the charity's own event write-ups, each with its event's
 * cover photo and a link to it. Quotes whose event isn't published are skipped.
 */
const EventQuotes = async ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const q = t.eventQuotes;
  const events = new Map((await getPublishedEvents(locale)).map((e) => [e.slug, e]));
  const items = q.items.flatMap((item) => {
    const event = events.get(item.slug);
    return event ? [{ ...item, cover: event.cover }] : [];
  });
  if (items.length === 0) return null;

  return (
    <section className={`sec on-dark ${styles.section}`}>
      {/* Sits under a dark overlay, so lower quality is invisible and much lighter. */}
      <Image className={styles.background} src={eventQuotesBackground} alt="" fill sizes="100vw" quality={45} />
      <div className={`wrap ${styles.inner}`}>
        <SectionHeading kicker={q.kicker} title={q.title} />
        <div className={styles.grid}>
          {items.map((item, index) => (
            <figure key={item.slug} className={`${styles.card} rv`} style={staggerStyle(index, 2)}>
              <span className={styles.quoteMark} aria-hidden="true">
                ”
              </span>
              <blockquote>
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className={styles.who}>
                <span className={styles.avatar}>
                  {item.cover && <Image src={item.cover.url} alt="" fill sizes="54px" />}
                </span>
                <span>
                  <b>{item.source}</b>
                  {/* The whole card is clickable through this link's stretched area. */}
                  <Link href={routes(locale).event(item.slug)} className={styles.link}>
                    {q.viewEvent}
                  </Link>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventQuotes;
