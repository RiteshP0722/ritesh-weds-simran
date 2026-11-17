"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import { useLanguage } from "@/lib/LanguageContext";
import type { DiaryPhoto } from "@/types/wedding";

/** Tilt of each polaroid, repeated in this order. */
const TILTS = [-4, 3, -2, 4, -3, 2, -5, 3];

/**
 * "दर्शन डायरी": a scrapbook page of polaroids, each held on by a strip of tape,
 * with an old-camera date stamp. Tapping one opens it full screen (swipe or arrows to move).
 */
export default function Diary({ photos }: { photos: DiaryPhoto[] }) {
  const { p, t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const n = photos.length;

  if (!n) return null;

  return (
    <section id="diary" className="diary-section">
      <SectionHead eyebrow={t("diaryEyebrow")} title={t("diaryTitle")} />
      <p className="diary-hint">{t("diaryHint")}</p>

      <div className="diary-board">
        {photos.map((ph, i) => (
          <button
            key={ph.photo}
            type="button"
            className={`polaroid rv ${ph.wide ? "is-wide" : ""}`}
            style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` } as React.CSSProperties}
            onClick={() => setOpen(i)}
            aria-label={p(ph.cap)}
          >
            <span className="pol-tape" aria-hidden="true" />
            <span className="pol-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph.photo} alt="" loading="lazy" />
              {ph.stamp && <span className="pol-stamp">{ph.stamp}</span>}
            </span>
            <span className="pol-cap">{p(ph.cap)}</span>
            {ph.place && <span className="pol-place">📍 {p(ph.place)}</span>}
          </button>
        ))}
      </div>

      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} />}
    </section>
  );
}

function Lightbox({ photos, index, onIndex }: { photos: DiaryPhoto[]; index: number; onIndex: (i: number | null) => void }) {
  const { p } = useLanguage();
  const n = photos.length;
  const ph = photos[index];
  const startX = useRef<number | null>(null);
  const go = (d: number) => onIndex((index + d + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndex(null);
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
    };
  }, [index, n, onIndex]);

  return (
    <div
      className="diary-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={p(ph.cap)}
      onClick={(e) => e.target === e.currentTarget && onIndex(null)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <button type="button" className="lb-close" onClick={() => onIndex(null)} aria-label="Close">
        ✕
      </button>
      <figure key={ph.photo} className="lb-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ph.photo} alt={p(ph.cap)} />
        <figcaption>
          <strong>{p(ph.cap)}</strong>
          <span>
            {ph.place && <>📍 {p(ph.place)}</>}
            {ph.place && ph.stamp && " · "}
            {ph.stamp}
          </span>
        </figcaption>
      </figure>
      <div className="lb-nav">
        <button type="button" className="carousel-btn" onClick={() => go(-1)} aria-label="Previous photo">
          ‹
        </button>
        <span>
          {index + 1} / {n}
        </span>
        <button type="button" className="carousel-btn" onClick={() => go(1)} aria-label="Next photo">
          ›
        </button>
      </div>
    </div>
  );
}
