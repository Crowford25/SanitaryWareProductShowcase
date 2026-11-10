import { QuotesIcon, StarIcon } from "@phosphor-icons/react/ssr";
import { stats, testimonials } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import Odometer from "@/components/motion/Odometer";
import CurtainImage from "@/components/motion/CurtainImage";

export default function MotionProof() {
  return (
    <section id="projects" aria-labelledby="m-projects-title" className="bg-night py-16 text-on-night md:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            id="m-projects-title"
            tone="dark"
            label="Projects"
            title="Homes and hotels we have fitted"
            description="From a single ensuite in Shah Alam to 46 guest bathrooms in Singapore, every room was planned, delivered and checked by the same team."
          />
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col-reverse rounded-3xl border border-night-4 bg-night-2 p-6">
              <dt className="mt-2 caption-2 text-on-night-muted">{s.label}</dt>
              <dd className="heading-4 md:heading-3">
                <Odometer value={s.value} delay={i * 120} />
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-3xl border border-night-4 bg-night-2 p-2">
                <CurtainImage
                  src={t.image}
                  alt={t.alt}
                  sizes="(min-width: 768px) 400px, 100vw"
                  delay={i * 140}
                  className="aspect-[4/3] rounded-2xl"
                >
                  <span className="absolute right-2 bottom-2 left-2 w-fit rounded-lg bg-night/80 px-2 py-1 caption-4 text-on-night backdrop-blur-md">
                    {t.project}
                  </span>
                </CurtainImage>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-brass" role="img" aria-label="Rated 5 out of 5">
                      {Array.from({ length: 5 }, (_, n) => (
                        <StarIcon key={n} aria-hidden="true" size={14} weight="fill" />
                      ))}
                    </div>
                    <QuotesIcon aria-hidden="true" size={22} weight="fill" className="text-night-4" />
                  </div>
                  <blockquote className="mt-3 body-3 text-on-night">
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-6">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-brass caption-3 text-night"
                    >
                      {t.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span className="flex flex-col">
                      <span className="title-4 text-on-night">{t.name}</span>
                      <span className="caption-5 text-on-night-muted">{t.role}</span>
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
