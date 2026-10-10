"use client";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useActionState, useId } from "react";
import { signUpForEvent } from "./actions";
import styles from "./EventDetail.module.css";
import { MAX_ATTENDEES, type SignupState } from "./signup-schema";

type SignupFormProps = {
  eventId: number;
  locale: Locale;
  t: Pick<Dictionary["eventsPage"]["signup"], "fields" | "submit" | "sending" | "success" | "errors">;
};

const initialState: SignupState = { status: "idle" };

/** Event sign-up form; works without JavaScript and validates on the server. */
const SignupForm = ({ eventId, locale, t }: SignupFormProps) => {
  const [state, formAction, pending] = useActionState(
    signUpForEvent.bind(null, eventId, locale),
    initialState
  );
  const id = useId();
  const values = state.status === "error" ? state.values : undefined;

  if (state.status === "success") {
    return (
      <p className={styles.success} role="status">
        {t.success}
      </p>
    );
  }

  return (
    <form key={values ? JSON.stringify(values) : "form"} action={formAction} className={styles.form}>
      <div>
        <label htmlFor={`${id}-name`}>{t.fields.name} *</label>
        <input id={`${id}-name`} name="name" required maxLength={120} autoComplete="name" defaultValue={values?.name} />
      </div>
      <div>
        <label htmlFor={`${id}-phone`}>{t.fields.phone} *</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          dir="ltr"
          required
          maxLength={30}
          autoComplete="tel"
          defaultValue={values?.phone}
          aria-invalid={state.status === "error" && state.error === "phone"}
        />
      </div>
      <div>
        <label htmlFor={`${id}-email`}>{t.fields.email}</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          dir="ltr"
          maxLength={200}
          autoComplete="email"
          defaultValue={values?.email}
          aria-invalid={state.status === "error" && state.error === "email"}
        />
      </div>
      <div>
        <label htmlFor={`${id}-attendees`}>{t.fields.attendees}</label>
        <select id={`${id}-attendees`} name="attendees" defaultValue={values?.attendees ?? 1}>
          {Array.from({ length: MAX_ATTENDEES }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n.toLocaleString(locale === "ar" ? "ar-u-nu-arab" : "en")}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-notes`}>{t.fields.notes}</label>
        <textarea id={`${id}-notes`} name="notes" maxLength={1000} defaultValue={values?.notes} />
      </div>
      {/* Honeypot for bots: hidden from people and assistive technology. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? t.sending : t.submit}
      </button>
      {state.status === "error" && (
        <p className={styles.error} role="alert">
          {t.errors[state.error]}
        </p>
      )}
    </form>
  );
};

export default SignupForm;
