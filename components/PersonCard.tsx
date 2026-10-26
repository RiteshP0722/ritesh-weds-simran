"use client";

import Corners from "./Corners";
import { useLanguage } from "@/lib/LanguageContext";
import type { Person } from "@/types/wedding";

interface Props {
  person: Person;
  isGroom: boolean;
  icon: string;
  gradient: string;
}

export default function PersonCard({ person, isGroom, icon, gradient }: Props) {
  const { lang, t } = useLanguage();

  const title = isGroom ? t("groomLabel") : t("brideLabel");
  const residencePrefix = t("residence");

  // English fallback lines for lineage if lang === "en"
  const getLineageLines = (): string[] => {
    if (lang === "hi") {
      return person.lines;
    }
    if (isGroom) {
      return [
        "Grandson of: Shri Ramkaran ji Prajapati",
        "Son of",
        "*Shri Mahesh ji Prajapati",
      ];
    }
    return [
      "Daughter of",
      "*Shri Kailash ji Prajapati",
    ];
  };

  const getPlace = (): string => {
    if (lang === "en") {
      return isGroom ? "Punasa" : "Indore";
    }
    return person.place;
  };

  const lines = getLineageLines();
  const place = getPlace();

  return (
    <div className="card person frame rv">
      <Corners />
      <div className="person-arch-top">
        <div className="avatar-frame">
          <div className="avatar-glow" />
          <div className="avatar">
            <div className="in" style={person.photo ? undefined : { background: `linear-gradient(135deg,${gradient})` }}>
              {person.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={person.photo} alt={person.full} loading="lazy" />
              ) : (
                <span className="fallback-initial">{(person.name || "?")[0]}</span>
              )}
            </div>
          </div>
          <div className="avatar-medallion">{icon}</div>
        </div>
      </div>

      <div className="person-body">
        <div className="person-badges">
          <span className="badge-hi">{title}</span>
        </div>

        <h3 className="person-name">{person.full}</h3>

        <div className="person-lineage">
          {lines.map((l, i) =>
            l.startsWith("*") ? (
              <div key={i} className="lineage-item highlighted">
                <span className="lineage-bullet">✦</span>
                <span className="lineage-text">{l.slice(1)}</span>
              </div>
            ) : (
              <div key={i} className="lineage-item">
                <span className="lineage-text">{l}</span>
              </div>
            )
          )}
        </div>

        {place && (
          <div className="res-badge">
            <span className="pin-icon">📍</span>
            <span>{residencePrefix}: {place}</span>
          </div>
        )}
      </div>
    </div>
  );
}
