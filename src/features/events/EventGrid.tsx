import { ValueOrPlaceholder } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import { upcomingEvents } from "@/features/home/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatDate } from "@/lib/format";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import styles from "./EventGrid.module.css";

type EventGridProps = {
  locale: Locale;
  t: Dictionary;
  /** Show at most this many events (the landing page shows a preview). */
  limit?: number;
  /** Link each card to the events page (off on the events page itself). */
  linkToEvents?: boolean;
};

/** Event cards shared by the landing page and the events page. */
const EventGrid = ({ locale, t, limit, linkToEvents = true }: EventGridProps) => {
  const e = t.events;
  const events = limit ? upcomingEvents.slice(0, limit) : upcomingEvents;

  return (
    <div className={styles.grid}>
      {events.map((event, index) => (
        <article key={event.id} className={`${styles.card} rv`} style={staggerStyle(index, 2)}>
          {event.image ? (
            <Image className={styles.photo} src={event.image} alt="" width={200} height={200} />
          ) : (
            <div className={`phimg ${styles.photo}`} role="img" aria-label={e.photoPlaceholder}>
              <Image src="/images/logo.png" alt="" width={110} height={41} />[{e.photoPlaceholder}]
            </div>
          )}
          <div>
            <div className={styles.meta}>
              <span>
                {event.date ? (
                  <time dateTime={event.date}>{formatDate(event.date, "long", locale)}</time>
                ) : (
                  <ValueOrPlaceholder value={null} label={e.datePlaceholder} />
                )}
              </span>
              <span>
                <ValueOrPlaceholder value={event.place} label={e.placePlaceholder} />
              </span>
            </div>
            <h3>
              <ValueOrPlaceholder value={event.title} label={e.titlePlaceholder} />
            </h3>
            <p>
              <ValueOrPlaceholder value={event.description} label={e.descriptionPlaceholder} />
            </p>
            {linkToEvents && (
              <Link className="more" href={routes(locale).events}>
                {t.common.details}
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default EventGrid;
