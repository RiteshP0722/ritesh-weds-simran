"use client";

import { useEffect, useRef, useState } from "react";
import Petals from "./Petals";
import { prefersReducedMotion } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

/**
 * Full-screen wedding photo slideshow. The photo stays pinned while the guest scrolls:
 * the names start small at the bottom, rise and grow, then the date and blessing come up from below.
 * Scroll progress (0 → 1) is written to the `--p` CSS variable.
 */
export default function Hero({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const { groom, bride } = data;
  const photos = data.heroPhotos.filter(Boolean);
  const [slide, setSlide] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (photos.length < 2 || prefersReducedMotion()) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % photos.length), 5000);
    return () => clearInterval(id);
  }, [photos.length]);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    if (prefersReducedMotion()) {
      hero.classList.add("is-static");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = hero.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / total)) : 1;
      hero.style.setProperty("--p", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const [y, m, d] = data.datetime.slice(0, 10).split("-");

  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero-sticky">
        <div className="hero-slides" aria-hidden="true">
          {photos.map((src, i) => (
            <div key={src} className={`hero-slide ${i === slide ? "on" : ""}`} style={{ backgroundImage: `url(${src})` }} />
          ))}
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <Petals />
        <div className="hero-frame" aria-hidden="true">
          <span className="hf-tag">{t("shubhVivah")}</span>
        </div>

        <div className="hero-in">
          <div className="hero-top">
            <div className="hero-ganesh">{t("shreeGanesh")}</div>
            <div className="hero-rule" aria-hidden="true">
              <span />ॐ<span />
            </div>
          </div>
          <div className="hero-main">
            <div className="hero-eyebrow">{t("heroEyebrow")}</div>
            <h1 className="hero-names">
              {groom.alias?.en ?? groom.name.en} <span className="amp">&amp;</span> {bride.name.en}
            </h1>
            <p className="hero-hindi">
              {p(groom.prefix)} {p(groom.name)}
              {groom.alias && ` (${p(groom.alias)})`} <em>{t("sang")}</em> {p(bride.prefix)} {p(bride.name)}
            </p>
          </div>
          <div className="hero-details">
            <div className="hero-rule" aria-hidden="true">
              <span />❖<span />
            </div>
            <div className="hero-date">
              {d} • {m} • {y}
            </div>
            <p className="hero-lagna">{p(data.lagnaText)}</p>
            <p className="hero-quote">“{t("tagline")}”</p>
          </div>
        </div>

        {photos.length > 1 && (
          <div className="hero-dots">
            {photos.map((_, i) => (
              <button key={i} type="button" className={i === slide ? "on" : ""} onClick={() => setSlide(i)} aria-label={`Photo ${i + 1}`} />
            ))}
          </div>
        )}

        <a className="scroll-invitation" href="#invitation">
          <span>{t("scrollInvitation")}</span>
          <span className="scroll-mouse" aria-hidden="true">
            <i />
          </span>
        </a>
      </div>
    </header>
  );
}
