import { useEffect, useRef } from "react";
import { animate, splitText, stagger, utils } from "animejs";
import { reducedMotion } from "../lib/env";

/**
 * Anime.js text effect: splits the heading into words and characters, masks each character,
 * then rises them into place with a stagger when the heading scrolls into view.
 * `accessible` keeps the full text readable for screen readers.
 */
export default function SplitHeading({ as: Tag = "h2", children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const el = ref.current;
    const split = splitText(el, { words: { wrap: "clip" }, chars: true, accessible: true });
    utils.set(split.chars, { y: "115%", opacity: 0 });

    const anim = animate(split.chars, {
      y: "0%",
      opacity: 1,
      duration: 1000,
      delay: stagger(24),
      ease: "outExpo",
      autoplay: false,
    });

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { anim.play(); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      anim.revert();
      split.revert();
    };
  }, []);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
