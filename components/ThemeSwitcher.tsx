"use client";

import { useEffect, useState } from "react";

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

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("crimson");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("wedding-theme") as Theme) || "crimson";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("wedding-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher-wrap">
      <button
        type="button"
        className="theme-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change color theme"
        title="Theme Palette"
      >
        <span className="theme-dot" style={{ backgroundColor: THEMES.find((t) => t.id === theme)?.accent }} />
        <span className="theme-label">Theme</span>
        <span className="theme-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="theme-menu">
          <div className="theme-menu-title">Select Card Theme</div>
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
  );
}
