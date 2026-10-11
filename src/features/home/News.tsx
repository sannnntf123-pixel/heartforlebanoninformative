import { SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import { getPublishedEvents } from "@/features/events/queries";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatDate } from "@/lib/format";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import { NEWS_COUNT } from "./content";
import styles from "./News.module.css";

/**
 * The most recently added events, leaving out those already in the home page
 * spotlight. Updates on its own as the charity publishes events.
 */
const News = async ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const n = t.news;
  const events = (await getPublishedEvents(locale))
    .filter((e) => !e.showOnHome)
    .sort((a, b) => b.id - a.id)
    .slice(0, NEWS_COUNT);
  if (events.length === 0) return null;

  return (
    <section className="sec sec--alt" id="news">
      <div className="wrap">
        <SectionHeading kicker={n.kicker} title={n.title} />
        <div className={styles.grid}>
          {events.map((event, index) => {
            const photo = event.wide ?? event.cover;
            return (
              <article key={event.id} className={`${styles.card} rv`} style={staggerStyle(index)}>
                {photo && (
                  <Image
                    className={styles.image}
                    src={photo.url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 380px"
                  />
                )}
                {event.date && (
                  <span className={styles.date}>
                    <time dateTime={event.date}>{formatDate(event.date.slice(0, 10), "short", locale)}</time>
                  </span>
                )}
                <div className={styles.text}>
                  <span className={styles.tag}>{t.eventsPage.categories[event.category]}</span>
                  <h3>{event.title}</h3>
                  <Link className={`more ${styles.more}`} href={routes(locale).event(event.slug)}>
                    {t.common.readMore}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default News;
