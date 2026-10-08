import { SectionHeading, ValueOrPlaceholder } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatDate } from "@/lib/format";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import { upcomingEvents } from "./content";
import styles from "./Events.module.css";

const Events = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const e = t.events;
  return (
    <section className="sec" id="events">
      <div className="wrap">
        <SectionHeading kicker={e.kicker} title={e.title} />
        <div className={styles.grid}>
          {upcomingEvents.map((event, index) => (
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
                <a className="more" href={brand.sections.activities}>
                  {t.common.details}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
