import { CapIcon, DocIcon, MicIcon, PeaceIcon, PeopleIcon } from "@/components/site/icons";
import PageHero from "@/components/site/PageHero";
import { HighlightedText, Kicker, SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import { pageAlternates } from "@/i18n/alternates";
import { alternateLocale, isLocale } from "@/i18n/config";
import { getDictionary, getPpcDictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ locale: string }> };

/** This project has its own identity, so link previews show its logo. */
const shareImage = { url: "/images/ppc/logo.jpg", width: 1206, height: 1334 };

const activityIcons: Record<string, ReactNode> = {
  academy: <CapIcon />,
  forums: <PeopleIcon />,
  podcast: <MicIcon />,
  workshops: <PeaceIcon />,
  research: <DocIcon />,
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = await getPpcDictionary(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: pageAlternates(locale, "/ppc"),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}/ppc`,
      images: [{ ...shareImage, alt: meta.title }],
    },
  };
}

/** "Peace Protects the Shia" (السلام يحمي الشيعة): a project page with its own logo. */
export default async function PpcPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [t, p] = await Promise.all([getDictionary(locale), getPpcDictionary(locale)]);
  const other = alternateLocale(locale);

  return (
    <main>
      <PageHero
        kicker={p.hero.kicker}
        title={p.hero.title}
        breadcrumb={{
          label: t.common.breadcrumb,
          homeLabel: t.nav.home,
          homeHref: routes(locale).home,
          current: p.meta.title,
        }}
      >
        <p className={styles.altTitle}>
          <bdi lang={other}>{p.hero.altTitle}</bdi>
        </p>
        <p className={styles.subtitle}>{p.hero.subtitle}</p>
        <div className={styles.logoTile}>
          <Image src="/images/ppc/logo.jpg" alt={p.hero.logoAlt} width={1206} height={1334} sizes="220px" priority />
        </div>
      </PageHero>

      <section className="sec">
        <div className={`wrap ${styles.intro}`}>
          <div className="rv">
            <Kicker>{p.intro.kicker}</Kicker>
            <h2 className={styles.h2}>
              <HighlightedText copy={p.intro.title} />
            </h2>
            {p.intro.paragraphs.map((text) => (
              <p key={text} className={styles.lead}>
                {text}
              </p>
            ))}
          </div>
          <figure className={`${styles.banner} rv`}>
            <Image
              src="/images/ppc/rollup-banner.jpg"
              alt={p.intro.imageAlt}
              width={853}
              height={1280}
              sizes="(max-width: 1100px) 90vw, 420px"
            />
          </figure>
        </div>
      </section>

      <section className="sec sec--alt">
        <div className="wrap">
          <SectionHeading kicker={p.activities.kicker} title={p.activities.title} />
          <ul className={styles.activities}>
            {p.activities.items.map((item, index) => (
              <li key={item.id} className={`${styles.card} rv`} style={staggerStyle(index)}>
                <span className={styles.icon}>{activityIcons[item.id]}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading kicker={p.podcast.kicker} title={p.podcast.title} />
          <figure className={`${styles.studio} rv`}>
            <Image
              src="/images/ppc/podcast-studio.jpg"
              alt={p.podcast.imageAlt}
              width={1280}
              height={720}
              sizes="(max-width: 1240px) 100vw, 1180px"
            />
          </figure>
        </div>
      </section>

      <section className={`${styles.vision} on-dark`}>
        <div className={`wrap ${styles.visionInner} rv`}>
          <Kicker>{p.vision.kicker}</Kicker>
          <p className={styles.visionText}>{p.vision.text}</p>
          <div className={styles.motto}>
            <span>{p.vision.mottoLabel}</span>
            <strong>{p.vision.motto}</strong>
            <bdi lang={other}>{p.vision.mottoAlt}</bdi>
          </div>
        </div>
      </section>
    </main>
  );
}
