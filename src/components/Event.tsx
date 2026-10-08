"use client";
import {
  EventBoxCard,
  EventFeatureCard,
  EventRowCard,
  EventSlideCard,
} from "@/components/events/EventCards";
import EventsTabs from "@/components/events/EventsTabs";
import SectionTitle from "@/components/ui/SectionTitle";
import { sliderProps } from "@/config/sliderProps";
import { featuredEvents, highlightEvents, sliderEvents, upcomingEvents } from "@/data/events";
import { staggerDelay } from "@/lib/animation";
import { Swiper, SwiperSlide } from "swiper/react";

/** Home 01 — two-column list of upcoming events. */
export const Event1 = () => (
  <section className="event-section-4 fix section-padding">
    <div className="container">
      <SectionTitle subTitle="our event" title="Our Upcoming Event" centered accent />
    </div>
    <div className="container-fluid">
      <div className="row">
        {upcomingEvents.map((event, index) => (
          <div
            key={event.id}
            className="col-xl-6 wow fadeInUp"
            data-wow-delay={staggerDelay(index, { columns: 2 })}
          >
            <EventRowCard event={event} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/** Home 02 — two featured events. */
export const Event2 = () => (
  <section className="event-section fix section-padding">
    <div className="container">
      <SectionTitle
        subTitle="Our Events"
        title={
          <>
            Be ready for our upcoming <br /> charity events
          </>
        }
        centered
        accent
      />
      <div className="row">
        {featuredEvents.map((event, index) => (
          <div
            key={event.id}
            className="col-lg-6 wow fadeInUp"
            data-wow-delay={staggerDelay(index, { columns: 2 })}
          >
            <EventFeatureCard event={event} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const badgeClasses = ["", "color-2", "color-3", "color-4", "color-5"];
// Swiper's loop mode needs more slides than are visible at once.
const eventSlides = [...sliderEvents, ...sliderEvents];

/** Home 03 — full-width event slider. */
export const Event3 = () => (
  <section className="event-section">
    <Swiper {...sliderProps.event} className="swiper event-slider">
      {eventSlides.map((event, index) => (
        <SwiperSlide key={`${event.id}-${index}`}>
          <EventSlideCard event={event} badgeClass={badgeClasses[index % badgeClasses.length]} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

/** Home 04 — three highlighted events. */
export const Event4 = () => (
  <section className="event-section fix section-padding section-bg">
    <div className="container">
      <SectionTitle subTitle="Events" title="Upcoming Events" centered accent />
      <div className="row">
        {highlightEvents.map((event, index) => (
          <div
            key={event.id}
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay={staggerDelay(index)}
          >
            <EventBoxCard event={event} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/** Events page — category-filtered list. */
export const EventPage = () => (
  <section className="event-section-4 fix section-padding">
    <div className="container">
      <EventsTabs />
    </div>
  </section>
);
