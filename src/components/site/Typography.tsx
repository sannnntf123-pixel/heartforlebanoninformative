import type { ReactNode } from "react";

/** Heading copy with an optional highlighted phrase (see dictionaries). */
export type HeadingCopy = { before: string; highlight: string; after: string };

/** Renders `before <highlight> after`, with the highlight in the accent colour. */
export const HighlightedText = ({ copy }: { copy: HeadingCopy }) => (
  <>
    {copy.before}
    <span className="hl">{copy.highlight}</span>
    {copy.after}
  </>
);

/** Small eyebrow label with the brand's double-diamond mark. */
export const Kicker = ({ children }: { children: ReactNode }) => (
  <span className="kick">
    <i className="dia" aria-hidden="true" />
    <i className="dia" aria-hidden="true" />
    {children}
  </span>
);

type SectionHeadingProps = {
  kicker: string;
  title: HeadingCopy;
  note?: string;
};

/** Centered kicker + h2 (+ optional note) used at the top of most sections. */
export const SectionHeading = ({ kicker, title, note }: SectionHeadingProps) => (
  <div className="st rv">
    <Kicker>{kicker}</Kicker>
    <h2>
      <HighlightedText copy={title} />
    </h2>
    {note && <p>{note}</p>}
  </div>
);

/** Visible `[label]` chip for content the charity has not confirmed yet. */
export const Placeholder = ({ label }: { label: string }) => (
  <span className="ph-t">[{label}]</span>
);

/** Renders `value`, or a placeholder chip when it is not available yet. */
export const ValueOrPlaceholder = ({ value, label }: { value: string | null; label: string }) =>
  value ? <>{value}</> : <Placeholder label={label} />;
