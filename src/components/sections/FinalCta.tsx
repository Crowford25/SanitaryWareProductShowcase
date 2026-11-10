import { CheckIcon, ClockIcon, EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { reassurances, site } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import ConsultationForm from "@/components/ui/ConsultationForm";

export default function FinalCta() {
  return (
    <section id="book" aria-labelledby="book-title" className="bg-night py-16 text-on-night md:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader
            id="book-title"
            tone="dark"
            label="Free consultation"
            title="Plan your bathroom with us this week"
            description="Tell us a little about the room. We will call within one working day to set a time at the Bangsar showroom or on video."
          />

          <ul className="mt-8 flex flex-col gap-3">
            {reassurances.map((r) => (
              <li key={r} className="flex items-center gap-3 body-2">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brass/20 text-brass">
                  <CheckIcon aria-hidden="true" size={14} weight="bold" />
                </span>
                {r}
              </li>
            ))}
          </ul>

          <address className="mt-12 grid gap-3 not-italic sm:grid-cols-2">
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

        <Reveal delay={120}>
          <ConsultationForm />
        </Reveal>
      </Container>
    </section>
  );
}
