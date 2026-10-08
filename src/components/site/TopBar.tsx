import { brand } from "@/config/brand";
import { alternateLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Link from "next/link";
import styles from "./TopBar.module.css";

type TopBarProps = { locale: Locale; t: Dictionary };

const TopBar = ({ locale, t }: TopBarProps) => {
  const other = alternateLocale(locale);
  return (
    <div className={styles.top}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.tagline}>{t.topBar.tagline}</span>
        <div className={styles.links}>
          <a href={brand.links.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={brand.links.donate} target="_blank" rel="noopener noreferrer">
            GoFundMe
          </a>
          <Link className={styles.lang} href={`/${other}`} lang={other} hrefLang={other}>
            {t.common.switchLanguage}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
