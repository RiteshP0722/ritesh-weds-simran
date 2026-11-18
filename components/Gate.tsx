"use client";

import { useEffect, useRef, useState } from "react";
import { couple, prefersReducedMotion } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { useGuestName } from "@/lib/useGuestName";
import type { WeddingData } from "@/types/wedding";

/** Gold line-art mandala carved into the door panels. */
function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.9">
        <circle r="46" strokeDasharray="1.5 2.5" />
        <circle r="41" />
        {petals.map((a) => (
          <path key={a} d="M0 -40 C 8 -32 8 -22 0 -16 C -8 -22 -8 -32 0 -40 Z" transform={`rotate(${a})`} />
        ))}
        <circle r="16" />
        {inner.map((a) => (
          <path key={a} d="M0 -15 C 5 -11 5 -6 0 -3 C -5 -6 -5 -11 0 -15 Z" transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r="3" fill="currentColor" />
    </svg>
  );
}

/** Lotus carved into the lower door panels. */
function Lotus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 60" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M50 6 C 60 20 60 36 50 50 C 40 36 40 20 50 6 Z" />
        <path d="M50 50 C 44 32 30 22 18 20 C 20 34 32 46 50 50 Z" />
        <path d="M50 50 C 56 32 70 22 82 20 C 80 34 68 46 50 50 Z" />
        <path d="M50 50 C 36 44 18 42 4 46 C 16 54 34 56 50 50 Z" />
        <path d="M50 50 C 64 44 82 42 96 46 C 84 54 66 56 50 50 Z" />
        <path d="M20 57 H80" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}

function Door({ side }: { side: "l" | "r" }) {
  return (
    <div className={`door door-${side}`}>
      <div className="door-frame">
        <div className="door-panel door-panel-top">
          <Mandala className="door-art" />
        </div>
        <div className="door-panel door-panel-bot">
          <Lotus className="door-art door-lotus" />
        </div>
      </div>
      <span className="door-handle">
        <span className="door-ring" />
      </span>
    </div>
  );
}

/** Full-screen palace doors, shown on every visit, that swing open in 3D only when tapped. */
export default function Gate({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const guest = useGuestName();
  const [first, second] = couple(data);
  const [state, setState] = useState<"closed" | "opening" | "gone">("closed");
  const opened = useRef(false);

  // The doors open onto the start of the card: stop the browser restoring the old scroll spot on reload.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("gate-locked", state !== "gone");
    return () => document.documentElement.classList.remove("gate-locked");
  }, [state]);

  const open = () => {
    if (opened.current) return;
    opened.current = true;
    window.scrollTo(0, 0);
    setState("opening");
    setTimeout(() => setState("gone"), prefersReducedMotion() ? 300 : 2400);
  };

  if (state === "gone") return null;

  return (
    <div className={`gate ${state === "opening" ? "is-open" : ""}`} onClick={open} role="dialog" aria-label={t("gateOpen")}>
      <div className="gate-glow" aria-hidden="true" />

      <div className="gate-doors" aria-hidden="true">
        <Door side="l" />
        <Door side="r" />
      </div>
      <div className="gate-seam" aria-hidden="true" />

      {/* Marigold toran with mango leaves and bells across the top of the doorway */}
      <div className="toran" aria-hidden="true">
        <div className="toran-rope" />
        <div className="toran-drops">
          {Array.from({ length: 13 }, (_, i) => (
            <span key={i} className={`toran-drop ${i % 2 ? "is-leaf" : "is-flower"}`} style={{ animationDelay: `${(i % 5) * -0.6}s` }}>
              {i % 2 ? <i className="leaf" /> : (<><i className="bloom" /><i className="bloom" /><i className="bloom" /></>)}
              {i % 4 === 0 && <i className="bell" />}
            </span>
          ))}
        </div>
      </div>

      <div className="gate-sparks" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i * 0.7) % 8}s`, animationDuration: `${7 + (i % 5)}s` }} />
        ))}
      </div>

      <div className="diya diya-l" aria-hidden="true"><i className="flame" /></div>
      <div className="diya diya-r" aria-hidden="true"><i className="flame" /></div>

      <div className="gate-seal">
        <div className="seal-inner">
          <div className="seal-ganesh">॥ श्री गणेशाय नमः ॥</div>
          <div className="seal-coin">
            <span className="seal-om">ॐ</span>
          </div>
          {guest && (
            <div className="seal-guest">
              <span className="seal-dear">{t("dearGuest")}</span>
              <strong>{guest}</strong>
              <span className="seal-dear">{t("guestInvited")}</span>
            </div>
          )}
          <div className="seal-title">{t("shubhVivah")}</div>
          <div className="seal-divider" aria-hidden="true"><span>❖</span></div>
          <div className="seal-names">
            {p(first.alias ?? first.name)} <span>{t("sang")}</span> {p(second.alias ?? second.name)}
          </div>
          {/* Click bubbles to the gate's handler */}
          <button type="button" className="seal-btn" autoFocus>
            <span>{t("gateOpen")}</span>
          </button>
          <div className="seal-hint">
            <span className="seal-tap" aria-hidden="true">👆</span> {t("gateHint")}
          </div>
        </div>
      </div>
    </div>
  );
}
