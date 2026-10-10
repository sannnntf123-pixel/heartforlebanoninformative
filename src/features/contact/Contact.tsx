import { HighlightedText, Kicker, Placeholder, type HeadingCopy } from "@/components/site/Typography";
import type { Dictionary } from "@/i18n/get-dictionary";
import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

type ContactProps = {
  t: Dictionary;
  /** Override the panel heading (the contact page has its own page title). */
  heading?: { kicker: string; title: HeadingCopy };
};

/** Map + contact form, used on the landing page and the contact page. */
const Contact = ({ t, heading }: ContactProps) => {
  const c = t.contact;
  const kicker = heading?.kicker ?? c.kicker;
  const title = heading?.title ?? c.title;
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.map} role="img" aria-label={c.mapLabel}>
        <span className={styles.pin} aria-hidden="true">
          <i />
        </span>
        <Placeholder label={c.mapPlaceholder} />
      </div>
      <div className={`${styles.panel} rv`}>
        <Kicker>{kicker}</Kicker>
        <h2>
          <HighlightedText copy={title} />
        </h2>
        <ContactForm
          t={{
            fields: c.fields,
            reasons: c.reasons,
            submit: c.submit,
            sending: c.sending,
            success: c.success,
            errors: c.errors,
          }}
        />
      </div>
    </section>
  );
};

export default Contact;
