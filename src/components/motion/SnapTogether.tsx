"use client";

import { useEffect, useRef } from "react";
import { BathtubIcon, DropHalfBottomIcon, PipeIcon, ShowerIcon, ToiletIcon } from "@phosphor-icons/react";
import { pains, snapCopy, snapParts } from "@/lib/content";
import { easeOut, mix, range, scrub, stickyProgress } from "@/lib/motion";
import { Container } from "@/components/ui/Layout";

const icons = { basin: DropHalfBottomIcon, mixer: PipeIcon, bath: BathtubIcon, wc: ToiletIcon, shower: ShowerIcon };
const MATCHED = "#b08d57";

/**
 * Pinned while you scroll through it: five mismatched pieces from five suppliers
 * drift into one aligned, brass matched suite, and the story flips from problem to fix.
 */
export default function SnapTogether() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q = <T extends HTMLElement>(sel: string) => Array.from(section.querySelectorAll<T>(sel));
    const tiles = q<HTMLElement>("[data-tile]");
    const tintsA = q<HTMLElement>(".scrub-tint-a");
    const tintsB = q<HTMLElement>(".scrub-tint-b");
    const [before, after] = q<HTMLElement>("[data-copy]");
    const bar = section.querySelector<HTMLElement>("[data-bar]");

    return scrub({
      measure: () => stickyProgress(section),
      smooth: 0.12,
      render: (p) => {
        const t = easeOut(range(p, 0.06, 0.6));
        // Smaller scatter on phones so the pieces never cover the copy above them.
        const k = window.innerWidth < 640 ? 0.5 : 1;
        tiles.forEach((tile, i) => {
          const f = snapParts[i].from;
          tile.style.transform = `translate3d(${mix(f.x * k, 0, t)}%, ${mix(f.y * k, 0, t)}%, 0) rotate(${mix(f.r, 0, t)}deg) scale(${mix(f.s, 1, t)})`;
        });
        const tint = range(p, 0.48, 0.68);
        tintsA.forEach((el) => (el.style.opacity = String(1 - tint)));
        tintsB.forEach((el) => (el.style.opacity = String(tint)));

        const a = range(p, 0.36, 0.5);
        const b = range(p, 0.46, 0.62);
        if (before) {
          before.style.opacity = String(1 - a);
          before.style.transform = `translate3d(0, ${-24 * easeOut(a)}px, 0)`;
        }
        if (after) {
          after.style.opacity = String(b);
          after.style.transform = `translate3d(0, ${24 * (1 - easeOut(b))}px, 0)`;
        }
        if (bar) bar.style.transform = `scaleX(${p})`;
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="snap-title"
      className="scrub-section relative h-[240svh] bg-coal text-on-night lg:h-[280svh]"
    >
      <div className="scrub-sticky sticky top-0 flex h-svh items-center overflow-x-clip">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="scrub-stack grid">
            <div data-copy className="[grid-area:1/1]">
              <p className="caption-3 uppercase tracking-widest text-on-night-muted">{snapCopy.before.label}</p>
              <h2 id="snap-title" className="mt-3 max-w-[680px] heading-4 md:heading-2">
                {snapCopy.before.title}
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {pains.map((pain) => (
                  <li key={pain} className="flex items-start gap-3 body-3 text-on-night-muted">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-danger-on-night" />
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
            <div data-copy className="opacity-0 [grid-area:1/1]">
              <p className="caption-3 uppercase tracking-widest text-brass">{snapCopy.after.label}</p>
              <p className="mt-3 max-w-[680px] heading-4 md:heading-2">{snapCopy.after.title}</p>
              <p className="mt-6 max-w-[680px] body-3 text-on-night-muted md:body-7">{snapCopy.after.body}</p>
            </div>
          </div>

          <div>
            <ul className="grid grid-cols-5 gap-2 sm:gap-3" aria-label="The five pieces of a bathroom">
              {snapParts.map((part) => {
                const Icon = icons[part.icon];
                return (
                  <li key={part.name} data-tile className="will-change-transform">
                    <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-night-4 bg-night-2 p-2 sm:gap-3">
                      <Icon aria-hidden="true" size={28} className="size-5 text-on-night sm:size-7" />
                      <span className="caption-4 text-on-night sm:title-4">{part.name}</span>
                      <span aria-hidden="true" className="relative size-3 sm:size-4">
                        <span className="scrub-tint-a absolute inset-0 rounded-full" style={{ backgroundColor: part.tint }} />
                        <span
                          className="scrub-tint-b absolute inset-0 rounded-full opacity-0"
                          style={{ backgroundColor: MATCHED }}
                        />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 grid">
              <p className="scrub-tint-a caption-2 text-on-night-muted [grid-area:1/1]">
                {snapCopy.before.caption}
              </p>
              <p className="scrub-tint-b caption-2 text-brass opacity-0 [grid-area:1/1]">
                {snapCopy.after.caption}
              </p>
            </div>
            <div aria-hidden="true" className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-night-4">
              <div data-bar className="h-full w-full origin-left rounded-full bg-brass" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
