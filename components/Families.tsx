"use client";

import SectionHead from "./SectionHead";
import Corners from "./Corners";
import { useLanguage } from "@/lib/LanguageContext";
import type { FamilyGroup } from "@/types/wedding";

const EN_FAMILY_TITLES: Record<string, { title: string; sub: string }> = {
  "विनीत": { title: "Cordially Invited By", sub: "Vinit" },
  "दर्शनाभिलाषी": { title: "With Best Compliments", sub: "Darshanabhilashi" },
  "विशेष आग्रह": { title: "Special Request", sub: "Phoophaji & Relatives" },
  "ननिहाल पक्ष": { title: "Maternal Family", sub: "Nanihal Paksha" },
};

export default function Families({ families }: { families: FamilyGroup[] }) {
  const { lang, t } = useLanguage();

  if (!families.length) return null;

  return (
    <section id="families" className="families-section">
      <SectionHead
        eyebrow={t("familiesEyebrow")}
        title={t("familiesTitle")}
        top={<div className="section-motif">🦚</div>}
        bottom={<div className="sub">{t("familiesSub")}</div>}
      />

      <div className="fam-intro card frame rv">
        <Corners />
        <p className="fam-blessing-verse">
          &ldquo;{t("familiesVerse")}&rdquo;
        </p>
      </div>

      <div className="fam-grid">
        {families.map((f, i) => {
          const info = lang === "en" && EN_FAMILY_TITLES[f.title]
            ? EN_FAMILY_TITLES[f.title]
            : { title: f.title, sub: f.sub };

          return (
            <div key={i} className="card fam-card frame rv">
              <Corners />
              <div className="fam-header">
                <span className="fam-badge-icon">⚜️</span>
                <h4 className="fam-title">{info.title}</h4>
                {info.sub && <p className="fam-sub eyebrow">{info.sub}</p>}
              </div>
              <ul className="fam-names">
                {f.names.map((n, j) => (
                  <li key={j} className="fam-name-item">
                    <span className="bullet-star">✦</span>
                    <span className="name-text">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
