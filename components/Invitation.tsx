"use client";

import Corners from "./Corners";
import Countdown from "./Countdown";
import PersonCard from "./PersonCard";
import SectionHead from "./SectionHead";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

/** Card page 2: Vishnu mangalam, the invitation text, bride & groom, countdown. */
export default function Invitation({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();

  const downloadCalendar = () => {
    const start = new Date(`${data.datetime}:00+05:30`);
    const end = new Date(start.getTime() + 3 * 36e5);
    const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const title = `${data.groom.alias?.en ?? data.groom.name.en} weds ${data.bride.name.en} - Shubh Lagna`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ritesh weds Simran//EN",
      "BEGIN:VEVENT",
      `UID:${stamp(start)}@ritesh-weds-simran`,
      `DTSTAMP:${stamp(new Date())}`,
      `SUMMARY:${title}`,
      "LOCATION:Indore, Madhya Pradesh",
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Ritesh-weds-Simran.ics";
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
          <PersonCard person={data.groom} label={t("groomLabel")} />
          <div className="couple-sang" aria-hidden="true">
            <span className="sang-hands">🤝</span>
            <span className="sang-word">{t("sang")}</span>
          </div>
          <PersonCard person={data.bride} label={t("brideLabel")} />
        </div>

        <p className="invite-main">{p(data.invite)}</p>
        <p className="invite-bless">{p(data.blessing)}</p>
      </div>

      <div className="count-wrap frame rv">
        <Corners />
        <div className="eyebrow">{t("countdownEyebrow")}</div>
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
