"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

/** Fired when the guest opens the doors; MusicButton listens and starts the shehnai. */
export const GATE_OPEN_EVENT = "wedding:gate-open";

/** Full-screen palace doors, shown on every visit, that swing open in 3D only when tapped. */
export default function Gate({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const [state, setState] = useState<"closed" | "opening" | "gone">("closed");
  const opened = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle("gate-locked", state !== "gone");
    return () => document.documentElement.classList.remove("gate-locked");
  }, [state]);

  const open = () => {
    if (opened.current) return;
    opened.current = true;
    window.dispatchEvent(new Event(GATE_OPEN_EVENT));
    setState("opening");
    setTimeout(() => setState("gone"), prefersReducedMotion() ? 300 : 2200);
  };

  if (state === "gone") return null;

  return (
    <div className={`gate ${state === "opening" ? "is-open" : ""}`} onClick={open} role="dialog" aria-label={t("gateOpen")}>
      <div className="gate-glow" aria-hidden="true" />
      <div className="gate-doors" aria-hidden="true">
        <div className="door door-l">
          <div className="door-panel" />
          <div className="door-panel" />
          <span className="door-knocker" />
        </div>
        <div className="door door-r">
          <div className="door-panel" />
          <div className="door-panel" />
          <span className="door-knocker" />
        </div>
      </div>

      <div className="gate-seal">
        <div className="seal-ganesh">॥ श्री गणेशाय नमः ॥</div>
        <div className="seal-coin">
          <span className="seal-om">ॐ</span>
        </div>
        <div className="seal-title">{t("shubhVivah")}</div>
        <div className="seal-names">
          {p(data.groom.alias ?? data.groom.name)} <span>{t("sang")}</span> {p(data.bride.name)}
        </div>
        {/* Click bubbles to the gate's handler */}
        <button type="button" className="seal-btn" autoFocus>
          {t("gateOpen")}
        </button>
        <div className="seal-hint">{t("gateHint")}</div>
      </div>
    </div>
  );
}
