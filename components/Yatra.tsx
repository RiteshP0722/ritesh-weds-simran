"use client";

import Photo from "./Photo";
import SectionHead from "./SectionHead";
import { useLanguage } from "@/lib/LanguageContext";
import type { Journey } from "@/types/wedding";

/**
 * "आस्था की यात्रा": the couple's temple visits, one under the other,
 * joined by a red-and-yellow kalava thread with a diya at each stop.
 */
export default function Yatra({ journeys }: { journeys: Journey[] }) {
  const { p, t } = useLanguage();
  if (!journeys.length) return null;

  return (
    <section id="yatra" className="yatra-section">
      <SectionHead eyebrow={t("yatraEyebrow")} title={t("yatraTitle")} />

      <ol className="yatra-list">
        {journeys.map((j, i) => (
          <li key={j.photo} className={`yatra-stop rv ${i % 2 ? "is-right" : "is-left"}`}>
            <span className="yatra-knot" aria-hidden="true">
              {j.icon}
            </span>
            <figure className="yatra-card">
              <div className="yatra-photo">
                <Photo src={j.photo} index={i} label={j.icon} alt={p(j.place)} />
                {j.date && <span className="yatra-date">{p(j.date)}</span>}
              </div>
              <figcaption>
                <strong>{p(j.place)}</strong>
                <span>{p(j.line)}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      <p className="yatra-foot rv">🪔 {t("yatraFoot")} 🪔</p>
    </section>
  );
}
