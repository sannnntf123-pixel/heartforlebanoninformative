import type { ReactNode } from "react";
import { HeartIcon } from "./icons";

type ExternalButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "lime" | "ghost";
  withHeart?: boolean;
  className?: string;
};

const variantClass = {
  primary: "",
  lime: "btn--lime",
  ghost: "btn--ghost",
} as const;

/** Pill button that opens an external page (GoFundMe, Instagram) in a new tab. */
const ExternalButton = ({
  href,
  children,
  variant = "primary",
  withHeart = false,
  className = "",
}: ExternalButtonProps) => (
  <a
    className={["btn", variantClass[variant], className].filter(Boolean).join(" ")}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {withHeart && <HeartIcon />}
    {children}
  </a>
);

export default ExternalButton;
