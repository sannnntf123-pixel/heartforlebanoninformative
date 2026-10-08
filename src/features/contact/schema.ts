export const contactReasons = ["donating", "volunteering", "help", "partnership", "other"] as const;
export type ContactReason = (typeof contactReasons)[number];

export type ContactFields = {
  name: string;
  phone: string;
  reason: ContactReason;
  message: string;
};

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: "required" | "phone"; values: ContactFields };

export const isContactReason = (value: string): value is ContactReason =>
  (contactReasons as readonly string[]).includes(value);
