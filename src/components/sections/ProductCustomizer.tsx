"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { images } from "@/lib/constants";

const finishes = [
  { name: "Chrome", color: "#cdd0d0", bg: "#e8e7e2", code: "CR", detail: "Mirror polished / PVD protected" },
  { name: "Brushed Brass", color: "#9b7b43", bg: "#ded5c2", code: "BB", detail: "Linear brushed / Living warmth" },
  { name: "Matte Black", color: "#292a28", bg: "#c8c6c0", code: "MB", detail: "Soft matte / Fingerprint resistant" },
  { name: "Brushed Nickel", color: "#8b8982", bg: "#d8d5cc", code: "BN", detail: "Satin brushed / Low sheen" },
];

export default function ProductCustomizer() {
  const [active, setActive] = useState(1);
  const finish = finishes[active];
  return (
    <section className="customizer" style={{ backgroundColor: finish.bg }}>
      <div className="customizer__copy"><span className="eyebrow">Linea 04 / Basin mixer</span><AnimatePresence mode="wait"><motion.h2 key={finish.name} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>Finish it<br /><em>your way.</em></motion.h2></AnimatePresence><p>A slender architectural faucet with a tactile, weighted control.</p><div className="finish-options" role="radiogroup" aria-label="Select faucet finish">{finishes.map((f, i) => <button key={f.name} onClick={() => setActive(i)} className={active === i ? "is-active" : ""} role="radio" aria-checked={active === i}><i style={{ backgroundColor: f.color }} /><span>{f.name}</span></button>)}</div></div>
      <div className="customizer__visual" data-cursor="EXPLORE"><AnimatePresence mode="wait"><motion.div key={finish.name} initial={{ opacity: 0, scale: 0.92, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.55 }} className={`faucet-filter faucet-filter--${finish.code}`}><Image src={images.faucet} alt={`Linea 04 faucet in ${finish.name}`} fill sizes="60vw" /></motion.div></AnimatePresence><div className="customizer__spec"><span>{finish.code} / 0{active + 1}</span><strong>{finish.name}</strong><small>{finish.detail}</small></div></div>
    </section>
  );
}
