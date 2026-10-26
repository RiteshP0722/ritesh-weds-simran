"use client";

import PersonCard from "./PersonCard";
import SectionHead from "./SectionHead";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function Couple({ data }: { data: WeddingData }) {
  const { t } = useLanguage();

  return (
    <section id="couple" className="couple-section">
      <SectionHead
        eyebrow={t("coupleEyebrow")}
        title={t("coupleTitle")}
        top={<div className="section-motif">⚜️</div>}
        bottom={<div className="sub">{t("coupleEyebrow")}</div>}
      />
      <div className="couple-wrapper">
        <PersonCard
          person={data.groom}
          isGroom={true}
          icon="👑"
          gradient="#b88a35,#e5c27a"
        />

        <div className="couple-connector rv" aria-hidden="true">
          <div className="connector-line" />
          <div className="connector-badge">
            <span className="connector-om">{t("weds")}</span>
          </div>
          <div className="connector-line" />
        </div>

        <PersonCard
          person={data.bride}
          isGroom={false}
          icon="👰‍♀️"
          gradient="#d98c8c,#f0c3a8"
        />
      </div>
    </section>
  );
}
