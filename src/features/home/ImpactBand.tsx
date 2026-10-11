import { HeartOutline } from "@/components/site/icons";
import { HighlightedText, Kicker } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatCount, staggerStyle } from "@/lib/i18n-format";
import Link from "next/link";
import styles from "./ImpactBand.module.css";

/** Key numbers from the charity's events; each one links to its event. */
const ImpactBand = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const d = t.impact;
  return (
    <section className={`${styles.band} on-dark rv`}>
      <HeartOutline className={styles.heart} />
      <div className={`wrap ${styles.inner}`}>
        <Kicker>{d.kicker}</Kicker>
        <h2>
          <HighlightedText copy={d.title} />
        </h2>
        <p>{d.text}</p>
        <ul className={styles.stats}>
          {d.stats.map((stat, index) => (
            <li key={stat.slug} className="rv" style={staggerStyle(index)}>
              <Link href={routes(locale).event(stat.slug)} className={styles.stat}>
                <bdi className={styles.value} dir="ltr">
                  {formatCount(stat.value, locale)}
                  {stat.plus && "+"}
                </bdi>
                <span className={styles.label}>{stat.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className={`btn btn--lime ${styles.cta}`} href={routes(locale).events}>
          {d.cta}
        </Link>
      </div>
    </section>
  );
};

export default ImpactBand;
