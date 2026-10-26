"use client";

import { useEffect, useState } from "react";
import { useLanguage, type Language } from "@/lib/LanguageContext";

export type Theme = "crimson" | "emerald" | "rose";

interface ThemeOption {
  id: Theme;
  name: string;
  en: string;
  color: string;
  accent: string;
}

const THEMES: ThemeOption[] = [
  { id: "crimson", name: "शाही मरून", en: "Royal Crimson", color: "#4a0e17", accent: "#d4af37" },
  { id: "emerald", name: "शाही पन्ना", en: "Emerald Palace", color: "#0c3629", accent: "#e2b85e" },
  { id: "rose", name: "गुलाबी व स्वर्ण", en: "Rose Gold", color: "#3d1326", accent: "#f3c78d" },
];

export default function TopControls() {
  const { lang, setLang } = useLanguage();
  const [theme, setTheme] = useState<Theme>("crimson");
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("wedding-theme") as Theme) || "crimson";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("wedding-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsThemeOpen(false);
  };

  return (
    <div className="top-controls-bar">
      {/* Language Switcher: Hindi / English */}
      <div className="lang-switcher" role="group" aria-label="Language selection">
        <button
          type="button"
          className={`lang-btn ${lang === "hi" ? "is-active" : ""}`}
          onClick={() => setLang("hi")}
          aria-pressed={lang === "hi"}
        >
          <span className="lang-flag">🇮🇳</span>
          <span>हिन्दी</span>
        </button>
        <button
          type="button"
          className={`lang-btn ${lang === "en" ? "is-active" : ""}`}
          onClick={() => setLang("en")}
          aria-pressed={lang === "en"}
        >
          <span className="lang-flag">🇬🇧</span>
          <span>English</span>
        </button>
      </div>

      {/* Theme Switcher */}
      <div className="theme-switcher-container">
        <button
          type="button"
          className="theme-btn"
          onClick={() => setIsThemeOpen((prev) => !prev)}
          aria-label="Change color theme"
          title="Color Theme"
        >
          <span className="theme-dot" style={{ backgroundColor: THEMES.find((t) => t.id === theme)?.accent }} />
          <span className="theme-label">{lang === "hi" ? "थीम" : "Theme"}</span>
          <span className="theme-arrow">{isThemeOpen ? "▲" : "▼"}</span>
        </button>

        {isThemeOpen && (
          <div className="theme-menu">
            <div className="theme-menu-title">
              {lang === "hi" ? "कलर थीम चुनें" : "Select Color Theme"}
            </div>
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`theme-opt ${theme === t.id ? "active" : ""}`}
                onClick={() => changeTheme(t.id)}
              >
                <span className="theme-swatch" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.accent})` }} />
                <div className="theme-opt-info">
                  <span className="theme-opt-hi">{t.name}</span>
                  <span className="theme-opt-en">{t.en}</span>
                </div>
                {theme === t.id && <span className="theme-check">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
