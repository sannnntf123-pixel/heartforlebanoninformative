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

// A run of Arabic script (letters, spaces and digits inside it, e.g. "علم وخبر رقم 805").
const ARABIC_RUN = /[\u0600-\u06FF](?:[\u0600-\u06FF\s0-9\u0660-\u0669]*[\u0600-\u06FF0-9\u0660-\u0669])?/g;
// A run of Latin script (e.g. "LAU Medical Center", "YWCA").
const LATIN_RUN = /[A-Za-z](?:[A-Za-z\s.&'-]*[A-Za-z])?/g;

/**
 * Renders mixed-script copy safely: runs in the *other* script are wrapped in
 * <bdi> so their direction is isolated (Arabic inside English text, or
 * Latin names inside Arabic text) and they get the right font via `lang`.
 */
export const BidiText = ({ text, lang }: { text: string; lang: "en" | "ar" }) => {
  const pattern = lang === "en" ? ARABIC_RUN : LATIN_RUN;
  const otherLang = lang === "en" ? "ar" : "en";
  const parts: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <bdi key={start} lang={otherLang}>
        {match[0]}
      </bdi>
    );
    last = start + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return <>{parts}</>;
};
