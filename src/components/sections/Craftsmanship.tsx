"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { images } from "@/lib/constants";

const steps = ["Design", "Material Selection", "Precision Manufacturing", "Hand Finishing", "Quality Inspection"];

export default function Craftsmanship() {
  return (
    <section className="craft" id="craftsmanship">
      <div className="craft__visual" data-cursor="VIEW"><Image src={images.craft} alt="A craftsperson hand finishing an Aurelia product" fill sizes="50vw" /></div>
      <div className="craft__content"><span className="eyebrow">Made in small series</span><h2>Made through precision.<br /><em>Finished by hand.</em></h2><p>Technology gives us accuracy. The hand gives every object its final character. Each piece passes through five considered stages before it carries the Aurelia mark.</p><ol>{steps.map((step, i) => <motion.li key={step} initial={{ opacity: 0.25, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ margin: "-35% 0px -35%" }} transition={{ duration: 0.6 }}><span>0{i + 1}</span>{step}</motion.li>)}</ol></div>
    </section>
  );
}
