import { motion } from "motion/react";
import { CLIENTS } from "../data/content";

export default function Clients() {
  return (
    <section id="clients" className="section-y mx-auto max-w-[1320px] scroll-mt-20 px-5 md:px-10">
      <p className="eyebrow">Clients</p>
      <h2 className="display mt-5 max-w-[16ch] text-[clamp(3rem,7.2vw,6.4rem)]">Brands we’ve <em className="text-brand">designed</em> for.</h2>

      <ul className="mt-10 flex flex-col font-display text-[clamp(1.7rem,3.8vw,3.5rem)] leading-tight sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-5 sm:gap-y-3">
        {CLIENTS.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            className="flex items-baseline gap-5 border-b border-ink/10 py-3 text-ink transition-colors hover:text-brand sm:border-0 sm:py-0"
          >
            {c}
            {i < CLIENTS.length - 1 && <span aria-hidden="true" className="hidden text-ink/20 sm:inline">/</span>}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
