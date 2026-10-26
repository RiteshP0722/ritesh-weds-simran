"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import { prefersReducedMotion } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { Moment } from "@/types/wedding";

const EN_MOMENTS_CAPS = [
  "Haldi & Blessings",
  "Musical Sangeet Night",
  "Engagement & Rings",
  "Seven Sacred Vows",
  "The Groom · Ritesh",
  "The Bride · Simran",
];

export default function Moments({ moments }: { moments: Moment[] }) {
  const { lang, t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const hold = useRef(false);

  const update = useCallback(() => {
    const m = trackRef.current;
    if (!m) return 0;
    const reduce = prefersReducedMotion();
    const centre = m.scrollLeft + m.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(m.children as HTMLCollectionOf<HTMLElement>).forEach((it, i) => {
      const dist = Math.abs(it.offsetLeft + it.offsetWidth / 2 - centre);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
      if (!reduce) it.style.transform = `scale(${1 - Math.min(dist / m.clientWidth, 1) * 0.08})`;
    });
    setActive(best);
    return best;
  }, []);

  const scrollTo = (index: number) => {
    const m = trackRef.current;
    if (!m) return;
    const items = m.children as HTMLCollectionOf<HTMLElement>;
    const target = items[index];
    if (target) {
      m.scrollTo({ left: target.offsetLeft - (m.clientWidth - target.offsetWidth) / 2, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const m = trackRef.current;
    if (!m) return;
    update();
    m.addEventListener("scroll", update, { passive: true });
    if (prefersReducedMotion() || !moments.length) return () => m.removeEventListener("scroll", update);

    const id = setInterval(() => {
      if (hold.current) return;
      const items = m.children as HTMLCollectionOf<HTMLElement>;
      const nextIdx = (update() + 1) % items.length;
      scrollTo(nextIdx);
    }, 4000);
    return () => {
      clearInterval(id);
      m.removeEventListener("scroll", update);
    };
  }, [moments.length, update]);

  const total = String(moments.length).padStart(2, "0");

  return (
    <section id="moments" className="moments-section">
      <SectionHead
        eyebrow={t("momentsEyebrow")}
        title={t("momentsTitle")}
        top={<div className="section-motif">📸</div>}
        bottom={<div className="sub">{t("momentsSub")}</div>}
      />

      <div className="moments-controls">
        <button
          type="button"
          className="carousel-btn prev"
          onClick={() => scrollTo((active - 1 + moments.length) % moments.length)}
          aria-label="Previous photo"
        >
          ‹
        </button>

        <div
          className="moments"
          ref={trackRef}
          onPointerDown={() => (hold.current = true)}
          onPointerUp={() => setTimeout(() => (hold.current = false), 3000)}
        >
          {moments.map((mo, i) => {
            const cap = lang === "en" && EN_MOMENTS_CAPS[i] ? EN_MOMENTS_CAPS[i] : mo.cap;

            return (
              <div key={i} className={`mo ${i === active ? "is-active" : ""}`}>
                <div className="mo-frame">
                  <Photo src={mo.photo} index={i} label={String(i + 1)} alt={cap} />
                </div>
                <div className="cap">
                  <div className="cap-title">{cap}</div>
                  <div className="cap-badge">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="cap-sep">/</span>
                    <span>{total}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="carousel-btn next"
          onClick={() => scrollTo((active + 1) % moments.length)}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      <div className="dots" aria-hidden="true">
        {moments.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot-pill ${i === active ? "on" : ""}`}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
