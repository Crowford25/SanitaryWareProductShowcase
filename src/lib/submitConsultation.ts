import { site } from "@/lib/content";
import type { ConsultationRequest } from "@/lib/consultation";

/**
 * The site is a static export (GitHub Pages), so there is no server of our own.
 * If NEXT_PUBLIC_FORM_ENDPOINT is set at build time (for example a Formspree
 * form URL, from the FORM_ENDPOINT repository variable), requests are posted
 * there as JSON. Otherwise the visitor's email app opens with the request filled in.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/** "sent": delivered to the form service. "email": handed to the visitor's email app. */
export type Delivery = "sent" | "email";

export async function submitConsultation(data: ConsultationRequest): Promise<Delivery> {
  const subject = `Consultation request from ${data.name.trim()}`;

  if (FORM_ENDPOINT) {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, _subject: subject }),
    });
    if (!res.ok) throw new Error(`Form service responded with ${res.status}`);
    return "sent";
  }

  const body = [
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim()}`,
    `Project: ${data.project}`,
    `Meet: ${data.meeting}`,
    data.message.trim() ? `\n${data.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "email";
}
