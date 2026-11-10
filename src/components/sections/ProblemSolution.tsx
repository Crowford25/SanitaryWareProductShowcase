import { CheckIcon, XIcon } from "@phosphor-icons/react/ssr";
import { images, pains } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";

export default function ProblemSolution() {
  return (
    <section aria-labelledby="why-title" className="py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader
            id="why-title"
            label="The usual way"
            title="Most bathrooms are pieced together from five suppliers"
            description="The basin comes from one shop, the mixer from another, the shower set from a third. Nobody owns the whole room, so the small things slip."
          />

          <ul className="mt-8 flex flex-col gap-3">
            {pains.map((pain) => (
              <li key={pain} className="flex items-start gap-3 body-3 text-ink">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-danger/10 text-danger">
                  <XIcon aria-hidden="true" size={12} weight="bold" />
                </span>
                {pain}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
            <p className="flex items-center gap-2 caption-3 uppercase tracking-widest text-brass-deep">
              <CheckIcon aria-hidden="true" size={14} weight="bold" />
              The Aurelia way
            </p>
            <p className="mt-3 body-2 text-ink">
              We plan every piece together, from the first sketch to the handover check, and stay accountable for how
              the whole room fits.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <BeforeAfter
            before={{
              src: images.before,
              alt: "Dated bathroom with a pedestal basin, a plain mirror and mismatched fittings",
              label: "Pieced together",
            }}
            after={{
              src: images.after,
              alt: "Bright bathroom with a freestanding bath and vessel basin in one matched finish",
              label: "Planned as one suite",
            }}
          />
          <p className="mt-3 caption-5 text-muted">Drag the handle, or focus it and use the arrow keys, to compare.</p>
        </Reveal>
      </Container>
    </section>
  );
}
