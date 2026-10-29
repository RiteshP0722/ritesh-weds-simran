"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const LINKS = [
  { id: "top", key: "navHome", icon: "🏠" },
  { id: "invitation", key: "navInvitation", icon: "💌" },
  { id: "events", key: "navEvents", icon: "🪔" },
  { id: "families", key: "navFamilies", icon: "👨‍👩‍👧" },
  { id: "moments", key: "navMoments", icon: "📸" },
  { id: "venue", key: "navVenue", icon: "📍" },
  { id: "sharejoy", key: "navShare", icon: "💐" },
];

/** Fixed top navbar: section links (a ☰ menu on phones), the active section highlighted, and the language switch. */
export default function TopControls() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      // The last section whose top has passed the upper third of the screen is the current one.
      const line = window.innerHeight * 0.35;
      let current = "top";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open the page can't scroll; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.classList.add("nav-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.classList.remove("nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.documentElement.classList.remove("nav-open");
    setOpen(false);
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Outside the nav: its backdrop-filter would make a fixed child size to the bar */}
      <div className={`nav-backdrop ${open ? "is-on" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav className={`navbar ${solid || open ? "is-solid" : ""} ${open ? "is-open" : ""}`} aria-label="Sections">
        <div className="nav-row">
          <a className="nav-brand" href="#top" onClick={go("top")}>
            R <span>♥</span> S
          </a>

          <ul className="nav-links">
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                <a href={`#${l.id}`} onClick={go(l.id)} className={active === l.id ? "is-active" : ""} aria-current={active === l.id ? "true" : undefined}>
                  <span className="nav-ic" aria-hidden="true">{l.icon}</span>
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="lang-switcher" role="group" aria-label="Language">
            <button type="button" className={`lang-btn ${lang === "hi" ? "is-active" : ""}`} onClick={() => setLang("hi")} aria-pressed={lang === "hi"}>
              हिं
            </button>
            <button type="button" className={`lang-btn ${lang === "en" ? "is-active" : ""}`} onClick={() => setLang("en")} aria-pressed={lang === "en"}>
              EN
            </button>
          </div>

          <button type="button" className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
            <i />
            <i />
            <i />
          </button>
        </div>
      </nav>
    </>
  );
}
