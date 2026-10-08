import { ReactNode } from "react";

type SectionTitleProps = {
  subTitle: string;
  title: ReactNode;
  centered?: boolean;
  /** Use the theme's secondary (red) accent for the sub-title. */
  accent?: boolean;
  className?: string;
};

/** Heart-icon eyebrow text above an animated section heading. */
const SectionTitle = ({
  subTitle,
  title,
  centered = false,
  accent = false,
  className = "",
}: SectionTitleProps) => (
  <div className={`section-title ${centered ? "text-center" : ""} ${className}`.trim()}>
    <span className={`sub-title ${accent ? "color-2" : ""} wow fadeInUp`}>
      <i className="far fa-heart" /> {subTitle}
    </span>
    <h2 className="mt-char-animation">{title}</h2>
  </div>
);

export default SectionTitle;
