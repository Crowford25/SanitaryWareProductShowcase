import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRightIcon, StarIcon } from "@phosphor-icons/react/ssr";
import heroImage from "../../../public/images/hero-bathroom.jpg";
import { proof, site } from "@/lib/content";
import { Container, Rule } from "@/components/ui/Layout";
import ButtonLink from "@/components/ui/ButtonLink";

const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

const facts = [
  { value: "3 working days", label: "from consultation to your full plan and quote" },
  { value: "1 delivery", label: "every piece arrives on site together" },
  { value: "15 years", label: "warranty on ceramics and solid surface" },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-24 pb-16 md:pb-24">
      <Container className="sm:pt-8 lg:pt-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy sits low and left; the photo runs taller on the right. */}
          <div className="flex flex-col justify-end lg:col-span-7 lg:pb-16">
            <h1
              id="hero-title"
              className="hero-enter w-fit max-w-[680px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text pb-2 heading-4 text-transparent sm:heading-2 lg:heading-1"
              style={enterDelay(80)}
            >
              Your whole bathroom,
              <br />
              planned as one suite
            </h1>

            <p className="hero-enter mt-6 max-w-[520px] body-3 text-muted sm:body-7" style={enterDelay(160)}>
              Basins, mixers, baths, WCs and showers designed to match. We plan every piece around your floor plan and
              give your contractor the fitting drawings, so it all goes in right the first time.
            </p>

            <div className="hero-enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={enterDelay(240)}>
              <ButtonLink href="#book">
                {site.cta}
                <ArrowRightIcon aria-hidden="true" size={18} />
              </ButtonLink>
              <div className="flex items-center gap-2">
                <div className="flex text-brass" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} size={16} weight="fill" />
                  ))}
                </div>
                <p className="caption-1 text-ink">
                  Rated {proof.rating} by {proof.reviews} homeowners
                </p>
              </div>
            </div>
          </div>

          <figure className="hero-enter relative lg:col-span-5" style={enterDelay(320)}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-line">
              <Image
                src={heroImage}
                alt="Finished Aurelia bathroom with a freestanding bath, wall hung WC, floating vanity and walk in shower"
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>

            {/* Detail plate: a close crop of the same room, overlapping the corner like a pinned print. */}
            <div className="absolute bottom-12 -left-12 hidden w-40 rotate-[-3deg] overflow-hidden rounded-md bg-line shadow-[0_16px_40px_rgba(27,26,23,0.18)] ring-4 ring-ivory lg:block">
              <div className="relative aspect-square">
                <Image
                  src={heroImage}
                  alt="Close up of the matte black wall spout over the vessel basin"
                  fill
                  sizes="320px"
                  className="object-cover"
                  style={{ transform: "scale(2.6)", transformOrigin: "97% 62%" }}
                />
              </div>
            </div>

            <figcaption className="mt-3 flex items-baseline justify-between gap-4 caption-5 text-muted">
              <span className="caption-3 text-ink">Plate 01</span>
              <span className="text-right">Matte black suite, Damansara Heights residence</span>
            </figcaption>
          </figure>
        </div>

        <div className="hero-enter mt-16" style={enterDelay(400)}>
          <Rule />
          <dl className="grid gap-6 pt-6 sm:grid-cols-3 sm:gap-8">
            {facts.map((f) => (
              <div key={f.value} className="flex flex-col-reverse">
                <dt className="mt-1 caption-2 text-muted">{f.label}</dt>
                <dd className="heading-6">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
