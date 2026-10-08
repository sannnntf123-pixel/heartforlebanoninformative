"use client";
import { mainNav, NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useState } from "react";
import { Logo, SocialIcons } from "./HeaderParts";

/** Accordion list: at most one submenu per level is expanded at a time. */
const MobileNavList = ({ items, isLast }: { items: NavItem[]; isLast?: boolean }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {items.map((item, index) => {
        const isOpen = expanded === item.label;
        const classes = [
          item.children && "has-dropdown",
          isLast && index === items.length - 1 && "mean-last",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={item.label} className={classes || undefined}>
            <Link href={item.href}>
              {item.label}
              {item.children && <i className="fas fa-angle-down" />}
            </Link>
            {item.children && (
              <>
                <ul className="submenu" style={{ display: isOpen ? "block" : "none" }}>
                  <MobileNavList items={item.children} />
                </ul>
                <button
                  type="button"
                  className="mean-expand"
                  aria-expanded={isOpen}
                  aria-label={`Toggle ${item.label} submenu`}
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                >
                  <i className={`far ${isOpen ? "fa-minus" : "fa-plus"}`} />
                </button>
              </>
            )}
          </li>
        );
      })}
    </>
  );
};

const { contact } = siteConfig;

const offcanvasContacts = [
  { icon: "fal fa-map-marker-alt", href: undefined, text: contact.address },
  { icon: "fal fa-envelope", href: `mailto:${contact.email}`, text: contact.email },
  { icon: "fal fa-clock", href: undefined, text: contact.hours },
  { icon: "far fa-phone", href: contact.phoneHref, text: contact.phone },
];

type MobileMenuProps = { open: boolean; onClose: () => void };

const MobileMenu = ({ open, onClose }: MobileMenuProps) => (
  <>
    <div className="fix-area">
      <div className={`offcanvas__info ${open ? "info-open" : ""}`}>
        <div className="offcanvas__wrapper">
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo">
                <Logo variant="black" className="" />
              </div>
              <div className="offcanvas__close">
                <button type="button" aria-label="Close menu" onClick={onClose}>
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <p className="text d-none d-xl-block">{siteConfig.description}</p>
            <div className="mobile-menu fix mb-3 mean-container">
              <div className="mean-bar">
                <nav className="mean-nav" aria-label="Mobile">
                  <ul>
                    <MobileNavList items={mainNav} isLast />
                  </ul>
                </nav>
              </div>
            </div>
            <div className="offcanvas__contact">
              <h4>Contact Info</h4>
              <ul>
                {offcanvasContacts.map((item, index) => (
                  <li key={item.icon} className="d-flex align-items-center">
                    <div className={`offcanvas__contact-icon ${index > 0 ? "mr-15" : ""}`}>
                      <i className={item.icon} />
                    </div>
                    <div className="offcanvas__contact-text">
                      {item.href ? <a href={item.href}>{item.text}</a> : <span>{item.text}</span>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="header-button mt-4">
                <Link href="/contact" className="theme-btn text-center">
                  <span>
                    Get In Touch
                    <i className="fa-solid fa-arrow-right-long" />
                  </span>
                </Link>
              </div>
              <SocialIcons label="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className={`offcanvas__overlay ${open ? "overlay-open" : ""}`}
      onClick={onClose}
      aria-hidden="true"
    />
  </>
);

export default MobileMenu;
