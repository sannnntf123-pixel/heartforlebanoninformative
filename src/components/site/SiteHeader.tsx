"use client";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import ExternalButton from "./ExternalButton";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  locale: Locale;
  t: Pick<Dictionary, "common" | "nav" | "meta">;
};

const SiteHeader = ({ locale, t }: SiteHeaderProps) => {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const home = `/${locale}`;

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = [
    { href: home, label: t.nav.home, current: true },
    { href: `${home}${brand.sections.about}`, label: t.nav.about },
    { href: `${home}${brand.sections.activities}`, label: t.nav.activities },
    { href: `${home}${brand.sections.contact}`, label: t.nav.contact },
  ];

  return (
    <header className={`${styles.header} ${open ? styles.open : ""}`}>
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.logo} href={home} aria-label={t.meta.title}>
          <Image src="/images/logo-white.png" alt="" width={155} height={58} priority />
        </Link>

        <nav id={navId} className={styles.nav} aria-label={t.common.mainNav}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ExternalButton href={brand.links.donate} variant="lime" withHeart>
            {t.common.donateNow}
          </ExternalButton>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls={navId}
            aria-label={t.common.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <i aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
