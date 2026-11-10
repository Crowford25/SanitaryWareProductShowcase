"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowsHorizontalIcon } from "@phosphor-icons/react";

type BeforeAfterProps = {
  before: { src: string; alt: string; label: string };
  after: { src: string; alt: string; label: string };
};

/** Drag or use arrow keys to compare two rooms. A native range input drives it. */
export default function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [value, setValue] = useState(50);

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-line select-none sm:aspect-[4/3] lg:aspect-[3/4]">
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover grayscale-[35%]"
        />
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-sm bg-paper/90 px-3 py-1 caption-3 text-ink backdrop-blur-md">
        {before.label}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-sm bg-ink/85 px-3 py-1 caption-3 text-ivory backdrop-blur-md">
        {after.label}
      </span>

      <input
        type="range"
        min={4}
        max={96}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Compare ${before.label.toLowerCase()} with ${after.label.toLowerCase()}`}
        aria-valuetext={`${value}% ${before.label.toLowerCase()}`}
        className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
      />

      {/* Divider: a full width layer translated by the slider value, line on its left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ transform: `translateX(${value}%)` }}
      >
        <div className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-paper" />
        <div className="absolute top-1/2 left-0 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-[0_8px_24px_rgba(27,26,23,0.25)] transition-transform duration-300 ease-soft group-has-[input:hover]:scale-105 group-has-[input:active]:scale-98">
          <ArrowsHorizontalIcon size={20} />
        </div>
      </div>
      {/* Focus ring for keyboard users, drawn around the whole comparison */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg ring-brass ring-inset group-has-[input:focus-visible]:ring-2"
      />
    </div>
  );
}
