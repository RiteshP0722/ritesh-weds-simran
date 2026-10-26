"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "hi" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const DICTIONARY: Record<string, Record<Language, string>> = {
  // Navigation / Switcher
  theme: { hi: "थीम", en: "Theme" },
  langToggle: { hi: "English", en: "हिन्दी" },
  
  // Hero Section
  shreeGanesh: { hi: "॥ श्री गणेशाय नमः ॥", en: "॥ Shree Ganeshay Namah ॥" },
  shloka: {
    hi: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    en: "May Lord Ganesha remove all obstacles and bless this auspicious new beginning.",
  },
  invitationBadge: { hi: "✦ मांगलिक विवाह निमंत्रण ✦", en: "✦ Royal Wedding Invitation ✦" },
  withBlessings: { hi: "परम पिता परमात्मा के आशीर्वाद से", en: "With the Divine Blessings of the Almighty" },
  weds: { hi: "संग", en: "weds" },
  tagline: { hi: "दो दिल, एक सफ़र…", en: "Two Hearts, One Eternal Journey…" },
  dateDots: { hi: "11 • 12 • 2026", en: "11 • 12 • 2026" },
  dateLong: { hi: "शुक्रवार, 11 दिसंबर 2026", en: "Friday, 11th December 2026" },
  timeNote: { hi: "शुभ लग्न · गोरज बेला", en: "Auspicious Lagna · Gauraj Bela" },
  timeText: { hi: "सायं 6:00 बजे", en: "6:00 PM" },
  scrollInvitation: { hi: "निमंत्रण पत्र देखें", en: "View Invitation" },

  // Welcome Section
  salutation: { hi: "आदरणीय स्वजन / प्रिय स्नेही,", en: "Honoured Guests & Dear Family," },
  welcomeVerse: {
    hi: "स्नेह का यह पावन बंधन, दो आत्माओं का मिलन है। आपके शुभाशीर्वाद से यह उत्सव और भी मंगलमय बनेगा।",
    en: "A sacred union of two loving souls. Your presence and warm blessings will make our celebrations complete and joyous.",
  },
  lead: {
    hi: "~ हमारे प्रिय बेटे और बेटी के विवाह समारोह में आप सपरिवार सादर आमंत्रित हैं ~",
    en: "~ A heartfelt invitation to celebrate love, togetherness, and a lifetime of happiness ~",
  },
  addToCalendar: { hi: "📅 कैलेंडर में जोड़ें", en: "📅 Add to Calendar" },
  viewFunctions: { hi: "🪔 कार्यक्रम देखें", en: "🪔 View Functions" },
  countdownEyebrow: { hi: "विवाह समारोह में बचा समय", en: "Counting Down To The Sacred Vows" },
  foreverBegins: { hi: "शुभ विवाह वेला", en: "Our Forever Begins" },
  days: { hi: "दिन", en: "DAYS" },
  hours: { hi: "घंटे", en: "HOURS" },
  mins: { hi: "मिनट", en: "MINS" },
  secs: { hi: "सेकंड", en: "SECS" },

  // Couple Section
  coupleEyebrow: { hi: "वर एवं वधू परिचय", en: "Two Hearts, One Soul" },
  coupleTitle: { hi: "वर एवं वधू", en: "The Auspicious Pair" },
  groomLabel: { hi: "वर (Groom)", en: "The Groom" },
  brideLabel: { hi: "वधू (Bride)", en: "The Bride" },
  residence: { hi: "निवासी", en: "Residence" },

  // Save the Date Section
  saveDateEyebrow: { hi: "शुभ विवाह मुहूर्त एवं स्थल", en: "Save The Auspicious Date" },
  saveDateTitle: { hi: "मांगलिक लग्न", en: "Wedding Ceremony" },
  dateLabel: { hi: "दिनांक / DATE", en: "DATE" },
  timeLabel: { hi: "समय / TIME", en: "TIME" },
  venueLabel: { hi: "स्थल / VENUE", en: "VENUE" },
  paksha: { hi: "मार्गशीर्ष शुक्ल पक्ष", en: "Margashirsha Shukla Paksha" },
  shubhMuhurat: { hi: "शुभ मुहूर्त", en: "Auspicious Muhurat" },
  viewMap: { hi: "🗺️ मैप पर देखें ↗", en: "🗺️ View on Maps ↗" },

  // Events Section
  eventsEyebrow: { hi: "हमारी खुशियों में शामिल हों", en: "Join The Celebrations" },
  eventsTitle: { hi: "मांगलिक कार्यक्रम", en: "Wedding Celebrations" },
  eventsSub: { hi: "कार्यक्रम विवरण", en: "Schedule of Auspicious Ceremonies" },
  eventsFooterBlessing: {
    hi: "आपकी स्नेहमयी उपस्थिति ही हमारा परम सौभाग्य है",
    en: "Your gracious presence is our greatest blessing",
  },

  // Families Section
  familiesEyebrow: { hi: "स्नेहाशीष एवं आशीर्वाद", en: "With Loving Blessings" },
  familiesTitle: { hi: "हमारे परिवार", en: "Our Families" },
  familiesSub: { hi: "दर्शनाभिलाषी एवं विनीत", en: "Cordially Invited by Our Families" },
  familiesVerse: {
    hi: "बड़ों का आशीर्वाद, अपनों का प्यार, यही हमारे जीवन का सबसे बड़ा उपहार है।",
    en: "The blessings of our elders and love of family are the true treasures of our lives.",
  },

  // Story & Moments
  storyEyebrow: { hi: "हमारी कहानी", en: "A Tale of Two Hearts" },
  storyTitle: { hi: "प्रेम का सफ़र", en: "Our Beautiful Story" },
  storySub: { hi: "प्यार के अनमोल पल", en: "Cherished Chapter of Love" },
  momentsEyebrow: { hi: "सुखद स्मृतियाँ", en: "Glimpses of Joy" },
  momentsTitle: { hi: "अनमोल पल", en: "Precious Moments" },
  momentsSub: { hi: "तस्वीरों में हमारा सफर", en: "Our Journey in Frames" },

  // Venue Section
  venueEyebrow: { hi: "स्थान एवं मार्ग दर्शन", en: "Reach The Venue" },
  venueTitle: { hi: "विवाह स्थल", en: "Wedding Venue" },
  venueSub: { hi: "स्थान विवरण", en: "Location & Driving Directions" },
  venueBadge: { hi: "इंदौर, मध्य प्रदेश", en: "Indore, Madhya Pradesh" },
  getDirections: { hi: "📍 Google Maps पर मार्ग देखें ↗", en: "📍 Get Directions on Google Maps ↗" },
  copyAddress: { hi: "📋 पता कॉपी करें", en: "📋 Copy Address" },
  addressCopied: { hi: "✓ पता कॉपी हो गया!", en: "✓ Address Copied!" },

  // Share Joy & RSVP
  shareEyebrow: { hi: "निमंत्रण साझा करें एवं पुष्टि करें", en: "Celebrate With Us" },
  shareTitle: { hi: "खुशियाँ बाँटें", en: "Share The Joy" },
  shareDesc: {
    hi: "आपकी गरिमामयी उपस्थिति हमारे विवाह उत्सव को अविस्मरणीय और मंगलमय बनाएगी।",
    en: "Your presence will add immense happiness and warmth to our special day.",
  },
  inviteWhatsApp: { hi: "💬 WhatsApp पर निमंत्रण भेजें", en: "💬 Invite via WhatsApp" },
  copyLink: { hi: "🔗 निमंत्रण लिंक कॉपी करें", en: "🔗 Copy Invitation Link" },
  linkCopied: { hi: "✓ लिंक कॉपी हो गया!", en: "✓ Link Copied!" },
  rsvpTitle: { hi: "क्या आप आ रहे हैं? हमें बताइए", en: "Will you join us? Please RSVP" },
  rsvpPlaceholder: { hi: "आपका शुभ नाम (e.g. शर्मा परिवार)", en: "Your Name (e.g. The Sharma Family)" },
  rsvpButton: { hi: "हम ज़रूर आएँगे 🌸", en: "We Will Attend 🌸" },
  rsvpNote: { hi: "एक क्लिक में WhatsApp पर RSVP भेजें", en: "Send RSVP directly via WhatsApp" },
  shareQuote: { hi: "✨ दो परिवारों का मिलन, अपनों का साथ ✨", en: "✨ Two Families Unite in Love & Joy ✨" },

  // Footer
  footerBlessing: {
    hi: "शुभम् भवतु कल्याणम् आरोग्यम् धनसंपदा। शत्रुबुद्धि विनाशाय दीपज्योतिर्नमोऽस्तु ते॥",
    en: "May there be auspiciousness, health, prosperity, and divine joy for all.",
  },
  inviters: { hi: "सस्नेह निमन्त्रक · समस्त प्रजापति परिवार", en: "Cordially Invited by the Prajapati Family" },
  madeWith: { hi: "शुभकामनाओं सहित समर्पित", en: "Dedicated with love for" },
  backToTop: { hi: "▲ ऊपर जाएँ", en: "▲ Back to Top" },

  // Music Button
  musicPlay: { hi: "शहनाई ▶", en: "Shehnai ▶" },
  musicPause: { hi: "संगीत ⏸", en: "Music ⏸" },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "hi",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("wedding-lang") as Language;
    if (saved === "hi" || saved === "en") {
      setLangState(saved);
      document.documentElement.setAttribute("lang", saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("wedding-lang", newLang);
    document.documentElement.setAttribute("lang", newLang);
  };

  const t = (key: string): string => {
    return DICTIONARY[key]?.[lang] ?? DICTIONARY[key]?.["hi"] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
