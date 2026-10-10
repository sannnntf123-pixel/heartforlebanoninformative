/**
 * Non-text content for the home page: which photo goes where, and the data the
 * charity has not confirmed yet (`null` renders a visible placeholder).
 * All wording lives in the dictionaries (src/i18n/dictionaries).
 */

/** Same three field photos, cropped per layout (wide / 3:2 card / square). */
export const photos = {
  medicine: {
    wide: "/images/medicine-wide.jpg",
    card: "/images/medicine-card.jpg",
    square: "/images/medicine-square.jpg",
  },
  food: {
    wide: "/images/food-wide.jpg",
    card: "/images/food-card.jpg",
    square: "/images/food-square.jpg",
  },
  hygiene: {
    wide: "/images/hygiene-wide.jpg",
    card: "/images/hygiene-card.jpg",
    square: "/images/hygiene-square.jpg",
  },
} as const;

export type HeroSlide = {
  src: string;
  /** CSS object-position: keeps faces in frame when the photo is cropped. */
  focus: string;
};

/** Hero background photos, shown in this order. */
export const heroSlides: HeroSlide[] = [
  { src: "/images/hero-panel.webp", focus: "72% 25%" },
  { src: "/images/hero-press-conference.jpg", focus: "60% 35%" },
  { src: "/images/hero-children-visit.jpg", focus: "center 30%" },
];

export const aboutImages = {
  primary: photos.food.square,
  secondary: photos.hygiene.card,
};

export const faqImages = {
  main: photos.medicine.wide,
  small1: photos.food.square,
  small2: photos.hygiene.square,
};

/** Service cards, in display order; `id` keys into `services.items`. */
export const services = [
  { id: "medicine", image: photos.medicine.card, icon: "medicine" },
  { id: "food", image: photos.food.card, icon: "basket" },
  { id: "hygiene", image: photos.hygiene.card, icon: "drop" },
  { id: "displaced", image: photos.medicine.square, icon: "homeHeart" },
  { id: "health", image: photos.food.square, icon: "stethoscope" },
  { id: "social", image: photos.hygiene.square, icon: "people" },
] as const;

export type Campaign = {
  id: "medicine" | "food" | "hygiene" | "programme";
  image: string | null;
  /** Whole dollars; `null` until confirmed by the charity. */
  raised: number | null;
  goal: number | null;
};

export const campaigns: Campaign[] = [
  { id: "medicine", image: photos.medicine.wide, raised: null, goal: null },
  { id: "food", image: photos.food.wide, raised: null, goal: null },
  { id: "hygiene", image: photos.hygiene.wide, raised: null, goal: null },
  { id: "programme", image: null, raised: null, goal: null },
];

export type Testimonial = {
  id: string;
  quote: string | null;
  name: string | null;
  role: string | null;
};

export const testimonials: Testimonial[] = [
  { id: "testimonial-1", quote: null, name: null, role: null },
  { id: "testimonial-2", quote: null, name: null, role: null },
];

export const volunteers = [
  { id: "volunteer-1", name: null as string | null, image: photos.hygiene.square },
  { id: "volunteer-2", name: null as string | null, image: photos.medicine.square },
  { id: "volunteer-3", name: null as string | null, image: photos.food.square },
];

export const newsItems = [
  { id: "medicine", image: photos.medicine.wide, date: null as string | null },
  { id: "programme", image: photos.hygiene.wide, date: null as string | null },
  { id: "relief", image: photos.food.wide, date: null as string | null },
] as const;

export const testimonialsBackground = photos.food.wide;
