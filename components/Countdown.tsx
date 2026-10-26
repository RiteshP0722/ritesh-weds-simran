"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const pad = (v: number) => String(v).padStart(2, "0");

function remaining(target: number) {
  let d = Math.max(0, target - Date.now());
  const days = Math.floor(d / 864e5);
  d %= 864e5;
  const hours = Math.floor(d / 36e5);
  d %= 36e5;
  return { days, hours, mins: Math.floor(d / 6e4), secs: Math.floor((d % 6e4) / 1e3) };
}

function FlipDigit({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || prev.current === value) return;
    prev.current = value;
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
  }, [value]);
  return <b ref={ref}>{value}</b>;
}

export default function Countdown({ datetime }: { datetime: string }) {
  const { t } = useLanguage();
  const target = new Date(`${datetime}:00+05:30`).getTime();
  const [rem, setRem] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const tick = () => setRem(remaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [string, number | undefined][] = [
    [t("days"), rem?.days],
    [t("hours"), rem?.hours],
    [t("mins"), rem?.mins],
    [t("secs"), rem?.secs],
  ];

  return (
    <div className="count" aria-label="Countdown">
      {units.map(([label, v], i) => (
        <div key={label} style={{ display: "contents" }}>
          {i > 0 && <span className="sep">:</span>}
          <div className="u">
            <div className="box">
              <FlipDigit value={pad(v ?? 0)} />
            </div>
            <small className="unit-label">{label}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
