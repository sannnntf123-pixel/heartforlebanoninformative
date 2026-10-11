import type { CollectionConfig } from "payload";
import { isLoggedIn } from "../access";

/** Uploaded photos (event covers). Stored on Vercel Blob in production. */
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { en: "Photo", ar: "صورة" },
    plural: { en: "Photos", ar: "الصور" },
  },
  admin: {
    useAsTitle: "alt",
    group: { en: "Content", ar: "المحتوى" },
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    focalPoint: true,
    // No fixed crop position: sizes are cropped around each photo's focal point
    // (set by dragging the dot in the admin), so faces stay in frame.
    imageSizes: [
      { name: "card", width: 600, height: 600 },
      { name: "banner", width: 1600, height: 900 },
    ],
    adminThumbnail: "card",
  },
  fields: [
    {
      name: "alt",
      label: { en: "Description (for screen readers)", ar: "وصف الصورة (لقارئات الشاشة)" },
      type: "text",
      localized: true,
      required: true,
    },
  ],
};
