"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";
import Corners from "./Corners";
import { mapUrl } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function Venue({ data }: { data: WeddingData }) {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const url = mapUrl(data);

  const copyAddress = () => {
    const full = `${data.venue.name}, ${data.venue.address}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="venue" className="venue-section">
      <SectionHead
        eyebrow={t("venueEyebrow")}
        title={t("venueTitle")}
        top={<div className="section-motif">🏰</div>}
        bottom={<div className="sub">{t("venueSub")}</div>}
      />

      <div className="card venue-card frame rv">
        <Corners />
        <div className="map-view">
          <div className="map-art" />
          <div className="map-marker-wrap">
            <span className="map-pulse" />
            <span className="map-pin">📍</span>
          </div>
          <div className="map-badge">
            <span>{t("venueBadge")}</span>
          </div>
        </div>

        <div className="venue-details">
          <div className="venue-eyebrow eyebrow">{t("venueTitle")}</div>
          <h3 className="venue-title">{data.venue.name}</h3>
          <p className="venue-address">{data.venue.address}</p>

          <div className="venue-chips">
            <span className="chip-item">📅 {lang === "hi" ? "11 दिसंबर 2026" : data.datePill}</span>
            <span className="chip-item">🕕 {lang === "hi" ? "सायं 6:00 बजे" : data.timeText} ({t("timeNote")})</span>
          </div>

          <div className="venue-actions">
            <a className="btn-royal btn-gold" href={url} target="_blank" rel="noopener noreferrer">
              <span>{t("getDirections")}</span>
            </a>
            <button type="button" className="btn-royal btn-outline" onClick={copyAddress}>
              <span>{copied ? t("addressCopied") : t("copyAddress")}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
