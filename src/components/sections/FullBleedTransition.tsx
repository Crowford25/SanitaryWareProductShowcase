"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);
export default function FullBleedTransition() {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => { const ctx = gsap.context(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; gsap.fromTo(".fullbleed__frame", { width: "70vw" }, { width: "100vw", ease: "none", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom bottom", scrub: true } }); }, ref); return () => ctx.revert(); }, []);
  return <section className="fullbleed" ref={ref}><div className="fullbleed__frame"><Image src={images.transition} alt="Monolithic luxury bathroom interior" fill sizes="100vw" /><div className="fullbleed__copy"><span>House of Aurelia</span><h2>A private architecture<br />of calm.</h2></div></div></section>;
}
