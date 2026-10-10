import { ClockIcon, PinIcon } from "@/components/site/icons";
import PageHero from "@/components/site/PageHero";
import { routes } from "@/config/routes";
import detail from "@/features/events/EventDetail.module.css";
import { getEventBySlug, getEventSlugs, getRegisteredCount, isUpcoming } from "@/features/events/queries";
import SignupForm from "@/features/events/SignupForm";
import { pageAlternates } from "@/i18n/alternates";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/get-dictionary";
import { formatEventDate } from "@/lib/format";
import { formatInteger, interpolate } from "@/lib/i18n-format";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// New events published after a deploy are rendered on first visit, then cached.
export const dynamicParams = true;
// Re-render hourly so an event switches to "past" once it ends.
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
      images: event.banner ? [{ url: event.banner.url, width: event.banner.width, height: event.banner.height }] : undefined,
    },
  };
}

type SignupPanelProps = {
  event: NonNullable<Awaited<ReturnType<typeof getEventBySlug>>>;
  locale: Locale;
  t: Dictionary;
};

/** Sign-up card: form, places left, or the reason sign-up is unavailable. */
const SignupPanel = async ({ event, locale, t }: SignupPanelProps) => {
  const s = t.eventsPage.signup;
  const { enabled, capacity, deadline } = event.registration;

  let message: string | null = null;
  let placesLeft: number | null = null;

  if (!isUpcoming(event)) message = s.past;
  else if (!enabled) message = s.noSignup;
  else if (deadline && new Date(deadline) < new Date()) message = s.closed;
  else if (capacity) {
    placesLeft = Math.max(0, capacity - (await getRegisteredCount(event.id)));
    if (placesLeft === 0) message = s.full;
  }

  return (
    <section className={detail.card} aria-labelledby="signup-title">
      <h2 id="signup-title">{s.title}</h2>
      {message ? (
        <p className={detail.notice}>{message}</p>
      ) : (
        <>
          {placesLeft !== null && (
            <p className={detail.places}>
              {interpolate(s.spotsLeft, { count: formatInteger(placesLeft, locale) })}
            </p>
          )}
          <SignupForm
            eventId={event.id}
            locale={locale}
            t={{ fields: s.fields, submit: s.submit, sending: s.sending, success: s.success, errors: s.errors }}
          />
        </>
      )}
    </section>
  );
};

export default async function EventPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [t, event] = await Promise.all([getDictionary(locale), getEventBySlug(slug, locale)]);
  if (!event) notFound();

  const p = t.eventsPage;
  const r = routes(locale);
  const when = formatEventDate(event.startDate, event.endDate, locale);
  const image = event.banner ?? event.cover;

  // Structured data so search engines can show the event.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: event.location, address: event.location },
    ...(image ? { image: [image.url] } : {}),
    organizer: { "@type": "Organization", name: t.meta.title },
    inLanguage: locale,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            <Link className="more" href={r.events}>
              {p.detail.backToEvents}
            </Link>
          </div>

          <aside className={detail.aside}>
            <dl className={detail.card}>
              <div>
                <dt>
                  <ClockIcon /> {p.detail.when}
                </dt>
                <dd>
                  <time dateTime={event.startDate}>{when}</time>
                </dd>
              </div>
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
            <SignupPanel event={event} locale={locale} t={t} />
          </aside>
        </div>
      </section>
    </main>
  );
}
