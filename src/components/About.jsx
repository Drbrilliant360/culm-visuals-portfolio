import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "../lib/gsap";
import { PenTool } from "./Backdrops";

const STATEMENT =
  "Culm Visuals is a creative media brand built to deliver calm, smart storytelling and powerful visuals, from graphic design to videography and photography. Every project starts with the message and the audience. The look follows from there.";

const FOUNDERS = [
  { name: "Shaban Wanogile", role: "Co-founder", from: "ShawartMedia" },
  { name: "Saimon Sabwalise", role: "Co-founder", from: "Sai_Creations" },
];

/** Words light up one by one as the paragraph scrolls through the viewport (scrubbed). */
function ScrubText({ text, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 50%", scrub: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className="mr-[0.26em] inline-block">{w}</span>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="section-y relative mx-auto max-w-[1320px] scroll-mt-20 px-5 md:px-10">
      <PenTool className="absolute -right-4 top-6 hidden w-[min(46%,560px)] text-brand/20 md:block" />
      <p className="eyebrow">About</p>
      <ScrubText text={STATEMENT} className="display mt-8 max-w-[26ch] text-[clamp(2.2rem,5vw,4.4rem)] !leading-[1.08] md:max-w-[34ch]" />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {FOUNDERS.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-3xl border border-ink/10 bg-paper-2/60 p-7"
          >
            <b className="font-display text-3xl">{f.name}</b>
            <p className="mt-1 text-sm text-brand-deep">{f.role} · {f.from}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
