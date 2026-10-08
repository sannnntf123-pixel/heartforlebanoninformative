import ExternalButton from "@/components/site/ExternalButton";
import { HeartOutline } from "@/components/site/icons";
import { HighlightedText, Kicker, SectionHeading } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import type { Locale } from "@/i18n/config";
import type { AboutDictionary, Dictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import styles from "./ImpactVisionClosing.module.css";

export const Impact = ({ a }: { a: AboutDictionary }) => {
  const i = a.impact;
  return (
    <section className={`sec on-dark ${styles.impact}`} id="impact">
      <div className={`wrap ${styles.impactInner}`}>
        <SectionHeading kicker={i.kicker} title={i.title} />
        <ul className={styles.stats}>
          {i.items.map((item, index) => (
            <li key={item.label} className="rv" style={staggerStyle(index)}>
              <b dir="ltr">{item.value}</b>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const Vision = ({ a }: { a: AboutDictionary }) => {
  const v = a.vision;
  return (
    <section className="sec" id="vision">
      <div className={`wrap ${styles.visionGrid}`}>
        <div className="rv">
          <Kicker>{v.kicker}</Kicker>
          <h2 className={styles.visionTitle}>
            <HighlightedText copy={v.title} />
          </h2>
          <p className={styles.visionLead}>{v.lead}</p>
        </div>
        <ul className={`${styles.visionList} rv`}>
          {v.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="wrap">
        <p className={`${styles.statement} rv`}>
          {v.closing[0]} <strong>{v.closing[1]}</strong>
        </p>
      </div>
    </section>
  );
};

type ClosingProps = { locale: Locale; a: AboutDictionary; t: Dictionary };

export const Closing = ({ locale, a, t }: ClosingProps) => {
  const c = a.closing;
  return (
    <section className={`sec sec--alt ${styles.closing}`}>
      <HeartOutline className={styles.closingHeart} />
      <div className={`wrap ${styles.closingInner} rv`}>
        <Image className={styles.logo} src="/images/logo.png" alt={c.name} width={240} height={90} />
        <ul className={styles.together}>
          {c.lines.map((line) => (
            <li key={line.highlight}>
              <HighlightedText copy={line} />
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <ExternalButton href={brand.links.donate} withHeart>
            {t.common.donateNow}
          </ExternalButton>
          <Link className="btn btn--out" href={routes(locale).contact}>
            {c.contactCta}
          </Link>
        </div>
      </div>
    </section>
  );
};
