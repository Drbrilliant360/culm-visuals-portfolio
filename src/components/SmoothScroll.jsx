import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

const ScrollCtx = createContext({ lenis: null, locked: false, scrollTo: () => {}, lock: () => {}, unlock: () => {} });
export const useScroll = () => useContext(ScrollCtx);

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger and Lenis share one clock.
 * Skipped entirely when the visitor prefers reduced motion (native scroll is used instead).
 */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback(
    (target, opts = {}) => {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (!el) return;
      // Lenis already honours each section's CSS scroll-margin-top (the fixed-header clearance), so no extra offset.
      if (lenis) lenis.scrollTo(el, { duration: 1.4, ...opts });
      else el.scrollIntoView({ behavior: "auto", block: "start" });
    },
    [lenis]
  );

  // Pause scrolling while an overlay (lightbox / menu) is open.
  const lock = useCallback(() => {
    setLocked(true);
    if (lenis) lenis.stop();
    else document.body.style.overflow = "hidden";
  }, [lenis]);
  const unlock = useCallback(() => {
    setLocked(false);
    if (lenis) lenis.start();
    else document.body.style.overflow = "";
  }, [lenis]);

  const value = useMemo(() => ({ lenis, locked, scrollTo, lock, unlock }), [lenis, locked, scrollTo, lock, unlock]);
  return <ScrollCtx.Provider value={value}>{children}</ScrollCtx.Provider>;
}
