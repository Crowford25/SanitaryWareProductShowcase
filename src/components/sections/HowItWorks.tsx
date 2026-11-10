import { ArrowRightIcon, CalendarCheckIcon, RulerIcon, WrenchIcon } from "@phosphor-icons/react/ssr";
import { site, steps } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";

const icons = { calendar: CalendarCheckIcon, ruler: RulerIcon, wrench: WrenchIcon };

export default function HowItWorks() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-paper py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            id="process-title"
            label="How it works"
            title="From first sketch to handover in three steps"
            description="Most clients go from first call to a signed off plan in under two weeks."
          />
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <Reveal as="li" key={step.title} delay={i * 80}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-ivory p-6">
                  <div className="flex items-center justify-between">
                    <span className="caption-3 uppercase tracking-widest text-muted">Step {String(i + 1).padStart(2, "0")}</span>
                    <span className="grid size-10 place-items-center rounded-full border border-line bg-paper text-ink">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                  </div>
                  <h3 className="mt-8 heading-6">{step.title}</h3>
                  <p className="mt-2 body-6 text-muted">{step.body}</p>
                </article>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="#book">
            {site.cta}
            <ArrowRightIcon aria-hidden="true" size={18} />
          </ButtonLink>
          <p className="caption-2 text-muted">Showroom visits in Bangsar, or video calls anywhere in Malaysia and Singapore.</p>
        </Reveal>
      </Container>
    </section>
  );
}
