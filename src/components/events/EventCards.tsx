import type { CharityEvent } from "@/data/events";
import { formatDate } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

const EVENT_DETAILS_HREF = "/event-details";

const EventMeta = ({ event, spaced = false }: { event: CharityEvent; spaced?: boolean }) => {
  const gap = spaced ? " " : "";
  return (
    <ul>
      <li>
        <i className="fal fa-calendar-alt" />
        {gap}
        <time dateTime={event.date}>{formatDate(event.date)}</time>
      </li>
      <li>
        <i className="far fa-clock" />
        {gap}
        {event.time}
      </li>
      <li>
        <i className="far fa-map-marker-alt" />
        {gap}
        {event.location}
      </li>
    </ul>
  );
};

/** Horizontal card: fixed-width image beside meta, title and read-more (Home 01). */
export const EventRowCard = ({ event }: { event: CharityEvent }) => (
  <div className="event-card-items">
    <div className="event-image">
      <Image
        width={285}
        height={300}
        sizes="285px"
        style={{ width: "285px", height: "100%", objectFit: "cover" }}
        src={event.image}
        alt={event.title}
      />
    </div>
    <div className="event-content">
      <EventMeta event={event} />
      <h3>
        <Link href={EVENT_DETAILS_HREF}>{event.title}</Link>
      </h3>
      {event.description && <p>{event.description}</p>}
      <Link href={EVENT_DETAILS_HREF} className="link-btn">
        Read More <i className="far fa-long-arrow-right" />
      </Link>
    </div>
  </div>
);

/** Large card with image on top and a "Join Now" button (Home 02). */
export const EventFeatureCard = ({ event }: { event: CharityEvent }) => (
  <div className="event-box-items-2">
    <div className="event-image">
      <Image
        width={0}
        height={0}
        sizes="(min-width: 992px) 50vw, 100vw"
        style={{ width: "100%", height: "auto" }}
        src={event.image}
        alt={event.title}
      />
    </div>
    <div className="event-content">
      <EventMeta event={event} spaced />
      <h3>
        <Link href={EVENT_DETAILS_HREF}>{event.title}</Link>
      </h3>
      {event.description && <p>{event.description}</p>}
      <Link href={EVENT_DETAILS_HREF} className="theme-btn transparent-btn-2">
        <i className="far fa-heart" /> Join Now
      </Link>
    </div>
  </div>
);

/** Full-bleed image slide with a coloured date badge (Home 03). */
export const EventSlideCard = ({ event, badgeClass = "" }: { event: CharityEvent; badgeClass?: string }) => (
  <div className="event-single-items">
    <div className="event-image bg-cover" style={{ backgroundImage: `url("${event.image}")` }}>
      <div className="event-content">
        <div className="sub-content">
          <div className={`event-date ${badgeClass}`.trim()}>
            <span>{formatDate(event.date, "day")}</span>
            {formatDate(event.date, "month")}
          </div>
          <div className="event-title">
            <Link href="/events" className="event-cat">
              {event.category}
            </Link>
            <h4>
              <Link href={EVENT_DETAILS_HREF}>{event.title}</Link>
            </h4>
          </div>
        </div>
        <ul className="post-date">
          <li>
            <i className="fal fa-clock" /> {event.time}
          </li>
          {event.author && (
            <li>
              <i className="fal fa-user" /> {event.author}
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
);

/** Background-image card with category and "Book Your Seat" (Home 04). */
export const EventBoxCard = ({ event }: { event: CharityEvent }) => (
  <div className="event-box-items bg-cover" style={{ backgroundImage: `url("${event.image}")` }}>
    <div className="cat-name">
      <Link href="/events">{event.category}</Link>
    </div>
    <time dateTime={event.date}>{formatDate(event.date, "long")}</time>
    <h3>
      <Link href={EVENT_DETAILS_HREF}>{event.title}</Link>
    </h3>
    <p>
      <i className="fal fa-map-marker-alt" /> {event.location}
    </p>
    <Link href={EVENT_DETAILS_HREF} className="buy-ticket">
      <i className="fal fa-chair" /> Book Your Seat
    </Link>
  </div>
);

const eventHighlights = [
  ["A place in history", "It's about impact, goodness"],
  ["More goodness in the world", "The world we live"],
];

/** Wide listing card with highlights and "Book A Seat" (Events page). */
export const EventListCard = ({ event }: { event: CharityEvent }) => (
  <div className="event-card-main-items">
    <div className="event-card-items-2">
      <div className="event-image">
        <Image
          width={0}
          height={0}
          sizes="(min-width: 1200px) 40vw, 100vw"
          style={{ height: "auto", width: "100%" }}
          src={event.image}
          alt={event.title}
        />
        <div className="event-time-address">
          <span>
            <i className="fal fa-calendar-alt" />
            <time dateTime={event.date}>{formatDate(event.date, "long")}</time>
          </span>
          <span>
            <i className="fal fa-map-marker-alt" />
            {event.location}
          </span>
        </div>
      </div>
      <div className="event-content-itmes">
        <div className="event-content">
          <div className="event-title-top">
            <h3>
              <Link href={EVENT_DETAILS_HREF}>{event.title}</Link>
            </h3>
            {event.description && <p>{event.description}</p>}
          </div>
          <div className="list-items">
            {eventHighlights.map((column) => (
              <ul key={column[0]}>
                {column.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check" /> {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Link href={EVENT_DETAILS_HREF} className="theme-btn">
      <i className="fal fa-home me-2" />
      Book A Seat
    </Link>
  </div>
);
