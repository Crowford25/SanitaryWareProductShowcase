import { CheckIcon, ClockIcon, EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { reassurances, showroomLead, site } from "@/lib/content";
import { Container } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import ConsultationForm from "@/components/ui/ConsultationForm";

export default function FinalCta({ index }: { index?: string }) {
  return (
    <section id="book" aria-labelledby="book-title" className="bg-night py-16 text-on-night md:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="caption-3 uppercase tracking-widest text-on-night-muted">
            {index ? (
              <>
                <span className="text-brass">{index}</span>
                <span aria-hidden="true"> · </span>
              </>
            ) : null}
            Free consultation
          </p>
          <h2 id="book-title" className="mt-4 max-w-[520px] heading-4 md:heading-2">
            Plan your bathroom with us this week
          </h2>
          <p className="mt-6 max-w-[480px] body-3 text-on-night-muted md:body-7">
            Tell us a little about the room. {showroomLead.name} or someone from the Bangsar showroom team will call you
            within one working day to set a time, in person or on video.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {reassurances.map((r) => (
              <li key={r} className="flex items-center gap-3 body-2">
                <CheckIcon aria-hidden="true" size={16} weight="bold" className="shrink-0 text-brass" />
                {r}
              </li>
            ))}
          </ul>

          <address className="mt-12 flex flex-col gap-3 not-italic">
            <span className="flex items-center gap-2 caption-2 text-on-night-muted">
              <MapPinIcon aria-hidden="true" size={16} className="shrink-0" />
              {site.showroom}
            </span>
            <span className="flex items-center gap-2 caption-2 text-on-night-muted">
              <ClockIcon aria-hidden="true" size={16} className="shrink-0" />
              {site.hours}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="flex w-fit items-center gap-2 rounded-sm caption-2 text-on-night-muted transition-colors duration-300 ease-soft hover:text-on-night"
            >
              <EnvelopeSimpleIcon aria-hidden="true" size={16} className="shrink-0" />
              {site.email}
            </a>
          </address>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
          <ConsultationForm />
        </Reveal>
      </Container>
    </section>
  );
}
