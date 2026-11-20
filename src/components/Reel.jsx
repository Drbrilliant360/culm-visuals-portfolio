import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { REEL } from "../data/content";
import { useLightbox } from "./Lightbox";

const PIN_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * Campaign reel: vertical scroll drives a horizontal track while the section is pinned.
 * On phones (or with reduced motion) it degrades to a normal swipeable, scroll-snapping strip.
 */
export default function Reel() {
  const section = useRef(null);
  const track = useRef(null);
  const [pinned, setPinned] = useState(false);
  const { open } = useLightbox();

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, [pinned]);

  return (
    <section
      id="reel"
      ref={section}
      aria-label="Campaign reel"
      className={`relative bg-ink text-paper ${pinned ? "h-screen overflow-hidden" : "py-14"}`}
    >
      <div className={`flex flex-col justify-center gap-8 ${pinned ? "h-full" : ""}`}>
        <header className="mx-auto flex w-full max-w-[1320px] items-end justify-between gap-6 px-5 md:px-10">
          <div>
            <p className="eyebrow !text-lilac before:!bg-lilac">Campaign reel</p>
            <h2 className="display mt-4 text-[clamp(2.5rem,5.6vw,4.8rem)]">Posters that <em className="text-lilac">belong</em> together.</h2>
          </div>
          <p className="shrink-0 text-sm text-lilac">{pinned ? "Keep scrolling →" : "Swipe →"}</p>
        </header>

        <div className={pinned ? "overflow-visible" : "overflow-x-auto snap-x snap-mandatory [scrollbar-width:thin]"}>
          <div ref={track} className="flex w-max gap-5 px-5 md:gap-8 md:px-10">
            {REEL.map((item, i) => (
              <button
                key={item.file}
                type="button"
                data-cursor="VIEW"
                onClick={() => open(REEL, i)}
                aria-label={`View ${item.title}`}
                className="snap-center overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-2"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  loading="lazy"
                  decoding="async"
                  className="h-[56vh] w-auto max-w-none md:h-[62vh]"
                />
              </button>
            ))}
            <div aria-hidden="true" className="w-10 shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
