"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__brand">AURELIA <i>BATH</i></div>
      <div className="footer__grid">
        <div><span>Collections</span><a href="#collections">Basins</a><a href="#collections">Baths</a><a href="#collections">Brassware</a></div>
        <div><span>Company</span><a href="#about">Our philosophy</a><a href="#craftsmanship">Craftsmanship</a><a href="#projects">Projects</a></div>
        <div><span>Professionals</span><a href="#contact">Specifications</a><a href="#contact">Trade enquiries</a><a href="#contact">Press</a></div>
        <div><span>Follow</span><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">LinkedIn</a></div>
      </div>
      <div className="footer__bottom"><span>Malaysia · Worldwide</span><span>© {new Date().getFullYear()} Aurelia Bath</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">Back to top <ArrowUp size={14} /></button></div>
    </footer>
  );
}
