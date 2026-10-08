import ExternalButton from "@/components/site/ExternalButton";
import { HeartOutline, PlayIcon } from "@/components/site/icons";
import { HighlightedText, Kicker } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import type { Dictionary } from "@/i18n/get-dictionary";
import { heroSlides } from "./content";
import styles from "./Hero.module.css";
import HeroSlides from "./HeroSlides";

const Hero = ({ t }: { t: Dictionary }) => (
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
          <a className="btn btn--ghost" href={brand.sections.about}>
            {t.hero.secondaryCta}
          </a>
        </div>
      </div>
    </div>

    <a
      className={styles.play}
      href={brand.links.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.hero.watchLabel}
    >
      <PlayIcon />
      <span aria-hidden="true">{t.hero.watch}</span>
    </a>
  </section>
);

export default Hero;
