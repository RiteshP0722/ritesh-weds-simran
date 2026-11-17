"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

/** Share of the foil that has to be scratched off before the rest falls away by itself. */
const REVEAL_AT = 0.5;
const BRUSH = 26;

/**
 * "Save the date" scratch card: a gold foil covers the wedding date, the weekday and the lagna.
 * The guest scratches it off with a finger (or mouse); past half-way the foil fades out and petals pop.
 */
export default function ScratchDate({ data }: { data: WeddingData }) {
  const { lang, p, t } = useLanguage();
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const [done, setDone] = useState(false);

  const [y, m, d] = data.datetime.slice(0, 10).split("-");
  const weekday = new Date(`${data.datetime}:00+05:30`).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    weekday: "long",
    timeZone: "Asia/Kolkata",
  });

  /** Paints the gold foil over the whole card. */
  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const { width: w, height: h } = box.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#9b7330");
    g.addColorStop(0.25, "#e9cf8f");
    g.addColorStop(0.45, "#c9a050");
    g.addColorStop(0.55, "#fff2cc");
    g.addColorStop(0.7, "#c9a050");
    g.addColorStop(1, "#9b7330");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Glitter
    for (let i = 0; i < (w * h) / 90; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.35})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4);
    }
    // Thin inner border
    ctx.strokeStyle = "rgba(90,24,48,0.35)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.setLineDash([]);

    ctx.fillStyle = "#5a1830";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${Math.min(26, w / 12)}px "Playfair Display", "Tiro Devanagari Hindi", serif`;
    ctx.fillText(t("scratchTitle"), w / 2, h / 2 - 14);
    ctx.font = `${Math.min(17, w / 20)}px "Cormorant Garamond", "Tiro Devanagari Hindi", serif`;
    ctx.fillText(t("scratchHint"), w / 2, h / 2 + 20);

    moves.current = 0;
    last.current = null;
  }, [t]);

  useEffect(() => {
    if (done) return;
    let width = 0;
    const box = boxRef.current;
    if (!box) return;
    const draw = () => {
      width = box.getBoundingClientRect().width;
      paint();
    };
    if (document.fonts) document.fonts.ready.then(draw);
    else draw();
    // Repaint only when the width changes (phones fire height-only resizes as the URL bar hides).
    const ro = new ResizeObserver(() => {
      if (Math.abs(box.getBoundingClientRect().width - width) > 1) draw();
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, [paint, done]);

  const scratchedShare = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return 0;
    const px = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < px.length; i += 4 * 24) {
      total++;
      if (px[i] < 128) clear++;
    }
    return total ? clear / total : 0;
  };

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (done) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const r = canvas.getBoundingClientRect();
    const pt = { x: e.clientX - r.left, y: e.clientY - r.top };
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH * 2;
    ctx.beginPath();
    ctx.moveTo((last.current ?? pt).x, (last.current ?? pt).y);
    ctx.lineTo(pt.x + 0.01, pt.y);
    ctx.stroke();
    last.current = pt;

    if (++moves.current % 8 === 0 && scratchedShare() >= REVEAL_AT) reveal();
  };

  const reveal = () => {
    setDone(true);
    navigator.vibrate?.(40);
  };

  return (
    <div className={`scratch-wrap rv ${done ? "is-done" : ""}`}>
      <div className="eyebrow">{t("scratchEyebrow")}</div>
      <div className="scratch-card" ref={boxRef}>
        <div className="scratch-under" aria-live="polite">
          <span className="sc-day">{weekday}</span>
          <span className="sc-date">
            {d} <i>•</i> {m} <i>•</i> {y.slice(2)}
          </span>
          <span className="sc-lagna">{p(data.lagnaText)}</span>
        </div>
        <canvas
          ref={canvasRef}
          className="scratch-foil"
          tabIndex={done ? -1 : 0}
          role="button"
          aria-label={t("scratchAria")}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            last.current = null;
            scratch(e);
          }}
          onPointerMove={(e) => {
            if (e.buttons || e.pointerType === "touch") scratch(e);
          }}
          onPointerUp={() => {
            last.current = null;
            if (!done && scratchedShare() >= REVEAL_AT) reveal();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              reveal();
            }
          }}
        />
        {done && (
          <div className="scratch-burst" aria-hidden="true">
            {["🌸", "✨", "💛", "🌼", "✨", "🌸", "💛", "🌼"].map((s, i) => (
              <span key={i} style={{ "--a": `${i * 45}deg` } as React.CSSProperties}>
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      {done && <p className="scratch-note">{t("scratchDone")}</p>}
    </div>
  );
}
