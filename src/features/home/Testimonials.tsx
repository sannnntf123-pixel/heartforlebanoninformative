import { SectionHeading, ValueOrPlaceholder } from "@/components/site/Typography";
import type { Dictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import { testimonials, testimonialsBackground } from "./content";
import styles from "./Testimonials.module.css";

const Testimonials = ({ t }: { t: Dictionary }) => {
  const tt = t.testimonials;
  return (
    <section className={`sec on-dark ${styles.section}`}>
      <Image className={styles.background} src={testimonialsBackground} alt="" fill sizes="100vw" />
      <div className={`wrap ${styles.inner}`}>
        <SectionHeading kicker={tt.kicker} title={tt.title} />
        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <figure key={item.id} className={`${styles.card} rv`} style={staggerStyle(index, 2)}>
              <span className={styles.quoteMark} aria-hidden="true">
                ”
              </span>
              <blockquote>
                <p>
                  <ValueOrPlaceholder value={item.quote} label={tt.quotePlaceholder} />
                </p>
              </blockquote>
              <figcaption className={styles.who}>
                <span className={styles.avatar}>
                  <ValueOrPlaceholder value={null} label={tt.photoPlaceholder} />
                </span>
                <span>
                  <b>
                    <ValueOrPlaceholder value={item.name} label={tt.namePlaceholder} />
                  </b>
                  <small>
                    <ValueOrPlaceholder value={item.role} label={tt.rolePlaceholder} />
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
