"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRightIcon, CaretDownIcon, CheckCircleIcon, StorefrontIcon, VideoCameraIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { meetingTypes, projectTypes, validateConsultation, type ConsultationRequest, type FieldErrors } from "@/lib/consultation";
import { site } from "@/lib/content";
import { submitConsultation, type Delivery } from "@/lib/submitConsultation";
import { buttonClass } from "@/components/ui/ButtonLink";

type Status = "idle" | "submitting" | "success" | "error";

const empty: ConsultationRequest = {
  name: "",
  email: "",
  phone: "",
  project: "",
  meeting: meetingTypes[0],
  message: "",
};

const fieldOrder: (keyof ConsultationRequest)[] = ["name", "email", "phone", "project", "meeting", "message"];

const inputBase =
  "w-full rounded-xl border bg-night-3 py-3 pl-3 body-3 placeholder:text-on-night-muted/70 transition-colors duration-300 ease-soft hover:border-on-night-muted/60 disabled:opacity-60";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 caption-2 text-danger-on-night">
      <WarningCircleIcon aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

export default function ConsultationForm() {
  const [values, setValues] = useState<ConsultationRequest>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [delivery, setDelivery] = useState<Delivery>("sent");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof ConsultationRequest, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first submit attempt, clear or update errors as the visitor types.
    if (attempted) setErrors(validateConsultation(next));
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = fieldOrder.find((k) => errs[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const errs = validateConsultation(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }

    setStatus("submitting");
    try {
      setDelivery(await submitConsultation(values));
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setAttempted(false);
    setStatus("idle");
  };

  const border = (key: keyof ConsultationRequest) =>
    errors[key] ? "border-danger-on-night" : "border-night-4";

  const describedBy = (key: keyof ConsultationRequest, hint?: string) =>
    [errors[key] ? `${key}-error` : null, hint].filter(Boolean).join(" ") || undefined;

  if (status === "success") {
    const firstName = values.name.trim().split(" ")[0];
    const isVideo = values.meeting === "Video call";
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-96 flex-col items-start justify-center rounded-3xl border border-night-4 bg-night-2 p-6 outline-none md:p-8"
      >
        <span className="grid size-12 place-items-center rounded-full bg-brass/15 text-brass">
          <CheckCircleIcon aria-hidden="true" size={28} weight="fill" />
        </span>
        {delivery === "sent" ? (
          <>
            <h3 className="mt-6 heading-5">Request received, {firstName}</h3>
            <p className="mt-3 body-6 text-on-night-muted">
              We will call {values.phone.trim()} within one working day to confirm a time for your{" "}
              {isVideo ? "video consultation" : "showroom visit in Bangsar"}. If the time does not suit you, reply to our
              call or email {site.email}.
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-6 heading-5">One last step, {firstName}</h3>
            <p className="mt-3 body-6 text-on-night-muted">
              Your email app should have opened with your request filled in. Send that email and we will call{" "}
              {values.phone.trim()} within one working day to set a time for your{" "}
              {isVideo ? "video consultation" : "showroom visit in Bangsar"}. If nothing opened, write to {site.email}.
            </p>
          </>
        )}
        <button type="button" onClick={reset} className={`${buttonClass("outline", "sm")} mt-8 border-night-4 text-on-night hover:bg-night-3`}>
          Send another request
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="form-title"
      className="rounded-3xl border border-night-4 bg-night-2 p-6 md:p-8"
    >
      <h3 id="form-title" className="heading-6">
        Request your consultation
      </h3>
      <p className="mt-1 body-6 text-on-night-muted">Takes about a minute. Fields marked optional can be left empty.</p>

      <fieldset disabled={submitting} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="title-4">
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder="Aisyah Rahman"
            className={`mt-2 pr-3 text-on-night ${inputBase} ${border("name")}`}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="title-4">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder="you@example.com"
            className={`mt-2 pr-3 text-on-night ${inputBase} ${border("email")}`}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="title-4">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            placeholder="+60 12 345 6789"
            className={`mt-2 pr-3 text-on-night ${inputBase} ${border("phone")}`}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="project" className="title-4">
            Your project
          </label>
          <div className="relative mt-2">
            <select
              id="project"
              name="project"
              value={values.project}
              onChange={(e) => set("project", e.target.value)}
              aria-invalid={Boolean(errors.project)}
              aria-describedby={describedBy("project")}
              className={`appearance-none pr-10 ${inputBase} ${border("project")} ${
                values.project ? "text-on-night" : "text-on-night-muted"
              }`}
            >
              <option value="" disabled>
                Choose one
              </option>
              {projectTypes.map((p) => (
                <option key={p} value={p} className="text-ink">
                  {p}
                </option>
              ))}
            </select>
            <CaretDownIcon
              aria-hidden="true"
              size={16}
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-night-muted"
            />
          </div>
          <FieldError id="project-error" message={errors.project} />
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={describedBy("meeting")}>
          <legend className="title-4">Where would you like to meet?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {meetingTypes.map((m) => {
              const Icon = m === "Video call" ? VideoCameraIcon : StorefrontIcon;
              return (
                <label
                  key={m}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-night-4 bg-night-3 px-3 py-3 body-5 text-on-night-muted transition-colors duration-300 ease-soft hover:border-on-night-muted/60 has-checked:border-brass has-checked:text-on-night has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brass"
                >
                  <input
                    type="radio"
                    name="meeting"
                    value={m}
                    checked={values.meeting === m}
                    onChange={(e) => set("meeting", e.target.value)}
                    className="sr-only"
                  />
                  <Icon aria-hidden="true" size={18} className="shrink-0" />
                  {m}
                </label>
              );
            })}
          </div>
          <FieldError id="meeting-error" message={errors.meeting} />
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="title-4">
            About the room <span className="body-6 text-on-night-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            placeholder="Size, what you want to keep, your timing"
            className={`mt-2 resize-y pr-3 text-on-night ${inputBase} ${border("message")}`}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </fieldset>

      {status === "error" ? (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-danger-on-night/40 bg-danger/15 p-3 body-6 text-on-night">
          <WarningCircleIcon aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-danger-on-night" />
          <p>
            We could not send your request. Check your connection and try again, or email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        aria-live="polite"
        className={`${buttonClass("light")} mt-6 w-full ${submitting ? "animate-pulse" : ""}`}
      >
        {submitting ? "Sending your request" : site.cta}
        {submitting ? null : <ArrowRightIcon aria-hidden="true" size={18} />}
      </button>
      <p className="mt-3 caption-5 text-on-night-muted">
        We only use your details to arrange the consultation. Read our{" "}
        <Link href="/privacy" className="underline underline-offset-4 transition-colors duration-300 ease-soft hover:text-on-night">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
