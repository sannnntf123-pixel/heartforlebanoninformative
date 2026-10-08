import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import TopBar from "@/components/site/TopBar";
import Contact from "@/features/contact/Contact";
import About from "@/features/home/About";
import Campaigns from "@/features/home/Campaigns";
import DonateBand from "@/features/home/DonateBand";
import Events from "@/features/home/Events";
import Faq from "@/features/home/Faq";
import Hero from "@/features/home/Hero";
import News from "@/features/home/News";
import Services from "@/features/home/Services";
import Testimonials from "@/features/home/Testimonials";
import Volunteers from "@/features/home/Volunteers";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <TopBar locale={locale} t={t} />
      {/* Only the slices the client component needs are serialised. */}
      <SiteHeader locale={locale} t={{ common: t.common, nav: t.nav, meta: t.meta }} />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Services t={t} />
        <Faq t={t} />
        <Campaigns locale={locale} t={t} />
        <DonateBand locale={locale} t={t} />
        <Events locale={locale} t={t} />
        <Testimonials t={t} />
        <Volunteers t={t} />
        <News locale={locale} t={t} />
        <Contact t={t} />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
