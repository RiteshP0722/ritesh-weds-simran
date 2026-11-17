"use client";

import Corners from "./Corners";
import Countdown from "./Countdown";
import PersonCard from "./PersonCard";
import ScratchDate from "./ScratchDate";
import SectionHead from "./SectionHead";
import { useLanguage } from "@/lib/LanguageContext";
import { couple, shortName } from "@/lib/utils";
import type { WeddingData } from "@/types/wedding";

/** Card page 2: Vishnu mangalam, the invitation text, bride & groom, countdown. */
export default function Invitation({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const [first, second] = couple(data);

  const downloadCalendar = () => {
    const start = new Date(`${data.datetime}:00+05:30`);
    const end = new Date(start.getTime() + 3 * 36e5);
    const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const title = `${shortName(first, "en")} weds ${shortName(second, "en")} - ${data.lagnaText.en}`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ritesh weds Simran//EN",
      "BEGIN:VEVENT",
      `UID:${stamp(start)}@ritesh-weds-simran`,
      `DTSTAMP:${stamp(new Date())}`,
      `SUMMARY:${title}`,
      `LOCATION:${data.venue.mapQuery.replace(/,/g, "\\,")}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${shortName(first, "en")}-weds-${shortName(second, "en")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="invitation" className="invite-section">
      <SectionHead eyebrow={t("inviteEyebrow")} title={t("inviteTitle")} />

      <div className="card paper invite-card frame rv">
        <Corners />
        <p className="invocation">{p(data.invocation)}</p>
        <p className="invite-intro">{p(data.intro)}</p>

        <div className="couple-grid">
          <PersonCard person={first} label={t(first === data.groom ? "groomLabel" : "brideLabel")} />
          <div className="couple-sang" aria-hidden="true">
            <svg className="sang-knot" viewBox="0 0 96 76" width="78" height="62">
              <defs>
                <linearGradient id="sangGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f3e3bd" />
                  <stop offset="0.35" stopColor="#c9a050" />
                  <stop offset="0.6" stopColor="#fff2cc" />
                  <stop offset="1" stopColor="#9b7330" />
                </linearGradient>
              </defs>
              {/* Gathbandhan thread: red and yellow, tied in a knot under the rings */}
              <path d="M6 58 C 26 70, 40 52, 48 60 C 56 52, 70 70, 90 58" fill="none" stroke="#c62828" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M6 61 C 26 73, 40 55, 48 63 C 56 55, 70 73, 90 61" fill="none" stroke="#f2a516" strokeWidth="2" strokeLinecap="round" />
              <circle cx="48" cy="61" r="3.6" fill="#c62828" stroke="#f2a516" strokeWidth="1.2" />
              {/* Two linked rings */}
              <circle cx="37" cy="30" r="16" fill="none" stroke="url(#sangGold)" strokeWidth="4.5" />
              <circle cx="59" cy="30" r="16" fill="none" stroke="url(#sangGold)" strokeWidth="4.5" />
              {/* Redraw a short arc of the first ring on top, so they look interlocked */}
              <path d="M45 16.14 A 16 16 0 0 1 50.86 22" fill="none" stroke="url(#sangGold)" strokeWidth="4.5" />
              {/* Small stone on the right ring */}
              <path d="M59 8 l4 4 -4 4 -4 -4z" fill="#b5536b" stroke="#fff2cc" strokeWidth="1" />
            </svg>
            <span className="sang-word">{t("sang")}</span>
          </div>
          <PersonCard person={second} label={t(second === data.groom ? "groomLabel" : "brideLabel")} />
        </div>

        <p className="invite-main">{p(data.invite)}</p>
        <p className="invite-bless">{p(data.blessing)}</p>
      </div>

      <ScratchDate data={data} />

      <div className="count-wrap frame rv">
        <Corners />
        <div className="eyebrow">{p(data.countdownLabel)}</div>
        <Countdown datetime={data.datetime} />
        <div className="count-foot">
          <span className="pill">{p(data.dateText)}</span>
          <span className="pill">{p(data.lagnaText)}</span>
        </div>
        <button type="button" onClick={downloadCalendar} className="btn-royal btn-outline">
          {t("addToCalendar")}
        </button>
      </div>
    </section>
  );
}
