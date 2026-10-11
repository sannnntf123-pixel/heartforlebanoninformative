import { ClockIcon, PinIcon } from "@/components/site/icons";
import PageHero from "@/components/site/PageHero";
import { routes } from "@/config/routes";
import detail from "@/features/events/EventDetail.module.css";
import { getEventBySlug, getEventSlugs, isUpcoming } from "@/features/events/queries";
import EventGallery from "@/features/events/EventGallery";
import { pageAlternates } from "@/i18n/alternates";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { formatEventDate } from "@/lib/format";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// New events published after a deploy are rendered on first visit, then cached.
export const dynamicParams = true;
// Re-render hourly so an event is marked "past" once its day is over.
export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const event = await getEventBySlug(slug, locale);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary,
    alternates: pageAlternates(locale, `/events/${slug}`),
    openGraph: {
      title: event.title,
      description: event.summary,
      url: `/${locale}/events/${slug}`,
      images: event.wide ? [{ url: event.wide.url, width: event.wide.width, height: event.wide.height }] : undefined,
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [t, event] = await Promise.all([getDictionary(locale), getEventBySlug(slug, locale)]);
  if (!event) notFound();

  const p = t.eventsPage;
  const r = routes(locale);
  const when = event.date ? formatEventDate(event.date, locale) : null;
  const past = !isUpcoming(event);
  const image = event.wide ?? event.cover;

  // Structured data so search engines can show the event.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: event.location, address: event.location },
    ...(image ? { image: [image.url] } : {}),
    organizer: { "@type": "Organization", name: t.meta.title },
    inLanguage: locale,
  };

  return (
    <main>
      {/* Search engines require a date for event results, so only dated events get it. */}
      {event.date && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <PageHero
        kicker={p.categories[event.category]}
        title={event.title}
        intro={event.summary}
        breadcrumb={{
          label: t.common.breadcrumb,
          homeLabel: t.nav.home,
          homeHref: r.home,
          parent: { label: p.meta.title, href: r.events },
          current: event.title,
        }}
      />

      <section className="sec">
        <div className={`wrap ${detail.layout}`}>
          <div className={detail.main}>
            {image && (
              <Image
                className={detail.banner}
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 1100px) 100vw, 720px"
                priority
              />
            )}
            {event.description && (
              <div className={detail.body}>
                <h2>{p.detail.about}</h2>
                <RichText data={event.description} />
              </div>
            )}
            {event.gallery.length > 0 && (
              <EventGallery
                photos={event.gallery}
                locale={locale}
                t={p.gallery}
              />
            )}
            <Link className="more" href={r.events}>
              {p.detail.backToEvents}
            </Link>
          </div>

          <aside className={detail.aside}>
            <dl className={detail.card}>
              {when && (
                <div>
                  <dt>
                    <ClockIcon /> {p.detail.when}
                  </dt>
                  <dd>
                    <time dateTime={event.date ?? undefined}>{when}</time>
                    {past && <span className={detail.pastNote}> · {p.pastBadge}</span>}
                  </dd>
                </div>
              )}
              <div>
                <dt>
                  <PinIcon /> {p.detail.where}
                </dt>
                <dd>{event.location}</dd>
              </div>
              <div>
                <dt>{p.detail.category}</dt>
                <dd>{p.categories[event.category]}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
  );
}
