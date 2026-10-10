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
  const { upcoming, past } = splitEvents(events);
  const p = t.eventsPage;
  const r = routes(locale);

  return (
    <main>
      <PageHero
        kicker={p.kicker}
        title={p.title}
        intro={p.intro}
        breadcrumb={{ label: t.common.breadcrumb, homeLabel: t.nav.home, homeHref: r.home, current: p.meta.title }}
      />

      <section className="sec" id="upcoming">
        <div className="wrap">
          <SectionHeading kicker={p.upcoming.kicker} title={p.upcoming.title} />
          {upcoming.length > 0 ? (
            <EventGrid events={upcoming} locale={locale} t={t} />
          ) : (
            <p className={gridStyles.empty}>{p.upcoming.empty}</p>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="sec sec--alt" id="archive">
          <div className="wrap">
            <SectionHeading kicker={p.past.kicker} title={p.past.title} />
            <EventGrid events={past} locale={locale} t={t} past />
          </div>
        </section>
      )}

      <section className={`sec ${past.length > 0 ? "" : "sec--alt"}`}>
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
