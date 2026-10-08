import { BidiText, HighlightedText, Kicker } from "@/components/site/Typography";
import type { Locale } from "@/i18n/config";
import type { AboutDictionary } from "@/i18n/get-dictionary";
import Image from "next/image";
import { aboutPagePhotos } from "./content";
import styles from "./WhoWeAre.module.css";

const WhoWeAre = ({ locale, a }: { locale: Locale; a: AboutDictionary }) => {
  const w = a.whoWeAre;
  return (
    <section className="sec" id="who-we-are">
      <div className={`wrap ${styles.grid}`}>
        <div className="rv">
          <Kicker>{w.kicker}</Kicker>
          <h2 className={styles.title}>
            <HighlightedText copy={w.title} />
          </h2>
          {w.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              <BidiText text={paragraph} lang={locale} />
            </p>
          ))}
        </div>

        <aside className={`${styles.aside} rv`} aria-labelledby="facts-title">
          <Image
            className={styles.photo}
            src={aboutPagePhotos.whoWeAre}
            alt={w.imageAlt}
            width={628}
            height={419}
            sizes="(max-width: 1100px) 100vw, 480px"
          />
          <div className={styles.facts}>
            <h3 id="facts-title">{w.factsTitle}</h3>
            <dl>
              {w.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>
                    <BidiText text={fact.value} lang={locale} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <div className="wrap">
        <figure className={`${styles.belief} rv`}>
          <p className={styles.beliefIntro}>{w.beliefIntro}</p>
          <blockquote>
            <p>{w.belief}</p>
          </blockquote>
          <figcaption>{w.beliefText}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default WhoWeAre;
