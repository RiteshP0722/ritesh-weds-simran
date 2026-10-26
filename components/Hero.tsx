"use client";

import { useEffect, useState } from "react";
import Corners from "./Corners";
import { prefersReducedMotion } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

type Sparkle = { char: string; left: string; size: string; dx: string; dur: string; delay: string };

export default function Hero({ data }: { data: WeddingData }) {
  const { lang, t } = useLanguage();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setSparkles(
      Array.from({ length: 16 }, (_, i) => ({
        char: ["✦", "♥", "✿", "✨", "❖"][i % 5],
        left: Math.random() * 100 + "%",
        size: 11 + Math.random() * 14 + "px",
        dx: Math.random() * 80 - 40 + "px",
        dur: 10 + Math.random() * 10 + "s",
        delay: -Math.random() * 16 + "s",
      }))
    );
  }, []);

  return (
    <div className="hero frame" id="top">
      <Corners />

      {/* Floating subtle sparkles */}
      <div className="hearts" aria-hidden="true">
        {sparkles.map((h, i) => (
          <i
            key={i}
            style={{
              left: h.left,
              fontSize: h.size,
              animationDuration: h.dur,
              animationDelay: h.delay,
              ["--dx" as string]: h.dx,
            }}
          >
            {h.char}
          </i>
        ))}
      </div>

      <div className="hero-in">
        {/* Auspicious Invocation */}
        <div className="ganesha-badge">
          <div className="ganesha-aura" />
          <svg className="ganesha-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 8C36 8 26 17 26 29C26 38 31 43 36 46C34 50 32 56 32 63C32 75 41 84 52 84C62 84 69 77 71 68C72 63 72 58 71 54C75 51 79 46 80 40C81 33 76 26 69 22C66 13 59 8 50 8Z"
              stroke="url(#heroGoldGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 36C50 48 46 64 52 72C55 76 60 75 62 71C63 68 62 64 58 63"
              stroke="url(#heroGoldGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M46 22H54M47 25H53M50 18V28" stroke="url(#heroGoldGrad)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="70" cy="52" r="4.5" fill="url(#heroGoldGrad)" />
            <path d="M28 26C20 28 16 34 18 42C20 48 26 48 30 46" stroke="url(#heroGoldGrad)" strokeWidth="2" strokeLinecap="round" />
            <path d="M72 26C80 28 84 34 82 42C80 48 74 48 70 46" stroke="url(#heroGoldGrad)" strokeWidth="2" strokeLinecap="round" />
            <path d="M42 12L50 4L58 12" stroke="url(#heroGoldGrad)" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="heroGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff6d6" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa771c" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="shloka">
          <div className="shloka-main">{t("shreeGanesh")}</div>
          <div className="shloka-sub">{t("shloka")}</div>
        </div>

        <div className="invitation-ribbon">
          <span className="ribbon-text">{t("invitationBadge")}</span>
        </div>

        {/* Traditional Diyas and Monogram */}
        <div className="hero-diyas">
          <div className="diya diya-left" aria-hidden="true">
            <span className="flame" />
            <span className="lamp">🪔</span>
          </div>
          <div className="monogram-crest">
            <div className="crest-ring">
              <span className="crest-letter">{data.groom.name[0]}</span>
              <span className="crest-knot">💍</span>
              <span className="crest-letter">{data.bride.name[0]}</span>
            </div>
          </div>
          <div className="diya diya-right" aria-hidden="true">
            <span className="flame" />
            <span className="lamp">🪔</span>
          </div>
        </div>

        <div className="hero-blessing-line">{t("withBlessings")}</div>

        {/* Clean, Noble Couple Names - Simple and Attractive without cluttered cursive */}
        <h1 className="couple-names">
          <span className="name">{data.groom.name}</span>
          <span className="weds-symbol">
            <span className="weds-line" />
            <span className="weds-txt">{t("weds")}</span>
            <span className="weds-line" />
          </span>
          <span className="name">{data.bride.name}</span>
        </h1>

        <div className="royal-divider">
          <span className="divider-ornament">❖</span>
          <span className="divider-line" />
          <span className="divider-centre">💍</span>
          <span className="divider-line" />
          <span className="divider-ornament">❖</span>
        </div>

        <div className="date-badge">
          <span className="badge-dots">{data.dateDots}</span>
          <span className="badge-pill-note">{lang === "hi" ? "शुक्रवार, 11 दिसंबर 2026" : data.dateLong}</span>
        </div>

        <div className="auspicious-muhurat">
          ✨ {t("timeNote")} · {lang === "hi" ? "सायं 6:00 बजे" : data.timeText} ✨
        </div>

        <div className="tagline-quote">
          &ldquo;{t("tagline")}&rdquo;
        </div>

        <a className="scroll-invitation" href="#welcome" aria-label={t("scrollInvitation")}>
          <span className="scroll-txt">{t("scrollInvitation")}</span>
          <span className="scroll-chevron">▼</span>
        </a>
      </div>
    </div>
  );
}
