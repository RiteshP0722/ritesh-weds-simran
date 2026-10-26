"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// Single selected high-quality wedding song (Vivah - Mujhe Haq Hai / Wedding Theme)
const PRIMARY_WEDDING_SONG = "https://archive.org/download/vivah-2006-movie-songs-hindiganadownload.com/Vivah/01%20muhje%20haq%20hai%20-%20hindiganadownload.com.mp3";
const SECONDARY_SHEHNAI_SONG = "https://archive.org/download/dli.akashvani.sangeet.24/2%20Poorvi%20Dhun.mp3";

// Frequencies for offline fallback (Mangalam Bhagwan Vishnu)
const BASE_PITCH = 293.66;
const SWARAS = {
  Sa: BASE_PITCH * 1.0,
  Re: BASE_PITCH * (9/8),
  Ga: BASE_PITCH * (5/4),
  Ma: BASE_PITCH * (4/3),
  Pa: BASE_PITCH * (3/2),
  Dha: BASE_PITCH * (5/3),
  Ni: BASE_PITCH * (15/8),
  Sa_hi: BASE_PITCH * 2.0,
};

type SwaraKey = keyof typeof SWARAS;
const MANGALAM_NOTES: { note: SwaraKey; dur: number; slideTo?: SwaraKey }[] = [
  { note: "Sa", dur: 0.4 }, { note: "Re", dur: 0.4 }, { note: "Ga", dur: 0.5 },
  { note: "Ga", dur: 0.5 }, { note: "Ga", dur: 0.5 }, { note: "Ga", dur: 0.5 }, { note: "Ga", dur: 0.9 },
  { note: "Re", dur: 0.4 }, { note: "Ga", dur: 0.4 }, { note: "Ma", dur: 0.6, slideTo: "Ga" },
  { note: "Ga", dur: 0.5 }, { note: "Re", dur: 0.4 }, { note: "Re", dur: 0.4, slideTo: "Sa" }, { note: "Sa", dur: 1.2 },
  { note: "Sa", dur: 0.4 }, { note: "Re", dur: 0.4 }, { note: "Ga", dur: 0.5 },
  { note: "Ga", dur: 0.5 }, { note: "Ga", dur: 0.5 }, { note: "Ga", dur: 0.5 }, { note: "Ga", dur: 0.9 },
  { note: "Re", dur: 0.4 }, { note: "Ga", dur: 0.4 }, { note: "Ma", dur: 0.6, slideTo: "Ga" },
  { note: "Ga", dur: 0.5 }, { note: "Re", dur: 0.5, slideTo: "Sa" }, { note: "Sa", dur: 0.6 }, { note: "Sa", dur: 2.2 },
];

