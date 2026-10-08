import { HighlightedText, Kicker } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";
import { aboutImages } from "./content";

const About = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section className="sec" id="about">
    <div className={`wrap ${styles.grid}`}>
      <div className={`${styles.collage} rv`}>
        <Image
          className={styles.primary}
          src={aboutImages.primary}
          alt={t.about.imageAltPrimary}
          width={420}
          height={420}
          sizes="(max-width: 1100px) 66vw, 400px"
        />
        <Image
          className={styles.secondary}
          src={aboutImages.secondary}
          alt={t.about.imageAltSecondary}
          width={448}
          height={299}
          sizes="(max-width: 1100px) 52vw, 300px"
        />
        <div className={styles.stat}>
          <b>{t.about.foundedYear}</b>
          <span>{t.about.foundedLabel}</span>
        </div>
        <span className={styles.ring} aria-hidden="true" />
      </div>

      <div className="rv">
        <Kicker>{t.about.kicker}</Kicker>
        <h2 className={styles.title}>
          <HighlightedText copy={t.about.title} />
        </h2>
        <p className={styles.lead}>{t.about.lead}</p>
        <ul className={styles.checks}>
          {t.about.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Link className={`btn ${styles.cta}`} href={routes(locale).about}>
          {t.about.cta}
        </Link>
      </div>
    </div>
  </section>
);

export default About;
