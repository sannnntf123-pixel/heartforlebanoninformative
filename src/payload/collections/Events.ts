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
    defaultColumns: ["title", "startDate", "category", "_status"],
    group: { en: "Content", ar: "المحتوى" },
    description: {
      en: "Fill in both English and Arabic (switch language at the top right) before publishing.",
      ar: "املأ النسختين العربية والإنجليزية (بدّل اللغة من أعلى الصفحة) قبل النشر.",
    },
  },
  defaultSort: "-startDate",
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
    },
    {
      type: "row",
      fields: [
        {
          name: "startDate",
          label: { en: "Starts", ar: "يبدأ" },
          type: "date",
          required: true,
          index: true,
          admin: { date: { pickerAppearance: "dayAndTime", timeIntervals: 15 }, width: "50%" },
        },
        {
          name: "endDate",
          label: { en: "Ends (optional)", ar: "ينتهي (اختياري)" },
          type: "date",
          admin: { date: { pickerAppearance: "dayAndTime", timeIntervals: 15 }, width: "50%" },
          validate: (value: unknown, { siblingData }: { siblingData: { startDate?: string } }) => {
            if (!value || !siblingData.startDate) return true;
            return new Date(String(value)) >= new Date(siblingData.startDate)
              ? true
              : "The end must be after the start. / يجب أن يكون الانتهاء بعد البداية.";
          },
        },
      ],
    },
    {
      name: "location",
      label: { en: "Location", ar: "المكان" },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "registration",
      label: { en: "Sign-up", ar: "التسجيل" },
      type: "group",
      fields: [
        {
          name: "enabled",
          label: { en: "Allow visitors to sign up", ar: "السماح للزوار بالتسجيل" },
          type: "checkbox",
          defaultValue: true,
        },
        {
          type: "row",
          admin: { condition: (_, siblingData) => Boolean(siblingData?.enabled) },
          fields: [
            {
              name: "capacity",
              label: { en: "Places (empty = unlimited)", ar: "عدد الأماكن (فارغ = غير محدود)" },
              type: "number",
              min: 1,
              admin: { width: "50%" },
            },
            {
              name: "deadline",
              label: { en: "Sign-up closes (optional)", ar: "آخر موعد للتسجيل (اختياري)" },
              type: "date",
              admin: { date: { pickerAppearance: "dayAndTime" }, width: "50%" },
            },
          ],
        },
      ],
    },
    {
      name: "registrations",
      label: { en: "Sign-ups", ar: "المسجّلون" },
      type: "join",
      collection: "registrations",
      on: "event",
      admin: { defaultColumns: ["name", "phone", "attendees", "createdAt"] },
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
      label: { en: "Feature on the home page", ar: "إبرازها في الصفحة الرئيسية" },
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
