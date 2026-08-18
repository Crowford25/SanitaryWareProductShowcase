"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { images } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const materials = [
  { name: "Natural Stone", image: images.stone, note: "Unique in tone and veining" },
  { name: "Solid Surface", image: images.tub, note: "Warm, seamless and repairable" },
  { name: "Brushed Brass", image: images.brass, note: "Living finish with quiet lustre" },
  { name: "Ceramic", image: images.ceramic, note: "Dense, durable and precise" },
  { name: "Matte Composite", image: images.basin, note: "Soft tactility, engineered strength" },
];

export default function Materials() {
  return (
    <section className="materials">
      <SectionTitle eyebrow="Material library" title="Materials that age beautifully." />
      <div className="materials__rail">{materials.map((m, i) => <motion.article className="material" key={m.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8 }} data-cursor="VIEW"><div className="material__image"><Image src={m.image} alt={`Macro view of ${m.name}`} fill sizes="40vw" /></div><span>0{i + 1}</span><h3>{m.name}</h3><p>{m.note}</p></motion.article>)}</div>
    </section>
  );
}
