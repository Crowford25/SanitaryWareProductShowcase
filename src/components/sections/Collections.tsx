"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Collections() {
  return (
    <section className="collections" id="collections">
      <SectionTitle eyebrow="The collection" title="Objects for a quieter kind of living." />
      <div className="collection-grid">
        {collections.map((item, index) => (
          <motion.article className={`collection-card collection-card--${index + 1}`} key={item.title} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} data-cursor="VIEW">
            <div className="collection-card__image"><Image src={item.image} alt={`${item.title} collection in a refined interior`} fill sizes="(max-width: 768px) 100vw, 60vw" /></div>
            <div className="collection-card__meta"><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p><a href="#explore">Explore <ArrowRight size={15} /></a></div></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
