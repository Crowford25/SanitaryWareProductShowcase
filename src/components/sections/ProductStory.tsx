"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);
const callouts = ["Solid Surface Composite", "Hand Finished", "Ergonomic Interior", "Seamless Drainage"];

export default function ProductStory() {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "+=2300", pin: true, scrub: 1 } });
      tl.to(ref.current, { backgroundColor: "#20211f", color: "#f2eee5", duration: 1 })
        .to(".story__visual", { scale: 1.18, duration: 1 }, "<")
        .fromTo(".story__callout", { opacity: 0, y: 22 }, { opacity: 1, y: 0, stagger: 0.18, duration: 1 })
        .fromTo(".story__specs", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="product-story" ref={ref}>
      <div className="story__top"><span>Signature object / 01</span><h2>FORMA <i>01</i></h2><p>One continuous curve.<br />Nothing superfluous.</p></div>
      <div className="story__visual" data-cursor="EXPLORE"><Image src={images.tub} alt="FORMA 01 sculptural freestanding bathtub" fill sizes="80vw" /></div>
      <div className="story__callouts">{callouts.map((x, i) => <div className={`story__callout story__callout--${i + 1}`} key={x}><span>0{i + 1}</span>{x}</div>)}</div>
      <div className="story__specs"><div><span>Dimensions</span><strong>1700 × 780 × 540 mm</strong></div><div><span>Material</span><strong>Mineral composite</strong></div><div><span>Finish</span><strong>Silk matte ivory</strong></div><div><span>Weight</span><strong>118 kg</strong></div></div>
    </section>
  );
}
