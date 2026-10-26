"use client";

import Corners from "./Corners";
import Countdown from "./Countdown";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function Welcome({ data }: { data: WeddingData }) {
  const { lang, t } = useLanguage();

  const downloadCalendar = () => {
    const startDate = "20261211T123000Z";
    const endDate = "20261211T183000Z";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ritesh and Simran Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${data.groom.name} Weds ${data.bride.name} - Wedding Ceremony`,
      `DESCRIPTION:${data.tagline} - Shubh Lagna. Venue: ${data.venue.name}, ${data.venue.address}`,
      `LOCATION:${data.venue.name}, ${data.venue.address}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${data.groom.name}-Weds-${data.bride.name}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="welcome" className="welcome-section">
      <div className="auspicious-knot rv">
        <span className="knot-flower">🌸</span>
        <span className="knot-gold">✦ ॐ ✦</span>
        <span className="knot-flower">🌸</span>
      </div>

      <div className="invitation-intro card frame rv">
        <Corners />
        <div className="salutation">{t("salutation")}</div>
        <p className="welcome-verse">
          &ldquo;{t("welcomeVerse")}&rdquo;
        </p>
        <p className="lead">{t("lead")}</p>
        
        <div className="invitation-action-row">
          <button type="button" onClick={downloadCalendar} className="btn-action calendar-btn">
            <span>{t("addToCalendar")}</span>
          </button>
          <a href="#events" className="btn-action events-btn">
            <span>{t("viewFunctions")}</span>
          </a>
        </div>
      </div>

      <div className="count-wrap frame rv">
        <Corners />
        <div className="count-header">
          <div className="icon-ring">⏳</div>
          <div className="eyebrow gold-sub">{t("countdownEyebrow")}</div>
          <h3 className="count-title">{t("foreverBegins")}</h3>
        </div>
        <Countdown datetime={data.datetime} />
        <div className="count-footer">
          <div className="pill">{lang === "hi" ? "11 दिसंबर 2026" : data.datePill}</div>
          <p className="count-note">{t("timeNote")}</p>
        </div>
      </div>
    </section>
  );
}
