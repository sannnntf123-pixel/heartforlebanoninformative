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

export const MailIcon = (props: IconProps) => (
  <Outline {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
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

/* ---------- about page icons ---------- */

export const CapIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M2 9l10-5 10 5-10 5z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    <path d="M22 9v6" />
  </Outline>
);

export const PeaceIcon = (props: IconProps) => (
  <Outline {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M12 12l-6.4 6.4M12 12l6.4 6.4" />
  </Outline>
);

export const ShieldIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
    <path d="M12 8.5v7M8.5 12h7" />
  </Outline>
);

export const WomanIcon = (props: IconProps) => (
  <Outline {...props}>
    <circle cx="12" cy="8" r="5" />
    <path d="M12 13v8M8.5 17.5h7" />
  </Outline>
);

export const RibbonIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M12 3c-2.2 0-3.5 1.6-3.5 3.6 0 2.4 1.6 4.6 3.5 7.4 1.9-2.8 3.5-5 3.5-7.4C15.5 4.6 14.2 3 12 3z" />
    <path d="M10 11.5L6 21l3-1.5 1.5 2.5M14 11.5l4 9.5-3-1.5-1.5 2.5" />
  </Outline>
);

export const HeartPulseIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    <path d="M3 12h4l2-3 3 6 2-3h7" />
  </Outline>
);

export const MegaphoneIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M3 10v4l11 5V5z" />
    <path d="M17 9a4 4 0 010 6M6 15l1 5h3l-1-4" />
  </Outline>
);

export const MicIcon = (props: IconProps) => (
  <Outline {...props}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0014 0M12 18v3M8.5 21h7" />
  </Outline>
);

export const DocIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </Outline>
);
