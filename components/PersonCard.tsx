"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { Person } from "@/types/wedding";

export default function PersonCard({ person, label }: { person: Person; label: string }) {
  const { p } = useLanguage();

  return (
    <div className="person tilt">
      <div className="person-arch">
        {person.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={person.photo} alt={p(person.alias ?? person.name)} loading="lazy" />
        ) : (
          <span className="fallback-initial">{p(person.name)[0]}</span>
        )}
      </div>
      <span className="person-label">{label}</span>
      <h3 className="person-name">
        <small>{p(person.prefix)}</small> {p(person.name)}
        {person.alias && <span className="person-alias"> ({p(person.alias)})</span>}
      </h3>
      <ul className="person-lineage">
        {person.lines.map((l, i) => (
          <li key={i}>
            <span className="lin-label">{p(l.label)} :</span> {p(l.name)}
          </li>
        ))}
      </ul>
    </div>
  );
}
