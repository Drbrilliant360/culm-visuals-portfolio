import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";
import { reducedMotion } from "../lib/env";

/** Anime.js scrambleText: the text resolves out of random characters when it mounts. */
export default function ScrambleText({ text, className = "", as: Tag = "span", chars = "A-Z0-9" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const el = ref.current;
    const anim = animate(el, { innerHTML: scrambleText({ text, chars, settleDuration: 380 }), duration: 900, ease: "linear" });
    return () => {
      anim.cancel();
      el.textContent = text;
    };
  }, [text, chars]);

  return <Tag ref={ref} className={className} aria-label={text}>{text}</Tag>;
}
