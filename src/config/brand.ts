/** Heart of Lebanon brand links and site-wide settings for the public site. */
export const brand = {
  foundedYear: 2019,
  links: {
    instagram: "https://www.instagram.com/heart_of_lebanon_",
    instagramHandle: "@heart_of_lebanon_",
    donate: "https://gofund.me/cd38fc38",
    donateLabel: "gofund.me/cd38fc38",
  },
  /** Suggested donation amounts (USD) shown in the donate band. */
  donationAmounts: [10, 100, 200],
  /** Amount pre-selected in the donate band. */
  featuredAmount: 100,
  /**
   * In-page anchors until the dedicated About / Activities pages exist.
   * Swap these for routes (e.g. "/about") once those pages are built.
   */
  sections: {
    about: "#about",
    activities: "#news",
    contact: "#contact",
  },
  /** Unconfirmed contact details; `null` renders a visible placeholder. */
  contact: {
    address: null as string | null,
    hours: null as string | null,
    phone: null as string | null,
  },
} as const;
