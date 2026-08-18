"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true }); const [count, setCount] = useState(0);
  useEffect(() => { if (!inView) return; let frame = 0; if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { frame = requestAnimationFrame(() => setCount(value)); return () => cancelAnimationFrame(frame); } const start = performance.now(); const run = (t: number) => { const p = Math.min((t - start) / 1300, 1); setCount(Math.floor(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) frame = requestAnimationFrame(run); }; frame = requestAnimationFrame(run); return () => cancelAnimationFrame(frame); }, [inView, value]);
  return <div className="stat" ref={ref}><strong>{count}{suffix}</strong><span>{label}</span></div>;
}

export default function Statistics() { return <section className="statistics"><Stat value={25} suffix="+" label="Years of craftsmanship" /><Stat value={48} label="Countries supplied" /><Stat value={120} suffix="+" label="Design collections" /><Stat value={98} suffix="%" label="Recyclable packaging" /></section>; }
