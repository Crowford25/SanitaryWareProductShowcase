"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero__mask", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4 })
        .from(".hero__image", { scale: 1.16, duration: 1.8 }, 0)
        .from(".hero__line span", { yPercent: 120, stagger: 0.12, duration: 0.9 }, 0.5)
        .from(".hero__copy, .hero .magnetic-button, .hero__scroll", { opacity: 0, y: 18, stagger: 0.12, duration: 0.7 }, 1.05);
      gsap.to(".hero__image", { scale: 0.96, yPercent: 9, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__content", { yPercent: -28, opacity: 0.2, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__mask"><Image className="hero__image" src={images.hero} alt="Quiet luxury bathroom with stone surfaces and freestanding bath" fill priority sizes="100vw" /><div className="hero__shade" /></div>
      <div className="hero__content">
        <p className="hero__kicker">A study in water and stillness · 2026</p>
        <h1 aria-label="Designed for moments of stillness."><span className="hero__line"><span>Designed for moments</span></span><span className="hero__line"><span>of <em>stillness.</em></span></span></h1>
        <div className="hero__lower"><p className="hero__copy">Contemporary bathroom pieces created around simplicity, material and everyday rituals.</p><MagneticButton light>Explore collection</MagneticButton></div>
      </div>
      <div className="hero__scroll"><span>Scroll to discover</span><i /></div>
    </section>
  );
}
