import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Wraps a child so it subtly follows the pointer.
 * Plain wrapper with reduced motion or touch input. `full` makes it full-width on phones.
 */
export default function Magnetic({ children, strength = 0.28, className = "", full = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });
  const layout = full ? "block w-full sm:inline-block sm:w-auto" : "inline-block";

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return; // no magnet on touch / pen
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  if (reduce) return <div className={`${layout} ${className}`}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`${layout} ${className}`}
    >
      {children}
    </motion.div>
  );
}
