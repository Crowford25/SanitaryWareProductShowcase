"use client";

import { useEffect, useRef } from "react";
import { ArrowRightIcon, CalendarCheckIcon, RulerIcon, WrenchIcon } from "@phosphor-icons/react";
import { site, stepDeliverables, steps } from "@/lib/content";
import { clamp, onScrollFrame, prefersReducedMotion } from "@/lib/motion";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import MagneticLink from "@/components/motion/MagneticLink";

const icons = { calendar: CalendarCheckIcon, ruler: RulerIcon, wrench: WrenchIcon };
const STICK_TOP = 96;
const STICK_STEP = 24;

/** Each step pins under the last one; the cards beneath shrink back and dim as the next slides over. */
export default function StackedSteps() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step-item]"));
    const cards = items.map((li) => li.querySelector<HTMLElement>("[data-step-card]")!);
    const shades = items.map((li) => li.querySelector<HTMLElement>("[data-step-shade]")!);

    const off = onScrollFrame(() => {
      cards.forEach((card, i) => {
        const next = items[i + 1];
        if (!next) return;
        const h = card.offsetHeight;
        const stick = STICK_TOP + i * STICK_STEP;
        const covered = clamp((stick + h - next.getBoundingClientRect().top) / h);
        const depth = items.length - 1 - i;
        card.style.transform = `scale(${1 - covered * 0.05 * depth})`;
        // Dim with an opaque shade layer so the card underneath never shows through.
        shades[i].style.opacity = String(covered * 0.6);
      });
    });
    return () => {
      off();
      cards.forEach((c) => (c.style.transform = ""));
      shades.forEach((s) => (s.style.opacity = "0"));
    };
  }, []);

  return (
    <section id="process" aria-labelledby="m-process-title" className="bg-coal py-16 text-on-night md:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            id="m-process-title"
            tone="dark"
            label="How it works"
            title="From first sketch to handover in three steps"
            description="Most clients go from first call to a signed off plan in under two weeks."
          />
        </Reveal>

        <ol ref={listRef} className="mt-12 flex flex-col gap-6">
          {steps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <li key={step.title} data-step-item className="sticky" style={{ top: STICK_TOP + i * STICK_STEP }}>
                <article
                  data-step-card
                  className="relative grid origin-top gap-6 overflow-hidden rounded-3xl border border-night-4 bg-night-2 p-6 will-change-transform md:min-h-80 md:grid-cols-[1fr_2fr] md:gap-12 md:p-10"
                >
                  <div data-step-shade aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-night opacity-0" />
                  <div className="flex items-start justify-between md:flex-col">
                    <span className="heading-2 text-brass md:heading-1">{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid size-12 place-items-center rounded-full border border-night-4 bg-night-3">
                      <Icon aria-hidden="true" size={22} />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="heading-5 md:heading-4">{step.title}</h3>
                    <p className="mt-3 max-w-[680px] body-3 text-on-night-muted md:body-7">{step.body}</p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                      {stepDeliverables[i].map((d) => (
                        <li key={d} className="rounded-full border border-night-4 bg-night-3 px-3 py-1 caption-4 text-on-night">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <MagneticLink href="#book">
            {site.cta}
            <ArrowRightIcon aria-hidden="true" size={18} />
          </MagneticLink>
          <p className="caption-2 text-on-night-muted">Showroom visits in Bangsar, or video calls anywhere in Malaysia and Singapore.</p>
        </Reveal>
      </Container>
    </section>
  );
}
