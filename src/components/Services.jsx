import { motion } from "motion/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Icon from "./Icon";
import { SERVICES } from "../data/content";
import { GridGuides, PosterWall } from "./Backdrops";

const WALL = ["mtulo-ramadan", "jupiter-mabati", "back-to-eden-today", "he-is-risen", "movie-night", "hearing-day", "dare-to-dream", "mtulo-labour-day", "sensitivity-2026", "culm-brand-launch"];

// Dark full-bleed band: breaks up the cream pages and carries the "30%" depth of the palette.
export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 overflow-hidden bg-ink text-paper">
      <PosterWall files={WALL} className="opacity-[0.11]" />
      <GridGuides tone="dark" className="absolute inset-0" />
      <div className="section-y relative mx-auto max-w-[1320px] px-5 md:px-10">
        <p className="eyebrow !text-lilac before:!bg-lilac">Services</p>
        <h2 className="display mt-5 max-w-[14ch] text-[clamp(3rem,7.2vw,6.4rem)]">What we can <em className="text-lilac">build</em> for you.</h2>

        <ul className="mt-10 border-b border-paper/15">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}
              className="group grid items-baseline gap-3 border-t border-paper/15 py-5 transition-colors hover:bg-brand/15 md:grid-cols-[5rem_1fr_1fr_2rem] md:gap-8 md:px-4"
            >
              <span className="text-sm font-semibold tracking-[0.14em] text-accent">0{i + 1}</span>
              <h3 className="font-display text-4xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">{s.title}</h3>
              <p className="max-w-[46ch] text-paper/70">{s.text}</p>
              <Icon icon={ArrowUpRight01Icon} size={24} className="hidden text-paper/30 transition group-hover:text-accent md:block" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
