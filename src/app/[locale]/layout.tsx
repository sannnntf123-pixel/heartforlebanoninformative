import "@/styles/site.css";

import RevealObserver from "@/components/site/RevealObserver";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import TopBar from "@/components/site/TopBar";
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

// Only /en and /ar exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: t.meta.title, template: `%s | ${t.meta.title}` },
    description: t.meta.description,
    openGraph: {
      type: "website",
      siteName: t.meta.title,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "ar" ? "ar_LB" : "en_GB",
      images: [{ url: "/images/medicine-wide.jpg", width: 628, height: 419 }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#123f2e",
};

// Runs before first paint so scroll-reveal styles never flash visible content.
const enableJsStyles = `document.documentElement.classList.add("js")`;

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={localeDirection(locale)}
      className={`${latinFont.variable} ${thmanyahSans.variable}`}
      // The inline script adds the `js` class before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableJsStyles }} />
      </head>
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
