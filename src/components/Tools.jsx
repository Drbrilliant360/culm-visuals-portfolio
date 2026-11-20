import { motion } from "motion/react";
import { TOOLS } from "../data/content";
import { CropMarks, GridGuides, Swatches } from "./Backdrops";

export default function Tools() {
  return (
    <section id="tools" className="relative scroll-mt-20 overflow-hidden bg-paper-2">
      <GridGuides tone="light" className="absolute inset-0" />
      <CropMarks className="text-ink/25" />

      <div className="section-y relative mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Tools</p>
            <h2 className="display mt-5 text-[clamp(3rem,7.2vw,6.4rem)]">
              The <em className="text-brand">toolkit</em>.
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg text-muted">
              The software behind the posters, photography, video and motion work.
            </p>
          </div>
          <Swatches className="hidden md:flex" />
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {TOOLS.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-ink/10 bg-paper/80 p-4 shadow-[0_18px_40px_-26px_rgba(26,11,46,0.5)] backdrop-blur-sm transition-colors hover:border-brand/50 md:p-6"
            >
              <span aria-hidden="true" className="absolute right-4 top-4 text-xs font-semibold tracking-[0.14em] text-ink/30 md:right-6 md:top-6">
                0{i + 1}
              </span>
              <div className={`grid h-14 w-14 place-items-center overflow-hidden rounded-2xl shadow-[0_8px_20px_-10px_rgba(26,11,46,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110 md:h-16 md:w-16 ${t.tile}`}>
                <img src={t.logo} alt="" width="64" height="64" loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </div>
              <h3 className="mt-5 font-display text-[1.65rem] leading-tight md:mt-6 md:text-3xl">{t.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted md:text-[0.95rem]">{t.use}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
