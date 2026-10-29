"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { L } from "@/types/wedding";

export type Language = "hi" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Fixed UI text by key */
  t: (key: string) => string;
  /** Pick the current language from a { hi, en } value */
  p: (l: L | undefined) => string;
}

const DICTIONARY: Record<string, L> = {
  // Gate
  gateWelcome: { hi: "स्वागतम्", en: "Welcome" },
  gateOpen: { hi: "निमंत्रण खोलें", en: "Open Invitation" },
  gateHint: { hi: "द्वार खोलने के लिए स्पर्श करें", en: "Tap to open the doors" },

  // Navbar
  navHome: { hi: "मुख्य", en: "Home" },
  navInvitation: { hi: "निमंत्रण", en: "Invitation" },
  navEvents: { hi: "कार्यक्रम", en: "Events" },
  navFamilies: { hi: "परिवार", en: "Families" },
  navMoments: { hi: "अनमोल पल", en: "Moments" },
  navVenue: { hi: "स्थान", en: "Venue" },
  navShare: { hi: "आमंत्रण भेजें", en: "Share" },

  // Hero
  shreeGanesh: { hi: "॥ श्री गणेशाय नमः ॥", en: "॥ Shree Ganeshay Namah ॥" },
  shloka: {
    hi: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    en: "Vakratunda Mahakaya Suryakoti Samaprabha,\nNirvighnam Kuru Me Deva Sarva-Karyeshu Sarvada.",
  },
  shubhVivah: { hi: "शुभ विवाह", en: "Shubh Vivah" },
  sang: { hi: "संग", en: "weds" },
  heroEyebrow: { hi: "हमारे शुभ विवाह में आपका स्वागत है", en: "We're Getting Married" },
  tagline: { hi: "दो दिल, एक सफ़र…", en: "Two hearts, one journey…" },
  scrollInvitation: { hi: "निमंत्रण पत्र देखें", en: "View Invitation" },

  // Invitation
  inviteEyebrow: { hi: "सादर आमंत्रण", en: "A Warm Invitation" },
  inviteTitle: { hi: "स्नेहल निमंत्रण", en: "Loving Invitation" },
  groomLabel: { hi: "वर", en: "The Groom" },
  brideLabel: { hi: "वधू", en: "The Bride" },
  countdownEyebrow: { hi: "शुभ लग्न में शेष समय", en: "Counting Down To The Wedding" },
  days: { hi: "दिन", en: "Days" },
  hours: { hi: "घंटे", en: "Hours" },
  mins: { hi: "मिनट", en: "Mins" },
  secs: { hi: "सेकंड", en: "Secs" },
  addToCalendar: { hi: "📅 कैलेंडर में जोड़ें", en: "📅 Add to Calendar" },

  // Events
  eventsEyebrow: { hi: "हमारी खुशियों में शामिल हों", en: "Join The Celebrations" },
  eventsTitle: { hi: "मांगलिक कार्यक्रम", en: "Wedding Ceremonies" },

  // Feast & venue
  feastEyebrow: { hi: "आप सपरिवार सादर आमंत्रित हैं", en: "You And Your Family Are Invited" },
  venueLabel: { hi: "विवाह स्थल", en: "Venue" },
  getDirections: { hi: "📍 मैप पर रास्ता देखें", en: "📍 Get Directions" },
  copyAddress: { hi: "📋 पता कॉपी करें", en: "📋 Copy Address" },
  addressCopied: { hi: "✓ पता कॉपी हो गया", en: "✓ Address Copied" },

  // Families
  familiesEyebrow: { hi: "स्नेहाकांक्षी परिवारजन", en: "With Love From Our Families" },
  familiesTitle: { hi: "हमारे परिवार", en: "Our Families" },
  kidsTitle: { hi: "बाल आग्रह", en: "A Request From The Kids" },

  // Moments
  momentsEyebrow: { hi: "सुखद स्मृतियाँ", en: "Glimpses of Joy" },
  momentsTitle: { hi: "अनमोल पल", en: "Precious Moments" },

  // Share
  shareEyebrow: { hi: "निमंत्रण साझा करें", en: "Celebrate With Us" },
  shareTitle: { hi: "खुशियाँ बाँटें", en: "Share The Joy" },
  inviteWhatsApp: { hi: "WhatsApp पर निमंत्रण भेजें", en: "Send Invite on WhatsApp" },
  copyLink: { hi: "निमंत्रण लिंक कॉपी करें", en: "Copy Invitation Link" },
  linkCopied: { hi: "✓ लिंक कॉपी हो गया", en: "✓ Link Copied" },
  sendersTitle: { hi: "प्रेषक", en: "Sent By" },
  call: { hi: "कॉल करें", en: "Call" },

  // Footer
  footerBlessing: {
    hi: "शुभं करोति कल्याणम् आरोग्यं धनसम्पदा।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते॥",
    en: "May this light bring auspiciousness, health and prosperity to all.",
  },
  footerFamily: { hi: "समस्त प्रजापति परिवार · पुनासा", en: "The Prajapati Family · Punasa" },
  backToTop: { hi: "▲ ऊपर जाएँ", en: "▲ Back to Top" },

  // Music
  musicPlay: { hi: "शहनाई ▶", en: "Shehnai ▶" },
  musicPause: { hi: "संगीत ⏸", en: "Music ⏸" },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "hi",
  setLang: () => {},
  t: (key: string) => key,
  p: (l) => l?.hi ?? "",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("hi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding-lang");
      if (saved === "hi" || saved === "en") {
        setLangState(saved);
        document.documentElement.setAttribute("lang", saved);
      }
    } catch {
      /* storage blocked */
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("wedding-lang", newLang);
    } catch {
      /* storage blocked */
    }
    document.documentElement.setAttribute("lang", newLang);
  };

  const t = (key: string): string => DICTIONARY[key]?.[lang] ?? key;
  const p = (l: L | undefined): string => (l ? l[lang] || l.hi : "");

  return <LanguageContext.Provider value={{ lang, setLang, t, p }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
