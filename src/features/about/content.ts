import { photos } from "@/features/home/content";

/**
 * Photos used on the About page. Only activities that a field photo genuinely
 * shows (aid and food distributions) get one; the rest use an icon panel so no
 * photo is presented as something it is not.
 */
export const aboutPagePhotos = {
  whoWeAre: photos.medicine.wide,
  activities: {
    refugees: photos.medicine.card,
    occasions: photos.food.card,
  },
} as const;

/** Display order of the activity stories; keys index `activities.items`. */
export const activityOrder = [
  "youth",
  "breastCancer",
  "childrenHeart",
  "women",
  "refugees",
  "occasions",
] as const;
