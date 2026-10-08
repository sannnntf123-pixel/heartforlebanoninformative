export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** Alternative home page layouts shipped with the theme. */
export const homeDemos = [
  { id: 1, label: "Home 01", href: "/index-1", thumbnail: "/assets/img/header/home-1.jpg" },
  { id: 2, label: "Home 02", href: "/index-2", thumbnail: "/assets/img/header/home-2.jpg" },
  { id: 3, label: "Home 03", href: "/index-3", thumbnail: "/assets/img/header/home-3.jpg" },
  { id: 4, label: "Home 04", href: "/index-4", thumbnail: "/assets/img/header/home-4.jpg" },
] as const;

/** Primary site navigation, shared by the desktop and mobile menus. */
export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: homeDemos.map(({ label, href }) => ({ label, href })),
  },
  { label: "About", href: "/about" },
  {
    label: "Causes",
    href: "/causes",
    children: [
      { label: "Causes List", href: "/causes" },
      { label: "Causes Details", href: "/causes-details" },
      { label: "Donation", href: "/donation-details" },
    ],
  },
  {
    label: "Pages",
    href: "/events",
    children: [
      {
        label: "Events",
        href: "/events",
        children: [
          { label: "Events", href: "/events" },
          { label: "Event Details", href: "/event-details" },
        ],
      },
      {
        label: "Volunteer",
        href: "/team",
        children: [
          { label: "Our Volunteers", href: "/team" },
          { label: "Volunteer Details", href: "/team-details" },
        ],
      },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Blog",
    href: "/news",
    children: [
      { label: "Blog Grid", href: "/news-grid" },
      { label: "Blog Standard", href: "/news" },
      { label: "Blog Details", href: "/news-details" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
