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
  // Count down to the start of the wedding day (12:00 AM IST), not to the lagna time in the evening.
  const target = new Date(`${datetime.slice(0, 10)}T00:00:00+05:30`).getTime();
  const [rem, setRem] = useState<ReturnType<typeof remaining> | null>(null);
  const [phase, setPhase] = useState<"before" | "today" | "after">("before");

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setPhase(now < target ? "before" : now < target + 864e5 ? "today" : "after");
      setRem(remaining(target));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (phase !== "before") {
    return (
      <p className="count-today" role="status">
        {t(phase === "today" ? "weddingToday" : "weddingDone")}
      </p>
    );
  }

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
