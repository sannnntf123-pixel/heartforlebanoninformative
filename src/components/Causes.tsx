"use client";
import CausesTabs from "@/components/causes/CausesTabs";
import { CauseBoxCard, CauseCard, CauseFeatureCard } from "@/components/causes/CauseCards";
import SectionTitle from "@/components/ui/SectionTitle";
import { sliderProps } from "@/config/sliderProps";
import { campaignCauses, featuredCauses, popularCauses, trendingCauses } from "@/data/causes";
import { staggerDelay } from "@/lib/animation";
import { Swiper, SwiperSlide } from "swiper/react";

/** Home 01 — two-column grid of wide cause cards. */
export const Causes1 = () => (
  <section className="causes-section fix section-bg section-padding">
    <div className="container">
      <SectionTitle subTitle="Help The People" title="Our Popular Causes" centered accent />
      <div className="row">
        {featuredCauses.map((cause, index) => (
          <div
            key={cause.id}
            className="col-xl-6 wow fadeInUp"
            data-wow-delay={staggerDelay(index, { columns: 2 })}
          >
            <CauseFeatureCard cause={cause} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Swiper's loop mode needs more slides than are visible at once.
const campaignSlides = [...campaignCauses, ...campaignCauses];

/** Home 02 — campaign slider with prev/next arrows. */
export const Causes2 = () => (
  <section className="causes-section fix section-bg section-padding">
    <div className="container">
      <div className="section-title-area">
        <SectionTitle
          subTitle="Recent Causes"
          title={
            <>
              Introducing Our <br /> Campaigns
            </>
          }
          accent
        />
        <div className="array-button">
          <button type="button" className="array-prev" aria-label="Previous causes">
            <i className="fas fa-long-arrow-left" />
          </button>
          <button type="button" className="array-next" aria-label="Next causes">
            <i className="fas fa-long-arrow-right" />
          </button>
        </div>
      </div>
      <div className="causes-wrapper">
        <Swiper {...sliderProps.causes1} className="swiper causes-slider-2">
          {campaignSlides.map((cause, index) => (
            <SwiperSlide key={`${cause.id}-${index}`}>
              <CauseCard cause={cause} showCategory />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
);

/** Home 03 — three trending causes. */
export const Causes3 = () => (
  <section className="causes-section fix section-padding section-bg">
    <div className="container">
      <SectionTitle
        subTitle="Trending Cause"
        title={
          <>
            It’s About Impact, <br />
            <span>Good</span> History
          </>
        }
        centered
      />
      <div className="row">
        {trendingCauses.map((cause, index) => (
          <div
            key={cause.id}
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay={staggerDelay(index)}
          >
            <CauseBoxCard cause={cause} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/** Home 04 — popular causes slider. */
export const Causes4 = () => (
  <section className="causes-section-2 fix section-padding section-bg">
    <div className="container">
      <SectionTitle
        subTitle="Help The People"
        title={
          <>
            Our <span>Popular</span> Causes
          </>
        }
        accent
      />
      <Swiper {...sliderProps.causes2} className="swiper causes-slider">
        {popularCauses.map((cause) => (
          <SwiperSlide key={cause.id}>
            <CauseCard cause={cause} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

/** Causes page — category-filtered grid. */
export const CausesTab = () => (
  <section className="causes-section fix section-padding">
    <div className="container">
      <CausesTabs />
    </div>
  </section>
);
