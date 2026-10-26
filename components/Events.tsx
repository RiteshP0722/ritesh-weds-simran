"use client";

import SectionHead from "./SectionHead";
import Corners from "./Corners";
import { groupEventsByDay } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingEvent } from "@/types/wedding";

function getEventTheme(title: string): string {
  if (title.includes("हल्दी") || title.includes("Haldi")) return "ev-haldi";
  if (title.includes("संगीत") || title.includes("Sangeet")) return "ev-sangeet";
  if (title.includes("लग्न") || title.includes("विवाह") || title.includes("Wedding")) return "ev-lagna";
  if (title.includes("बारात") || title.includes("Baraat")) return "ev-baraat";
  if (title.includes("सगाई") || title.includes("Engagement")) return "ev-sagai";
  if (title.includes("भोज") || title.includes("Feast")) return "ev-bhoj";
  return "ev-default";
}

const DAY_TRANSLATIONS: Record<string, string> = {
  "बुधवार, 9 दिसंबर 2026": "Wednesday, 9th December 2026",
  "गुरुवार, 10 दिसंबर 2026": "Thursday, 10th December 2026",
  "शुक्रवार, 11 दिसंबर 2026": "Friday, 11th December 2026",
};

function EventCard({ e, lang }: { e: WeddingEvent; lang: "hi" | "en" }) {
  const themeClass = getEventTheme(e.title + " " + e.en);
  const primaryTitle = lang === "hi" ? e.title : e.en || e.title;
  const secondaryTitle = lang === "hi" ? e.en : e.title;

  return (
    <div className={`card ev ${themeClass} frame rv`}>
      <Corners />
      <div className="ev-icon-wrapper">
        <span className="ev-icon">{e.icon || "✨"}</span>
      </div>

      <div className="ev-content">
        <h4 className="ev-title">{primaryTitle}</h4>
        {secondaryTitle && <p className="ev-en eyebrow">{secondaryTitle}</p>}

        <div className="ev-meta-pills">
          {e.time && (
            <span className="ev-pill ev-time">
              <span>🕰️</span> {e.time}
            </span>
          )}
          {e.date && (
            <span className="ev-pill ev-date">
              <span>📅</span> {e.date}
            </span>
          )}
        </div>

        {e.note && <p className="ev-note">{e.note}</p>}
        {e.quote && <p className="ev-quote">&ldquo;{e.quote}&rdquo;</p>}
      </div>
    </div>
  );
}

export default function Events({ events }: { events: WeddingEvent[] }) {
  const { lang, t } = useLanguage();
  const days = groupEventsByDay(events);

  return (
    <section id="events" className="events-section">
      <SectionHead
        eyebrow={t("eventsEyebrow")}
        title={t("eventsTitle")}
        top={<div className="section-motif">🌺</div>}
        bottom={<div className="sub">{t("eventsSub")}</div>}
      />

      <div className="days-container">
        {days.map((g, dayIdx) => {
          const displayDay = lang === "en" ? DAY_TRANSLATIONS[g.day] || g.day : g.day;
          return (
            <div key={g.day} className="day-group">
              <div className="day-ribbon-wrapper rv">
                <div className="day-ribbon">
                  <span className="day-kalash">🪔</span>
                  <h3 className="day-title">{displayDay}</h3>
                  <span className="day-kalash">🪔</span>
                </div>
              </div>

              <div className="ev-grid">
                {g.items.map((e, i) => (
                  <EventCard key={`${dayIdx}-${i}`} e={e} lang={lang} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="events-footer-blessing rv">
        <span className="bless-ornament">❖</span>
        <span>{t("eventsFooterBlessing")}</span>
        <span className="bless-ornament">❖</span>
      </div>
    </section>
  );
}
