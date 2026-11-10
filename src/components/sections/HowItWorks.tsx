import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { site, stepDeliverables, stepWhen, steps } from "@/lib/content";
import { Container, EditorialHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";

/** A dated timeline rather than three icon cards: what happens, and roughly when. */
export default function HowItWorks() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-paper py-16 md:py-24">
      <Container>
        <Reveal>
          <EditorialHeader
            index="04"
            label="How it works"
            id="process-title"
            title="From first sketch to handover in about five weeks"
            aside="Most clients go from first call to a signed off plan in under two weeks. The rest is making and delivering."
          />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-9 lg:col-start-4">
            <div aria-hidden="true" className="absolute inset-x-0 top-1 hidden h-px bg-line-strong md:block" />
            <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
              {steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 90} className="relative">
                  <span aria-hidden="true" className="block size-2.5 rounded-full bg-brass ring-4 ring-paper" />
                  <p className="mt-6 caption-3 uppercase tracking-widest text-brass-deep">{stepWhen[i]}</p>
                  <h3 className="mt-2 heading-6">{step.title}</h3>
                  <p className="mt-3 body-3 text-muted">{step.body}</p>
                  <p className="mt-4 caption-2 text-ink">{stepDeliverables[i].join(" · ")}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:col-span-9 lg:col-start-4">
            <ButtonLink href="#book">
              {site.cta}
              <ArrowRightIcon aria-hidden="true" size={18} />
            </ButtonLink>
            <p className="caption-2 text-muted">Showroom visits in Bangsar, or video calls anywhere in Malaysia and Singapore.</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
