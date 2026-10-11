import { routes } from "@/config/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatDateBadge, formatEventDate } from "@/lib/format";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import styles from "./EventGrid.module.css";
import type { EventSummary } from "./queries";

type EventGridProps = {
  events: EventSummary[];
  locale: Locale;
  t: Dictionary;
  /** Archive cards are muted and marked "Past event". */
  past?: boolean;
};

/** Event cards shared by the landing page and the events page. */
const EventGrid = ({ events, locale, t, past = false }: EventGridProps) => {
  const p = t.eventsPage;
  const r = routes(locale);

  return (
    <div className={styles.grid}>
      {events.map((event, index) => {
        const badge = event.date ? formatDateBadge(event.date, locale) : null;
        const href = r.event(event.slug);
        return (
          <article
            key={event.id}
            className={`${styles.card} ${past ? styles.past : ""} ${event.featured ? styles.important : ""} rv`}
            style={staggerStyle(index, 2)}
          >
            <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
              {event.cover ? (
                <Image
                  className={styles.photo}
                  src={event.cover.url}
                  alt=""
                  width={event.cover.width}
                  height={event.cover.height}
                  sizes="(max-width: 640px) 110px, 200px"
                />
              ) : (
                <span className={`phimg ${styles.photo}`}>
                  <Image src="/images/logo.png" alt="" width={110} height={41} />
                </span>
              )}
              {badge && (
                <span className={styles.badge}>
                  <b>{badge.day}</b>
                  {badge.month}
                </span>
              )}
            </Link>
            <div>
              <div className={styles.meta}>
                <span className={styles.category}>{p.categories[event.category]}</span>
                {event.featured && <span className={styles.importantBadge}>{p.important.badge}</span>}
                {past && <span className={styles.pastBadge}>{p.pastBadge}</span>}
              </div>
              <h3>
                <Link href={href}>{event.title}</Link>
              </h3>
              <p className={styles.when}>
                {event.date && (
                  <>
                    <time dateTime={event.date}>{formatEventDate(event.date, locale)}</time>
                    <span aria-hidden="true"> · </span>
                  </>
                )}
                {event.location}
              </p>
              <p>{event.summary}</p>
              <Link className="more" href={href}>
                {t.common.details}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default EventGrid;
