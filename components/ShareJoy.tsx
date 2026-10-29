"use client";

import { useEffect, useState } from "react";
import Corners from "./Corners";
import SectionHead from "./SectionHead";
import { inviteMessage } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { WeddingData } from "@/types/wedding";

export default function ShareJoy({ data }: { data: WeddingData }) {
  const { p, t } = useLanguage();
  const [siteUrl, setSiteUrl] = useState(data.siteUrl);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!data.siteUrl) setSiteUrl(window.location.origin + window.location.pathname);
  }, [data.siteUrl]);

  const shareHref = "https://api.whatsapp.com/send?text=" + encodeURIComponent(inviteMessage(data, siteUrl));

  const copyLink = () => {
    navigator.clipboard?.writeText(siteUrl || window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="sharejoy" className="share-section">
      <SectionHead eyebrow={t("shareEyebrow")} title={t("shareTitle")} />

      <div className="card paper share-card frame rv">
        <Corners />
        <div className="btn-row">
          <a className="btn-royal btn-whatsapp" href={shareHref} target="_blank" rel="noopener noreferrer">
            💬 {t("inviteWhatsApp")}
          </a>
          <button type="button" className="btn-royal btn-outline" onClick={copyLink}>
            🔗 {copied ? t("linkCopied") : t("copyLink")}
          </button>
        </div>

        <div className="senders">
          <h4 className="senders-title">{t("sendersTitle")} :</h4>
          {data.senders.names.map((n, i) => (
            <p key={i} className="sender-name">
              {p(n)}
            </p>
          ))}
          <p className="sender-addr">{p(data.senders.address)}</p>
          <div className="phones">
            {data.senders.phones.map((ph) => (
              <a key={ph} className="phone-chip" href={`tel:+91${ph}`}>
                📞 {ph}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
