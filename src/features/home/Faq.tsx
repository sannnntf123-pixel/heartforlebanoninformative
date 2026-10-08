import { HighlightedText, Kicker } from "@/components/site/Typography";
import type { Dictionary } from "@/i18n/get-dictionary";
import Image from "next/image";
import { faqImages } from "./content";
import styles from "./Faq.module.css";

/** Native <details> accordion: accessible and works without JavaScript. */
const Faq = ({ t }: { t: Dictionary }) => (
  <section className="sec" id="faq">
    <div className={`wrap ${styles.grid}`}>
      <div className="rv">
        <Kicker>{t.faq.kicker}</Kicker>
        <h2 className={styles.title}>
          <HighlightedText copy={t.faq.title} />
        </h2>
        <div className={styles.accordion}>
          {t.faq.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className={`${styles.frame} rv`} aria-hidden="true">
        <Image className={styles.big} src={faqImages.main} alt="" width={628} height={419} sizes="(max-width: 1100px) 88vw, 480px" />
        <Image className={styles.small1} src={faqImages.small1} alt="" width={130} height={130} />
        <Image className={styles.small2} src={faqImages.small2} alt="" width={130} height={130} />
        <i className={`dia ${styles.d1}`} />
        <i className={`dia ${styles.d2}`} />
      </div>
    </div>
  </section>
);

export default Faq;
