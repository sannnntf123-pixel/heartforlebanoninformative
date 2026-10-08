export const causeCategories = ["Education", "Medicine", "Food", "Water"] as const;

export type CauseCategory = (typeof causeCategories)[number];

export type Cause = {
  id: string;
  title: string;
  category: CauseCategory;
  image: string;
  description?: string;
  author?: string;
  /** Amount raised so far, in whole dollars. */
  raised: number;
  /** Fundraising target, in whole dollars. */
  goal: number;
};

const leadershipBlurb = "Under his leadership, we believe \n strengthen our position";
const witnessBlurb =
  "There are only a few times in each of our lives that we get to witness.";

/** Home 01 — "Our Popular Causes" (wide cards with description). */
export const featuredCauses: Cause[] = [
  { id: "care-charity-chief", title: "Care charity names \n its new chief", category: "Medicine", image: "/assets/img/causes/04.png", description: leadershipBlurb, raised: 4407, goal: 10000 },
  { id: "hope-for-children", title: "Our Donation Is Hope For Poor Children's", category: "Education", image: "/assets/img/causes/05.png", description: leadershipBlurb, raised: 3500, goal: 8000 },
  { id: "clean-healthy-water", title: "Raise Fund For Clean & Healthy Water", category: "Water", image: "/assets/img/causes/06.png", description: leadershipBlurb, raised: 6370, goal: 10000 },
  { id: "schools-food", title: "Emergency Response And Schools Food", category: "Food", image: "/assets/img/causes/07.png", description: leadershipBlurb, raised: 9000, goal: 10000 },
];

/** Home 02 — "Introducing Our Campaigns" slider. */
export const campaignCauses: Cause[] = [
  { id: "album-aid", title: "Rebecca's New Album Aid for the Needy", category: "Water", image: "/assets/img/causes/04.jpg", raised: 7000, goal: 10000 },
  { id: "nations-kindness", title: "Charity Showcases Nation's Kindness", category: "Food", image: "/assets/img/causes/05.jpg", raised: 9000, goal: 10000 },
  { id: "rural-child-meals", title: "Provide Healthy Meals to an Impoverished Rural Child", category: "Medicine", image: "/assets/img/causes/06.jpg", raised: 5500, goal: 10000 },
  { id: "album-aid-2", title: "Rebecca's New Album Aid for the Needy", category: "Water", image: "/assets/img/causes/07.jpg", raised: 8000, goal: 10000 },
];

/** Home 03 — "Trending Cause" grid. */
export const trendingCauses: Cause[] = [
  { id: "clean-water", title: "Because Everyone Deserves Clean Water", category: "Water", image: "/assets/img/causes/01.jpg", author: "Miranda H.", raised: 1700, goal: 3000 },
  { id: "health-care", title: "Free And Cost-Effective Health Care for the poor", category: "Medicine", image: "/assets/img/causes/02.jpg", author: "Miranda H.", raised: 9500, goal: 20000 },
  { id: "hope-children", title: "Our Donation Is Hope For Poor Children's", category: "Food", image: "/assets/img/causes/03.jpg", author: "Miranda H.", raised: 3000, goal: 7000 },
];

/** Home 04 — "Our Popular Causes" slider. */
export const popularCauses: Cause[] = [
  { id: "healthy-food", title: "Raise Fund For Clean & Healthy Food", category: "Food", image: "/assets/img/causes/01.png", description: witnessBlurb, raised: 7000, goal: 10000 },
  { id: "child-education", title: "Give African Child A Good Education", category: "Education", image: "/assets/img/causes/02.png", description: witnessBlurb, raised: 9000, goal: 10000 },
  { id: "healthy-food-2", title: "Raise Fund For Clean & Healthy Food", category: "Food", image: "/assets/img/causes/03.png", description: witnessBlurb, raised: 5500, goal: 10000 },
];

/** Causes page — every cause, filterable by category. */
export const allCauses: Cause[] = [
  { id: "deserves-clean-water", title: "Because Everyone Deserves Clean Water", category: "Water", image: "/assets/img/causes/01.jpg", author: "Miranda H.", raised: 1650, goal: 3000 },
  { id: "hope-poor-children", title: "Our Donation Is Hope For Poor Children's", category: "Food", image: "/assets/img/causes/02.jpg", author: "Miranda H.", raised: 2700, goal: 6000 },
  { id: "free-health-care", title: "Free And Cost-Effective Health Care", category: "Medicine", image: "/assets/img/causes/03.jpg", author: "Miranda H.", raised: 1700, goal: 2000 },
  { id: "emergency-schools-food", title: "Emergency Response And Schools Food", category: "Food", image: "/assets/img/causes/03.jpg", author: "Miranda H.", raised: 7200, goal: 8000 },
  { id: "children-education", title: "Children Education Needs For Change The World", category: "Education", image: "/assets/img/causes/01.jpg", author: "Miranda H.", raised: 6400, goal: 9000 },
  { id: "basic-education", title: "Deserves Basic Education for the Poor", category: "Education", image: "/assets/img/causes/02.jpg", author: "Miranda H.", raised: 5400, goal: 6000 },
  { id: "pure-clean-water", title: "Everyone Deserves Pure Clean Water", category: "Water", image: "/assets/img/causes/01.jpg", author: "Miranda H.", raised: 3150, goal: 4500 },
  { id: "early-childhood", title: "Fundraising For Early Childhood Rise", category: "Education", image: "/assets/img/causes/02.jpg", author: "Miranda H.", raised: 1650, goal: 3000 },
  { id: "medicine-for-families", title: "Essential Medicine For Families In Need", category: "Medicine", image: "/assets/img/causes/03.jpg", author: "Miranda H.", raised: 2640, goal: 3000 },
];
