"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const DIGITS = "0123456789".split("");

/**
 * Each digit is a column 0 to 9 that rolls to its value when the number scrolls into view.
 * The server renders the final value, so it reads correctly without JavaScript.
 */
export default function Odometer({ value, delay = 0, className = "" }: { value: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.dataset.odo = "zero";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Two frames so the zeroed position paints before the roll starts.
        requestAnimationFrame(() => requestAnimationFrame(() => delete el.dataset.odo));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Stagger index counts digits only, so separators do not add delay.
  const chars = value.split("").map((ch, i, all) => ({
    ch,
    digitIndex: all.slice(0, i).filter((c) => /\d/.test(c)).length,
  }));

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex whitespace-pre">
        {chars.map(({ ch, digitIndex }, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
          const style = { "--d": Number(ch), "--odo-delay": `${delay + digitIndex * 90}ms` } as CSSProperties;
          return (
            // The invisible final digit sets the column width, so "1" stays narrow.
            <span key={i} className="relative inline-block h-9 overflow-hidden md:h-10">
              <span className="invisible">{ch}</span>
              <span className="odo-col absolute inset-x-0 top-0 block text-center" style={style}>
                {DIGITS.map((n) => (
                  <span key={n} className="block h-9 md:h-10">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
