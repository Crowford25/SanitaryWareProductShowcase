"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** A dark panel lifts off the photo as it enters the viewport, while the photo settles from 118% to 100%. */
export default function CurtainImage({
  src,
  alt,
  sizes,
  className = "",
  delay = 0,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  delay?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-curtain=""
      className={`relative overflow-hidden bg-night-3 ${className}`}
      style={{ "--curtain-delay": `${delay}ms` } as CSSProperties}
    >
      <div className="curtain-img absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <div aria-hidden="true" className="curtain absolute inset-0 bg-night-3" />
      {children}
    </div>
  );
}
