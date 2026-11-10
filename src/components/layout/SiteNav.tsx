"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { navLinks, site } from "@/lib/content";
import { buttonClass } from "@/components/ui/ButtonLink";

const STEP_MS = 60;
const MAX_STAGGER_MS = 400;

/** Landing pages that own the nav sections, and their theme. */
const landingPages: Record<string, "light" | "dark"> = { "/": "light", "/motion": "dark" };

const themes = {
  light: {
    pill: "border-line/80 bg-paper/75 shadow-[0_8px_32px_rgba(27,26,23,0.08)]",
    wordmark: "text-ink",
    linkCurrent: "bg-ink/8 text-ink",
    linkIdle: "text-muted hover:bg-ink/5 hover:text-ink",
    cta: "primary" as const,
    toggle: "hover:bg-ink/5",
    line: "bg-ink",
    panel: "bg-ivory/95",
    panelLink: "text-ink hover:bg-ink/5 aria-[current=location]:bg-ink/8",
    muted: "text-muted",
  },
  dark: {
    pill: "border-night-4 bg-night-2/70 shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
    wordmark: "text-on-night",
    linkCurrent: "bg-on-night/10 text-on-night",
    linkIdle: "text-on-night-muted hover:bg-on-night/8 hover:text-on-night",
    cta: "light" as const,
    toggle: "hover:bg-on-night/8",
    line: "bg-on-night",
    panel: "bg-night/95",
    panelLink: "text-on-night hover:bg-on-night/8 aria-[current=location]:bg-on-night/10",
    muted: "text-on-night-muted",
  },
};

export default function SiteNav() {
  const pathname = usePathname();
  const isLanding = pathname in landingPages;
  const base = isLanding ? pathname : "/";
  const t = themes[landingPages[pathname] ?? "light"];
  const href = (id: string) => `${base}#${id}`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Scrollspy: mark the section currently in the middle band of the viewport.
  useEffect(() => {
    if (!isLanding) return;
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
  }, [isLanding, pathname]);

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
      {/* Logo pinned left, links pinned right: two floating pieces rather than one centred bar. */}
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href={href("top")}
            className={`pointer-events-auto flex items-center gap-2 rounded-full border px-4 py-3 body-4 uppercase tracking-widest backdrop-blur-md ${t.pill} ${t.wordmark}`}
            aria-label="Aurelia Bath, back to top"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-brass" />
            Aurelia Bath
          </Link>

          <nav aria-label="Primary" className={`pointer-events-auto flex items-center gap-1 rounded-full border p-1 backdrop-blur-md ${t.pill}`}>
            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map(({ id, label }) => {
                const current = isLanding && active === id;
                return (
                  <li key={id}>
                    <Link
                      href={href(id)}
                      aria-current={current ? "location" : undefined}
                      className={`block rounded-full px-3 py-2 title-4 transition-colors duration-300 ease-soft ${
                        current ? t.linkCurrent : t.linkIdle
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link href={href("book")} className={`${buttonClass(t.cta, "sm")} ml-1 max-sm:hidden`}>
              {site.ctaShort}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative grid size-10 place-items-center rounded-full transition-colors duration-300 ease-soft active:scale-98 md:hidden ${t.toggle}`}
            >
              <span
                aria-hidden="true"
                className={`motion-move absolute h-0.5 w-4 rounded-full transition-transform duration-500 ease-soft ${t.line} ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                aria-hidden="true"
                className={`motion-move absolute h-0.5 w-4 rounded-full transition-transform duration-500 ease-soft ${t.line} ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col px-4 pt-24 pb-8 backdrop-blur-xl transition-[opacity,visibility] duration-500 ease-soft md:hidden ${t.panel} ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col">
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ id, label }, i) => (
              <li
                key={id}
                className={`motion-move transition-[opacity,translate] duration-500 ease-soft ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${Math.min(i * STEP_MS, MAX_STAGGER_MS)}ms` : "0ms" }}
              >
                <Link
                  href={href(id)}
                  onClick={close}
                  aria-current={isLanding && active === id ? "location" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-3 py-3 heading-4 transition-colors duration-300 ease-soft ${t.panelLink}`}
                >
                  {label}
                  <ArrowRightIcon aria-hidden="true" size={20} className={t.muted} />
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`motion-move mt-auto transition-[opacity,translate] duration-500 ease-soft ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${Math.min(navLinks.length * STEP_MS, MAX_STAGGER_MS)}ms` : "0ms" }}
          >
            <Link href={href("book")} onClick={close} className={`${buttonClass(t.cta)} w-full`}>
              {site.cta}
              <ArrowRightIcon aria-hidden="true" size={18} />
            </Link>
            <p className={`mt-3 text-center text-balance caption-5 ${t.muted}`}>
              {site.showroom} · {site.hours}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
