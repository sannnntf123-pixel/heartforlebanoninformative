"use client";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useActionState, useId } from "react";
import { submitContact } from "./actions";
import { contactReasons, type ContactState } from "./schema";
import styles from "./Contact.module.css";

type ContactFormProps = {
  t: Pick<Dictionary["contact"], "fields" | "reasons" | "submit" | "sending" | "success" | "errors">;
};

const initialState: ContactState = { status: "idle" };

/** Progressive-enhancement form: works without JS, validates on the server. */
const ContactForm = ({ t }: ContactFormProps) => {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const id = useId();
  const values = state.status === "error" ? state.values : undefined;

  const status =
    state.status === "success" ? t.success : state.status === "error" ? t.errors[state.error] : "";

  return (
    // Re-mount after an error so fields are refilled with what was submitted.
    <form key={values ? JSON.stringify(values) : state.status} action={formAction} className={styles.form}>
      <div>
        <label htmlFor={`${id}-name`}>{t.fields.name} *</label>
        <input id={`${id}-name`} name="name" required autoComplete="name" maxLength={120} defaultValue={values?.name} />
      </div>
      <div>
        <label htmlFor={`${id}-phone`}>{t.fields.phone} *</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          dir="ltr"
          required
          autoComplete="tel"
          maxLength={30}
          defaultValue={values?.phone}
          aria-invalid={state.status === "error" && state.error === "phone"}
        />
      </div>
      <div className={styles.full}>
        <label htmlFor={`${id}-reason`}>{t.fields.reason}</label>
        <select id={`${id}-reason`} name="reason" defaultValue={values?.reason ?? contactReasons[0]}>
          {contactReasons.map((reason) => (
            <option key={reason} value={reason}>
              {t.reasons[reason]}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.full}>
        <label htmlFor={`${id}-message`}>{t.fields.message} *</label>
        <textarea id={`${id}-message`} name="message" required maxLength={4000} defaultValue={values?.message} />
      </div>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? t.sending : t.submit}
      </button>
      <p
        className={`${styles.status} ${state.status === "error" ? styles.error : ""}`}
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
};

export default ContactForm;
