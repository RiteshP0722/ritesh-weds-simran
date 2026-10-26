"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/** Fades in every `.rv` element that starts below the fold as it scrolls into view. */
export default function RevealOnScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.remove("pre");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("pre");
        io.observe(el);
      }
    });
    // Stagger cards inside grids
    document.querySelectorAll(".ev-grid,.fam,.pola-grid").forEach((g) =>
      Array.from(g.children as HTMLCollectionOf<HTMLElement>).forEach((c, i) => (c.style.transitionDelay = (i % 4) * 90 + "ms"))
    );
    return () => io.disconnect();
  }, []);
  return null;
}
