"use client";

import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <motion.header className={`section-title ${light ? "text-ivory" : ""}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </motion.header>
  );
}
