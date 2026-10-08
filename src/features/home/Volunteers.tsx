import { Kicker, SectionHeading, ValueOrPlaceholder } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import { volunteers } from "./content";
import styles from "./Volunteers.module.css";

const Volunteers = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const v = t.volunteers;
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeading kicker={v.kicker} title={v.title} />
        <div className={styles.grid}>
          {volunteers.map((volunteer, index) => (
            <figure key={volunteer.id} className={`${styles.card} rv`} style={staggerStyle(index)}>
              <Image
                src={volunteer.image}
                alt={v.imageAlt}
                width={420}
                height={560}
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 280px"
              />
              <figcaption className={styles.caption}>
                <b>
                  <ValueOrPlaceholder value={volunteer.name} label={v.namePlaceholder} />
                </b>
                <small>{v.role}</small>
              </figcaption>
            </figure>
          ))}
          <div className={`${styles.card} ${styles.join} on-dark rv`} style={staggerStyle(volunteers.length)}>
            <Kicker>{v.join.kicker}</Kicker>
            <h3>{v.join.title}</h3>
            <p>{v.join.text}</p>
            <Link className="btn btn--lime" href={routes(locale).contact}>
              {v.join.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteers;
