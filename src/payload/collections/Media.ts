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
    imageSizes: [
      { name: "card", width: 600, height: 600, position: "centre" },
      { name: "banner", width: 1600, height: 900, position: "centre" },
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
