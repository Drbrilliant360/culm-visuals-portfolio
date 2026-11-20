import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import Icon from "./Icon";
import ScrambleText from "./ScrambleText";
import { useScroll } from "./SmoothScroll";

const LightboxCtx = createContext({ open: () => {} });
export const useLightbox = () => useContext(LightboxCtx);

const slide = {
  enter: (d) => ({ opacity: 0, x: d * 70 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d * -70 }),
};

function Viewer({ items, index, onChange, onClose }) {
  const [dir, setDir] = useState(0);
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];

  const go = useCallback(
    (d) => {
      setDir(d);
      onChange((index + d + items.length) % items.length);
    },
    [index, items.length, onChange]
  );

  // Keyboard: Esc closes, arrows navigate, Tab is trapped inside the dialog.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && rootRef.current) {
        const f = [...rootRef.current.querySelectorAll("button")];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  useEffect(() => { closeRef.current?.focus(); }, []);

  const btn =
    "grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-brand hover:border-brand";

  return (
    <motion.div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 pb-24 backdrop-blur-md md:pb-4"
    >
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.figure
          key={item.file}
          custom={dir}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-h-full flex-col items-center gap-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.img
            drag="x"
            dragSnapToOrigin
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            draggable={false}
            src={item.src}
            alt={item.alt}
            width={item.w}
            height={item.h}
            className="max-h-[66dvh] w-auto max-w-full cursor-grab md:max-h-[76dvh] touch-pan-y rounded-lg object-contain shadow-2xl active:cursor-grabbing"
          />
          <figcaption className="text-center text-white">
            <ScrambleText as="b" text={item.title} className="font-display text-2xl" />
            <span className="mt-1 block text-sm text-lilac">
              {item.client} · {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={`${btn} absolute right-4 top-4`}>
        <Icon icon={Cancel01Icon} />
      </button>
      {items.length > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className={`${btn} absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2`}>
            <Icon icon={ArrowLeft01Icon} size={22} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next" className={`${btn} absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2`}>
            <Icon icon={ArrowRight01Icon} size={22} />
          </button>
        </>
      )}
    </motion.div>
  );
}

export default function LightboxProvider({ children }) {
  const [state, setState] = useState(null); // { items, index }
  const { lock, unlock } = useScroll();
  const triggerRef = useRef(null);
  const isOpen = Boolean(state);

  const open = useCallback((items, index = 0) => {
    triggerRef.current = document.activeElement;
    setState({ items, index });
  }, []);
  const close = useCallback(() => setState(null), []);
  const setIndex = useCallback((index) => setState((s) => (s ? { ...s, index } : s)), []);

  useEffect(() => {
    if (!isOpen) return;
    lock();
    return () => {
      unlock();
      triggerRef.current?.focus?.();
    };
  }, [isOpen, lock, unlock]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LightboxCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {state && <Viewer key="viewer" items={state.items} index={state.index} onChange={setIndex} onClose={close} />}
      </AnimatePresence>
    </LightboxCtx.Provider>
  );
}
