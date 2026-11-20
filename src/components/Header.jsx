import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu01Icon, Cancel01Icon, WhatsappIcon, Call02Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { NAV, SECTION_IDS, STUDIO } from "../data/content";
import useActiveSection from "../lib/useActiveSection";
import { useScroll } from "./SmoothScroll";
import Magnetic from "./Magnetic";
import Icon from "./Icon";

const MENU_ITEMS = [...NAV, { id: "contact", label: "Contact" }];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { scrollTo, lock, unlock } = useScroll();
  const active = useActiveSection(SECTION_IDS);
  const menuBtn = useRef(null);
  const closeBtn = useRef(null);
  const panel = useRef(null);

  // Menu open: lock scroll, Escape closes, Tab stays inside the menu, focus moves in and comes back.
  useEffect(() => {
    if (!open) return;
    lock();
    closeBtn.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const f = [...panel.current.querySelectorAll("a[href], button")];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    const trigger = menuBtn.current;
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, lock, unlock]);

  // If the window grows to desktop width while the menu is open, close it.
  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // let the overlay release the scroll lock before scrolling
    setTimeout(() => scrollTo(`#${id}`), 80);
  };

  return (
    <>
      <a href="#work" onClick={go("work")} className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        Skip to work
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-5 md:px-10">
          <a href="#top" onClick={go("top")} className="flex items-center gap-2.5 font-sans text-lg font-extrabold tracking-tight" aria-label={`${STUDIO.name} home`}>
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-sm text-white" aria-hidden="true">◗</span>
            {STUDIO.name}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => {
              const current = active === n.id;
              return (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  aria-current={current ? "location" : undefined}
                  className={`group relative py-1 text-sm transition-colors ${current ? "text-ink" : "text-ink-2/80 hover:text-ink"}`}
                >
                  {n.label}
                  <span className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-brand transition-transform duration-300 ${current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </a>
              );
            })}
            <Magnetic strength={0.35}>
              <a
                href="#contact"
                onClick={go("contact")}
                aria-current={active === "contact" ? "location" : undefined}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-brand aria-[current=location]:bg-brand"
              >
                Let’s talk
              </a>
            </Magnetic>
          </nav>

          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 active:scale-95 md:hidden"
          >
            <Icon icon={Menu01Icon} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 34px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 34px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 34px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ink text-paper md:hidden"
          >
            {/* The overlay needs its own top bar: the header sits underneath it. */}
            <div className="flex h-[68px] shrink-0 items-center justify-between px-5">
              <span className="flex items-center gap-2.5 font-sans text-lg font-extrabold tracking-tight">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-sm text-white" aria-hidden="true">◗</span>
                {STUDIO.name}
              </span>
              <button ref={closeBtn} type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-paper/25 active:scale-95">
                <Icon icon={Cancel01Icon} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-6 py-4">
              <ul>
                {MENU_ITEMS.map((n, i) => {
                  const current = active === n.id;
                  return (
                    <motion.li key={n.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 + i * 0.06, duration: 0.5 }} className="border-b border-paper/10">
                      <a
                        href={`#${n.id}`}
                        onClick={go(n.id)}
                        aria-current={current ? "location" : undefined}
                        className={`flex items-baseline gap-4 py-2.5 transition-colors active:text-lilac ${current ? "text-accent" : "text-paper"}`}
                      >
                        <span className="w-6 text-xs font-semibold tracking-[0.14em] text-lilac/70">0{i + 1}</span>
                        <span className="display text-[2.4rem]">{n.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="shrink-0 space-y-3 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4"
            >
              <a href={STUDIO.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-full bg-accent font-medium text-ink active:scale-[0.98]">
                <Icon icon={WhatsappIcon} size={20} /> WhatsApp us <Icon icon={ArrowUpRight01Icon} size={16} />
              </a>
              <a href={STUDIO.phones[0].href} className="flex h-14 items-center justify-center gap-2 rounded-full border border-paper/25 font-medium active:scale-[0.98]">
                <Icon icon={Call02Icon} size={18} /> {STUDIO.phones[0].label}
              </a>
              <p className="pt-1 text-center text-xs text-lilac">{STUDIO.handle} · {STUDIO.city}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
