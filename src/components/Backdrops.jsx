import { useEffect, useRef } from "react";
import { animate, createScope, stagger, svg, utils } from "animejs";
import { reducedMotion } from "../lib/env";

/**
 * Decorative "graphic design" motifs used as section backgrounds.
 * All of them are aria-hidden and pointer-events-none, and only use colour via currentColor/opacity,
 * so a section controls their tone with a text-* class.
 */

/** Pen-tool art: Bézier curves with anchor squares and control handles. Draws itself in when scrolled into view. */
export function PenTool({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const el = ref.current;
    const paths = el.querySelectorAll("[data-draw]");
    const pops = el.querySelectorAll("[data-pop]");

    const scope = createScope({ root: ref }).add(() => {
      const drawables = svg.createDrawable(paths);
      utils.set(paths, { opacity: 0 });
      utils.set(pops, { opacity: 0, scale: 0 });

      const lines = animate(drawables, {
        draw: ["0 0", "0 1"],
        opacity: [0, 1],
        duration: 2200,
        delay: stagger(350),
        ease: "inOutQuad",
        autoplay: false,
      });
      const points = animate(pops, {
        opacity: 1,
        scale: 1,
        duration: 600,
        delay: stagger(110, { start: 700 }),
        ease: "outBack",
        autoplay: false,
      });

      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { lines.play(); points.play(); io.disconnect(); }
      }, { threshold: 0.25 });
      io.observe(el);
      return () => io.disconnect();
    });

    return () => scope.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 640 480" fill="none" aria-hidden="true" className={`pointer-events-none ${className}`}>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path data-draw d="M20 380 C 120 380, 140 120, 260 150 S 400 360, 470 250 S 580 60, 620 90" />
        <path data-draw opacity=".55" d="M20 440 C 160 420, 220 300, 330 330 S 480 440, 620 300" />
      </g>
      {/* control handles + anchors for the first curve */}
      <g stroke="currentColor" strokeWidth="1" opacity=".8">
        <line x1="260" y1="150" x2="140" y2="120" /><line x1="260" y1="150" x2="380" y2="180" />
        <line x1="470" y1="250" x2="400" y2="360" /><line x1="470" y1="250" x2="540" y2="140" />
      </g>
      <g fill="currentColor">
        {[[140, 120], [380, 180], [400, 360], [540, 140]].map(([x, y]) => (
          <circle key={`${x}-${y}`} data-pop cx={x} cy={y} r="4.5" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1.6" fill="var(--color-paper)">
        {[[20, 380], [260, 150], [470, 250], [620, 90]].map(([x, y]) => (
          <rect key={`${x}-${y}`} data-pop x={x - 8} y={y - 8} width="16" height="16" rx="1.5" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        ))}
      </g>
    </svg>
  );
}

/** Layout guides: a 12-column grid with a horizontal baseline, faded toward the edges. */
export function GridGuides({ tone = "light", className = "" }) {
  const c = tone === "dark" ? "rgba(255,255,255,0.07)" : "rgba(26,11,46,0.07)";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${c} 1px, transparent 1px), linear-gradient(to bottom, ${c} 1px, transparent 1px)`,
        backgroundSize: "calc(100% / 12) 100%, 100% 88px",
        maskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
      }}
    />
  );
}

/** Print crop marks in the four corners plus a registration target. */
export function CropMarks({ className = "" }) {
  const mark = "absolute h-6 w-6 border-current";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-3 hidden md:block ${className}`}>
      <span className={`${mark} left-0 top-0 border-l border-t`} />
      <span className={`${mark} right-0 top-0 border-r border-t`} />
      <span className={`${mark} bottom-0 left-0 border-b border-l`} />
      <span className={`${mark} bottom-0 right-0 border-b border-r`} />
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" className="absolute right-10 top-1/2 -translate-y-1/2 opacity-70">
        <circle cx="16" cy="16" r="9" /><circle cx="16" cy="16" r="3" /><path d="M16 1v30M1 16h30" />
      </svg>
    </div>
  );
}

/** Halftone dot field, the classic print-screen texture. */
export function Halftone({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: "radial-gradient(currentColor 1.6px, transparent 2px)",
        backgroundSize: "14px 14px",
        maskImage: "radial-gradient(circle at 30% 30%, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle at 30% 30%, black 0%, transparent 70%)",
      }}
    />
  );
}

const SWATCHES = [
  { hex: "#f6f1e7", name: "Paper" },
  { hex: "#1a0b2e", name: "Ink" },
  { hex: "#7c3aed", name: "Violet" },
  { hex: "#cbb8ff", name: "Lilac" },
  { hex: "#f2b134", name: "Amber" },
];

/** A row of palette cards, like a colour-guide sheet. */
export function Swatches({ className = "" }) {
  return (
    <ul aria-hidden="true" className={`items-end gap-2 ${className}`}>
      {SWATCHES.map((s, i) => (
        <li key={s.hex} style={{ transform: `rotate(${(i - 2) * 2.2}deg) translateY(${Math.abs(i - 2) * 4}px)` }} className="w-[4.2rem] overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_10px_24px_-14px_rgba(26,11,46,0.45)]">
          <div style={{ background: s.hex }} className="h-14" />
          <div className="px-2 py-1.5 text-[0.58rem] font-semibold leading-tight text-ink">
            {s.name}
            <span className="block font-medium text-muted">{s.hex.toUpperCase()}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** A faint tilted wall of the studio's own posters. Set opacity / blend on the wrapper via className. */
export function PosterWall({ files, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        maskImage: "radial-gradient(ellipse at center, black 25%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 78%)",
      }}
    >
      <div className="absolute -inset-[18%] grid -rotate-6 grid-cols-3 gap-4 md:grid-cols-5 md:gap-6 [&>*:nth-child(even)]:translate-y-10">
        {files.map((f) => (
          <img key={f} src={`/work/${f}.jpg`} alt="" loading="lazy" decoding="async" width="1166" height="1400" className="w-full rounded-xl object-cover grayscale" />
        ))}
      </div>
    </div>
  );
}
