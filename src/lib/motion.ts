/**
 * Tiny scroll motion engine.
 * One passive scroll listener for the whole page, throttled with
 * requestAnimationFrame. Components subscribe while mounted and write
 * transform and opacity straight to the DOM, so React never re-renders per frame.
 */

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** Maps p from [start, end] to [0, 1], clamped. */
export const range = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
/** Close match to the base curve cubic-bezier(0.22, 1, 0.36, 1). */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Listener = (scrollY: number, velocity: number) => void;

const listeners = new Set<Listener>();
let frame = 0;
let lastY = 0;

function tick() {
  frame = 0;
  const y = window.scrollY;
  const velocity = y - lastY;
  lastY = y;
  listeners.forEach((fn) => fn(y, velocity));
}

function request() {
  if (!frame) frame = requestAnimationFrame(tick);
}

export function onScrollFrame(fn: Listener) {
  if (listeners.size === 0) {
    lastY = window.scrollY;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }
  listeners.add(fn);
  request();
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/**
 * Scroll scrubbing with weight: `measure` returns a 0..1 target from layout,
 * the current value eases toward it each frame and `render` writes styles.
 * Under reduced motion it renders the final state once and stops.
 */
export function scrub({
  measure,
  render,
  smooth = 0.14,
  reducedValue = 1,
}: {
  measure: () => number;
  render: (p: number) => void;
  smooth?: number;
  reducedValue?: number;
}) {
  if (prefersReducedMotion()) {
    render(reducedValue);
    return () => {};
  }

  let current = measure();
  let target = current;
  let raf = 0;
  render(current);

  const loop = () => {
    raf = 0;
    current += (target - current) * smooth;
    if (Math.abs(target - current) < 0.0005) current = target;
    render(current);
    if (current !== target) raf = requestAnimationFrame(loop);
  };

  const off = onScrollFrame(() => {
    target = measure();
    if (!raf) raf = requestAnimationFrame(loop);
  });

  return () => {
    off();
    if (raf) cancelAnimationFrame(raf);
  };
}

/** Progress of a tall section scrolling past a sticky viewport: 0 at its top, 1 at its end. */
export function stickyProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  return travel <= 0 ? 0 : clamp(-rect.top / travel);
}

/** Progress of an element moving through the viewport: 0 when its top hits `from`, 1 when it hits `to` (fractions of viewport height). */
export function viewportProgress(el: HTMLElement, from = 1, to = 0) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return clamp((vh * from - rect.top) / (vh * (from - to)));
}
