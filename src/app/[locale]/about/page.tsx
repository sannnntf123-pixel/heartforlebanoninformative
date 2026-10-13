import PageHero from "@/components/site/PageHero";
import { routes } from "@/config/routes";
import { shareImage } from "@/config/site";
import Activities from "@/features/about/Activities";
import { Closing, Impact, Vision } from "@/features/about/ImpactVisionClosing";
import { Mission, Objectives } from "@/features/about/MissionAndObjectives";
import WhoWeAre from "@/features/about/WhoWeAre";
import { pageAlternates } from "@/i18n/alternates";
import { alternateLocale, isLocale } from "@/i18n/config";
import { getAboutDictionary, getDictionary } from "@/i18n/get-dictionary";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const a = await getAboutDictionary(locale);
  return {
    title: a.meta.title,
    description: a.meta.description,
    alternates: pageAlternates(locale, "/about"),
    openGraph: {
      title: a.meta.title,
      description: a.meta.description,
      url: `/${locale}/about`,
      images: [shareImage],
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [t, a] = await Promise.all([getDictionary(locale), getAboutDictionary(locale)]);
  const other = alternateLocale(locale);
  const otherName = (await getAboutDictionary(other)).hero.name;

  return (
    <main>
      <PageHero
        kicker={a.hero.kicker}
        title={a.hero.name}
        breadcrumb={{
          label: t.common.breadcrumb,
          homeLabel: t.nav.home,
          homeHref: routes(locale).home,
          current: a.meta.title,
        }}
      >
        <p className={styles.altName}>
          <bdi lang={other}>{otherName}</bdi>
        </p>
        <ul className={styles.tagline}>
          {a.hero.tagline.map((line) => (
            <li key={line}>{line}</li>
          ))}
          <li className={styles.taglineEnd}>{a.hero.taglineEnd}</li>
        </ul>
      </PageHero>
      <WhoWeAre locale={locale} a={a} />
      <Mission a={a} />
      <Objectives locale={locale} a={a} />
      <Activities locale={locale} a={a} />
      <Impact a={a} />
      <Vision a={a} />
      <Closing locale={locale} a={a} t={t} />
    </main>
  );
}
