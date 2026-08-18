"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ children, href = "#collections", light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  return (
    <motion.a
      href={href}
      className={`magnetic-button ${light ? "magnetic-button--light" : ""}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.16); y.set((e.clientY - r.top - r.height / 2) * 0.16); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <span>{children}</span><ArrowUpRight size={17} strokeWidth={1.5} />
    </motion.a>
  );
}
