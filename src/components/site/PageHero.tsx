import Link from "next/link";
import type { ReactNode } from "react";
import { HeartOutline } from "./icons";
import styles from "./PageHero.module.css";
import { Kicker } from "./Typography";

type PageHeroProps = {
  kicker: string;
  title: ReactNode;
  /** Short paragraph under the title. */
  intro?: string;
  breadcrumb: { label: string; homeLabel: string; homeHref: string; current: string };
  children?: ReactNode;
};

/** Dark banner at the top of inner pages; sits under the transparent header. */
const PageHero = ({ kicker, title, intro, breadcrumb, children }: PageHeroProps) => (
  <section className={`${styles.hero} on-dark`}>
    <HeartOutline className={styles.heart} />
    <div className={`wrap ${styles.inner}`}>
      <nav aria-label={breadcrumb.label} className={styles.breadcrumb}>
        <ol>
          <li>
            <Link href={breadcrumb.homeHref}>{breadcrumb.homeLabel}</Link>
          </li>
          <li aria-current="page">{breadcrumb.current}</li>
        </ol>
      </nav>
      <div className={styles.copy}>
        <Kicker>{kicker}</Kicker>
        <h1>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
        {children}
      </div>
    </div>
  </section>
);

export default PageHero;
