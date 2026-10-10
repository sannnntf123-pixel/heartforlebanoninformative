import { SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import EventGrid from "@/features/events/EventGrid";
import styles from "@/features/events/EventGrid.module.css";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Link from "next/link";

/** Landing-page preview of upcoming events, linking to the events page. */
const Events = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section className="sec" id="events">
    <div className="wrap">
      <SectionHeading kicker={t.events.kicker} title={t.events.title} />
      <EventGrid locale={locale} t={t} limit={4} />
      <div className={styles.more}>
        <Link className="btn btn--out" href={routes(locale).events}>
          {t.eventsPage.allEvents}
        </Link>
      </div>
    </div>
  </section>
);

export default Events;
