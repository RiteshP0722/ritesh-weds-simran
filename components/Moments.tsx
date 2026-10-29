"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import { prefersReducedMotion } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { Moment } from "@/types/wedding";

const CARD_W = 190;

/** Photos placed around a real 3D ring that turns on its own, by buttons, or by swipe. */
export default function Moments({ moments }: { moments: Moment[] }) {
  const { p, t } = useLanguage();
  const n = moments.length;
  const [turn, setTurn] = useState(0);
  const hold = useRef(0);
  const startX = useRef<number | null>(null);

  const step = 360 / Math.max(n, 1);
  const radius = Math.round(CARD_W / 2 / Math.tan(Math.PI / Math.max(n, 3))) + 30;
  const active = ((turn % n) + n) % n;

  useEffect(() => {
    if (n < 2 || prefersReducedMotion()) return;
    const id = setInterval(() => {
      if (Date.now() > hold.current) setTurn((v) => v + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [n]);

  const go = (delta: number) => {
    hold.current = Date.now() + 6000;
    setTurn((v) => v + delta);
  };

  return (
    <section id="moments" className="moments-section">
      <SectionHead eyebrow={t("momentsEyebrow")} title={t("momentsTitle")} />

      <div
        className="ring-scene"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="ring" style={{ transform: `translateZ(${-radius}px) rotateY(${-turn * step}deg)` }}>
          {moments.map((mo, i) => (
            <figure
              key={i}
              className={`ring-card ${i === active ? "is-active" : ""}`}
              style={{ width: CARD_W, marginLeft: -CARD_W / 2, transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              <div className="ring-photo">
                <Photo src={mo.photo} index={i} label={String(i + 1)} alt={p(mo.cap)} />
              </div>
              <figcaption>{p(mo.cap)}</figcaption>
            </figure>
          ))}
        </div>
        <div className="ring-floor" aria-hidden="true" />
      </div>

      <div className="ring-controls">
        <button type="button" className="carousel-btn" onClick={() => go(-1)} aria-label="Previous photo">
          ‹
        </button>
        <span className="ring-count">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button type="button" className="carousel-btn" onClick={() => go(1)} aria-label="Next photo">
          ›
        </button>
      </div>
    </section>
  );
}
