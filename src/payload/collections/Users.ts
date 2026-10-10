import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField, isAdminOrSelf } from "../access";

/** Admin-panel accounts. Admins manage users; editors manage events. */
export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: { en: "User", ar: "مستخدم" },
    plural: { en: "Users", ar: "المستخدمون" },
  },
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: { en: "Settings", ar: "الإعدادات" },
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      label: { en: "Name", ar: "الاسم" },
      type: "text",
      required: true,
    },
    {
      name: "role",
      label: { en: "Role", ar: "الدور" },
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { value: "admin", label: { en: "Admin", ar: "مدير" } },
        { value: "editor", label: { en: "Editor", ar: "محرر" } },
      ],
      // Only admins can change roles, so editors cannot promote themselves.
      access: { update: isAdminField },
      saveToJWT: true,
    },
  ],
  hooks: {
    beforeChange: [
      // The very first account (created on /admin) becomes an admin.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({ collection: "users", req });
        return totalDocs === 0 ? { ...data, role: "admin" } : data;
      },
    ],
  },
};
