import "@/styles/site.css";

import RevealObserver from "@/components/site/RevealObserver";
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
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: t.meta.title,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "ar" ? "ar_LB" : "en_GB",
      url: `/${locale}`,
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
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