export default function MusicButton() {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    clearTimeout(loopTimerRef.current);
    activeNodesRef.current.forEach((n) => {
      try {
        if ("stop" in n && typeof (n as AudioScheduledSourceNode).stop === "function") {
          (n as AudioScheduledSourceNode).stop();
        }
        n.disconnect();
      } catch {
        /* ignore */
      }
    });
    activeNodesRef.current = [];
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => stopAll();
  }, []);

  // Offline melodic fallback
  const playOfflineAcoustic = () => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = (ctxRef.current ??= new AC());
      if (ctx.state === "suspended") ctx.resume();

      const loop = () => {
        let t = ctx.currentTime + 0.1;
        for (const ev of MANGALAM_NOTES) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = "sawtooth";
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(1450, t);
          filter.Q.setValueAtTime(3.8, t);

          const startF = SWARAS[ev.note];
          const endF = ev.slideTo ? SWARAS[ev.slideTo] : startF;
          osc.frequency.setValueAtTime(startF, t);
          if (endF !== startF) osc.frequency.exponentialRampToValueAtTime(endF, t + ev.dur * 0.7);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.08, t + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + ev.dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + ev.dur + 0.05);
          activeNodesRef.current.push(osc, gain);
          t += ev.dur * 0.52 + 0.02;
        }
        loopTimerRef.current = setTimeout(loop, (t - ctx.currentTime + 1.5) * 1000);
      };
      loop();
      setIsPlaying(true);
    } catch {
      /* ignore */
    }
  };

  const startSong = () => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audio.loop = true;
      audio.volume = 0.75;
      audioRef.current = audio;
    }

    const trySecondary = () => {
      if (!audio) return;
      audio.src = SECONDARY_SHEHNAI_SONG;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => playOfflineAcoustic());
    };

    const tryPrimary = () => {
      if (!audio) return;
      audio.src = PRIMARY_WEDDING_SONG;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(trySecondary);
    };

    // 1. Try local custom /music/shehnai.mp3 if user provided one
    audio.src = "/music/shehnai.mp3";
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // 2. Fall back to primary high quality wedding song
        tryPrimary();
      });
  };

  const toggle = () => {
    if (isPlaying) {
      stopAll();
    } else {
      startSong();
    }
  };

  const playLabel = lang === "hi" ? "विवाह संगीत ▶" : "Wedding Song ▶";
  const pauseLabel = lang === "hi" ? "संगीत रोकें ⏸" : "Pause Music ⏸";
  const songTitle = lang === "hi" ? "विवाह गीत: मुझे हक है" : "Wedding Song: Vivah Theme";

  return (
    <div className="music-player-wrapper">
      <audio ref={audioRef} preload="none" />

      <button
        id="music"
        type="button"
        className={`single-wedding-fab ${isPlaying ? "is-playing" : ""}`}
        onClick={toggle}
        aria-label={isPlaying ? pauseLabel : playLabel}
        title={isPlaying ? `${pauseLabel} - ${songTitle}` : `${playLabel} - ${songTitle}`}
      >
        <div className="music-icon-ring">
          {/* Ornate Indian Golden Shehnai SVG */}
          <svg
            className="shehnai-svg-icon"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="8" y="29.5" width="6" height="5" rx="1.5" fill="#fef2c2" stroke="#8c6414" strokeWidth="1" />
            <line x1="6" y1="32" x2="14" y2="32" stroke="#d90429" strokeWidth="1.5" />
            <path
              d="M14 30.5 L 42 27 L 44 37 L 14 33.5 Z"
              fill="url(#shehnaiWoodGrad3)"
              stroke="#693b16"
              strokeWidth="1"
            />
            <line x1="20" y1="29.8" x2="20" y2="34.2" stroke="#ffd700" strokeWidth="2" />
            <line x1="28" y1="28.8" x2="28" y2="35.2" stroke="#ffd700" strokeWidth="2" />
            <line x1="36" y1="27.8" x2="36" y2="36.2" stroke="#ffd700" strokeWidth="2" />
            <circle cx="24" cy="32" r="1.2" fill="#241006" />
            <circle cx="32" cy="32" r="1.2" fill="#241006" />
            <circle cx="40" cy="32" r="1.2" fill="#241006" />
            <path
              d="M42 27 C 48 24, 56 20, 58 18 C 59 17, 60 18, 60 32 C 60 46, 59 47, 58 46 C 56 44, 48 40, 44 37 Z"
              fill="url(#shehnaiGoldGrad3)"
              stroke="#946914"
              strokeWidth="1.2"
            />
            <ellipse cx="58" cy="32" rx="2" ry="14" fill="#ffec99" stroke="#b3821a" strokeWidth="1.2" />
            <path d="M18 34 C 18 42, 22 46, 26 48" stroke="#d90429" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="26" cy="49" r="2.5" fill="#ffb703" />

            <defs>
              <linearGradient id="shehnaiWoodGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a220a" />
                <stop offset="50%" stopColor="#7a3e14" />
                <stop offset="100%" stopColor="#3d1b06" />
              </linearGradient>
              <linearGradient id="shehnaiGoldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff6d6" />
                <stop offset="45%" stopColor="#e5bb45" />
                <stop offset="100%" stopColor="#946914" />
              </linearGradient>
            </defs>
          </svg>

          {isPlaying && (
            <span className="sound-waves" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
        </div>

        <span className="single-music-txt">
          {isPlaying ? pauseLabel : playLabel}
        </span>
      </button>
    </div>
  );
}
