import type { Cause } from "@/data/causes";
import { formatCurrency, progressPercent } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

const CAUSE_DETAILS_HREF = "/causes-details";
const DONATE_HREF = "/donation-details";

const DonateButton = () => (
  <Link href={DONATE_HREF} className="theme-btn transparent-btn-2">
    <i className="far fa-heart" /> Donate Now
  </Link>
);

/** Percentage badge, progress bar and raised/goal totals. */
export const CauseProgress = ({ raised, goal }: Pick<Cause, "raised" | "goal">) => {
  const percent = progressPercent(raised, goal);
  return (
    <div className="progress-items">
      <span className="point">{percent}%</span>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Funding progress"
        />
      </div>
      <div className="progress-goals">
        <span>
          Raised <b>{formatCurrency(raised)}</b>
        </span>
        <span>
          Goal <b>{formatCurrency(goal)}</b>
        </span>
      </div>
    </div>
  );
};

const CauseImage = ({ cause, sizes }: { cause: Cause; sizes: string }) => (
  <Image
    width={0}
    height={0}
    sizes={sizes}
    style={{ width: "100%", height: "auto" }}
    src={cause.image}
    alt={cause.title}
  />
);

/** Wide card: image beside title, description and progress (Home 01). */
export const CauseFeatureCard = ({ cause }: { cause: Cause }) => (
  <div className="popular-causes-card-items">
    <div className="row g-4 align-items-center">
      <div className="col-lg-6">
        <div className="thumb">
          <CauseImage cause={cause} sizes="(min-width: 1200px) 25vw, (min-width: 992px) 50vw, 100vw" />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="content">
          <h4>
            <Link href={CAUSE_DETAILS_HREF}>{cause.title}</Link>
          </h4>
          {cause.description && <p>{cause.description}</p>}
          <CauseProgress raised={cause.raised} goal={cause.goal} />
          <DonateButton />
        </div>
      </div>
    </div>
  </div>
);

type CauseCardProps = {
  cause: Cause;
  /** Show the category badge over the image (theme "style 2"). */
  showCategory?: boolean;
};

/** Vertical card with image, title, progress and donate button (sliders). */
export const CauseCard = ({ cause, showCategory = false }: CauseCardProps) => (
  <div className={`causes-card-items ${showCategory ? "card-style-2" : ""}`}>
    <div className="causes-image">
      <CauseImage cause={cause} sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw" />
      {showCategory && <div className="post-cat">{cause.category}</div>}
    </div>
    <div className="causes-content">
      <h3>
        <Link href={CAUSE_DETAILS_HREF}>{cause.title}</Link>
      </h3>
      {cause.description && <p>{cause.description}</p>}
      <CauseProgress raised={cause.raised} goal={cause.goal} />
      <DonateButton />
    </div>
  </div>
);

/** Background-image card with category, author, slim progress bar and totals. */
export const CauseBoxCard = ({ cause, shadow = false }: { cause: Cause; shadow?: boolean }) => {
  const percent = progressPercent(cause.raised, cause.goal);
  return (
    <div className={`causes-box-items ${shadow ? "box-shadow" : ""}`}>
      <div
        className="causes-image bg-cover"
        style={{ backgroundImage: `url("${cause.image}")` }}
        role="img"
        aria-label={cause.title}
      />
      <div className="cause-content">
        <div className="cause-meta">
          <Link href="/causes" className="cause-cat">
            {cause.category}
          </Link>
          {cause.author && (
            <span className="cause-author">
              <i className="fal fa-user" /> By {cause.author}
            </span>
          )}
        </div>
        <h4>
          <Link href={CAUSE_DETAILS_HREF}>{cause.title}</Link>
        </h4>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Funding progress"
          />
        </div>
        <div className="cause-amount d-flex justify-content-between">
          <div className="price-raised">
            <i className="far fa-heart" />
            <span>{formatCurrency(cause.raised)}</span> Raised
          </div>
          <div className="price-goal">
            <i className="far fa-analytics" />
            <span>{formatCurrency(cause.goal)}</span> Goal
          </div>
          <div className="read-cause-link">
            <Link href={CAUSE_DETAILS_HREF} aria-label={`Read more about ${cause.title}`}>
              <i className="fal fa-share" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
