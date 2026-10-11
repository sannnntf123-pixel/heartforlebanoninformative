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
    breadcrumb: "Breadcrumb",
    switchLanguage: "العربية",
  },
  topBar: {
    tagline: "Non-profit humanitarian organisation · founded 2019",
  },
  nav: {
    home: "Home",
    about: "About",
    activities: "Activities",
    events: "Events",
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
  impact: {
    kicker: "Our impact",
    title: { before: "What your support ", highlight: "has made possible", after: "" },
    text: "A few numbers from the campaigns the association has carried out across Lebanon.",
    stats: [
      {
        slug: "together-against-breast-cancer",
        value: 10000,
        plus: false,
        label: "mammography and breast ultrasound screenings for women across Lebanon",
      },
      {
        slug: "shelter-visits-war-relief-2026",
        value: 30,
        plus: true,
        label: "shelters for displaced families reached with medical and food aid",
      },
      {
        slug: "fasting-together",
        value: 30,
        plus: true,
        label: "municipalities in Baabda and the Bekaa reached by “Fasting Together”",
      },
    ],
    cta: "See all our events",
  },
  events: {
    kicker: "Events",
    title: { before: "Our ", highlight: "key", after: " events" },
  },
  eventQuotes: {
    kicker: "From our events",
    title: { before: "The messages behind ", highlight: "our campaigns", after: "" },
    viewEvent: "View the event",
    items: [
      {
        slug: "use-your-mind-mental-health",
        quote: "Use your mind: mental illness is not a shame.",
        source: "“Use Your Mind” mental health conference",
      },
      {
        slug: "together-against-breast-cancer",
        quote: "Women’s health is a right and a priority, and early diagnosis can save thousands of lives.",
        source: "“Together Against Breast Cancer” campaign",
      },
      {
        slug: "my-heart-for-lebanons-children",
        quote: "Early detection gives every child a better chance for a healthy future.",
        source: "“My Heart for Lebanon’s Children” campaign",
      },
      {
        slug: "fasting-together",
        quote: "Fasting brings the Lebanese together around love and giving, beyond religious differences.",
        source: "“Fasting Together” campaign",
      },
    ],
  },
  volunteers: {
    kicker: "Our team",
    title: { before: "Our team ", highlight: "in the field", after: "" },
    /** Caption per event photo (keyed by event slug). */
    field: {
      "shelter-visits-war-relief-2026": "Aid visits to 30+ shelters",
      "fasting-together": "“Fasting Together” food aid",
      "my-heart-for-lebanons-children": "Children’s heart screenings",
    } as Record<string, string>,
    join: {
      kicker: "Join us",
      title: "Wear the green vest",
      text: "We welcome volunteers for medicine and aid distributions.",
      cta: "Volunteer",
    },
  },
  news: {
    kicker: "From the field",
    title: { before: "Latest ", highlight: "from our events", after: "" },
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
  eventsPage: {
    meta: {
      title: "Events",
      description: "Upcoming Heart of Lebanon events, distributions and community activities across Lebanon.",
    },
    kicker: "Events",
    title: "Our events",
    intro: "Distributions, health days and community activities across Lebanon. Dates and places are announced here as soon as they are confirmed.",
    allEvents: "View all events",
    important: {
      kicker: "Highlights",
      title: { before: "Important ", highlight: "events", after: "" },
      badge: "Important",
    },
    upcoming: {
      kicker: "Coming up",
      title: { before: "Upcoming ", highlight: "events", after: "" },
      empty: "No upcoming events right now. Follow us on Instagram to hear about the next one.",
    },
    past: {
      kicker: "Archive",
      title: { before: "Past ", highlight: "events", after: "" },
    },
    pastBadge: "Past event",
    categories: {
      medical: "Medical aid",
      health: "Health & prevention",
      food: "Food aid",
      youth: "Youth & education",
      women: "Women empowerment",
      community: "Community",
    },
    detail: {
      backToEvents: "All events",
      when: "When",
      where: "Where",
      category: "Category",
      about: "About this event",
    },
    gallery: {
      title: "Photo gallery",
      open: "Open photo {n} of {total}",
      close: "Close",
      previous: "Previous photo",
      next: "Next photo",
      counter: "{n} / {total}",
    },
    cta: {
      kicker: "Take part",
      title: { before: "Want to ", highlight: "join us", after: "?" },
      text: "Volunteer at our next event or suggest an activity in your community.",
      button: "Contact us",
    },
  },
  contactPage: {
    meta: {
      title: "Contact us",
      description: "Get in touch with Heart of Lebanon to donate, volunteer, request help or propose a partnership.",
    },
    kicker: "Contact us",
    title: "We are here to listen",
    intro: "Donating, volunteering, requesting help or proposing a partnership — send us a message and our team will get back to you.",
    channelsTitle: "Ways to reach us",
    formKicker: "Message",
    formTitle: { before: "Send us ", highlight: "a message", after: "" },
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
