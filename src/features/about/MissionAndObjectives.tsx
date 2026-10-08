import {
  CapIcon,
  HomeHeartIcon,
  MegaphoneIcon,
  PeaceIcon,
  ShieldIcon,
  StethoscopeIcon,
  WomanIcon,
} from "@/components/site/icons";
import { SectionHeading } from "@/components/site/Typography";
import type { Locale } from "@/i18n/config";
import type { AboutDictionary } from "@/i18n/get-dictionary";
import { formatInteger, staggerStyle } from "@/lib/i18n-format";
import type { ComponentType } from "react";
import styles from "./MissionAndObjectives.module.css";

type CardProps = {
  Icon: ComponentType;
  title: string;
  text: string;
  index: number;
  perRow: number;
  number?: string;
};

const PillarCard = ({ Icon, title, text, index, perRow, number }: CardProps) => (
  <article className={`${styles.card} rv`} style={staggerStyle(index, perRow)}>
    <div className={styles.cardHead}>
      <span className={styles.icon}>
        <Icon />
      </span>
      {number && (
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
      )}
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </article>
);

const missionIcons = { youth: CapIcon, protect: ShieldIcon, women: WomanIcon, peace: PeaceIcon };

export const Mission = ({ a }: { a: AboutDictionary }) => {
  const m = a.mission;
  return (
    <section className="sec sec--alt" id="mission">
      <div className="wrap">
        <SectionHeading kicker={m.kicker} title={m.title} note={m.lead} />
        <div className={`${styles.grid} ${styles.four}`}>
          {(Object.keys(missionIcons) as (keyof typeof missionIcons)[]).map((key, index) => (
            <PillarCard
              key={key}
              Icon={missionIcons[key]}
              title={m.items[key].title}
              text={m.items[key].text}
              index={index}
              perRow={4}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const objectiveIcons = {
  youth: CapIcon,
  peace: PeaceIcon,
  health: StethoscopeIcon,
  civic: MegaphoneIcon,
  humanitarian: HomeHeartIcon,
  women: WomanIcon,
};

export const Objectives = ({ locale, a }: { locale: Locale; a: AboutDictionary }) => {
  const o = a.objectives;
  return (
    <section className="sec" id="objectives">
      <div className="wrap">
        <SectionHeading kicker={o.kicker} title={o.title} note={o.lead} />
        <div className={`${styles.grid} ${styles.three}`}>
          {(Object.keys(objectiveIcons) as (keyof typeof objectiveIcons)[]).map((key, index) => (
            <PillarCard
              key={key}
              Icon={objectiveIcons[key]}
              title={o.items[key].title}
              text={o.items[key].text}
              index={index}
              perRow={3}
              number={formatInteger(index + 1, locale).padStart(2, locale === "ar" ? "٠" : "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
