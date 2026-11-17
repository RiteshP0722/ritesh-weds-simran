"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import { prefersReducedMotion } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { Moment } from "@/types/wedding";

const CARD_W = 190;
const WIDE_QUERY = "(min-width: 700px)"; // iPad and desktop

/** Ring on phones; on iPad and desktop, a row of photos that slides in from the side as you scroll. */
export default function Moments({ moments }: { moments: Moment[] }) {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return wide ? <MomentsStrip moments={moments} /> : <MomentsRing moments={moments} />;
}

/**
 * The section pins in place while you scroll down, and the vertical scroll moves
 * the row of photos sideways, so each photo comes in from the right one after another.
 */
function MomentsStrip({ moments }: { moments: Moment[] }) {
  const { p, t } = useLanguage();
  const n = moments.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0); // how far the row can travel, in px
  const [x, setX] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (pin && track) setShift(Math.max(0, track.scrollWidth - pin.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (pinRef.current) ro.observe(pinRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [n]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const outer = outerRef.current;
      const pin = pinRef.current;
      if (!outer || !pin) return;
      const travel = outer.offsetHeight - pin.offsetHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -outer.getBoundingClientRect().top / travel)) : 0;
      setX(progress * shift);
      setActive(Math.round(progress * (n - 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [shift, n]);

  return (
    <section id="moments" className="moments-section moments-strip">
      {/* Extra height = how far the row travels, so one px of scroll moves it one px sideways */}
      <div ref={outerRef} className="strip-scroll" style={{ height: `calc(100vh + ${shift}px)` }}>
        <div ref={pinRef} className="strip-pin">
          <SectionHead eyebrow={t("momentsEyebrow")} title={t("momentsTitle")} />
          <div ref={trackRef} className="strip-track" style={{ transform: `translate3d(${-x}px, 0, 0)` }}>
            {moments.map((mo, i) => (
              <figure key={i} className={`strip-card ${mo.wide ? "is-wide" : ""} ${i === active ? "is-active" : ""}`}>
                <div className="strip-photo">
                  <Photo src={mo.photo} index={i} label={String(i + 1)} alt={p(mo.cap)} />
                </div>
                <figcaption>{p(mo.cap)}</figcaption>
              </figure>
            ))}
          </div>
          <span className="ring-count strip-count">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

/** Photos placed around a real 3D ring that turns on its own, by buttons, or by swipe. */
function MomentsRing({ moments }: { moments: Moment[] }) {
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
