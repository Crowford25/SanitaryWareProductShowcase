import Image from "next/image";
import { collection, finishes } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

// Two wide cards, then three narrow ones on large screens.
const spans = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "md:col-span-2 lg:col-span-2",
];

export default function Collection() {
  return (
    <section id="collection" aria-labelledby="collection-title" className="py-16 md:py-24">
      <Container>
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="collection-title"
            label="The collection"
            title="Five collections, one design language"
            description="Every metal piece comes in four finishes made in the same batch, so the mixer, shower and rail on your wall are an exact match."
          />
          <ul className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end" aria-label="Metal finishes">
            {finishes.map((f) => (
              <li
                key={f.name}
                className="flex items-center gap-2 rounded-full border border-line bg-paper py-1 pr-3 pl-1 caption-4 text-ink"
              >
                <span
                  aria-hidden="true"
                  className="size-4 rounded-full border border-ink/10"
                  style={{ backgroundColor: f.color }}
                />
                {f.name}
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {collection.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 3) * 60} className={spans[i]}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-2">
                <div
                  className={`relative overflow-hidden rounded-lg bg-line ${
                    i < 2 ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={i < 2 ? "(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
                    className="motion-move object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="heading-6">{item.name}</h3>
                    <p className="caption-1 text-muted">{item.price}</p>
                  </div>
                  <p className="mt-2 body-6 text-muted">{item.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 caption-5 text-muted">
          Prices are for the base finish and include SST. Your consultation quote covers the exact pieces for your room.
        </p>
      </Container>
    </section>
  );
}
