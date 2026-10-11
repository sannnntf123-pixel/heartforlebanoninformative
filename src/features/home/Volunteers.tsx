import { Kicker, SectionHeading } from "@/components/site/Typography";
import { routes } from "@/config/routes";
import { getEventBySlug } from "@/features/events/queries";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { staggerStyle } from "@/lib/i18n-format";
import Image from "next/image";
import Link from "next/link";
import { fieldPhotos } from "./content";
import styles from "./Volunteers.module.css";

/** The team at work: chosen photos from event galleries, each linking to its event. */
const Volunteers = async ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const v = t.volunteers;
  const cards = (
    await Promise.all(
      fieldPhotos.map(async ({ slug, photo }) => {
        const event = await getEventBySlug(slug, locale);
        const image = event?.gallery[photo - 1]?.thumb ?? event?.cover;
        return event && image ? [{ event, image, caption: v.field[slug] ?? event.title }] : [];
      })
    )
  ).flat();

  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeading kicker={v.kicker} title={v.title} />
        <div className={styles.grid}>
          {cards.map(({ event, image, caption }, index) => (
            <figure key={event.id} className={`${styles.card} rv`} style={staggerStyle(index)}>
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 280px"
              />
              <figcaption className={styles.caption}>
                <b>
                  {/* The whole card is clickable through this link's stretched area. */}
                  <Link href={routes(locale).event(event.slug)} className={styles.link}>
                    {caption}
                  </Link>
                </b>
                <small>{event.location}</small>
              </figcaption>
            </figure>
          ))}
          <div className={`${styles.card} ${styles.join} on-dark rv`} style={staggerStyle(cards.length)}>
            <Kicker>{v.join.kicker}</Kicker>
            <h3>{v.join.title}</h3>
            <p>{v.join.text}</p>
            <Link className="btn btn--lime" href={routes(locale).contact}>
              {v.join.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteers;
