import ExternalButton from "@/components/site/ExternalButton";
import { Placeholder, SectionHeading } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { progressPercent } from "@/lib/format";
import { formatMoney, staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./Campaigns.module.css";
import { campaigns, type Campaign } from "./content";

type CardProps = { campaign: Campaign; locale: Locale; t: Dictionary; index: number };

const CampaignCard = ({ campaign, locale, t, index }: CardProps) => {
  const c = t.campaigns;
  const copy = c.items[campaign.id];
  const { raised, goal } = campaign;
  const percent = raised !== null && goal !== null ? progressPercent(raised, goal) : null;
  const amount = (value: number | null) =>
    value === null ? <Placeholder label={c.amountPlaceholder} /> : formatMoney(value, locale);

  return (
    <article className={`${styles.card} rv`} style={staggerStyle(index, 2)}>
      <div className={styles.media}>
        {campaign.image ? (
          <Image
            src={campaign.image}
            alt=""
            width={628}
            height={419}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 44vw, 260px"
          />
        ) : (
          <div className={`phimg ${styles.placeholderImage}`} role="img" aria-label={c.photoPlaceholder}>
            <Image src="/images/logo.png" alt="" width={110} height={41} />
            [{c.photoPlaceholder}]
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.tag}>{copy.tag}</span>
        <h3>{copy.title}</h3>
        <p>{copy.text}</p>

        {percent === null ? (
          <div className={styles.bar} role="img" aria-label={c.progressUnavailable} />
        ) : (
          <div
            className={styles.bar}
            role="progressbar"
            aria-label={c.progress}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ "--w": `${percent}%` } as CSSProperties}
          >
            <i />
          </div>
        )}

        <div className={styles.money}>
          <span>
            {c.progress}
            <b>{percent === null ? <Placeholder label={c.percentPlaceholder} /> : `${percent}%`}</b>
          </span>
          <span>
            {c.raised}
            <b>{amount(raised)}</b>
          </span>
          <span>
            {c.goal}
            <b>{amount(goal)}</b>
          </span>
        </div>

        <ExternalButton href={brand.links.donate} withHeart className={styles.donate}>
          {t.common.donate}
        </ExternalButton>
      </div>
    </article>
  );
};

const Campaigns = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section className="sec sec--alt">
    <div className="wrap">
      <SectionHeading kicker={t.campaigns.kicker} title={t.campaigns.title} note={t.campaigns.note} />
      <div className={styles.grid}>
        {campaigns.map((campaign, index) => (
          <CampaignCard key={campaign.id} campaign={campaign} locale={locale} t={t} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Campaigns;
