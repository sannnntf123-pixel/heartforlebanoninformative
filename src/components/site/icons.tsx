import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const Outline = ({ strokeWidth = 1.6, children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

export const HeartIcon = (props: IconProps) => (
  <Outline strokeWidth={1.8} {...props}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
  </Outline>
);

export const PlayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const InstagramIcon = (props: IconProps) => (
  <Outline {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
  </Outline>
);

export const PinIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </Outline>
);

export const ClockIcon = (props: IconProps) => (
  <Outline {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Outline>
);

export const PhoneIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </Outline>
);

/* ---------- service icons ---------- */

export const MedicineIcon = (props: IconProps) => (
  <Outline {...props}>
    <rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-35 12 12)" />
    <path d="M9.3 7.6l5.4 8.8" />
  </Outline>
);

export const BasketIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M3 10h18l-2 10H5z" />
    <path d="M8 10l3-6M16 10l-3-6M9 14v3M12 14v3M15 14v3" />
  </Outline>
);

export const DropIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />
    <path d="M9 15a3 3 0 003 3" />
  </Outline>
);

export const HomeHeartIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M12 18c-2.2-1.6-3.3-2.7-3.3-3.9a1.6 1.6 0 013.3-.6 1.6 1.6 0 013.3.6c0 1.2-1.1 2.3-3.3 3.9z" />
  </Outline>
);

export const StethoscopeIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M6 3v6a4 4 0 008 0V3" />
    <path d="M10 13v2a5 5 0 0010 0v-2" />
    <circle cx="20" cy="11" r="2" />
  </Outline>
);

export const PeopleIcon = (props: IconProps) => (
  <Outline {...props}>
    <circle cx="8" cy="7" r="3" />
    <circle cx="16" cy="7" r="3" />
    <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M10 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </Outline>
);

/** Large line-art heart that draws itself; decorative. */
export const HeartOutline = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="-4 0 248 214" aria-hidden="true" focusable="false">
    <path
      className="heart-draw"
      pathLength={1}
      d="M0 200 H120 C60 150 20 110 20 70 C20 35 45 15 75 15 C100 15 115 30 120 50 C125 30 140 15 165 15 C195 15 220 35 220 70 C220 110 180 150 120 200 H240"
    />
  </svg>
);
