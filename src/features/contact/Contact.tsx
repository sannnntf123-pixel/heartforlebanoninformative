import { InstagramIcon, MailIcon, PinIcon } from "@/components/site/icons";
import { HighlightedText, Kicker } from "@/components/site/Typography";
import { brand } from "@/config/brand";
import type { Dictionary } from "@/i18n/get-dictionary";
import styles from "./Contact.module.css";

/** Contact band on the landing page: how to reach the charity by email. */
const Contact = ({ t }: { t: Dictionary }) => {
  const c = t.contact;
  const mailto = `mailto:${brand.contact.email}`;
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.map} aria-hidden="true">
        <span className={styles.pin}>
          <i />
        </span>
        <b className={styles.place}>{c.location}</b>
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
