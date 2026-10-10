import PageHero from "@/components/site/PageHero";
import { HighlightedText, Kicker, SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import EventGrid from "@/features/events/EventGrid";
import gridStyles from "@/features/events/EventGrid.module.css";
import { getPublishedEvents, splitEvents } from "@/features/events/queries";
import { pageAlternates } from "@/i18n/alternates";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

// Re-render hourly so events move from "upcoming" to the archive once they end,
// even when nobody edits them. Publishing in the CMS refreshes it immediately.
export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = (await getDictionary(locale)).eventsPage;
  return {
    title: meta.title,
    description: meta.description,
    alternates: pageAlternates(locale, "/events"),
    openGraph: { title: meta.title, description: meta.description, url: `/${locale}/events` },
  };
}

export default async function EventsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [t, events] = await Promise.all([getDictionary(locale), getPublishedEvents(locale)]);
  const p = t.eventsPage;
  const { important, upcoming, past } = splitEvents(events);
  // Important and past groups only appear when they have events; "upcoming"
  // always shows, with a friendly message when empty.
  const groups = [
    ...(important.length ? [{ id: "important", copy: p.important, events: important }] : []),
    { id: "upcoming", copy: p.upcoming, events: upcoming },
    ...(past.length ? [{ id: "archive", copy: p.past, events: past }] : []),
  ];
  const r = routes(locale);

  return (
    <main>
      <PageHero
        kicker={p.kicker}
        title={p.title}
        intro={p.intro}
        breadcrumb={{ label: t.common.breadcrumb, homeLabel: t.nav.home, homeHref: r.home, current: p.meta.title }}
      />

      {groups.map((group, index) => (
        // Backgrounds alternate white / grey, whichever groups are shown.
        <section key={group.id} className={`sec ${index % 2 ? "sec--alt" : ""}`} id={group.id}>
          <div className="wrap">
            <SectionHeading kicker={group.copy.kicker} title={group.copy.title} />
            {group.events.length > 0 ? (
              <EventGrid events={group.events} locale={locale} t={t} past={group.id === "archive"} />
            ) : (
              <p className={gridStyles.empty}>{p.upcoming.empty}</p>
            )}
          </div>
        </section>
      ))}

      <section className={`sec ${groups.length % 2 ? "sec--alt" : ""}`}>
        <div className={`wrap ${styles.cta} rv`}>
          <Kicker>{p.cta.kicker}</Kicker>
          <h2>
            <HighlightedText copy={p.cta.title} />
          </h2>
          <p>{p.cta.text}</p>
          <Link className="btn" href={r.contact}>
            {p.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
