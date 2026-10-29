"use client";

import SectionHead from "./SectionHead";
import Corners from "./Corners";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function Families({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();

  return (
    <section id="families" className="families-section">
      <SectionHead eyebrow={t("familiesEyebrow")} title={t("familiesTitle")} />

      <div className="fam-grid">
        {data.families.map((f, i) => (
          <div key={i} className="card paper fam-card frame tilt rv">
            <Corners />
            <h4 className="fam-title">…{p(f.title)}…</h4>
            {f.parts.map((part, j) => (
              <div key={j} className="fam-part">
                {part.label && <div className="fam-part-label">{p(part.label)}</div>}
                <ul className="fam-names">
                  {part.names.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="card kids-card tilt rv">
        <div className="kids-balloons" aria-hidden="true">
          🎈<span>🎈</span>🎈
        </div>
        <h4 className="kids-title">{t("kidsTitle")}</h4>
        <p className="kids-text">{p(data.kidsRequest.text)}</p>
        <p className="kids-names">— {data.kidsRequest.names}</p>
      </div>
    </section>
  );
}
