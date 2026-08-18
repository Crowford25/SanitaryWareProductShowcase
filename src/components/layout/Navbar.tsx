"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = ["Collections", "Spaces", "Craftsmanship", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const now = window.scrollY;
      setScrolled(now > 40);
      setHidden(now > last && now > 180 && !open);
      last = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <motion.header className={`navbar ${scrolled ? "is-scrolled" : ""}`} animate={{ y: hidden ? -100 : 0 }} transition={{ duration: 0.35 }}>
      <a href="#top" className="brand" aria-label="Aurelia Bath home">AURELIA <i>BATH</i></a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}
      </nav>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <div className="mobile-menu__links">{links.map((link, i) => <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.07 }}>{link}<span>0{i + 1}</span></motion.a>)}</div>
            <p>Objects for water, space and daily ritual.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
