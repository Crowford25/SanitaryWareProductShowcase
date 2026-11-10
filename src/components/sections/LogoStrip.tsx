import { logos } from "@/lib/content";
import { Container } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

/** Written as a sentence, the way a studio would mention who it works with. */
export default function LogoStrip() {
  return (
    <section aria-labelledby="logos-title" className="pb-16 md:pb-24">
      <Container>
        <Reveal className="grid gap-4 lg:grid-cols-12 lg:gap-8">
          <h2 id="logos-title" className="caption-3 uppercase tracking-widest text-muted lg:col-span-3 lg:pt-1">
            Specified by
          </h2>
          <p className="max-w-[760px] title-1 text-muted lg:col-span-9">
            {logos.map((logo, i) => (
              <span key={logo.name}>
                <span className="text-ink">{logo.name}</span>
                {i < logos.length - 2 ? ", " : i === logos.length - 2 ? " and " : ""}
              </span>
            ))}
            , alongside a few hundred homeowners across the Klang Valley and Singapore.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
