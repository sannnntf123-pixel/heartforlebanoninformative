import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type LogoProps = {
  variant?: "white" | "black";
  className?: string;
};

export const Logo = ({ variant = "white", className = "header-logo" }: LogoProps) => (
  <Link href="/" className={className}>
    <Image
      src={`/assets/img/logo/${variant}-logo.png`}
      width={178}
      height={54}
      alt={siteConfig.name}
      priority
    />
  </Link>
);

export const SocialIcons = ({ label = "Follow Us:" }: { label?: string }) => (
  <div className="social-icon d-flex align-items-center">
    {label && <span>{label}</span>}
    {siteConfig.social.map(({ icon, label: name, href }) => (
      <a href={href} key={icon} aria-label={name}>
        <i className={`fab fa-${icon}`} />
      </a>
    ))}
  </div>
);

export type ContactItem = { icon: string; content: ReactNode };

export const ContactList = ({ items }: { items: ContactItem[] }) => (
  <ul className="contact-list">
    {items.map((item) => (
      <li key={item.icon}>
        <i className={item.icon} />
        {item.content}
      </li>
    ))}
  </ul>
);

const { contact } = siteConfig;

export const contactItems = {
  address: { icon: "fal fa-map-marker-alt", content: contact.address },
  email: {
    icon: "far fa-envelope",
    content: (
      <a href={`mailto:${contact.email}`} className="link">
        {contact.email}
      </a>
    ),
  },
  phone: {
    icon: "fa fa-regular fa-phone",
    content: <a href={contact.phoneHref}>{contact.phone}</a>,
  },
} satisfies Record<string, ContactItem>;

export const DonateButton = ({ className = "header-button" }: { className?: string }) => (
  <div className={className}>
    <Link href="/donation-details" className="theme-btn">
      Donate Now
      <i className="ps-2 far fa-heart" />
    </Link>
  </div>
);

export const MenuToggle = ({ onClick }: { onClick: () => void }) => (
  <div className="header__hamburger d-xl-none my-auto">
    <button
      type="button"
      className="sidebar__toggle"
      aria-label="Open menu"
      onClick={onClick}
    >
      <i className="fas fa-bars" />
    </button>
  </div>
);

export const SearchToggle = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    className="search-trigger search-icon"
    aria-label="Open search"
    onClick={onClick}
  >
    <i className="fa-light fa-magnifying-glass" />
  </button>
);

export const SearchPopup = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <div className="search-wrap" style={{ display: open ? "block" : "none" }}>
    <div className="search-inner">
      <button
        type="button"
        className="search-close"
        aria-label="Close search"
        onClick={onClose}
      >
        <i className="fa fa-light fa-xmark" />
      </button>
      <div className="search-cell">
        <form method="get" role="search">
          <div className="search-field-holder">
            <input
              type="search"
              name="q"
              className="main-search-input"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);
