"use server";

import config from "@payload-config";
import type { Locale } from "@/i18n/config";
import { getPayload } from "payload";
import { isUpcoming } from "./queries";
import { MAX_ATTENDEES, type SignupFields, type SignupState } from "./signup-schema";

const PHONE_PATTERN = /^\+?[\d\s()-]{6,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const read = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "").trim().slice(0, max);

/**
 * Signs a visitor up for an event. Runs on the server: validates the input,
 * checks the event is published, upcoming, open and not full, then stores the
 * registration (the public API cannot create registrations directly).
 */
export async function signUpForEvent(
  eventId: number,
  locale: Locale,
  _previous: SignupState,
  formData: FormData
): Promise<SignupState> {
  const values: SignupFields = {
    name: read(formData, "name", 120),
    phone: read(formData, "phone", 30),
    email: read(formData, "email", 200),
    attendees: Number(formData.get("attendees") ?? 1),
    notes: read(formData, "notes", 1000),
  };
  const fail = (error: Extract<SignupState, { status: "error" }>["error"]): SignupState => ({
    status: "error",
    error,
    values,
  });

  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "website", 200)) return { status: "success" };

  if (!values.name || !values.phone) return fail("required");
  if (!PHONE_PATTERN.test(values.phone)) return fail("phone");
  if (values.email && !EMAIL_PATTERN.test(values.email)) return fail("email");
  if (!Number.isInteger(values.attendees) || values.attendees < 1 || values.attendees > MAX_ATTENDEES) {
    return fail("attendees");
  }

  try {
    const payload = await getPayload({ config });
    // overrideAccess: false → only published events can be found.
    const event = await payload
      .findByID({ collection: "events", id: eventId, depth: 0, overrideAccess: false })
      .catch(() => null);

    const deadline = event?.registration?.deadline;
    if (
      !event ||
      !event.registration?.enabled ||
      !isUpcoming(event) ||
      (deadline && new Date(deadline) < new Date())
    ) {
      return fail("closed");
    }

    const capacity = event.registration.capacity;
    if (capacity) {
      const { docs } = await payload.find({
        collection: "registrations",
        where: { event: { equals: eventId } },
        select: { attendees: true },
        pagination: false,
        depth: 0,
      });
      const taken = docs.reduce((sum, doc) => sum + (doc.attendees ?? 0), 0);
      if (taken + values.attendees > capacity) return fail("full");
    }

    await payload.create({
      collection: "registrations",
      data: {
        event: eventId,
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        attendees: values.attendees,
        notes: values.notes || undefined,
        language: locale,
      },
      // Server-side write: the collection is closed to anonymous API requests.
      overrideAccess: true,
    });

    return { status: "success" };
  } catch (error) {
    console.error("Event sign-up failed", error);
    return fail("unknown");
  }
}
