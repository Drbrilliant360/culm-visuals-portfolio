import { motion } from "motion/react";
import { CASES } from "../data/content";
import { useLightbox } from "./Lightbox";

function Fact({ label, children }) {
  return (
    <div>
      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-deep">{label}</dt>
      <dd className="mt-1.5 leading-relaxed text-ink-2">{children}</dd>
    </div>
  );
}

/**
 * Layout:
 *  - phones: title → swipeable poster strip → story (the work comes first)
 *  - lg+:    sticky text column (title + story) beside a poster grid
 * The text wrapper uses `display: contents` on phones so its two children can be re-ordered around the posters.
 */
function Case({ c, index }) {
  const { open } = useLightbox();
  return (
    <article id={`case-${c.id}`} className="flex scroll-mt-24 flex-col gap-8 border-t border-ink/15 py-10 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-16">
      <div className="contents lg:sticky lg:top-28 lg:block lg:self-start">
        <header className="order-1">
          <p className="text-sm text-muted">
            <span className="mr-3 font-semibold text-brand">0{index + 1}</span>{c.tag}
          </p>
          <h3 className="display mt-4 text-[clamp(2.7rem,5.4vw,4.6rem)]">{c.name}</h3>
          <p className="mt-2 font-display text-2xl text-brand-deep">{c.title}</p>
        </header>

        <dl className="order-3 space-y-6 lg:mt-8">
          <Fact label="Overview">{c.overview}</Fact>
          <Fact label="The challenge">{c.challenge}</Fact>
          <Fact label="Creative direction">
            {c.direction}
            <span className="mt-3 flex gap-2" role="img" aria-label="Campaign colour palette">
              {c.colors.map((col) => (
                <i key={col} title={col} style={{ background: col }} className="h-7 w-7 rounded-full ring-1 ring-ink/15" />
              ))}
            </span>
          </Fact>
          <Fact label="Deliverables">{c.deliverables}</Fact>
          {/* TODO: add the real outcome here (reach, engagement, client feedback). Only use figures you can verify. */}
        </dl>
      </div>

      {/* phones: edge-to-edge horizontal swipe strip with snap · md+: 2-column grid */}
      <div
        role="group"
        aria-label={`${c.name} posters`}
        className="order-2 -mx-5 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
      >
        {c.shots.map((shot, i) => (
          <motion.button
            key={shot.file}
            type="button"
            data-cursor="VIEW"
            onClick={() => open(c.shots, i)}
            aria-label={`View ${shot.title}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`group w-[72%] shrink-0 snap-center overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-ink/10 shadow-[0_24px_50px_-28px_rgba(20,9,31,0.5)] md:w-auto md:shrink ${i === 0 && c.shots.length % 2 === 1 ? "md:col-span-2" : ""}`}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </motion.button>
        ))}
        <span aria-hidden="true" className="w-1 shrink-0 md:hidden" />
      </div>
      <p aria-hidden="true" className="order-2 -mt-4 text-xs text-muted md:hidden">Swipe to see all {c.shots.length} →</p>
    </article>
  );
}

export default function Cases() {
  return (
    <section id="cases" className="section-y mx-auto max-w-[1320px] scroll-mt-20 px-5 md:px-10">
      <p className="eyebrow">Case studies</p>
      <h2 className="display mt-5 max-w-[14ch] text-[clamp(3rem,7.2vw,6.4rem)]">Behind the <em className="text-brand">posters</em>.</h2>
      <p className="mt-5 max-w-[56ch] text-lg text-muted">Three projects, from the brief to the finished set.</p>
      <div className="mt-10">
        {CASES.map((c, i) => <Case key={c.id} c={c} index={i} />)}
      </div>
    </section>
  );
}
