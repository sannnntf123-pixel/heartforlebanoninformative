import "@css/swiper-bundle.min.css";
import "@css/animate.css";
import "@css/bootstrap.min.css";
import "@css/font-awesome.css";
import "@css/magnific-popup.css";
import "@css/meanmenu.css";
import "@css/nice-select.css";
import "@css/main.css";
import "./globals.css";

import { siteConfig } from "@/config/site";
import Preloader from "@/layout/Preloader";
import type { Metadata, Viewport } from "next";
import { Chelsea_Market, DM_Sans } from "next/font/google";
import type { ReactNode } from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const chelseaMarket = Chelsea_Market({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-chelsea-market",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${chelseaMarket.variable} ${dmSans.variable}`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
