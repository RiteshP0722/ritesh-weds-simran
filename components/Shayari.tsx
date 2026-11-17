"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { L } from "@/types/wedding";

/** Two-line couplets placed between sections. English mode shows them in Roman script. */
const SHAYARI: Record<string, L> = {
  rasm: {
    hi: "रस्मों की डोर में बंधे हैं दो परिवार,\nआपके आने से ही सजेगा ये त्योहार।",
    en: "Rasmon ki dor mein bandhe hain do parivaar,\nAapke aane se hi sajega ye tyohaar.",
  },
  pal: {
    hi: "कुछ पल थे जो दिल में घर कर गए,\nकुछ लम्हे थे जो तस्वीरों में ठहर गए।",
    en: "Kuch pal the jo dil mein ghar kar gaye,\nKuch lamhe the jo tasveeron mein theher gaye.",
  },
  raah: {
    hi: "राहें सजी हैं फूलों से, महका है हर द्वार,\nबस आपकी कमी है, आ जाइए इस बार।",
    en: "Raahein saji hain phoolon se, mehka hai har dwaar,\nBas aapki kami hai, aa jaiye is baar.",
  },
};

export type ShayariKey = keyof typeof SHAYARI;

export default function Shayari({ id }: { id: ShayariKey }) {
  const { p } = useLanguage();
  const lines = p(SHAYARI[id]).split("\n");
  return (
    <figure className="shayari rv">
      <span className="sh-mark" aria-hidden="true">❝</span>
      <blockquote>
        {lines.map((line, i) => (
          <span key={i} className="sh-line" style={{ "--i": i } as React.CSSProperties}>
            {line}
          </span>
        ))}
      </blockquote>
      <div className="sh-rule" aria-hidden="true">
        <span />❀<span />
      </div>
    </figure>
  );
}
