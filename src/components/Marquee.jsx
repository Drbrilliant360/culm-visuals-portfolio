import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import { animate, createScope, stagger } from "animejs";
import { MARQUEE } from "../data/content";
import { reducedMotion } from "../lib/env";

/**
 * Kinetic marquee: loops forever, speeds up with scroll velocity and follows scroll direction.
 */
export default function Marquee() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const loop = gsap.to(track.current, { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
      let dir = 1;
      let boost = 0;

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          dir = self.direction;
          boost = Math.min(Math.abs(self.getVelocity()) / 450, 6);
        },
      });
      // ease the speed boost back down when scrolling stops
      const tick = () => {
        boost *= 0.94;
        loop.timeScale(dir * (1 + boost));
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    }, root);
    return () => ctx.revert();
  }, []);

  // Anime.js: the ✦ separators turn slowly, each with its own phase
  useEffect(() => {
    if (reducedMotion()) return;
    const scope = createScope({ root }).add(() => {
      animate("[data-star]", {
        rotate: 360,
        duration: 9000,
        delay: stagger(450),
        loop: true,
        ease: "linear",
      });
    });
    return () => scope.revert();
  }, []);

  const Row = ({ hidden }) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {MARQUEE.map((t) => (
        <li key={t} className="flex items-center font-display text-[clamp(3rem,8vw,7rem)] leading-none">
          <span className="px-8 md:px-12">{t}</span>
          <span data-star aria-hidden="true" className="inline-block text-brand">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={root} role="presentation" className="overflow-hidden border-y border-ink/10 bg-paper-2 py-4 md:py-6">
      <div ref={track} className="flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
