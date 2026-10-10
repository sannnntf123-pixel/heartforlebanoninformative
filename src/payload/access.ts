import type { Access, FieldAccess } from "payload";

type Role = "admin" | "editor";

const hasRole = (user: unknown, role: Role): boolean =>
  typeof user === "object" && user !== null && (user as { role?: Role }).role === role;

/** Any logged-in admin-panel user (admin or editor). */
export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

/** Admins only (manage users). */
export const isAdmin: Access = ({ req }) => hasRole(req.user, "admin");

export const isAdminField: FieldAccess = ({ req }) => hasRole(req.user, "admin");

/** Admins manage everyone; editors may only read/update their own account. */
export const isAdminOrSelf: Access = ({ req }) => {
  if (hasRole(req.user, "admin")) return true;
  if (!req.user) return false;
  return { id: { equals: req.user.id } };
};

/** Public sees published documents only; logged-in users also see drafts. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
