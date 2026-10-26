import type { WeddingData } from "@/types/wedding";

/**
 * All website content lives here.
 * Edit this file to change names, dates, events, families, photos and captions.
 *
 * - Photos: put images in /public (e.g. /public/photos/groom.jpg) and set photo: "/photos/groom.jpg"
 * - Family lines starting with "*" are shown highlighted.
 * - Events with the same "day" are grouped together.
 * - siteUrl: your deployed link (goes into the WhatsApp invite message).
 * - whatsapp: 10-digit number that receives RSVP messages (leave "" to let guests pick a contact).
 */
export const wedding: WeddingData = {
  "groom": {
    "name": "Ritesh",
    "full": "Ritesh Prajapati",
    "photo": "/photos/groom.jpg",
    "lines": [
      "सुपौत्र: श्री रामकरण जी प्रजापति",
      "सुपुत्र",
      "*श्री महेश जी प्रजापति"
    ],
    "place": "पुनासा"
  },
  "bride": {
    "name": "Simran",
    "full": "Simran Prajapati",
    "photo": "/photos/bride.jpg",
    "lines": [
      "सुपुत्री",
      "*श्री कैलाश जी प्रजापति"
    ],
    "place": "इंदौर"
  },
  "datetime": "2026-12-11T18:00",
  "dateDots": "11 • 12 • 2026",
  "dateLong": "Friday, 11 December 2026",
  "datePill": "11th December 2026",
  "timeText": "6:00 PM",
  "timeNote": "शुभ लग्न · गोरज बेला",
  "tagline": "दो दिल, एक सफ़र…",
  "lead": "~ A heartfelt invitation to celebrate love, togetherness, and a lifetime of happiness ~",
  "venue": {
    "name": "श्री कैलाश जी प्रजापति का निवास",
    "address": "Indore, Madhya Pradesh, India",
    "map": ""
  },
  "whatsapp": "",
  "siteUrl": "",
  "events": [
    {
      "day": "बुधवार, 9 दिसंबर 2026",
      "icon": "🪔",
      "title": "माता पूजन",
      "en": "Mata Pujan",
      "date": "9 December 2026",
      "time": "4:30 PM",
      "note": "",
      "quote": "माँ के आशीर्वाद से शुभ शुरुआत"
    },
    {
      "day": "बुधवार, 9 दिसंबर 2026",
      "icon": "🌼",
      "title": "गणेश पूजन एवं हल्दी",
      "en": "Ganesh Pujan & Haldi",
      "date": "9 December 2026",
      "time": "7:00 PM",
      "note": "",
      "quote": "हल्दी के रंग, अपनों के संग"
    },
    {
      "day": "बुधवार, 9 दिसंबर 2026",
      "icon": "🎶",
      "title": "महिला संगीत",
      "en": "Mahila Sangeet",
      "date": "9 December 2026",
      "time": "8:00 PM onwards",
      "note": "",
      "quote": "ढोलक की थाप, गीतों की बहार"
    },
    {
      "day": "गुरुवार, 10 दिसंबर 2026",
      "icon": "👘",
      "title": "पहरावनी",
      "en": "Paharavani",
      "date": "10 December 2026",
      "time": "1:00 PM",
      "note": "",
      "quote": ""
    },
    {
      "day": "गुरुवार, 10 दिसंबर 2026",
      "icon": "⛺",
      "title": "मण्डपाच्छादन",
      "en": "Mandap Chhadan",
      "date": "10 December 2026",
      "time": "3:00 PM",
      "note": "",
      "quote": ""
    },
    {
      "day": "गुरुवार, 10 दिसंबर 2026",
      "icon": "🎁",
      "title": "मामेरा",
      "en": "Mamera",
      "date": "10 December 2026",
      "time": "",
      "note": "मामाजी श्री प्रवीण जी, श्री संजीत जी, श्री सचिन जी (ग्राम देड़तलाई) वालों के यहाँ से",
      "quote": ""
    },
    {
      "day": "गुरुवार, 10 दिसंबर 2026",
      "icon": "🍛",
      "title": "स्नेह भोज",
      "en": "Sneh Bhoj",
      "date": "10 December 2026",
      "time": "6:00 PM onwards",
      "note": "",
      "quote": "आपके साथ भोजन, हमारा सौभाग्य"
    },
    {
      "day": "शुक्रवार, 11 दिसंबर 2026",
      "icon": "💍",
      "title": "सगाई समारोह",
      "en": "Engagement",
      "date": "11 December 2026",
      "time": "1:00 PM",
      "note": "",
      "quote": ""
    },
    {
      "day": "शुक्रवार, 11 दिसंबर 2026",
      "icon": "🐎",
      "title": "बारात",
      "en": "Baraat",
      "date": "11 December 2026",
      "time": "",
      "note": "श्री कैलाश जी प्रजापति, इंदौर वालों के यहाँ",
      "quote": ""
    },
    {
      "day": "शुक्रवार, 11 दिसंबर 2026",
      "icon": "🔥",
      "title": "शुभ लग्न",
      "en": "Wedding · Gauraj Bela",
      "date": "11 December 2026",
      "time": "6:00 PM",
      "note": "",
      "quote": "सात फेरे, सात वचन, एक जीवन"
    }
  ],
  "families": [
    {
      "title": "विनीत",
      "sub": "Vinit",
      "names": [
        "श्री रामकरण जी, स्व. मनु बाई",
        "श्री रूपाराम जी, सौ. गंगा बाई",
        "श्री महेश जी, सौ. सीमा बाई",
        "श्री प्रदीप जी, सौ. शीतल बाई"
      ]
    },
    {
      "title": "दर्शनाभिलाषी",
      "sub": "Darshanabhilashi",
      "names": [
        "श्रीमती शान्ता बाई",
        "श्री दियाराम जी प्रजापति",
        "श्री मयाराम जी प्रजापति",
        "श्री शुभम जी प्रजापति",
        "एवं मोहित जी, समीर जी, सनी"
      ]
    },
    {
      "title": "विशेष आग्रह",
      "sub": "फूफाजी",
      "names": [
        "स्व. श्री लक्ष्मण जी, सौ. कला बाई",
        "स्व. श्री राजाराम जी, सौ. राधा बाई",
        "श्री भैयालाल जी, सौ. कृष्णा बाई",
        "श्री गोपाल जी, सौ. शारदा बाई",
        "श्री उमाशंकर जी, सौ. मीरा बाई (जीजाजी)",
        "श्री दिपक जी, सौ. पूजा बाई"
      ]
    },
    {
      "title": "ननिहाल पक्ष",
      "sub": "Maternal family",
      "names": [
        "मामाजी श्री प्रवीण जी",
        "श्री संजीत जी",
        "श्री सचिन जी",
        "(ग्राम देड़तलाई)"
      ]
    }
  ],
  "storyQuote": "प्यार यानी तुम और मैं, साथ जीने का एक सपना…",
  "story": [
    {
      "photo": "/photos/ring.jpg",
      "en": "We met & fell in love",
      "hi": "तुम्हें देखा और दुनिया थम गई…"
    },
    {
      "photo": "/photos/haldi.jpg",
      "en": "Every moment felt like magic",
      "hi": "हर पल जादू सा था…"
    },
    {
      "photo": "/photos/sangeet.jpg",
      "en": "Hearts intertwined forever",
      "hi": "दो मन, एक धड़कन…"
    },
    {
      "photo": "/photos/pheras.jpg",
      "en": "We said yes!",
      "hi": "हाँ कहा, सपना पूरा हुआ"
    },
    {
      "photo": "/photos/groom.jpg",
      "en": "Beginning our journey",
      "hi": "अब साथ, हमेशा…"
    },
    {
      "photo": "/photos/bride.jpg",
      "en": "Forever starts now",
      "hi": "सदा साथ, सदा प्यार…"
    }
  ],
  "moments": [
    {
      "photo": "/photos/haldi.jpg",
      "cap": "Haldi Ke Rang"
    },
    {
      "photo": "/photos/sangeet.jpg",
      "cap": "Mahila Sangeet"
    },
    {
      "photo": "/photos/ring.jpg",
      "cap": "Sagai Samaroh"
    },
    {
      "photo": "/photos/pheras.jpg",
      "cap": "Saat Phere · Shubh Lagna"
    },
    {
      "photo": "/photos/groom.jpg",
      "cap": "The Groom · Ritesh"
    },
    {
      "photo": "/photos/bride.jpg",
      "cap": "The Bride · Simran"
    }
  ],
  "footer": "प्रजापति परिवार · पुनासा एवं इंदौर"
};
