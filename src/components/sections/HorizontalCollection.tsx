"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { horizontalProducts } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalCollection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!track.current || window.innerWidth < 900 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth + 80);
      gsap.to(track.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="horizontal" id="explore" ref={root}>
      <div className="horizontal__heading"><span className="eyebrow">Selected pieces</span><h2>Explore the <em>Collection</em></h2><p>Continue scrolling</p></div>
      <div className="horizontal__track" ref={track}>
        {horizontalProducts.map((product, i) => <article className="product-card" key={product.name} data-cursor="EXPLORE"><div className="product-card__image"><Image src={product.image} alt={product.category} fill sizes="70vw" /></div><div className="product-card__text"><span>0{i + 1} / 05</span><div><p>{product.category}</p><h3>{product.name}</h3><small>{product.description}</small></div></div></article>)}
      </div>
    </section>
  );
}
