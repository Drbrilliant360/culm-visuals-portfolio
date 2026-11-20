import { useEffect, useRef } from "react";
import { animate, createAnimatable, createScope } from "animejs";
import { finePointer, reducedMotion } from "../lib/env";

/**
 * Anime.js card effect:
 *  - idle: a slow floating loop (each card on its own phase)
 *  - hover: 3D tilt that follows the pointer, a gentle lift, and a moving light glare
 *  - leave: springs back to rest
 *
 * Transforms are split across nested wrappers (float > tilt) so they never fight each other,
 * and never touch the outer element, which GSAP uses for scroll parallax.
 * Tilt only runs for fine pointers; everything is skipped with reduced motion.
 */
export default function TiltCard({ children, className = "", max = 13, floatRange = 9, phase = 0, rounded = "rounded-xl" }) {
  const floatRef = useRef(null);
  const tiltRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const hover = finePointer();
    const tiltEl = tiltRef.current;
    const glare = glareRef.current;

    const scope = createScope({ root: floatRef }).add(() => {
      // idle float on the outer wrapper
      animate(floatRef.current, {
        y: [-floatRange, floatRange],
        duration: 3400 + phase * 0.6,
        delay: phase,
        alternate: true,
        loop: true,
        ease: "inOutSine",
      });
    });

    let tilt;
    let onMove, onLeave, onEnter;
    if (hover) {
      // createAnimatable returns setter functions that retarget one running tween (smooth, cheap on every pointermove)
      tilt = createAnimatable(tiltEl, { rotateX: 450, rotateY: 450, scale: 500, ease: "out(3)" });

      onEnter = () => { tilt.scale(1.045); glare.style.opacity = "1"; };
      onMove = (e) => {
        const r = tiltEl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.rotateY(px * max * 2);
        tilt.rotateX(-py * max * 2);
        glare.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        glare.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      };
      onLeave = () => { tilt.rotateX(0); tilt.rotateY(0); tilt.scale(1); glare.style.opacity = "0"; };

      tiltEl.addEventListener("pointerenter", onEnter);
      tiltEl.addEventListener("pointermove", onMove);
      tiltEl.addEventListener("pointerleave", onLeave);
    }

    return () => {
      scope.revert();
      if (hover) {
        tiltEl.removeEventListener("pointerenter", onEnter);
        tiltEl.removeEventListener("pointermove", onMove);
        tiltEl.removeEventListener("pointerleave", onLeave);
        tilt.revert();
      }
    };
  }, [floatRange, max, phase]);

  return (
    <div ref={floatRef} className={className} style={{ perspective: "900px" }}>
      <div ref={tiltRef} className={`relative ${rounded} will-change-transform`}>
        {children}
        <span
          ref={glareRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${rounded} opacity-0 transition-opacity duration-300`}
          style={{ background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.5), rgba(255,255,255,0) 55%)", mixBlendMode: "soft-light" }}
        />
      </div>
    </div>
  );
}
