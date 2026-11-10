import Image from "next/image";
import { collection } from "@/lib/content";
import { Container, EditorialHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

/**
 * Laid out like a catalogue spread: one large plate, the rest smaller and
 * deliberately staggered, each with a plain caption instead of a card.
 */
const layout = [
  { item: 2, span: "md:col-span-7", aspect: "aspect-[4/3]", offset: "", sizes: "(min-width: 768px) 60vw, 100vw" },
  { item: 0, span: "md:col-span-4 md:col-start-9", aspect: "aspect-[3/4]", offset: "md:mt-24", sizes: "(min-width: 768px) 35vw, 100vw" },
  { item: 1, span: "md:col-span-4", aspect: "aspect-[4/5]", offset: "", sizes: "(min-width: 768px) 33vw, 100vw" },
  { item: 3, span: "md:col-span-4", aspect: "aspect-[4/5]", offset: "md:mt-16", sizes: "(min-width: 768px) 33vw, 100vw" },
  { item: 4, span: "md:col-span-4", aspect: "aspect-[4/5]", offset: "md:mt-8", sizes: "(min-width: 768px) 33vw, 100vw" },
];

export default function Collection() {
  return (
    <section id="collection" aria-labelledby="collection-title" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <EditorialHeader
            index="03"
            label="The collection"
            id="collection-title"
            title="Five collections, one design language"
            aside="Every metal piece comes in chrome, brushed brass, matte black or brushed nickel, made in the same batch so the finishes match across the room."
          />
        </Reveal>

        <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-12">
          {layout.map(({ item, span, aspect, offset, sizes }, i) => {
            const c = collection[item];
            return (
              <Reveal as="li" key={c.name} delay={(i % 3) * 70} className={`${span} ${offset}`}>
                <figure className="group">
                  <div className={`relative overflow-hidden rounded-lg bg-line ${aspect}`}>
                    <Image
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes={sizes}
                      className="motion-move object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="title-2">
                        <span className="mr-2 caption-3 text-brass-deep">{String(i + 1).padStart(2, "0")}</span>
                        {c.name}
                      </h3>
                      <p className="shrink-0 caption-1 text-muted">{c.price}</p>
                    </div>
                    <p className="mt-1 max-w-[420px] body-6 text-muted">{c.detail}</p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-12 caption-5 text-muted md:text-right">
          Prices are for the base finish and include SST. Your consultation quote covers the exact pieces for your room.
        </p>
      </Container>
    </section>
  );
}
