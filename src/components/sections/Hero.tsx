import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRightIcon, StarIcon } from "@phosphor-icons/react/ssr";
import heroImage from "../../../public/images/hero-bathroom.jpg";
import { proof, site } from "@/lib/content";
import { Container } from "@/components/ui/Layout";
import ButtonLink from "@/components/ui/ButtonLink";

const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-24 pb-16 md:pb-24">
      <Container className="sm:pt-8 lg:pt-16">
        <p
          className="hero-enter inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 caption-4 text-muted"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brass" />
          Bathroom suites for homes in Malaysia and Singapore
        </p>

        <h1
          id="hero-title"
          className="hero-enter mt-6 w-fit max-w-[680px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text pb-2 heading-4 text-transparent sm:heading-2 lg:heading-1"
          style={enterDelay(80)}
        >
          Your whole bathroom,
          <br />
          planned as one suite
        </h1>

        <p
          className="hero-enter mt-4 max-w-[680px] body-3 text-muted sm:body-7"
          style={enterDelay(160)}
        >
          Basins, mixers, baths, WCs and showers designed to match. We plan every piece around your floor plan
          and give your contractor the fitting drawings, so it all goes in right the first time.
        </p>

        <div
          className="hero-enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
          style={enterDelay(240)}
        >
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
        <p
          className="hero-enter mt-3 caption-5 text-muted"
          style={enterDelay(240)}
        >
          45 minutes, at the showroom or on video. No obligation.
        </p>

        <figure
          className="hero-enter relative mt-12 aspect-[4/5] overflow-hidden rounded-3xl bg-line sm:aspect-[3/2] md:mt-16 lg:aspect-[2/1]"
          style={enterDelay(320)}
        >
          <Image
            src={heroImage}
            alt="Finished Aurelia bathroom with a freestanding bath, wall hung WC, floating vanity and walk in shower"
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-[50%_55%]"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 rounded-lg bg-paper/90 px-3 py-2 backdrop-blur-md sm:right-auto">
            <span className="caption-3 text-ink">Shown in matte black</span>
            <span className="caption-5 text-muted">Forma 01 bath, Linea 04 mixers, Senso 01 WC, Pioggia shower</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
