import Contact from "@/features/contact/Contact";
import About from "@/features/home/About";
import EventQuotes from "@/features/home/EventQuotes";
import EventsSpotlight from "@/features/home/EventsSpotlight";
import Faq from "@/features/home/Faq";
import Hero from "@/features/home/Hero";
import ImpactBand from "@/features/home/ImpactBand";
import News from "@/features/home/News";
import Services from "@/features/home/Services";
import Volunteers from "@/features/home/Volunteers";
import { pageAlternates } from "@/i18n/alternates";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { alternates: pageAlternates(locale, "") } : {};
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <main>
      <Hero locale={locale} t={t} />
      {/* Events come first after the hero: the charity's key activities. */}
      <EventsSpotlight locale={locale} t={t} />
      <About locale={locale} t={t} />
      <Services t={t} />
      <Faq t={t} />
      <ImpactBand locale={locale} t={t} />
      <EventQuotes locale={locale} t={t} />
      <Volunteers locale={locale} t={t} />
      <News locale={locale} t={t} />
      <Contact t={t} />
    </main>
  );
}
