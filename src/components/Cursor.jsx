import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Custom cursor follower. Native cursor stays visible (accessible);
 * the follower grows into a labelled bubble over any element with data-cursor="LABEL".
 * Only enabled for fine pointers with motion allowed.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.35 });

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);

    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      setLabel(t ? t.getAttribute("data-cursor") : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[120]"
    >
      <motion.div
        animate={{ scale: label ? 1 : 0.16, opacity: label ? 1 : 0.9 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="-ml-12 -mt-12 grid h-24 w-24 place-items-center rounded-full bg-brand text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
