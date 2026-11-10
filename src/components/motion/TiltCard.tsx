"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Tilts a few degrees toward the cursor in 3D and settles back on leave. Mouse only. */
export default function TiltCard({ children, className = "", strength = 7 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group motion-move h-full transition-transform duration-500 ease-soft will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
