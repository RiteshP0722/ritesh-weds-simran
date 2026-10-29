"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Page-wide motion:
 * - `.rv` elements below the fold flip up in 3D as they scroll into view
 * - `.tilt` cards lean toward the mouse pointer
 * - the hero layers drift with the pointer / phone tilt (parallax)
 */
export default function RevealOnScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cleanups: (() => void)[] = [];

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              const el = en.target as HTMLElement;
              el.classList.remove("pre");
              io.unobserve(el);
              // Drop the stagger delay once revealed so the tilt responds instantly
              setTimeout(() => (el.style.transitionDelay = ""), 1400);
            }
          }),
        { threshold: 0.12 }
      );
      document.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add("pre");
          io.observe(el);
        }
      });
      document.querySelectorAll(".ev-grid,.fam-grid").forEach((g) =>
        Array.from(g.children as HTMLCollectionOf<HTMLElement>).forEach((c, i) => (c.style.transitionDelay = (i % 4) * 110 + "ms"))
      );
      cleanups.push(() => io.disconnect());
    }

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let current: HTMLElement | null = null;
      const reset = (el: HTMLElement) => {
        el.style.removeProperty("--rx");
        el.style.removeProperty("--ry");
        el.classList.remove("is-tilting");
      };
      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element).closest<HTMLElement>(".tilt");
        if (current && current !== el) reset(current);
        current = el;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.classList.add("is-tilting");
        el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => document.removeEventListener("pointermove", onMove));
    }

    const hero = document.querySelector<HTMLElement>(".hero");
    if (hero) {
      const set = (x: number, y: number) => {
        hero.style.setProperty("--mx", x.toFixed(3));
        hero.style.setProperty("--my", y.toFixed(3));
      };
      const onPointer = (e: PointerEvent) => set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
      const onTilt = (e: DeviceOrientationEvent) => {
        if (e.gamma == null || e.beta == null) return;
        set(Math.max(-0.5, Math.min(0.5, e.gamma / 60)), Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60)));
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("deviceorientation", onTilt, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("deviceorientation", onTilt);
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
