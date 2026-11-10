/** Shared by the form (client) and the API route (server). */

export const projectTypes = [
  "Renovating a bathroom",
  "Building a new home",
  "Interior designer or architect",
  "Hotel or commercial project",
] as const;

export const meetingTypes = ["Showroom in Bangsar", "Video call"] as const;

export type ConsultationRequest = {
  name: string;
  email: string;
  phone: string;
  project: string;
  meeting: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ConsultationRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateConsultation(data: ConsultationRequest): FieldErrors {
  const errors: FieldErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const digits = data.phone.replace(/[\s()+.-]/g, "");

  if (!name) errors.name = "Enter your name so we know who to ask for.";
  else if (name.length < 2) errors.name = "Enter your full name.";

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(email)) errors.email = "Enter an email in the format name@example.com.";

  if (!digits) errors.phone = "Enter a phone number so we can confirm a time.";
  else if (!/^\d{8,15}$/.test(digits)) errors.phone = "Enter a phone number with 8 to 15 digits, for example +60 12 345 6789.";

  if (!projectTypes.includes(data.project as (typeof projectTypes)[number]))
    errors.project = "Choose the option that best describes your project.";

  if (!meetingTypes.includes(data.meeting as (typeof meetingTypes)[number]))
    errors.meeting = "Choose the showroom or a video call.";

  if (data.message.length > 1200) errors.message = "Keep your note under 1,200 characters.";

  return errors;
}
