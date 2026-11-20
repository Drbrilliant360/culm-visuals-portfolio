import { motion } from "motion/react";
import { ArrowUpRight01Icon, InstagramIcon, WhatsappIcon, Call02Icon } from "@hugeicons/core-free-icons";
import Icon from "./Icon";
import { STUDIO } from "../data/content";
import Magnetic from "./Magnetic";
import SplitHeading from "./SplitHeading";
import { PosterWall } from "./Backdrops";

const WALL = ["sensitivity-2026", "mtulo-new-year", "movie-night", "jupiter-mabati", "dare-to-dream", "he-is-risen", "hearing-day", "back-to-eden-today"];

const primary = "inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-brand-deep transition hover:bg-accent hover:text-ink active:scale-[0.98] sm:w-auto";
const ghost = "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 px-6 py-4 font-medium text-white transition hover:bg-white/15 active:scale-[0.98] sm:w-auto";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1320px] scroll-mt-20 px-5 pb-10 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] bg-brand-deep px-6 py-16 text-center text-white md:rounded-[3rem] md:px-16 md:py-24"
      >
        <PosterWall files={WALL} className="opacity-[0.17] mix-blend-luminosity" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -right-20 h-[26rem] w-[26rem] rounded-full bg-lilac/40 blur-3xl animate-blob [animation-delay:-9s]" />
        </div>

        <div className="relative">
          <p className="eyebrow justify-center !text-lilac before:!bg-lilac">Contact</p>
          <SplitHeading className="display mx-auto mt-6 max-w-[13ch] text-[clamp(3.2rem,9vw,7.6rem)]">Have a <em className="text-accent">project</em> in mind?</SplitHeading>
          <p className="mx-auto mt-6 max-w-[48ch] text-lg text-white/80">
            Let’s create something meaningful together. Tell us about your brand and what you need.
          </p>

          <div className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <Magnetic full><a href={STUDIO.whatsapp} target="_blank" rel="noopener noreferrer" className={primary}><Icon icon={WhatsappIcon} size={18} /> WhatsApp us <Icon icon={ArrowUpRight01Icon} size={16} /></a></Magnetic>
            <Magnetic full><a href={STUDIO.instagram} target="_blank" rel="noopener noreferrer" className={ghost}><Icon icon={InstagramIcon} size={18} /> {STUDIO.handle}</a></Magnetic>
            {STUDIO.phones.map((p) => (
              <Magnetic full key={p.href}><a href={p.href} className={ghost}><Icon icon={Call02Icon} size={16} /> {p.label}</a></Magnetic>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
