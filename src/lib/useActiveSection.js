import { useEffect, useState } from "react";

// The pinned "reel" sits between Work and About, so it counts as part of Work.
const ALIAS = { reel: "work" };

/**
 * Scrollspy: returns the id of the section crossing the middle of the viewport,
 * or null while the hero is on screen.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const targets = [...ids, "reel"].map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(ALIAS[e.target.id] ?? e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    targets.forEach((t) => io.observe(t));

    // back at the very top → no section is active
    const onScroll = () => { if (window.scrollY < 200) setActive(null); };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [ids]);

  return active;
}
