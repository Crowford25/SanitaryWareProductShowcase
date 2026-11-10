"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowRightIcon, StarIcon } from "@phosphor-icons/react";
import heroImage from "../../../public/images/hero-bathroom.jpg";
import { motionHero, proof, site } from "@/lib/content";
import { easeOut, mix, prefersReducedMotion, scrub, viewportProgress } from "@/lib/motion";
import { Container } from "@/components/ui/Layout";
import MagneticLink from "@/components/motion/MagneticLink";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

type Tap = { id: number; x: number; y: number };

export default function MotionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [taps, setTaps] = useState<Tap[]>([]);
  const tapId = useRef(0);

  // The photo starts as an inset card and opens up to full width as you scroll.
  useEffect(() => {
    const frame = frameRef.current;
    const fig = figRef.current;
    const img = imgRef.current;
    if (!frame || !fig || !img) return;
    return scrub({
      measure: () => viewportProgress(frame, 1, 0.15),
      render: (p) => {
        const e = easeOut(p);
        fig.style.transform = `scale(${mix(0.86, 1, e)})`;
        img.style.transform = `translate3d(0, ${mix(-7, 0, e)}%, 0) scale(${mix(1.22, 1.04, e)})`;
      },
    });
  }, []);

  // Tap or click anywhere in the hero to drop a ripple.
  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    const id = ++tapId.current;
    setTaps((t) => [...t.slice(-4), { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
  };

  return (
    <section
      ref={sectionRef}
      onPointerDown={onPointerDown}
      aria-labelledby="motion-hero-title"
      className="relative overflow-x-clip bg-night pt-24 pb-16 text-on-night md:pb-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 lg:top-1/3 lg:left-3/4">
          {[0, 2400, 4800].map((d) => (
            <span
              key={d}
              className="ripple-ring top-0 left-0 size-[560px] lg:size-[880px]"
              style={{ ["--ring-delay" as string]: `${d}ms` } as CSSProperties}
            />
          ))}
        </div>
        {taps.map((t) => (
          <span
            key={t.id}
            className="ripple-ring ripple-tap size-[480px]"
            style={{ left: t.x, top: t.y }}
            onAnimationEnd={() => setTaps((all) => all.filter((x) => x.id !== t.id))}
          />
        ))}
      </div>

      <Container className="relative sm:pt-8 lg:pt-16">
        <h1 id="motion-hero-title" className="mt-6 max-w-[680px] heading-3 sm:heading-2 lg:heading-1">
          {motionHero.lines.map((line, i) => (
            <span key={line} className="-mb-2 block overflow-hidden pb-2">
              <span
                className="line-rise block w-fit bg-linear-to-r from-[#FFFFFF] to-[#9B9B9B] bg-clip-text text-transparent"
                style={delay(120 + i * 110)}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-enter mt-6 max-w-[680px] body-3 text-on-night-muted sm:body-7" style={delay(520)}>
          {motionHero.sub}
        </p>

        <div className="hero-enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={delay(620)}>
          <MagneticLink href="#book">
            {site.cta}
            <ArrowRightIcon aria-hidden="true" size={18} />
          </MagneticLink>
          <div className="flex items-center gap-2">
            <div className="flex text-brass" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} size={16} weight="fill" />
              ))}
            </div>
            <p className="caption-1 text-on-night">
              Rated {proof.rating} by {proof.reviews} homeowners
            </p>
          </div>
        </div>
      </Container>

      <Container className="relative">
        <div ref={frameRef} className="hero-enter mt-12 md:mt-16" style={delay(760)}>
          <figure
            ref={figRef}
            className="relative aspect-[4/5] origin-top overflow-hidden rounded-3xl bg-night-3 will-change-transform sm:aspect-[3/2] lg:aspect-[2/1]"
          >
            <div ref={imgRef} className="absolute inset-0 will-change-transform">
              <Image
                src={heroImage}
                alt="Finished Aurelia bathroom with a freestanding bath, wall hung WC, floating vanity and walk in shower"
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover object-[50%_55%]"
              />
            </div>
            <figcaption className="absolute right-4 bottom-4 left-4 flex flex-col gap-1 rounded-lg bg-night/80 px-3 py-2 backdrop-blur-md sm:right-auto">
              <span className="caption-3 text-on-night">Shown in matte black</span>
              <span className="caption-5 text-on-night-muted">Forma 01 bath, Linea 04 mixers, Senso 01 WC, Pioggia shower</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
