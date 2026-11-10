"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { collection, site } from "@/lib/content";
import { scrub, stickyProgress } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Container, SectionHeader } from "@/components/ui/Layout";
import { buttonClass } from "@/components/ui/ButtonLink";

/**
 * Desktop: the section pins and vertical scroll drives the row sideways,
 * with each photo drifting against the row for depth.
 * Phones, tablets and reduced motion: a native swipe row with snap points.
 */
export default function PinnedCollection() {
  const pinned = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!pinned || !section || !track || !bar) return;

    const photos = Array.from(track.querySelectorAll<HTMLElement>("[data-photo]"));
    let distance = 0;
    const size = () => {
      distance = Math.max(0, track.scrollWidth - track.clientWidth);
      section.style.height = `${window.innerHeight + distance}px`;
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(track);
    window.addEventListener("resize", size);

    const stop = scrub({
      measure: () => stickyProgress(section),
      smooth: 0.1,
      render: (p) => {
        track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
        bar.style.transform = `scaleX(${p})`;
        const vw = window.innerWidth;
        photos.forEach((photo) => {
          const r = photo.parentElement!.getBoundingClientRect();
          const offset = (r.left + r.width / 2) / vw - 0.5;
          photo.style.transform = `translate3d(${offset * -12}%, 0, 0) scale(1.2)`;
        });
      },
    });

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("resize", size);
      section.style.height = "";
      track.style.transform = "";
      photos.forEach((photo) => (photo.style.transform = ""));
    };
  }, [pinned]);

  return (
    <section id="collection" ref={sectionRef} aria-labelledby="m-collection-title" className="relative bg-night text-on-night">
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-x-clip" : "py-16 md:py-24"}>
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              id="m-collection-title"
              tone="dark"
              label="The collection"
              title="Five collections, one design language"
            />
            <p className="max-w-sm body-6 text-on-night-muted">
              Every metal piece comes in four finishes made in the same batch. {pinned ? "Keep scrolling to move through the range." : "Swipe to see the range."}
            </p>
          </div>

          <div aria-hidden="true" className="mt-8 h-0.5 w-full overflow-hidden rounded-full bg-night-4">
            <div
              ref={barRef}
              className="h-full w-full origin-left rounded-full bg-brass"
              style={pinned ? { transform: "scaleX(0)" } : undefined}
            />
          </div>

          <ul
            ref={trackRef}
            className={`mt-8 flex gap-4 ${
              pinned
                ? "will-change-transform"
                : "-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6"
            }`}
          >
            {collection.map((item, i) => (
              <li key={item.name} className="w-[80vw] max-w-[440px] shrink-0 snap-start">
                <article className="flex h-full flex-col rounded-3xl border border-night-4 bg-night-2 p-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-night-3">
                    <div data-photo className="absolute inset-0 will-change-transform">
                      <Image src={item.image} alt={item.alt} fill sizes="440px" className="object-cover" />
                    </div>
                    <span className="absolute top-3 left-3 rounded-sm bg-night/75 px-2 py-1 caption-3 text-on-night backdrop-blur-md">
                      {String(i + 1).padStart(2, "0")} / {String(collection.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="heading-6">{item.name}</h3>
                      <p className="caption-1 text-brass">{item.price}</p>
                    </div>
                    <p className="mt-2 body-6 text-on-night-muted">{item.detail}</p>
                  </div>
                </article>
              </li>
            ))}
            <li className="w-[80vw] max-w-[440px] shrink-0 snap-start">
              <div className="flex h-full min-h-80 flex-col justify-between rounded-3xl border border-brass/40 bg-night-2 p-6">
                <p className="heading-5">Not sure which pieces fit your room?</p>
                <div>
                  <p className="body-6 text-on-night-muted">
                    Bring a floor plan. We match the pieces, finishes and sizes in one 45 minute session.
                  </p>
                  <a href="#book" className={`${buttonClass("light")} mt-6`}>
                    {site.cta}
                    <ArrowRightIcon aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <p className="mt-4 caption-5 text-on-night-muted">Prices are for the base finish and include SST.</p>
        </Container>
      </div>
    </section>
  );
}
