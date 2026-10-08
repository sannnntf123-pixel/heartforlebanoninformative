"use client";
import { alternateLocale, type Locale } from "@/i18n/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LanguageSwitchProps = {
  locale: Locale;
  label: string;
  className?: string;
};

/** Links to the same page in the other language (/en/about ↔ /ar/about). */
const LanguageSwitch = ({ locale, label, className }: LanguageSwitchProps) => {
  const pathname = usePathname();
  const other = alternateLocale(locale);
  const href = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`);

  return (
    <Link className={className} href={href} lang={other} hrefLang={other}>
      {label}
    </Link>
  );
};

export default LanguageSwitch;
