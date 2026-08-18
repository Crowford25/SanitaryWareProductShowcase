"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { images } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Transformation() {
  const [value, setValue] = useState(52);
  return (
    <section className="transformation" id="spaces">
      <div className="transformation__heading"><SectionTitle eyebrow="Space transformation" title="From functional room to restorative space." /><p>Drag to compare</p></div>
      <div className="compare" data-cursor="DRAG">
        <Image src={images.after} alt="Aurelia designed bathroom interior" fill sizes="100vw" />
        <div className="compare__before" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}><Image src={images.before} alt="Basic bathroom before transformation" fill sizes="100vw" /></div>
        <span className="compare__label compare__label--left">Basic bathroom</span><span className="compare__label compare__label--right">Aurelia interior</span>
        <div className="compare__line" style={{ left: `${value}%` }}><i><ArrowLeftRight size={18} /></i></div>
        <input type="range" min="5" max="95" value={value} onChange={(e) => setValue(Number(e.target.value))} aria-label="Drag to compare before and after bathroom" />
      </div>
    </section>
  );
}
