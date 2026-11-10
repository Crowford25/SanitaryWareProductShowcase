import Image from "next/image";
import { stats, testimonials } from "@/lib/content";
import { Container, EditorialHeader, Rule } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

/** One quote given room to breathe, then the numbers, then two shorter voices. */
export default function Proof() {
  const [featured, ...others] = testimonials;

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <EditorialHeader index="05" label="Projects" id="projects-title" title="Homes and hotels we have fitted" />
        </Reveal>

        <div className="mt-12 grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-line">
                <Image src={featured.image} alt={featured.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 caption-5 text-muted">
                <span className="caption-3 text-ink">Plate 03</span>
                <span className="text-right">{featured.project}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7 lg:pb-16">
            <figure>
              <span aria-hidden="true" className="block heading-1 text-brass">
                &ldquo;
              </span>
              <blockquote className="heading-5 md:heading-4">
                <p>{featured.quote}</p>
              </blockquote>
              <figcaption className="mt-8">
                <p className="title-3 text-ink">{featured.name}</p>
                <p className="caption-2 text-muted">{featured.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <Rule />
          <dl className="grid grid-cols-2 gap-8 pt-6 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 caption-2 text-muted">{s.label}</dt>
                <dd className="heading-4 md:heading-3">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ul className="mt-16 grid gap-12 md:grid-cols-2 md:gap-8">
          {others.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 90}>
              <Rule />
              <figure className="pt-6">
                <blockquote className="body-7 text-ink">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-line">
                    <Image src={t.image} alt={t.alt} fill sizes="96px" className="object-cover" />
                  </span>
                  <span className="flex flex-col">
                    <span className="title-4 text-ink">{t.name}</span>
                    <span className="caption-5 text-muted">
                      {t.role}. {t.project}.
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
