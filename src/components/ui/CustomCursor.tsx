"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-50);
  const y = useMotionValue(-50);
  const smoothX = useSpring(x, { stiffness: 500, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 35 });
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true); };
    const over = (e: MouseEvent) => setLabel((e.target as HTMLElement).closest<HTMLElement>("[data-cursor]")?.dataset.cursor || "");
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseleave", leave); };
  }, [x, y]);

  return (
    <motion.div
      className={`custom-cursor ${label ? "is-active" : ""}`}
      style={{ x: smoothX, y: smoothY }}
      animate={{ opacity: visible ? 1 : 0, scale: label ? 1 : 0.65 }}
      aria-hidden="true"
    >{label}</motion.div>
  );
}
