import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatInteger, interpolate } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ExternalButton from "./ExternalButton";
import { InstagramIcon, MailIcon, PinIcon } from "./icons";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = { locale: Locale; t: Dictionary };

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const InfoItem = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
  <div>
    <span className={styles.infoIcon}>{icon}</span>
    <span>
      <b>{title}</b>
      {children}
    </span>
  </div>
);

const SiteFooter = ({ locale, t }: SiteFooterProps) => {
  const r = routes(locale);
  const f = t.footer;
  const year = formatInteger(new Date().getFullYear(), locale);

  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className="wrap">
        <div className={styles.main}>
          <div>
            <Link className={styles.logo} href={r.home}>
              <Image src="/images/logo-white.png" alt={f.logoAlt} width={176} height={66} />
            </Link>
            <p>{f.about}</p>
            <div className={styles.social}>
              <a href={brand.links.instagram} {...external} aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
            {/* The footer's single donation link. */}
            <ExternalButton href={brand.links.donate} variant="lime" withHeart className={styles.donate}>
              {t.common.donateNow}
            </ExternalButton>
          </div>

          <div>
            <h4>{f.links}</h4>
            <ul>
              <li>
                <Link href={r.about}>{t.nav.about}</Link>
              </li>
              <li>
                <Link href={r.activities}>{t.nav.activities}</Link>
              </li>
              <li>
                <Link href={r.events}>{t.nav.events}</Link>
              </li>
              <li>
                <Link href={r.ppc}>{t.nav.ppc}</Link>
              </li>
              <li>
                <Link href={r.contact}>{t.nav.contact}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>{f.programmes}</h4>
            <ul>
              {f.programmeItems.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{f.follow}</h4>
            <ul>
              <li>
                <a href={brand.links.instagram} {...external}>
                  <span dir="ltr">{brand.links.instagramHandle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.info}>
          <InfoItem icon={<PinIcon />} title={f.location}>
            {t.contact.location}
          </InfoItem>
          <InfoItem icon={<MailIcon />} title={f.email}>
            <a href={`mailto:${brand.contact.email}`} dir="ltr">
              {brand.contact.email}
            </a>
          </InfoItem>
        </div>
      </div>
      <div className={styles.copy}>{interpolate(f.copyright, { year })}</div>
    </footer>
  );
};

export default SiteFooter;
