"use client";

import { useEffect, useState } from "react";
import Corners from "./Corners";
import SectionHead from "./SectionHead";
import { inviteMessage, whatsappBase } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function ShareJoy({ data }: { data: WeddingData }) {
  const { lang, t } = useLanguage();
  const [name, setName] = useState("");
  const [siteUrl, setSiteUrl] = useState(data.siteUrl);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!data.siteUrl && typeof window !== "undefined") {
      setSiteUrl(window.location.origin + window.location.pathname);
    }
  }, [data.siteUrl]);

  const shareHref = "https://api.whatsapp.com/send?text=" + encodeURIComponent(inviteMessage(data, siteUrl));
  const who = name.trim() || (lang === "hi" ? "हम" : "We");
  const rsvpMsg = lang === "hi"
    ? `नमस्ते! ${who} ${data.groom.name} और ${data.bride.name} के शुभ विवाह समारोह में सपरिवार ज़रूर उपस्थित रहेंगे। ढेर सारा प्यार और मंगलकामनाएँ! 💐`
    : `Hello! ${who} will gladly attend the wedding ceremony of ${data.groom.name} and ${data.bride.name}. Heartiest congratulations and best wishes! 💐`;

  const rsvpHref = whatsappBase(data.whatsapp) + encodeURIComponent(rsvpMsg);

  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl || window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="sharejoy" className="share-section">
      <SectionHead
        eyebrow={t("shareEyebrow")}
        title={t("shareTitle")}
        top={<div className="section-motif">💌</div>}
        bottom={<div className="sub">{t("shareEyebrow")}</div>}
      />

      <div className="card share-card frame rv">
        <Corners />
        <div className="share-icon-ring">💑</div>
        <h3 className="share-title">{t("shareTitle")}</h3>
        <p className="share-desc">{t("shareDesc")}</p>

        <div className="share-acts">
          <a className="btn-royal btn-whatsapp" href={shareHref} target="_blank" rel="noopener noreferrer">
            <span className="btn-icon">💬</span>
            <span>{t("inviteWhatsApp")}</span>
          </a>

          <button type="button" className="btn-royal btn-outline" onClick={copyLink}>
            <span className="btn-icon">🔗</span>
            <span>{copied ? t("linkCopied") : t("copyLink")}</span>
          </button>

          <div className="rsvp-box">
            <div className="rsvp-title">
              <span className="rsvp-kalash">🙏</span> {t("rsvpTitle")}
            </div>
            <div className="rsvp-input-row">
              <input
                id="gname"
                type="text"
                className="rsvp-input"
                placeholder={t("rsvpPlaceholder")}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <a className="btn-royal btn-gold rsvp-btn" href={rsvpHref} target="_blank" rel="noopener noreferrer">
                <span>{t("rsvpButton")}</span>
              </a>
            </div>
            <p className="rsvp-note">{t("rsvpNote")}</p>
          </div>
        </div>

        <div className="share-footer-quote">
          {t("shareQuote")}
        </div>
      </div>
    </section>
  );
}
