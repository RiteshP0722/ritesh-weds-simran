"use client";

import { useState } from "react";
import Corners from "./Corners";
import { mapEmbedUrl, mapUrl } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

/** स्नेहभोज with the venue, as on the card's front panel. */
export default function Venue({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard?.writeText(`${p(data.venue.name)}, ${p(data.venue.address)}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="venue" className="feast-section">
      <div className="card paper feast-card frame tilt rv">
        <Corners />
        <div className="eyebrow">{t("feastEyebrow")}</div>
        <div className="feast-plate" aria-hidden="true">
          <span>🍛</span>
        </div>
        <h2 className="feast-title">{p(data.feast.title)}</h2>
        <p className="feast-date">{p(data.feast.date)}</p>
        <p className="feast-time">{p(data.feast.time)}</p>

        <div className="feast-divider" aria-hidden="true">❖</div>

        <div className="map-embed">
          <iframe
            title={t("venueLabel")}
            src={mapEmbedUrl()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h3 className="feast-venue-label">{t("venueLabel")}</h3>
        <p className="feast-venue">{p(data.venue.name)}</p>
        <p className="feast-address">{p(data.venue.address)}</p>

        <div className="btn-row">
          <a className="btn-royal btn-gold" href={mapUrl(data)} target="_blank" rel="noopener noreferrer">
            {t("getDirections")}
          </a>
          <button type="button" className="btn-royal btn-outline" onClick={copyAddress}>
            {copied ? t("addressCopied") : t("copyAddress")}
          </button>
        </div>
      </div>
    </section>
  );
}
