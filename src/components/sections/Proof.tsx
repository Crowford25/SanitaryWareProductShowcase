import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react/ssr";
import { stats, testimonials } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

export default function Proof() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            id="projects-title"
            label="Projects"
            title="Homes and hotels we have fitted"
            description="From a single ensuite in Shah Alam to 46 guest bathrooms in Singapore, every room was planned, delivered and checked by the same team."
          />
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="flex flex-col-reverse rounded-2xl border border-line bg-paper p-6">
              <dt className="mt-2 caption-2 text-muted">{s.label}</dt>
              <dd className="heading-5 md:heading-3">{s.value}</dd>
            </Reveal>
          ))}
        </dl>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-line">
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 right-2 w-fit rounded-sm bg-paper/90 px-2 py-1 caption-4 text-ink backdrop-blur-md">
                    {t.project}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex text-brass" role="img" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }, (_, n) => (
                      <StarIcon key={n} aria-hidden="true" size={14} weight="fill" />
                    ))}
                  </div>
                  <blockquote className="mt-3 body-3 text-ink">
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-6">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-ink caption-3 text-ivory"
                    >
                      {t.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span className="flex flex-col">
                      <span className="title-4 text-ink">{t.name}</span>
                      <span className="caption-5 text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
