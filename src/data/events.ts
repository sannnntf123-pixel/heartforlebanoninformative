export const eventCategories = ["Water Day", "Festival", "ProEvent", "Trending"] as const;

export type EventCategory = (typeof eventCategories)[number];

export type CharityEvent = {
  id: string;
  title: string;
  image: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  time: string;
  location: string;
  category: string;
  description?: string;
  author?: string;
};

const DEFAULT_LOCATION = "66 Broklyant, New York India";
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do \n eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const NULLAM =
  "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo sodales.";

/** Home 01 — "Our Upcoming Event". */
export const upcomingEvents: CharityEvent[] = [
  { id: "album-supports-needy", title: "Rebecca's Album Supports Needy", image: "/assets/img/event/09.jpg", date: "2024-11-13", time: "10:00 PM", location: DEFAULT_LOCATION, category: "Festival", description: LOREM },
  { id: "hungry-no-more", title: "Be Hungry No More and Leave", image: "/assets/img/event/15.jpg", date: "2024-11-13", time: "10:00 PM", location: DEFAULT_LOCATION, category: "Festival", description: LOREM },
  { id: "charities-learn-forward", title: "Charities Learn Forward", image: "/assets/img/event/16.jpg", date: "2024-11-13", time: "10:00 PM", location: DEFAULT_LOCATION, category: "ProEvent", description: LOREM },
  { id: "touch-their-lives", title: "Help Us Touch Their Lives", image: "/assets/img/event/17.jpg", date: "2024-11-13", time: "10:00 PM", location: DEFAULT_LOCATION, category: "Trending", description: LOREM },
];

/** Home 02 — "Be ready for our upcoming charity events". */
export const featuredEvents: CharityEvent[] = [
  { id: "loyal-community", title: "How to build a loyal community offline", image: "/assets/img/event/02.jpg", date: "2024-11-13", time: "10:00 PM", location: DEFAULT_LOCATION, category: "ProEvent", description: NULLAM },
  { id: "creative-campaign", title: "Start a campaign to reach your creative", image: "/assets/img/event/08.jpg", date: "2024-11-13", time: "10:00 PM", location: DEFAULT_LOCATION, category: "Trending", description: NULLAM },
];

/** Home 03 — full-width event slider. Each slide uses a different date-badge colour. */
export const sliderEvents: CharityEvent[] = ["01", "04", "05", "06", "07"].map((img, index) => ({
  id: `play-for-the-world-${index + 1}`,
  title: "Need To Playing For This Worlds",
  image: `/assets/img/event/${img}.jpg`,
  date: "2024-07-11",
  time: "13:00 - 18:00",
  location: DEFAULT_LOCATION,
  category: "School",
  author: "Shikhon Islam",
}));

/** Home 04 — "Upcoming Events" cards. */
export const highlightEvents: CharityEvent[] = [
  { id: "water-conference", title: "2024 Water Full Day Main Conference", image: "/assets/img/event/event-card-bg.jpg", date: "2024-01-24", time: "10:00 AM", location: "M12/A Miranda Hall Town Hall Street New York, United States", category: "Water Day" },
  { id: "good-friends", title: "How We Can Be A Good Friends", image: "/assets/img/event/event-card-bg.jpg", date: "2024-05-24", time: "10:00 AM", location: "M12/A Miranda Hall Town Hall Street New York, United States", category: "Friendship Day" },
  { id: "teachers-day", title: "Teachers Presentation Day of 2024", image: "/assets/img/event/event-card-bg.jpg", date: "2024-01-24", time: "10:00 AM", location: "M12/A Miranda Hall Town Hall Street New York, United States", category: "Teachers Day" },
];

const WATER_PITCH =
  "Your $40.00 monthly donation can give 12 people clean water every year. 100% funds water projects.";

/** Events page — every event, filterable by category. */
export const allEvents: CharityEvent[] = [
  { id: "voluntary-sector", title: "Project Management In The Voluntary Sector", image: "/assets/img/event/e1.jpg", date: "2024-06-24", time: "10:00 AM", location: "NY, London", category: "Water Day", description: WATER_PITCH },
  { id: "ways-to-help", title: "10 Ways To Help Others That Will Lead You", image: "/assets/img/event/e2.jpg", date: "2024-06-24", time: "10:00 AM", location: "NY, London", category: "Festival", description: WATER_PITCH },
  { id: "church-serve-others", title: "Helping The Church To Serve Others", image: "/assets/img/event/e3.jpg", date: "2024-06-24", time: "10:00 AM", location: "NY, London", category: "Festival", description: WATER_PITCH },
  { id: "rebuild-primary-school", title: "Rebuilding Collapse Primary School", image: "/assets/img/event/e4.jpg", date: "2024-06-24", time: "10:00 AM", location: "NY, London", category: "Trending", description: WATER_PITCH },
  { id: "changing-leadership", title: "Changing Leadership In A Changing World", image: "/assets/img/event/e5.jpg", date: "2024-06-24", time: "10:00 AM", location: "NY, London", category: "ProEvent", description: WATER_PITCH },
  { id: "charity-program", title: "Charity Program In The Community", image: "/assets/img/event/e6.jpg", date: "2024-06-24", time: "10:00 AM", location: "NY, London", category: "Water Day", description: WATER_PITCH },
];
