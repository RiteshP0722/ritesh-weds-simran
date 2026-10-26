"use client";

import SectionHead from "./SectionHead";
import Photo from "./Photo";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function Story({ data }: { data: WeddingData }) {
  const { lang, t } = useLanguage();

  const storyQuote = lang === "en"
    ? "Love is not just looking at each other, it's looking in the same direction forever…"
    : data.storyQuote;

  return (
    <section id="story" className="story-section">
      <SectionHead
        eyebrow={t("storyEyebrow")}
        title={t("storyTitle")}
        top={<div className="section-motif">💖</div>}
        bottom={<div className="sub">{t("storySub")}</div>}
      />

      <div className="story-quote-card rv">
        <p className="story-quote">&ldquo;{storyQuote}&rdquo;</p>
        <p className="story-author">— {data.groom.name} &amp; {data.bride.name}</p>
      </div>

      <div className="pola-grid">
        {data.story.map((s, i) => {
          const mainText = lang === "hi" ? s.hi : s.en;
          const subText = lang === "hi" ? s.en : s.hi;

          return (
            <div key={i} className="pola rv">
              <div className="pola-inner">
                <div className="washi-tape" />
                <div className="pola-frame">
                  <Photo src={s.photo} index={i} label="♥" alt={mainText} />
                </div>
                <div className="pola-caption">
                  <div className="pola-title">{mainText}</div>
                  <div className="pola-hi">&ldquo;{subText}&rdquo;</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
