"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { GATE_OPEN_EVENT } from "./Gate";

const RATIOS = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, (9 / 8) * 2, (5 / 4) * 2];
const MELODY: [number, number][] = [
  [0, 1.0], [1, 0.8], [2, 1.2], [3, 1.5],
  [4, 1.0], [5, 1.5], [4, 0.8], [3, 1.2],
  [2, 1.0], [3, 0.8], [2, 0.8], [1, 1.0],
  [0, 2.0],
  [2, 0.8], [3, 0.8], [4, 1.0], [5, 1.8],
  [4, 0.8], [3, 0.8], [2, 1.2], [1, 1.0], [0, 2.5],
];

function playShehnaiNote(ctx: AudioContext, freq: number, startTime: number, duration: number) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = "sawtooth";
  osc2.type = "triangle";

  osc1.frequency.setValueAtTime(freq, startTime);
  osc2.frequency.setValueAtTime(freq * 1.002, startTime);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1400, startTime);
  filter.Q.setValueAtTime(3.5, startTime);

  const attack = 0.08;
  const release = 0.25;
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.12, startTime + attack);
  gain.gain.setValueAtTime(0.1, startTime + duration - release);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + duration + 0.05);
  osc2.stop(startTime + duration + 0.05);
}

function playAuspiciousTune(ctx: AudioContext) {
  const baseFreq = 220;
  let t = ctx.currentTime + 0.05;
  for (const [deg, beats] of MELODY) {
    const dur = beats * 0.42;
    playShehnaiNote(ctx, baseFreq * RATIOS[deg], t, dur);
    t += dur + 0.03;
  }
  return t - ctx.currentTime;
}

export default function MusicButton() {
  const { t } = useLanguage();
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const playing = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Start the shehnai when the guest opens the gate (that click allows audio)
  useEffect(() => {
    const start = () => {
      if (!playing.current) toggle();
    };
    window.addEventListener(GATE_OPEN_EVENT, start);
    return () => window.removeEventListener(GATE_OPEN_EVENT, start);
  });

  const toggle = () => {
    if (playing.current) {
      clearTimeout(timer.current);
      playing.current = false;
      setOn(false);
      return;
    }
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = (ctxRef.current ??= new AC());
      if (ctx.state === "suspended") ctx.resume();

      const loop = () => {
        const length = playAuspiciousTune(ctx);
        timer.current = setTimeout(loop, (length + 2.0) * 1000);
      };
      loop();
      playing.current = true;
      setOn(true);
    } catch {
      /* Audio not supported */
    }
  };

  return (
    <button
      id="music"
      type="button"
      className={`music-fab ${on ? "is-playing" : ""}`}
      onClick={toggle}
      aria-label={on ? "Mute Music" : "Play Wedding Music"}
      title={on ? "Mute Music" : "Play Wedding Music"}
    >
      <div className="music-icon-ring">
        <span className="music-shehnai">🎺</span>
        {on && (
          <span className="sound-waves" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
      <span className="music-label">{on ? t("musicPause") : t("musicPlay")}</span>
    </button>
  );
}
