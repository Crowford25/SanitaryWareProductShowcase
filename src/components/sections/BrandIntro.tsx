"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const copy = "Bathroom spaces should feel less like rooms, and more like rituals.".split(" ");

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const color = useTransform(progress, [index / total, (index + 1.5) / total], ["#d1cdc5", "#24231f"]);
  return <motion.span style={{ color }}>{word}{" "}</motion.span>;
}

export default function BrandIntro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  return (
    <section className="brand-intro" id="about" ref={ref}>
      <span className="eyebrow">Our philosophy</span>
      <h2>{copy.map((word, i) => <Word key={`${word}-${i}`} word={word} index={i} total={copy.length} progress={scrollYProgress} />)}</h2>
      <div className="brand-intro__foot"><span>01 / Philosophy</span><p>Aurelia creates considered objects that quiet the room. We work with elemental materials and enduring forms, making the bathroom a place to return to yourself.</p></div>
    </section>
  );
}
