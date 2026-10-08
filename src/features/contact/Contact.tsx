import { HighlightedText, Kicker, Placeholder } from "@/components/site/Typography";
import type { Dictionary } from "@/i18n/get-dictionary";
import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

const Contact = ({ t }: { t: Dictionary }) => {
  const c = t.contact;
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.map} role="img" aria-label={c.mapLabel}>
        <span className={styles.pin} aria-hidden="true">
          <i />
        </span>
        <Placeholder label={c.mapPlaceholder} />
      </div>
      <div className={`${styles.panel} rv`}>
        <Kicker>{c.kicker}</Kicker>
        <h2>
          <HighlightedText copy={c.title} />
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
