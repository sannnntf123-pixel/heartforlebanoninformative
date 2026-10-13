import ExternalButton from "@/components/site/ExternalButton";
import { HeartOutline } from "@/components/site/icons";
import { HighlightedText, Kicker } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Link from "next/link";
import { heroSlides } from "./content";
import styles from "./Hero.module.css";
import HeroSlides from "./HeroSlides";

const Hero = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section className={styles.hero}>
    <HeroSlides
      images={heroSlides}
      labels={{ group: t.hero.slidesLabel, slide: t.hero.slideLabel }}
    />
    <HeartOutline className={styles.heart} />

    <div className={`wrap ${styles.content}`}>
      <div className={styles.copy}>
        <Kicker>{t.hero.kicker}</Kicker>
        <h1>
          <HighlightedText copy={t.hero.title} />
        </h1>
        <p>{t.hero.text}</p>
        <div className={styles.cta}>
          <ExternalButton href={brand.links.donate} variant="lime" withHeart>
            {t.common.donateNow}
          </ExternalButton>
          <Link className="btn btn--ghost" href={routes(locale).about}>
            {t.hero.secondaryCta}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
