"use client";

import { useEffect, useRef } from "react";
import { logos } from "@/lib/content";
import { onScrollFrame, prefersReducedMotion } from "@/lib/motion";

/**
 * A marquee that drifts on its own and speeds up with your scroll,
 * reversing direction when you scroll back up. Runs only while visible.
 */
export default function VelocityMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    let x = 0;
    let boost = 0;
    let dir = -1;
    let raf = 0;
    let last = 0;
    let visible = false;
    let half = track.scrollWidth / 2;

    const ro = new ResizeObserver(() => (half = track.scrollWidth / 2));
    ro.observe(track);

    const loop = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      boost *= 0.94;
      x += dir * (0.035 + boost) * dt;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const offScroll = onScrollFrame((_, v) => {
      if (v === 0) return;
      dir = v > 0 ? -1 : 1;
      boost = Math.min(1.4, boost + Math.abs(v) * 0.003);
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(track);

    return () => {
      io.disconnect();
      ro.disconnect();
      offScroll();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {logos.map((logo) => (
        <li key={logo.name} className="flex items-center">
          <span className={`px-8 heading-5 whitespace-nowrap text-on-night/55 md:heading-4 ${logo.style}`}>{logo.name}</span>
          <span aria-hidden="true" className="size-2 rounded-full bg-brass/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="marquee-title" className="overflow-x-clip bg-night py-12 text-on-night">
      <h2 id="marquee-title" className="px-4 text-center caption-3 uppercase tracking-widest text-on-night-muted">
        Specified by designers and hotels across Southeast Asia
      </h2>
      <div className="mt-8 flex w-max will-change-transform" ref={trackRef}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
