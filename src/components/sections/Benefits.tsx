import Image from "next/image";
import { benefits, finishes, images, leadBenefit } from "@/lib/content";
import { Container, Rule } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

const items = [{ title: leadBenefit.title, body: leadBenefit.body, stat: null as string | null }, ...benefits];

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="bg-paper py-16 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Photo stays put on the left while the list scrolls past it. */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Reveal className="lg:sticky lg:top-24">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-line">
                <Image
                  src={images.brass}
                  alt="Two brushed brass Linea mixers and brass framed mirrors on a marble wall"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 caption-5 text-muted">
                <span className="caption-3 text-ink">Plate 02</span>
                <span className="text-right">Linea mixers in brushed brass, from the same batch as the shower set</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="caption-3 uppercase tracking-widest text-muted">
              <span className="text-brass-deep">02</span>
              <span aria-hidden="true"> · </span>
              Why one studio
            </p>
            <h2 id="benefits-title" className="mt-4 heading-4 md:heading-3">
              What changes when one team plans the whole room
            </h2>
          </Reveal>

          <ol className="mt-12">
            {items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 50}>
                <Rule />
                <div className="grid grid-cols-[40px_1fr] gap-4 py-6 md:grid-cols-[64px_1fr]">
                  <span className="pt-1 caption-3 tracking-widest text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="heading-6">{item.title}</h3>
                    <p className="mt-2 max-w-[520px] body-3 text-muted">{item.body}</p>
                    {i === 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="Available finishes">
                        {finishes.map((f) => (
                          <li key={f.name} className="flex items-center gap-2 caption-2 text-ink">
                            <span aria-hidden="true" className="size-3 rounded-full border border-ink/10" style={{ backgroundColor: f.color }} />
                            {f.name}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.stat ? <p className="mt-3 caption-1 text-brass-deep">{item.stat}</p> : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <Rule />
        </div>
      </Container>
    </section>
  );
}
