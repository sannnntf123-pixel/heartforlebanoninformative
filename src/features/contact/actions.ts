"use server";

import { isContactReason, type ContactFields, type ContactState } from "./schema";

const PHONE_PATTERN = /^\+?[\d\s()-]{6,20}$/;

const readField = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

/**
 * Validates a contact-form submission on the server. Error codes (not text) are
 * returned so the client can show them in the visitor's language.
 */
export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const reason = readField(formData, "reason");
  const values: ContactFields = {
    name: readField(formData, "name").slice(0, 120),
    phone: readField(formData, "phone").slice(0, 30),
    reason: isContactReason(reason) ? reason : "other",
    message: readField(formData, "message").slice(0, 4000),
  };

  if (!values.name || !values.phone || !values.message) {
    return { status: "error", error: "required", values };
  }
  if (!PHONE_PATTERN.test(values.phone)) {
    return { status: "error", error: "phone", values };
  }

  // Delivery is not connected yet (the design ships a demo form). Forward
  // `values` to the charity's email or CRM provider here.
  return { status: "success" };
}
