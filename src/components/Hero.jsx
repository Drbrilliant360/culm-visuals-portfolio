import { useEffect, useRef } from "react";
import { animate, createScope, svg } from "animejs";
import { ArrowDownRight01Icon } from "@hugeicons/core-free-icons";
import Icon from "./Icon";
import TiltCard from "./TiltCard";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { CLIENTS, HERO_IMAGES, SERVICES } from "../data/content";
import { useScroll } from "./SmoothScroll";
import Magnetic from "./Magnetic";
import { GridGuides, Halftone, PenTool } from "./Backdrops";

const LINES = ["Design that", "speaks", "before you do."];

// position / rotation / parallax speed (yPercent over the hero's scroll) per collage image
const COLLAGE = [
  { cls: "left-0 top-[10%] w-[54%] -rotate-6", speed: -10 },
  { cls: "right-0 top-0 z-10 w-[54%] rotate-3", speed: -22 },
  { cls: "bottom-0 left-[24%] z-20 w-[50%] -rotate-2", speed: -4 },
];

const STATS = [
  { n: CLIENTS.length, suffix: "+", label: "Clients" },
  { n: SERVICES.length, suffix: "", label: "Services" },
  { n: 2, suffix: "", label: "Founders" },
];

export default function Hero() {
  const root = useRef(null);
  const underline = useRef(null);
  const { scrollTo } = useScroll();

  // GSAP: headline mask reveal, fades, collage entrance and scroll parallax
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-line]", { yPercent: 115, duration: 1.2, ease: "power4.out", stagger: 0.12, delay: 0.15 });
      gsap.from("[data-fade]", { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.65 });
      gsap.from("[data-collage]", { opacity: 0, y: 70, duration: 1.3, ease: "power3.out", stagger: 0.16, delay: 0.3 });

      gsap.utils.toArray("[data-speed]").forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.speed),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Anime.js: hand-drawn underline + stat count-up (card tilt lives in <TiltCard>)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const path = underline.current;
    const counters = [...root.current.querySelectorAll("[data-count]")];

    const scope = createScope({ root }).add(() => {
      // SVG line drawing: the path starts hidden, then strokes itself in after the headline lands
      path.style.visibility = "hidden";
      const [drawable] = svg.createDrawable(path);
      animate(drawable, {
        draw: ["0 0", "0 1"],
        duration: 1100,
        delay: 1350,
        ease: "inOutCubic",
        onBegin: () => { path.style.visibility = "visible"; },
      });

      // count-up
      counters.forEach((el) => {
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const state = { v: 0 };
        el.textContent = `0${suffix}`;
        animate(state, {
          v: end,
          duration: 1800,
          delay: 900,
          ease: "outExpo",
          onUpdate: () => { el.textContent = `${Math.round(state.v)}${suffix}`; },
          onComplete: () => { el.textContent = `${end}${suffix}`; },
        });
      });
    });

    return () => {
      scope.revert();
      path.style.visibility = "visible";
      counters.forEach((el) => { el.textContent = `${el.dataset.count}${el.dataset.suffix ?? ""}`; });
    };
  }, []);

  const jump = (id) => (e) => { e.preventDefault(); scrollTo(id); };

  return (
    <section id="top" ref={root} className="relative overflow-clip pb-14 pt-28 md:pb-16 md:pt-32">
      {/* liquid gradient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-lilac/60 blur-3xl animate-blob" />
        <div className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-3xl animate-blob [animation-delay:-7s]" />
      </div>

      <GridGuides tone="light" className="absolute inset-0" />
      <PenTool className="absolute -bottom-10 -right-[8%] w-[min(78vw,760px)] text-brand/30" />
      <Halftone className="absolute left-[-3rem] top-24 h-56 w-56 text-brand/25" />

      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p data-fade className="eyebrow">Creative design studio · Dar es Salaam</p>
          <h1 className="display mt-6 text-[clamp(3.3rem,6.6vw,6.6rem)]">
            {LINES.map((line, i) => (
              <span key={line} className={`block overflow-hidden whitespace-nowrap ${i === 1 ? "-mb-[0.1em] pb-[0.2em]" : "pb-[0.1em]"}`}>
                <span data-line className="block">
                  {i === 1 ? (
                    <span className="relative inline-block pr-[0.06em] italic text-brand">
                      {line}
                      <svg aria-hidden="true" viewBox="0 0 320 18" preserveAspectRatio="none" fill="none" className="absolute -bottom-[0.07em] left-0 h-[0.15em] w-full">
                        <path ref={underline} d="M3 11 C 45 3, 85 16, 130 8 S 215 4, 255 11 S 300 14, 317 6" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round" />
                      </svg>
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p data-fade className="mt-7 font-sans text-lg font-semibold text-brand-deep">
            Graphic design · Branding · Visual storytelling
          </p>
          <p data-fade className="mt-3 max-w-[46ch] text-lg leading-relaxed text-muted">
            We turn ideas into meaningful visual experiences: posters, brand identities and campaigns for businesses, ministries and institutions.
          </p>

          <div data-fade className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <a href="#work" onClick={jump("#work")} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-medium text-paper transition hover:bg-brand">
                View work <Icon icon={ArrowDownRight01Icon} size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" onClick={jump("#contact")} className="inline-flex items-center rounded-full border border-ink/20 px-7 py-4 font-medium transition hover:border-brand hover:text-brand">
                Start a project
              </a>
            </Magnetic>
          </div>

          <dl data-fade className="mt-12 flex flex-wrap gap-x-12 gap-y-5">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt data-count={s.n} data-suffix={s.suffix} className="font-display text-5xl tabular-nums">{s.n}{s.suffix}</dt>
                <dd className="text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-[1/1.1] w-full max-w-[560px]">
          {HERO_IMAGES.map((img, i) => (
            <div key={img.file} data-speed={COLLAGE[i].speed} className={`absolute ${COLLAGE[i].cls}`}>
              <TiltCard phase={i * 650}>
                <img
                  data-collage
                  src={img.src}
                  alt=""
                  width={img.w}
                  height={img.h}
                  fetchPriority={i < 2 ? "high" : "auto"}
                  className="w-full rounded-xl ring-1 ring-ink/10 shadow-[0_30px_60px_-20px_rgba(20,9,31,0.45)]"
                />
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
