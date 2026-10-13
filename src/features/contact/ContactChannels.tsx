import { HeartIcon, InstagramIcon, MailIcon, PinIcon } from "@/components/site/icons";
import { brand } from "@/config/brand";
import type { Dictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import type { ReactNode } from "react";
import styles from "./ContactChannels.module.css";

type Channel = { id: string; icon: ReactNode; label: string; value: ReactNode };

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Cards listing every way to reach the charity (contact page). */
const ContactChannels = ({ t }: { t: Dictionary }) => {
  const f = t.footer;

  const channels: Channel[] = [
    {
      id: "email",
      icon: <MailIcon />,
      label: f.email,
      value: (
        <a href={`mailto:${brand.contact.email}`} dir="ltr">
          {brand.contact.email}
        </a>
      ),
    },
    {
      id: "location",
      icon: <PinIcon />,
      label: f.location,
      value: t.contact.location,
    },
    {
      id: "instagram",
      icon: <InstagramIcon />,
      label: "Instagram",
      value: (
        <a href={brand.links.instagram} {...external} dir="ltr">
          {brand.links.instagramHandle}
        </a>
      ),
    },
    {
      id: "donate",
      icon: <HeartIcon />,
      label: "GoFundMe",
      value: (
        <a href={brand.links.donate} {...external} dir="ltr">
          {brand.links.donateLabel}
        </a>
      ),
    },
  ];

  return (
    <section className="sec" aria-labelledby="channels-title">
      <div className="wrap">
        <h2 id="channels-title" className={styles.title}>
          {t.contactPage.channelsTitle}
        </h2>
        <ul className={styles.grid}>
          {channels.map((channel, index) => (
            <li key={channel.id} className={`${styles.card} rv`} style={staggerStyle(index, 4)}>
              <span className={styles.icon}>{channel.icon}</span>
              <b>{channel.label}</b>
              <span className={styles.value}>{channel.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ContactChannels;
