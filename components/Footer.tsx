"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function Footer({ data }: { data: WeddingData }) {
  const { t } = useLanguage();

  return (
    <footer className="wedding-footer">
      <div className="footer-ornament" aria-hidden="true">
        <span className="fl-flower">🌸</span>
        <span className="fl-gold">✦ ॐ ✦</span>
        <span className="fl-flower">🌸</span>
      </div>

      <div className="footer-blessing">
        &ldquo;{t("footerBlessing")}&rdquo;
      </div>

      <div className="footer-family">
        <span className="kalash-emblem">🪔</span>
        <h4 className="footer-fam-name">{data.footer}</h4>
        <p className="footer-gratitude">{t("inviters")}</p>
      </div>

      <div className="footer-couple">
        {t("madeWith")} <span className="heart-pulse">♥</span>{" "}
        <span className="footer-couple-name">
          {data.groom.name} &amp; {data.bride.name}
        </span>
      </div>

      <div className="back-to-top">
        <a href="#top" className="top-link" aria-label={t("backToTop")}>
          <span>{t("backToTop")}</span>
        </a>
      </div>
    </footer>
  );
}
