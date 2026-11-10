"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { navLinks, site } from "@/lib/content";
import { buttonClass } from "@/components/ui/ButtonLink";

const STEP_MS = 60;
const MAX_STAGGER_MS = 400;

function Wordmark() {
  return (
    <Link
      href="/#top"
      className="flex items-center gap-2 rounded-full px-3 py-2 body-4 uppercase tracking-widest text-ink"
      aria-label="Aurelia Bath, back to top"
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-brass" />
      Aurelia
    </Link>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Scrollspy: mark the section currently in the middle band of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((prev) => (prev === id ? null : prev));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock page scroll and listen for Escape while the panel is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-full border border-line/80 bg-paper/75 p-1 shadow-[0_8px_32px_rgba(27,26,23,0.08)] backdrop-blur-md"
        >
          <Wordmark />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ id, label }) => {
              const current = isHome && active === id;
              return (
                <li key={id}>
                  <Link
                    href={`/#${id}`}
                    aria-current={current ? "location" : undefined}
                    className={`block rounded-full px-3 py-2 title-4 transition-colors duration-300 ease-soft ${
                      current ? "bg-ink/8 text-ink" : "text-muted hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/#book" className={`${buttonClass("primary", "sm")} ml-1 max-[359px]:hidden`}>
            {site.ctaShort}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-10 place-items-center rounded-full transition-colors duration-300 ease-soft hover:bg-ink/5 active:scale-98 md:hidden"
          >
            <span
              aria-hidden="true"
              className={`motion-move absolute h-0.5 w-4 rounded-full bg-ink transition-transform duration-500 ease-soft ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              aria-hidden="true"
              className={`motion-move absolute h-0.5 w-4 rounded-full bg-ink transition-transform duration-500 ease-soft ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-ivory/95 px-4 pt-24 pb-8 backdrop-blur-xl transition-[opacity,visibility] duration-500 ease-soft md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col">
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ id, label }, i) => (
              <li
                key={id}
                className={`motion-move transition-[opacity,transform] duration-500 ease-soft ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${Math.min(i * STEP_MS, MAX_STAGGER_MS)}ms` : "0ms" }}
              >
                <Link
                  href={`/#${id}`}
                  onClick={close}
                  aria-current={isHome && active === id ? "location" : undefined}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 heading-4 text-ink transition-colors duration-300 ease-soft hover:bg-ink/5 aria-[current=location]:bg-ink/8"
                >
                  {label}
                  <ArrowRightIcon aria-hidden="true" size={20} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`motion-move mt-auto transition-[opacity,transform] duration-500 ease-soft ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${Math.min(navLinks.length * STEP_MS, MAX_STAGGER_MS)}ms` : "0ms" }}
          >
            <Link href="/#book" onClick={close} className={`${buttonClass("primary")} w-full`}>
              {site.cta}
              <ArrowRightIcon aria-hidden="true" size={18} />
            </Link>
            <p className="mt-3 text-center text-balance caption-5 text-muted">
              {site.showroom} · {site.hours}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
