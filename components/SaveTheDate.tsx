"use client";

import SectionHead from "./SectionHead";
import Corners from "./Corners";
import { mapUrl } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function SaveTheDate({ data }: { data: WeddingData }) {
  const { lang, t } = useLanguage();
  const gmap = mapUrl(data);

  return (
    <section id="savethedate" className="std-section">
      <SectionHead
        eyebrow={t("saveDateEyebrow")}
        title={t("saveDateTitle")}
        top={<div className="section-motif">🪔</div>}
        bottom={<div className="sub">{t("saveDateEyebrow")}</div>}
      />
      <div className="std-grid">
        <div className="card std-card frame rv">
          <Corners />
          <div className="std-icon-ring">📅</div>
          <p className="std-k eyebrow">{t("dateLabel")}</p>
          <h4 className="std-v-main">{lang === "hi" ? "11 दिसंबर 2026" : "11th December 2026"}</h4>
          <p className="std-v-sub">{lang === "hi" ? "शुक्रवार, 11 दिसंबर 2026" : data.dateLong}</p>
          <span className="std-tag">{t("paksha")}</span>
        </div>

        <div className="card std-card frame rv">
          <Corners />
          <div className="std-icon-ring">🕕</div>
          <p className="std-k eyebrow">{t("timeLabel")}</p>
          <h4 className="std-v-main">{lang === "hi" ? "सायं 6:00 बजे" : data.timeText}</h4>
          <p className="std-v-sub highlight-muhurat">✨ {t("timeNote")} ✨</p>
          <span className="std-tag">{t("shubhMuhurat")}</span>
        </div>

        <div className="card std-card frame rv">
          <Corners />
          <div className="std-icon-ring">📍</div>
          <p className="std-k eyebrow">{t("venueLabel")}</p>
          <h4 className="std-v-main">{data.venue.name}</h4>
          <p className="std-v-sub">{data.venue.address}</p>
          <a href={gmap} target="_blank" rel="noopener noreferrer" className="std-venue-link">
            <span>{t("viewMap")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
