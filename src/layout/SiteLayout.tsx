"use client";
import ImagePopup from "@/components/popups/ImagePopup";
import VideoPopup from "@/components/popups/VideoPopup";
import { useWowAnimation } from "@/hooks/useWowAnimation";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./header";
import ScrollTop from "./ScrollTop";

/** Visual variants shipped by the theme for the header and footer. */
export type LayoutVariant = 1 | 2 | 3 | 4;

type SiteLayoutProps = {
  children?: ReactNode;
  header?: LayoutVariant;
  footer?: LayoutVariant;
};

const SiteLayout = ({ children, header = 3, footer = 3 }: SiteLayoutProps) => {
  useWowAnimation();

  return (
    <>
      <VideoPopup />
      <ImagePopup />
      <Header variant={header} />
      <main>{children}</main>
      <Footer variant={footer} />
      <ScrollTop />
    </>
  );
};

export default SiteLayout;
