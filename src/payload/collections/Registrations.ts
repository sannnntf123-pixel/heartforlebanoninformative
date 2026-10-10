import type { CollectionConfig } from "payload";
import { isLoggedIn } from "../access";
import { REGISTRATIONS_TAG, revalidate } from "../hooks/revalidate";

/**
 * Event sign-ups submitted from the public event pages.
 * Visitors never write here directly: the site's Server Action validates the
 * request and creates the document with server-side access, so the public
 * REST API stays closed (no spam entry point).
 */
export const Registrations: CollectionConfig = {
  slug: "registrations",
  labels: {
    singular: { en: "Sign-up", ar: "تسجيل" },
    plural: { en: "Sign-ups", ar: "التسجيلات" },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "event", "attendees", "phone", "createdAt"],
    group: { en: "Content", ar: "المحتوى" },
    listSearchableFields: ["name", "phone", "email"],
  },
  defaultSort: "-createdAt",
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    afterChange: [() => revalidate(REGISTRATIONS_TAG)],
    afterDelete: [() => revalidate(REGISTRATIONS_TAG)],
  },
  fields: [
    {
      name: "event",
      label: { en: "Event", ar: "الفعالية" },
      type: "relationship",
      relationTo: "events",
      required: true,
      index: true,
    },
    {
      type: "row",
      fields: [
        { name: "name", label: { en: "Name", ar: "الاسم" }, type: "text", required: true, admin: { width: "50%" } },
        { name: "phone", label: { en: "Phone", ar: "الهاتف" }, type: "text", required: true, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", label: { en: "Email", ar: "البريد الإلكتروني" }, type: "email", admin: { width: "50%" } },
        {
          name: "attendees",
          label: { en: "People", ar: "عدد الأشخاص" },
          type: "number",
          required: true,
          defaultValue: 1,
          min: 1,
          max: 10,
          admin: { width: "50%" },
        },
      ],
    },
    { name: "notes", label: { en: "Notes", ar: "ملاحظات" }, type: "textarea" },
    {
      name: "language",
      label: { en: "Site language", ar: "لغة الموقع" },
      type: "select",
      options: [
        { value: "en", label: "English" },
        { value: "ar", label: "العربية" },
      ],
      admin: { position: "sidebar", readOnly: true },
    },
  ],
};
