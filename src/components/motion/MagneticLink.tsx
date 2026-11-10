"use client";

import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { buttonClass } from "@/components/ui/ButtonLink";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A button that leans toward the cursor; its label leans a little further,
 * so the two layers separate. Mouse only, and off under reduced motion.
 */
export default function MagneticLink({
  href,
  children,
  variant = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el || !label.current) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.4}px, 0)`;
    label.current.style.transform = `translate3d(${x * 0.1}px, ${y * 0.18}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    if (label.current) label.current.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`${buttonClass(variant)} duration-500! ${className}`}
    >
      <span ref={label} className="motion-move inline-flex items-center gap-2 transition-transform duration-500 ease-soft">
        {children}
      </span>
    </Link>
  );
}
