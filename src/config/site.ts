/** Single source of truth for site-wide branding and contact details. */
export const siteConfig = {
  name: "Heart of Lebanon",
  description:
    "Heart of Lebanon is a charity supporting families across Lebanon with food, education and medicine.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  themeColor: "#1A685B",
  contact: {
    address: "Main Street, Melbourne, Australia",
    email: "info@example.com",
    phone: "+208-666-0112",
    phoneHref: "tel:+2086660112",
    hours: "Mon-Fri, 09am - 05pm",
  },
  social: [
    { icon: "facebook-f", label: "Facebook", href: "#" },
    { icon: "twitter", label: "Twitter", href: "#" },
    { icon: "linkedin-in", label: "LinkedIn", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
  ],
} as const;
