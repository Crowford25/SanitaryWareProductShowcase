"use client";

import { motion } from "framer-motion";

const quotes = [
  { quote: "Aurelia understands that the most luxurious room is often the quietest one.", name: "Elena Marais", role: "Architect · Studio Nord" },
  { quote: "Every junction feels resolved. Every surface asks to be touched.", name: "Marcus Lim", role: "Interior Designer · Form Practice" },
  { quote: "Our guests remember the bathrooms—and that says everything about the experience.", name: "Amara Collection", role: "Independent Hospitality Group" },
];

export default function Testimonials() { return <section className="testimonials"><span className="eyebrow">In considered company</span>{quotes.map((q, i) => <motion.blockquote key={q.name} initial={{ opacity: 0.15 }} whileInView={{ opacity: 1 }} viewport={{ margin: "-25%" }} transition={{ duration: 0.9 }}><span>“</span><p>{q.quote}</p><footer>{q.name}<small>{q.role}</small></footer><i>0{i + 1}</i></motion.blockquote>)}</section>; }
