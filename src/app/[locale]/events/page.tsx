import PageHero from "@/components/site/PageHero";
import { HighlightedText, Kicker } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import EventGrid from "@/features/events/EventGrid";
import { pageAlternates } from "@/i18n/alternates";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

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
  const t = await getDictionary(locale);
  const p = t.eventsPage;
  const r = routes(locale);

  return (
    <main>
      <PageHero
        kicker={p.kicker}
        title={p.title}
        breadcrumb={{ label: t.common.breadcrumb, homeLabel: t.nav.home, homeHref: r.home, current: p.meta.title }}
        intro={p.intro}
      />

      <section className="sec" aria-label={p.title}>
        <div className="wrap">
          <EventGrid locale={locale} t={t} linkToEvents={false} />
        </div>
      </section>

      <section className="sec sec--alt">
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
