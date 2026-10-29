"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function Footer({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();

  return (
    <footer className="wedding-footer">
      <div className="footer-ornament" aria-hidden="true">
        🌼 <span>✦ ॐ ✦</span> 🌼
      </div>
      <p className="footer-blessing">{t("footerBlessing")}</p>
      <h4 className="footer-fam-name">{t("footerFamily")}</h4>
      <p className="footer-couple">
        {p(data.groom.alias ?? data.groom.name)} <span className="heart-pulse">♥</span> {p(data.bride.name)}
      </p>
      <a href="#top" className="top-link">
        {t("backToTop")}
      </a>
    </footer>
  );
}
