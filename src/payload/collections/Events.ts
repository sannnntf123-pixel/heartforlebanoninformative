import type { CollectionConfig, FieldHook } from "payload";
import { isLoggedIn, publishedOrLoggedIn } from "../access";
import { EVENTS_TAG, revalidate } from "../hooks/revalidate";

export const eventCategories = [
  { value: "medical", label: { en: "Medical aid", ar: "مساعدات طبية" } },
  { value: "health", label: { en: "Health & prevention", ar: "الصحة والوقاية" } },
  { value: "food", label: { en: "Food aid", ar: "مساعدات غذائية" } },
  { value: "youth", label: { en: "Youth & education", ar: "الشباب والتعليم" } },
  { value: "women", label: { en: "Women empowerment", ar: "تمكين المرأة" } },
  { value: "community", label: { en: "Community", ar: "مجتمع" } },
] as const;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents left by NFKD
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/** Fills the slug from the English title when it is left empty. */
const formatSlug: FieldHook = ({ value, data, req }) => {
  if (typeof value === "string" && value.trim()) return slugify(value);
  const title = data?.title;
  const englishTitle =
    typeof title === "string" ? (req.locale === "en" ? title : "") : title?.en ?? "";
  return englishTitle ? slugify(englishTitle) : value;
};

/** Upcoming/past events and sign-ups, in English and Arabic. */
export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: { en: "Event", ar: "فعالية" },
    plural: { en: "Events", ar: "الفعاليات" },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "category", "_status"],
    group: { en: "Content", ar: "المحتوى" },
    description: {
      en: "Fill in both English and Arabic (switch language at the top right) before publishing.",
      ar: "املأ النسختين العربية والإنجليزية (بدّل اللغة من أعلى الصفحة) قبل النشر.",
    },
  },
  defaultSort: "-date",
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    afterChange: [() => revalidate(EVENTS_TAG)],
    afterDelete: [() => revalidate(EVENTS_TAG)],
  },
  fields: [
    {
      name: "title",
      label: { en: "Title", ar: "العنوان" },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "summary",
      label: { en: "Short summary", ar: "ملخص قصير" },
      type: "textarea",
      localized: true,
      required: true,
      maxLength: 220,
      admin: { description: { en: "Shown on event cards.", ar: "يظهر على بطاقة الفعالية." } },
    },
    {
      name: "description",
      label: { en: "Full description", ar: "الوصف الكامل" },
      type: "richText",
      localized: true,
    },
    {
      name: "coverImage",
      label: { en: "Cover photo", ar: "صورة الغلاف" },
      type: "upload",
      relationTo: "media",
      // Required to publish (drafts may be saved without it).
      required: true,
      admin: {
        description: {
          en: "Landscape photo shown on the event card and at the top of the event page.",
          ar: "صورة أفقية تظهر على بطاقة الفعالية وفي أعلى صفحتها.",
        },
      },
    },
    {
      name: "gallery",
      label: { en: "Photo gallery", ar: "معرض الصور" },
      type: "upload",
      relationTo: "media",
      hasMany: true,
      maxRows: 40,
      admin: {
        description: {
          en: "Optional: photos from the event, shown as a gallery on the event page.",
          ar: "اختياري: صور من الفعالية تظهر كمعرض في صفحتها.",
        },
      },
    },
    {
      name: "date",
      label: { en: "Date (optional)", ar: "التاريخ (اختياري)" },
      type: "date",
      index: true,
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
        description: {
          en: "Leave empty if the date isn't set yet; the site shows \"Date to be announced\".",
          ar: "اتركه فارغًا إذا لم يُحدَّد الموعد بعد، وسيظهر «الموعد يُعلن لاحقًا».",
        },
      },
    },
    {
      name: "location",
      label: { en: "Location", ar: "المكان" },
      type: "text",
      localized: true,
      required: true,
    },
    // ---------- sidebar ----------
    {
      name: "slug",
      label: { en: "Web address", ar: "رابط الصفحة" },
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: {
          en: "Filled from the English title if left empty.",
          ar: "يُملأ تلقائيًا من العنوان الإنجليزي إذا تُرك فارغًا.",
        },
      },
      hooks: { beforeValidate: [formatSlug] },
    },
    {
      name: "category",
      label: { en: "Category", ar: "الفئة" },
      type: "select",
      required: true,
      defaultValue: "community",
      options: eventCategories.map((c) => ({ value: c.value, label: c.label })),
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      label: { en: "Important event", ar: "فعالية مهمّة" },
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: {
          en: "Shown first in \"Important events\" and on the home page.",
          ar: "تظهر أولًا في «فعاليات مهمّة» وفي الصفحة الرئيسية.",
        },
      },
    },
  ],
};
