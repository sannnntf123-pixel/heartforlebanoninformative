import {
  BasketIcon,
  DropIcon,
  HomeHeartIcon,
  MedicineIcon,
  PeopleIcon,
  StethoscopeIcon,
} from "@/components/site/icons";
import { SectionHeading } from "@/components/site/Typography";
import type { Dictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import type { ComponentType } from "react";
import { services } from "./content";
import styles from "./Services.module.css";

const icons: Record<(typeof services)[number]["icon"], ComponentType> = {
  medicine: MedicineIcon,
  basket: BasketIcon,
  drop: DropIcon,
  homeHeart: HomeHeartIcon,
  stethoscope: StethoscopeIcon,
  people: PeopleIcon,
};

const Services = ({ t }: { t: Dictionary }) => (
  <section className="sec sec--alt">
    <div className="wrap">
      <SectionHeading kicker={t.services.kicker} title={t.services.title} />
      <div className={styles.grid}>
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          const copy = t.services.items[service.id];
          return (
            <article key={service.id} className={`${styles.card} rv`} style={staggerStyle(index)}>
              <div className={styles.media}>
                <Image
                  src={service.image}
                  alt=""
                  width={450}
                  height={338}
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 380px"
                />
              </div>
              <div className={styles.icon}>
                <Icon />
              </div>
              <div className={styles.text}>
                <h3>{copy.title}</h3>
                <p>{copy.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
