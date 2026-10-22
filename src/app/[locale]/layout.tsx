import "@/styles/site.css";

import RevealObserver from "@/components/site/RevealObserver";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import TopBar from "@/components/site/TopBar";
import { shareImage, siteUrl } from "@/config/site";
import { isLocale, localeDirection, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { thmanyahSans, latinFont } from "./fonts";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s | ${t.meta.title}` },
    description: t.meta.description,
    openGraph: {
      type: "website",
      siteName: t.meta.title,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "ar" ? "ar_LB" : "en_GB",
      images: [shareImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#123f2e",
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  // Only /en and /ar exist. (Not `dynamicParams = false`: that would also apply to
  // child segments and 404 every event published after the last deploy.)
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={localeDirection(locale)}
      className={`${latinFont.variable} ${thmanyahSans.variable}`}
    >
      <body>
        <TopBar locale={locale} t={t} />
        {/* Only the slices the client component needs are serialised. */}
        <SiteHeader locale={locale} t={{ common: t.common, nav: t.nav, meta: t.meta }} />
        {children}
        <SiteFooter locale={locale} t={t} />
        <RevealObserver />
      </body>
    </html>
  );
}
