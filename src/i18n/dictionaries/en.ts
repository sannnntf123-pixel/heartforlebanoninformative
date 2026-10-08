/**
 * English copy for the public site. `ar.ts` must provide the same shape.
 * Headings are split into `before` / `highlight` / `after` so the highlighted
 * words can be styled without putting markup in the dictionary.
 */
const en = {
  meta: {
    title: "Heart of Lebanon Charity",
    description:
      "Heart of Lebanon is a non-profit humanitarian organisation founded in 2019, supporting families across Lebanon with medicine, food, hygiene aid and health and social programmes.",
  },
  common: {
    donateNow: "Donate now",
    donate: "Donate",
    readMore: "Read more",
    details: "Details",
    menu: "Menu",
    mainNav: "Main",
    switchLanguage: "العربية",
  },
  topBar: {
    tagline: "Non-profit humanitarian organisation · founded 2019",
  },
  nav: {
    home: "Home",
    about: "About",
    activities: "Activities",
    contact: "Contact",
  },
  hero: {
    kicker: "Heart of Lebanon · since 2019",
    title: { before: "Together we reach every family ", highlight: "in Lebanon", after: "" },
    text: "Medicine, food and hygiene aid, and health and social programmes for displaced families.",
    secondaryCta: "About us",
    watch: "Watch our work",
    watchLabel: "Watch our work on Instagram",
    slidesLabel: "Slides",
    slideLabel: "Show slide",
  },
  about: {
    kicker: "About us",
    title: {
      before: "We support Lebanese people through sustainable ",
      highlight: "health and social",
      after: " programmes",
    },
    lead: "Heart of Lebanon is a non-profit humanitarian organisation founded in 2019 on the initiative of Dr. Mohammad Hadi Mourad.",
    points: [
      "Medicine for each family’s needs",
      "Food aid",
      "Hygiene supplies",
      "Support for displaced families",
    ],
    foundedYear: "2019",
    foundedLabel: "The year we were founded",
    imageAltPrimary: "A volunteer carrying a box of aid",
    imageAltSecondary: "A volunteer in the charity’s green vest",
    cta: "Read our story",
  },
  services: {
    kicker: "What we do",
    title: { before: "We reach families ", highlight: "where they are", after: "" },
    items: {
      medicine: { title: "Medicine distribution", text: "Medicine delivered according to each family’s needs." },
      food: { title: "Food aid", text: "Food parcels delivered directly to families." },
      hygiene: { title: "Hygiene supplies", text: "Cleaning products, nappies and essentials." },
      displaced: { title: "Support for displaced families", text: "Standing with displaced families across Lebanon." },
      health: { title: "Health programmes", text: "Sustainable health programmes for those in need." },
      social: { title: "Social programmes", text: "Social programmes that protect families’ dignity." },
    },
  },
  faq: {
    kicker: "FAQ",
    title: { before: "Everything you need to know ", highlight: "before you help", after: "" },
    items: [
      {
        question: "How can I donate?",
        answer:
          "Donations are collected through our GoFundMe page, linked from the “Donate now” button at the top of every page.",
      },
      {
        question: "How do I become a volunteer?",
        answer:
          "Send us a message through the contact form or on Instagram and we will get back to you with upcoming activities.",
      },
      { question: "Where does the charity work?", answer: "We work with families in every region of Lebanon." },
      {
        question: "Who founded the charity?",
        answer: "Heart of Lebanon was founded in 2019 on the initiative of Dr. Mohammad Hadi Mourad.",
      },
    ],
  },
  campaigns: {
    kicker: "Our campaigns",
    title: { before: "Campaigns that ", highlight: "need your support", after: "" },
    note: "Amounts and progress will be added once confirmed by the charity.",
    progress: "Progress",
    raised: "Raised",
    goal: "Goal",
    progressUnavailable: "Funding progress not yet available",
    percentPlaceholder: "%",
    amountPlaceholder: "Amount",
    photoPlaceholder: "Campaign photo",
    items: {
      medicine: { tag: "Medical aid", title: "Medicine for displaced families", text: "We provide medicine according to each family’s needs." },
      food: { tag: "Food aid", title: "Food parcels for families", text: "Essential food parcels delivered to homes." },
      hygiene: { tag: "Hygiene", title: "Hygiene kits and nappies", text: "Cleaning products and nappies for families in need." },
      programme: { tag: "Health & social", title: "Our health and social programme", text: "Sustainable programmes that stay with families long-term." },
    },
  },
  donateBand: {
    kicker: "Donate now",
    title: { before: "Your gift reaches ", highlight: "a family in need", after: "" },
    text: "Choose an amount and complete your donation securely on our GoFundMe page.",
    custom: "Custom",
    cta: "Donate on GoFundMe",
  },
  events: {
    kicker: "Events",
    title: { before: "Our ", highlight: "upcoming", after: " events" },
    photoPlaceholder: "Event photo",
    datePlaceholder: "Date",
    placePlaceholder: "Place",
    titlePlaceholder: "Event title",
    descriptionPlaceholder: "Short event description",
  },
  testimonials: {
    kicker: "Testimonials",
    title: { before: "Words from ", highlight: "families and volunteers", after: "" },
    quotePlaceholder: "Testimonial from a beneficiary or volunteer",
    photoPlaceholder: "Photo",
    namePlaceholder: "Name",
    rolePlaceholder: "Role",
  },
  volunteers: {
    kicker: "Our team",
    title: { before: "Our ", highlight: "green-vest", after: " volunteers" },
    role: "Volunteer",
    namePlaceholder: "Volunteer name",
    imageAlt: "A volunteer in the charity’s green vest",
    join: {
      kicker: "Join us",
      title: "Wear the green vest",
      text: "We welcome volunteers for medicine and aid distributions.",
      cta: "Volunteer",
    },
  },
  news: {
    kicker: "From the field",
    title: { before: "Latest ", highlight: "news", after: "" },
    datePlaceholder: "Date",
    items: {
      medicine: { tag: "Medical aid", title: "Distributing medicine according to the needs of displaced families" },
      programme: { tag: "Social programmes", title: "Closing our health and social programme" },
      relief: { tag: "Relief", title: "Standing with our people from every region of Lebanon" },
    },
  },
  contact: {
    kicker: "Contact us",
    title: { before: "We are here ", highlight: "to listen", after: "" },
    mapPlaceholder: "Map — charity address",
    mapLabel: "Map placeholder",
    fields: {
      name: "Name",
      phone: "Phone",
      reason: "Reason",
      message: "Message",
    },
    reasons: {
      donating: "Donating",
      volunteering: "Volunteering",
      help: "Requesting help",
      partnership: "Partnership",
      other: "Other",
    },
    submit: "Send message",
    sending: "Sending…",
    success: "Thank you, your message was received. (Demo form)",
    errors: {
      required: "Please fill in your name, phone and message.",
      phone: "Please enter a valid phone number.",
    },
  },
  footer: {
    about:
      "A non-profit humanitarian organisation founded in 2019 on the initiative of Dr. Mohammad Hadi Mourad, supporting Lebanese people through sustainable health and social programmes.",
    logoAlt: "Heart of Lebanon",
    links: "Links",
    programmes: "Programmes",
    programmeItems: ["Medicine", "Food aid", "Hygiene", "Displaced families"],
    follow: "Follow us",
    location: "Location",
    addressPlaceholder: "Address",
    hours: "Working hours",
    hoursPlaceholder: "Days and hours",
    call: "Call us",
    phonePlaceholder: "Phone number",
    copyright: "© {year} Heart of Lebanon Charity. All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist.",
    cta: "Back to home",
  },
};

export default en;

/** Shape every locale must implement. */
export type Dictionary = typeof en;
