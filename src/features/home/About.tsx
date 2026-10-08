import { HighlightedText, Kicker } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import type { Dictionary } from "@/i18n/get-dictionary";
import Image from "next/image";
import styles from "./About.module.css";
import { aboutImages } from "./content";

const About = ({ t }: { t: Dictionary }) => (
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
        <a className={`btn ${styles.cta}`} href={brand.sections.about}>
          {t.about.cta}
        </a>
      </div>
    </div>
  </section>
);

export default About;
