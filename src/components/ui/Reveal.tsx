"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  /** Stagger offset in ms for items revealed together. */
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Rises 32px and fades in once when it enters the viewport.
 * Styles live in globals.css ([data-reveal]); hidden only when scripting is on.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className, children, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} id={id} data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
