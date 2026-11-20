import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "../lib/gsap";
import { FILTERS, WORKS } from "../data/content";
import { useLightbox } from "./Lightbox";

// per-column parallax drift (yPercent) on large screens; kept small so cards never overlap
const DRIFT = [-3, 2.5, -4];

function Card({ item, col, onOpen }) {
  const drift = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(drift.current, {
        yPercent: DRIFT[col % 3],
        ease: "none",
        scrollTrigger: { trigger: drift.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, [col]);

  return (
    // Motion handles layout / enter / exit; GSAP handles parallax on the inner wrapper (separate transforms).
    <motion.div
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={drift}>
        <button
          type="button"
          data-cursor="VIEW"
          onClick={onOpen}
          aria-label={`View ${item.title} by ${item.client}`}
          className="group relative block w-full overflow-hidden rounded-2xl bg-paper-2 text-left ring-1 ring-ink/10 shadow-[0_24px_50px_-28px_rgba(20,9,31,0.5)]"
        >
          <img
            src={item.src}
            alt={item.alt}
            width={item.w}
            height={item.h}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/90 to-transparent px-4 pb-4 pt-14 text-paper opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
            <b className="block font-display text-xl leading-tight">{item.title}</b>
            <span className="text-xs text-lilac">{item.client}</span>
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("all");
  const { open } = useLightbox();
  const items = useMemo(() => (filter === "all" ? WORKS : WORKS.filter((w) => w.cat === filter)), [filter]);

  return (
    <section id="work" className="section-y mx-auto max-w-[1320px] scroll-mt-20 px-5 md:px-10">
      <p className="eyebrow">Selected work</p>
      <h2 className="display mt-5 max-w-[14ch] text-[clamp(3rem,7.2vw,6.4rem)]">Posters with a <em className="text-brand">purpose</em>.</h2>
      <p className="mt-5 max-w-[56ch] text-lg text-muted">
        A selection of recent projects. Open any piece to view it larger, and use the arrow keys or swipe to browse.
      </p>

      <div role="group" aria-label="Filter projects" className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`relative shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition-colors md:py-2.5 ${active ? "border-transparent text-paper" : "border-ink/15 text-ink-2 hover:border-brand hover:text-brand"}`}
            >
              {active && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative z-10">{f.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid grid-cols-2 items-start gap-4 md:gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <Card key={item.file} item={item} col={i} onOpen={() => open(items, i)} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
