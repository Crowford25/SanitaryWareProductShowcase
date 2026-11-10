"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/motion";

/** A thin brass line across the top that fills as you read down the page. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onScrollFrame((y) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    });
  }, []);

  return <div ref={ref} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brass" style={{ transform: "scaleX(0)" }} />;
}
