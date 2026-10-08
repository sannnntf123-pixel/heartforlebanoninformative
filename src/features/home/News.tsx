import { SectionHeading, ValueOrPlaceholder } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatDate } from "@/lib/format";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import { newsItems } from "./content";
import styles from "./News.module.css";

const News = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const n = t.news;
  return (
    <section className="sec sec--alt" id="news">
      <div className="wrap">
        <SectionHeading kicker={n.kicker} title={n.title} />
        <div className={styles.grid}>
          {newsItems.map((item, index) => {
            const copy = n.items[item.id];
            return (
              <article key={item.id} className={`${styles.card} rv`} style={staggerStyle(index)}>
                <Image
                  className={styles.image}
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 380px"
                />
                <span className={styles.date}>
                  {item.date ? (
                    <time dateTime={item.date}>{formatDate(item.date, "short", locale)}</time>
                  ) : (
                    <ValueOrPlaceholder value={null} label={n.datePlaceholder} />
                  )}
                </span>
                <div className={styles.text}>
                  <span className={styles.tag}>{copy.tag}</span>
                  <h3>{copy.title}</h3>
                  <a className={`more ${styles.more}`} href={brand.sections.activities}>
                    {t.common.readMore}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default News;
