"use client";

import { useEffect, useRef, useState } from "react";
import { tagline } from "@/lib/content";
import { Container } from "@/components/ui/Layout";

const words = tagline.split(" ");

/**
 * Words brighten one at a time, in reading order, as the block scrolls up
 * through the viewport. One passive scroll listener, throttled with
 * requestAnimationFrame, attached only while the section is on screen.
 * Reduced motion shows the final text straight away (see CSS below).
 */
export default function TaglineReveal() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the text top passes 80% of the viewport,
      // ends when the text bottom reaches 45%.
      const start = vh * 0.8;
      const distance = vh * 0.35 + rect.height;
      const progress = (start - rect.top) / distance;
      const next = Math.max(0, Math.min(words.length, Math.floor(progress * words.length)));
      setLit((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener("scroll", onScroll, { passive: true });
        listening = true;
        onScroll();
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("scroll", onScroll);
        listening = false;
        onScroll();
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="our-view" aria-label="Our view" className="bg-night py-24 text-on-night">
      <Container>
        <p className="caption-3 uppercase tracking-widest text-on-night-muted">Our view</p>
        <h2 ref={textRef} className="mt-6 max-w-[680px] heading-4 md:heading-2" aria-label={tagline}>
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              aria-hidden="true"
              className={`tagline-word transition-opacity duration-500 ease-soft ${
                i < lit ? "opacity-100" : "opacity-30"
              }`}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
