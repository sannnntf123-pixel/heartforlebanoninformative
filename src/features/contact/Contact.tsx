import { InstagramIcon, MailIcon, PinIcon } from "@/components/site/icons";
import { HighlightedText, Kicker } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import { getEventBySlug } from "@/features/events/queries";
import { contactPhoto } from "@/features/home/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Image from "next/image";
import styles from "./Contact.module.css";

/** Contact band on the landing page: an event photo and how to reach the charity. */
const Contact = async ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const c = t.contact;
  const mailto = `mailto:${brand.contact.email}`;
  const event = await getEventBySlug(contactPhoto.slug, locale);
  const photo = event?.gallery[contactPhoto.photo - 1]?.full ?? event?.wide;
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.photo}>
        {photo && (
          <Image src={photo.url} alt={photo.alt} fill sizes="(max-width: 1100px) 100vw, 50vw" />
        )}
        <span className={styles.place}>
          <PinIcon />
          {c.location}
        </span>
      </div>
      <div className={`${styles.panel} rv`}>
        <Kicker>{c.kicker}</Kicker>
        <h2>
          <HighlightedText copy={c.title} />
        </h2>
        <p className={styles.text}>{c.text}</p>
        <ul className={styles.details}>
          <li>
            <MailIcon />
            <a href={mailto} dir="ltr">
              {brand.contact.email}
            </a>
          </li>
          <li>
            <PinIcon />
            <span>{c.location}</span>
          </li>
          <li>
            <InstagramIcon />
            <a href={brand.links.instagram} target="_blank" rel="noopener noreferrer" dir="ltr">
              {brand.links.instagramHandle}
            </a>
          </li>
        </ul>
        <a className="btn" href={mailto}>
          <MailIcon width={18} height={18} />
          {c.emailCta}
        </a>
      </div>
    </section>
  );
};

export default Contact;
