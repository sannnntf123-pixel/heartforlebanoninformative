import { SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import { getPublishedEvents, splitEvents, type EventSummary } from "@/features/events/queries";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatEventDate } from "@/lib/format";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import styles from "./EventsSpotlight.module.css";

const SPOTLIGHT_COUNT = 3;

type CardProps = { event: EventSummary; locale: Locale; t: Dictionary; lead: boolean; index: number };

const SpotlightCard = ({ event, locale, t, lead, index }: CardProps) => {
  const href = routes(locale).event(event.slug);
  const photo = event.wide ?? event.cover;
  return (
    <article className={`${styles.card} ${lead ? styles.lead : ""} rv`} style={staggerStyle(index)}>
      {photo && (
        <Image
          className={styles.photo}
          src={photo.url}
          alt=""
          fill
          sizes={lead ? "(max-width: 1100px) 100vw, 720px" : "(max-width: 1100px) 100vw, 460px"}
        />
      )}
      <div className={styles.body}>
        <span className={styles.meta}>
          <span className={styles.tag}>{t.eventsPage.categories[event.category]}</span>
          {event.date && <time dateTime={event.date}>{formatEventDate(event.date, locale)}</time>}
        </span>
        <h3>
          {/* The whole card is clickable through this link's stretched area. */}
          <Link href={href} className={styles.link}>
            {event.title}
          </Link>
        </h3>
        {lead && <p className={styles.summary}>{event.summary}</p>}
        <span className={styles.more} aria-hidden="true">
          {t.common.readMore}
        </span>
      </div>
    </article>
  );
};

/**
 * Landing-page events spotlight, right after the hero: the events marked
 * "Show on home page" in the CMS, falling back to the important events and
 * then the next upcoming ones when none are picked.
 */
const EventsSpotlight = async ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const { important, upcoming, past, upcomingAll } = splitEvents(await getPublishedEvents(locale));
  const picked = [...important, ...upcoming, ...past].filter((e) => e.showOnHome);
  const events = (picked.length ? picked : important.length ? important : upcomingAll).slice(0, SPOTLIGHT_COUNT);
  if (events.length === 0) return null;

  return (
    <section className="sec" id="events">
      <div className="wrap">
        <SectionHeading kicker={t.events.kicker} title={t.events.title} />
        <div className={`${styles.grid} ${events.length === 1 ? styles.single : ""}`}>
          {events.map((event, index) => (
            <SpotlightCard key={event.id} event={event} locale={locale} t={t} lead={index === 0} index={index} />
          ))}
        </div>
        <div className={styles.all}>
          <Link className="btn btn--out" href={routes(locale).events}>
            {t.eventsPage.allEvents}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSpotlight;
