/** Heart of Lebanon brand links and site-wide settings for the public site. */
export const brand = {
  foundedYear: 2019,
  links: {
    instagram: "https://www.instagram.com/heart_of_lebanon_",
    instagramHandle: "@heart_of_lebanon_",
    donate: "https://gofund.me/cd38fc38",
    donateLabel: "gofund.me/cd38fc38",
  },
  /** Unconfirmed contact details; `null` renders a visible placeholder. */
  contact: {
    address: null as string | null,
    hours: null as string | null,
    phone: null as string | null,
  },
} as const;
