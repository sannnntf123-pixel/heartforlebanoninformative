import ExternalButton from "@/components/site/ExternalButton";
import { HeartOutline } from "@/components/site/icons";
import { HighlightedText, Kicker } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatInteger } from "@/lib/i18n-format";
import styles from "./DonateBand.module.css";

/** Amount chips all lead to GoFundMe, where the actual amount is chosen. */
const DonateBand = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const d = t.donateBand;
  const chips = [
    ...brand.donationAmounts.map((amount) => ({
      key: String(amount),
      label: `$${formatInteger(amount, locale)}`,
      featured: amount === brand.featuredAmount,
    })),
    { key: "custom", label: d.custom, featured: false },
  ];

  return (
    <section className={`${styles.band} on-dark rv`}>
      <HeartOutline className={styles.heart} />
      <div className={`wrap ${styles.inner}`}>
        <Kicker>{d.kicker}</Kicker>
        <h2>
          <HighlightedText copy={d.title} />
        </h2>
        <p>{d.text}</p>
        <div className={styles.chips}>
          {chips.map((chip) => (
            <a
              key={chip.key}
              href={brand.links.donate}
              target="_blank"
              rel="noopener noreferrer"
              className={chip.featured ? styles.selected : undefined}
            >
              {chip.label}
            </a>
          ))}
        </div>
        <ExternalButton href={brand.links.donate} variant="lime" withHeart className={styles.cta}>
          {d.cta}
        </ExternalButton>
      </div>
    </section>
  );
};

export default DonateBand;
