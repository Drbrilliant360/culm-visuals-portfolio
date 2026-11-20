import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp01Icon, Image01Icon, SparklesIcon, BookOpen01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { SECTION_IDS } from "../data/content";
import useActiveSection from "../lib/useActiveSection";
import { useScroll } from "./SmoothScroll";
import Icon from "./Icon";

const ITEMS = [
  { id: "top", label: "Top", icon: ArrowUp01Icon },
  { id: "work", label: "Work", icon: Image01Icon },
  { id: "services", label: "Services", icon: SparklesIcon },
  { id: "cases", label: "Cases", icon: BookOpen01Icon },
  { id: "contact", label: "Contact", icon: Mail01Icon },
];

/**
 * Phone-only bottom navigation. Thumb-reachable, shows the current section,
 * appears after the hero and hides while the menu or lightbox is open.
 */
export default function MobileDock() {
  const [past, setPast] = useState(false);
  const { scrollTo, locked } = useScroll();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = past && !locked;

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Quick navigation"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
          className="fixed left-1/2 z-40 -translate-x-1/2 md:hidden"
        >
          <ul className="flex items-center gap-1 rounded-full border border-paper/10 bg-ink/90 p-1.5 shadow-[0_18px_40px_-12px_rgba(20,9,31,0.6)] backdrop-blur-xl">
            {ITEMS.map(({ id, label, icon }) => {
              const current = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(`#${id}`); }}
                    aria-current={current ? "location" : undefined}
                    className={`relative flex min-h-[48px] min-w-[58px] flex-col items-center justify-center gap-0.5 rounded-full px-2.5 text-[0.62rem] font-medium tracking-wide transition-colors active:scale-95 ${current ? "text-white" : "text-paper/70"}`}
                  >
                    {current && <motion.span layoutId="dock-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                    <Icon icon={icon} size={18} className="relative" />
                    <span className="relative">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
