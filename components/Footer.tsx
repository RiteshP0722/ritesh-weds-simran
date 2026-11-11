"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { couple } from "@/lib/utils";
import type { WeddingData } from "@/types/wedding";

export default function Footer({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const [first, second] = couple(data);

  return (
    <footer className="wedding-footer">
      <div className="footer-ornament" aria-hidden="true">
        🌼 <span>✦ ॐ ✦</span> 🌼
      </div>
      <p className="footer-blessing">{t("footerBlessing")}</p>
      <h4 className="footer-fam-name">{p(data.familyLine)}</h4>
      <p className="footer-couple">
        {p(first.alias ?? first.name)} <span className="heart-pulse">♥</span> {p(second.alias ?? second.name)}
      </p>
      <a href="#top" className="top-link">
        {t("backToTop")}
      </a>
    </footer>
  );
}
