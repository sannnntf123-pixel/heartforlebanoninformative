"use client";
import { siteConfig } from "@/config/site";
import { useStickyHeader } from "@/hooks/useStickyHeader";
import type { LayoutVariant } from "@/layout/SiteLayout";
import { ComponentType, useState } from "react";
import DesktopNav from "./DesktopNav";
import {
  ContactList,
  contactItems,
  DonateButton,
  Logo,
  MenuToggle,
  SearchPopup,
  SearchToggle,
  SocialIcons,
} from "./HeaderParts";
import MobileMenu from "./MobileMenu";

type VariantProps = { onOpenMenu: () => void; onOpenSearch: () => void };

const Header1 = ({ onOpenMenu }: VariantProps) => (
  <header id="header-sticky" className="header-4">
    <div className="container">
      <div className="mega-menu-wrapper">
        <div className="header-main style-2">
          <div className="header-left">
            <div className="logo">
              <Logo />
              <Logo className="header-logo-2" variant="black" />
            </div>
          </div>
          <div className="header-right d-flex justify-content-end align-items-center">
            <div className="mean__menu-wrapper">
              <DesktopNav />
            </div>
            <DonateButton className="header-button d-none d-sm-block" />
            <MenuToggle onClick={onOpenMenu} />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Header2 = ({ onOpenMenu }: VariantProps) => (
  <>
    <div className="header-top-section-3">
      <div className="container">
        <div className="header-top-wrapper-2 style-3">
          <ContactList items={[contactItems.address, contactItems.email]} />
          <SocialIcons label="Follow Us On:" />
        </div>
      </div>
    </div>
    <header id="header-sticky" className="header-3">
      <div className="container">
        <div className="mega-menu-wrapper">
          <div className="header-main style-2">
            <div className="header-left">
              <div className="logo">
                <Logo variant="black" />
              </div>
              <div className="mean__menu-wrapper">
                <DesktopNav />
              </div>
            </div>
            <div className="header-right d-flex justify-content-end align-items-center">
              <div className="author-icon">
                <div className="icon">
                  <i className="fa fa-regular fa-phone" />
                </div>
                <div className="content">
                  <span>Call Us Now</span>
                  <h5>
                    <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
                  </h5>
                </div>
              </div>
              <DonateButton />
              <MenuToggle onClick={onOpenMenu} />
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
);

const Header3 = ({ onOpenMenu, onOpenSearch }: VariantProps) => (
  <header className="header-section-1">
    <div className="header-top-section fix">
      <div className="container-fluid">
        <div className="header-top-wrapper style-2">
          <ContactList items={[contactItems.email, contactItems.phone]} />
          <div className="top-right">
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
    <div id="header-sticky" className="header-1">
      <div className="main-logo">
        <Logo />
      </div>
      <div className="container-fluid">
        <div className="mega-menu-wrapper">
          <div className="header-main">
            <div className="logo d-none">
              <Logo variant="black" />
            </div>
            <div className="header-left">
              <div className="mean__menu-wrapper">
                <DesktopNav />
              </div>
            </div>
            <div className="header-right d-flex justify-content-end align-items-center">
              <SearchToggle onClick={onOpenSearch} />
              <DonateButton />
              <MenuToggle onClick={onOpenMenu} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Header4 = ({ onOpenMenu, onOpenSearch }: VariantProps) => (
  <header className="header-section-2">
    <div className="header-top-section-2">
      <div className="container">
        <div className="header-top-wrapper-2">
          <ContactList items={[contactItems.address, contactItems.email]} />
          <SocialIcons label="Follow Us On:" />
        </div>
      </div>
    </div>
    <div id="header-sticky" className="header-2">
      <div className="container">
        <div className="mega-menu-wrapper">
          <div className="header-main style-2">
            <div className="header-left">
              <div className="logo">
                <Logo variant="black" />
              </div>
            </div>
            <div className="header-right d-flex justify-content-end align-items-center">
              <div className="mean__menu-wrapper">
                <DesktopNav />
              </div>
              <SearchToggle onClick={onOpenSearch} />
              <DonateButton />
              <MenuToggle onClick={onOpenMenu} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const variants: Record<LayoutVariant, ComponentType<VariantProps>> = {
  1: Header1,
  2: Header2,
  3: Header3,
  4: Header4,
};

const Header = ({ variant }: { variant: LayoutVariant }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useStickyHeader();

  const Variant = variants[variant];

  return (
    <>
      <SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Variant
        onOpenMenu={() => setMenuOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
