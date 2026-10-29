"use client";

import SectionHead from "./SectionHead";
import { groupEventsByDay } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { Day, WeddingEvent } from "@/types/wedding";

export default function Events({ days, events }: { days: Day[]; events: WeddingEvent[] }) {
  const { lang, p, t } = useLanguage();
  const groups = groupEventsByDay(days, events);

  return (
    <section id="events" className="events-section">
      <SectionHead eyebrow={t("eventsEyebrow")} title={t("eventsTitle")} />

      <div className="timeline">
        {groups.map(({ day, items }) => (
          <div key={day.id} className="day-group">
            <div className="day-ribbon rv">
              <span className="day-date">{day.date}</span>
              <h3 className="day-title">{p(day.label)}</h3>
            </div>

            <div className="ev-grid">
              {items.map((e, i) => (
                <article key={i} className={`card paper ev tilt rv ${e.main ? "ev-main" : ""}`}>
                  <div className="ev-coin" aria-hidden="true">
                    <span>{e.icon}</span>
                  </div>
                  <div className="ev-body">
                    <h4 className="ev-title">{p(e.title)}</h4>
                    <p className="ev-sub">{lang === "hi" ? e.title.en : e.title.hi}</p>
                    <p className="ev-time">🕰️ {p(e.time)}</p>
                    {e.note && <p className="ev-note">{p(e.note)}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
