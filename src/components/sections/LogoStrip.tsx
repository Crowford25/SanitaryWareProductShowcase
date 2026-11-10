import { logos } from "@/lib/content";
import { Container } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

export default function LogoStrip() {
  return (
    <section aria-labelledby="logos-title" className="pb-16 md:pb-24">
      <Container>
        <Reveal className="rounded-3xl border border-line px-4 py-8 md:px-8">
          <h2 id="logos-title" className="text-center caption-3 uppercase tracking-widest text-muted">
            Specified by designers and hotels across Southeast Asia
          </h2>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((logo) => (
              <li key={logo.name} className={`title-2 text-ink/55 ${logo.style}`}>
                {logo.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
