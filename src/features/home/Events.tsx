import { SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import EventGrid from "@/features/events/EventGrid";
import styles from "@/features/events/EventGrid.module.css";
import { getPublishedEvents, splitEvents } from "@/features/events/queries";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Link from "next/link";

const PREVIEW_COUNT = 4;

/** Landing-page preview: featured upcoming events first, then the soonest. */
const Events = async ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const { upcomingAll } = splitEvents(await getPublishedEvents(locale));
  const preview = [...upcomingAll]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, PREVIEW_COUNT);

  return (
    <section className="sec" id="events">
      <div className="wrap">
        <SectionHeading kicker={t.events.kicker} title={t.events.title} />
        {preview.length > 0 ? (
          <EventGrid events={preview} locale={locale} t={t} />
        ) : (
          <p className={styles.empty}>{t.eventsPage.upcoming.empty}</p>
        )}
        <div className={styles.more}>
          <Link className="btn btn--out" href={routes(locale).events}>
            {t.eventsPage.allEvents}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;
