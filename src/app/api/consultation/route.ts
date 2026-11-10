import { validateConsultation, type ConsultationRequest } from "@/lib/consultation";

/**
 * Prototype endpoint: validates the request and returns a reference.
 * Connect this to the CRM or booking system before launch.
 */
export async function POST(request: Request) {
  let body: Partial<ConsultationRequest>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The request body must be JSON." }, { status: 400 });
  }

  const data: ConsultationRequest = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    project: String(body.project ?? ""),
    meeting: String(body.meeting ?? ""),
    message: String(body.message ?? ""),
  };

  const errors = validateConsultation(data);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  const reference = `AB${Math.floor(10000 + Math.random() * 89999)}`;
  return Response.json({ ok: true, reference }, { status: 201 });
}
