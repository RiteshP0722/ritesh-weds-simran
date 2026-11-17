"use client";

import { useEffect, useRef, useState } from "react";
import Petals from "./Petals";
import { couple, prefersReducedMotion, shortName } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

/**
 * Full-screen wedding photo slideshow. The photo stays pinned while the guest scrolls:
 * the names start small at the bottom, rise and grow, then the date and blessing come up from below.
 * Scroll progress (0 → 1) is written to the `--p` CSS variable.
 */
export default function Hero({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const [first, second] = couple(data);
  const photos = data.heroPhotos
    .map((ph) =>
      typeof ph === "string"
        ? { src: ph, whole: false, focus: undefined }
        : { src: ph.src, whole: ph.fit === "whole", focus: ph.focus }
    )
    .filter((ph) => ph.src);
  const [slide, setSlide] = useState(0);
  const ref = useRef<HTMLElement>(null);
  // width / height of each photo and of the screen, to spot a tall photo on a wide screen (or the reverse)
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [screenRatio, setScreenRatio] = useState(0);
  const srcKey = photos.map((ph) => ph.src).join("|");

  useEffect(() => {
    let alive = true;
    for (const src of srcKey.split("|").filter(Boolean)) {
      const img = new Image();
      img.onload = () => alive && setRatios((r) => ({ ...r, [src]: img.naturalWidth / img.naturalHeight }));
      img.src = src;
    }
    return () => {
      alive = false;
    };
  }, [srcKey]);

  useEffect(() => {
    const sync = () => setScreenRatio(window.innerWidth / window.innerHeight);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /**
   * Wide screens (laptop, iPad sideways) always fill edge to edge, using each photo's `focus`.
   * Tall screens (phones) show a wide photo whole over a blurred copy, since filling would cut the couple off.
   */
  const showWhole = (src: string, whole: boolean) => {
    const r = ratios[src];
    if (!screenRatio) return whole;
    if (screenRatio >= 1) return false;
    return whole || (r !== undefined && r > 1);
  };

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
          {photos.map(({ src, whole, focus }, i) =>
            showWhole(src, whole) ? (
              <div key={src} className={`hero-slide is-whole ${i === slide ? "on" : ""}`}>
                <div className="hs-blur" style={{ backgroundImage: `url(${src})` }} />
                <div className="hs-img" style={{ backgroundImage: `url(${src})` }} />
              </div>
            ) : (
              <div
                key={src}
                className={`hero-slide ${i === slide ? "on" : ""}`}
                style={{ backgroundImage: `url(${src})`, backgroundPosition: focus }}
              />
            )
          )}
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
              {shortName(first, "en")} <span className="amp">&amp;</span> {shortName(second, "en")}
            </h1>
            <p className="hero-hindi">
              {[first, second].map((x, i) => (
                <span key={i}>
                  {i > 0 && (
                    <>
                      {" "}
                      <em>{t("sang")}</em>{" "}
                    </>
                  )}
                  {p(x.prefix)} {p(x.name)}
                  {x.alias && ` (${p(x.alias)})`}
                </span>
              ))}
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
