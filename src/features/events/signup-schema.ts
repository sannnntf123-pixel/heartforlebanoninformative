export type SignupError =
  | "required"
  | "phone"
  | "email"
  | "attendees"
  | "full"
  | "closed"
  | "unknown";

export type SignupFields = {
  name: string;
  phone: string;
  email: string;
  attendees: number;
  notes: string;
};

export type SignupState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: SignupError; values: SignupFields };

export const MAX_ATTENDEES = 10;
