"use client";

import Image from "next/image";
import { images } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const projects = [
  { name: "Private Residence", place: "Kuala Lumpur", year: "2025", image: images.project1 },
  { name: "The Ormond Hotel", place: "Singapore", year: "2026", image: images.project2 },
  { name: "Stone Courtyard Villa", place: "Bali", year: "2024", image: images.project3 },
  { name: "Riverside Penthouse", place: "Bangkok", year: "2025", image: images.project4 },
];

export default function Projects() { return <section className="projects" id="projects"><SectionTitle eyebrow="Selected projects" title="Spaces shaped around water." /><div className="projects__grid">{projects.map((p, i) => <article className={`project project--${i + 1}`} key={p.name} data-cursor="VIEW"><Image src={p.image} alt={`${p.name}, ${p.place}`} fill sizes="(max-width: 768px) 100vw, 55vw" /><div className="project__overlay"><span>{p.name}</span><span>{p.place}</span><span>{p.year}</span></div></article>)}</div></section>; }
