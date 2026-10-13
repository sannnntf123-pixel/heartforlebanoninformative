import PageHero from "@/components/site/PageHero";
import { routes } from "@/config/routes";
import ContactChannels from "@/features/contact/ContactChannels";
import { pageAlternates } from "@/i18n/alternates";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = (await getDictionary(locale)).contactPage;
  return {
    title: meta.title,
    description: meta.description,
    alternates: pageAlternates(locale, "/contact"),
    openGraph: { title: meta.title, description: meta.description, url: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.contactPage;

  return (
    <main>
      <PageHero
        kicker={p.kicker}
        title={p.title}
        breadcrumb={{
          label: t.common.breadcrumb,
          homeLabel: t.nav.home,
          homeHref: routes(locale).home,
          current: p.meta.title,
        }}
        intro={p.intro}
      />
      <ContactChannels t={t} />
    </main>
  );
}
