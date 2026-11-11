import type { Side, WeddingData } from "@/types/wedding";

/**
 * All website content lives here, written as printed on the invitation cards.
 * There are two cards: `groomSide` (वर पक्ष, Punasa) and `brideSide` (वधू पक्ष, Indore).
 * The switch in the navbar picks one; a link with ?side=bride opens the bride's card.
 * Every text has { hi, en }. Family names are shown in Hindi in both languages.
 *
 * - Photos: put images in /public/photos and set photo: "/photos/name.jpg"
 * - Events are grouped under the day whose id matches `day`.
 * - siteUrl: your deployed link (goes into the WhatsApp invite message).
 */
export const groomSide: WeddingData = {
  side: "groom",
  groom: {
    prefix: { hi: "चि.", en: "Chi." },
    name: { hi: "जग्गु", en: "Jaggu" },
    alias: { hi: "रितेश", en: "Ritesh" },
    photo: "/photos/groom-back.jpg",
    lines: [
      { label: { hi: "सुपौत्र", en: "Grandson of" }, name: { hi: "श्री रामकरण जी प्रजापति", en: "Shri Ramkaran ji Prajapati" } },
      { label: { hi: "सुपुत्र", en: "Son of" }, name: { hi: "श्री महेश जी प्रजापति, पुनासा", en: "Shri Mahesh ji Prajapati, Punasa" } },
    ],
  },
  bride: {
    prefix: { hi: "सौ.कां.", en: "Sau.Kan." },
    name: { hi: "सिमरन", en: "Simran" },
    photo: "/photos/bride-back.jpg",
    lines: [
      { label: { hi: "सुपौत्री", en: "Granddaughter of" }, name: { hi: "स्व. श्री सन्नुलाल जी प्रजापति", en: "Late Shri Sannulal ji Prajapati" } },
      { label: { hi: "सुपुत्री", en: "Daughter of" }, name: { hi: "श्री कैलाश जी प्रजापति, इंदौर", en: "Shri Kailash ji Prajapati, Indore" } },
    ],
  },

  // शुभ लग्न — गोरज बेला (around sunset)
  datetime: "2026-12-11T17:45",
  dateText: { hi: "शुक्रवार, 11 दिसंबर 2026", en: "Friday, 11 December 2026" },
  lagnaText: { hi: "शुभ लग्न · गोरज बेला", en: "Shubh Lagna · Goraj Bela (dusk)" },
  countdownLabel: { hi: "शुभ लग्न में शेष समय", en: "Counting Down To The Wedding" },

  invocation: {
    hi: "मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः।\nमंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥",
    en: "Mangalam Bhagavan Vishnuh, Mangalam Garudadhvajah,\nMangalam Pundarikakshah, Mangalaya Tano Harih.",
  },
  intro: {
    hi: "माँ कुलदेवी एवं सतगुरु सिंगाजी महाराज की असीम कृपा से हमारे यहाँ शुभ प्रसंग आया है…",
    en: "By the boundless grace of Maa Kuldevi and Satguru Singaji Maharaj, an auspicious occasion has come to our home…",
  },
  invite: {
    hi: "के मंगल परिणय के शुभ अवसर पर प्रजापति परिवार आपको सादर आमंत्रित करता है।",
    en: "On the auspicious occasion of their sacred wedding, the Prajapati family warmly invites you.",
  },
  blessing: {
    hi: "इस मधुर बेला में पधारकर नवयुगल को शुभ आशीर्वाद प्रदान करें।",
    en: "Please grace this joyous moment and bless the newly-wed couple.",
  },

  days: [
    { id: "d1", date: "09.12.2026", label: { hi: "बुधवार, 9 दिसंबर 2026", en: "Wednesday, 9 December 2026" } },
    { id: "d2", date: "10.12.2026", label: { hi: "गुरुवार, 10 दिसंबर 2026", en: "Thursday, 10 December 2026" } },
    { id: "d3", date: "11.12.2026", label: { hi: "शुक्रवार, 11 दिसंबर 2026", en: "Friday, 11 December 2026" } },
  ],
  events: [
    { day: "d1", icon: "🪔", title: { hi: "माता पूजन", en: "Mata Pujan" }, time: { hi: "शाम 4:30 बजे से", en: "From 4:30 PM" } },
    { day: "d1", icon: "🌼", title: { hi: "श्री गणेश पूजन / हल्दी", en: "Shri Ganesh Pujan / Haldi" }, time: { hi: "शाम 7:00 बजे", en: "7:00 PM" } },
    { day: "d1", icon: "🎶", title: { hi: "महिला संगीत", en: "Mahila Sangeet" }, time: { hi: "रात्रि 8:00 बजे", en: "8:00 PM" } },

    { day: "d2", icon: "🌿", title: { hi: "हरा मण्डप", en: "Hara Mandap" }, time: { hi: "सुबह 9:00 बजे से", en: "From 9:00 AM" } },
    { day: "d2", icon: "👘", title: { hi: "पेरावणी", en: "Peravani" }, time: { hi: "दोपहर 1:00 बजे से", en: "From 1:00 PM" } },
    {
      day: "d2",
      icon: "🎁",
      title: { hi: "मामेरा", en: "Mamera" },
      time: { hi: "दोपहर 1:00 बजे", en: "1:00 PM" },
      note: {
        hi: "मामाजी श्री प्रवीण जी, श्री संजीव जी, श्री सचिन जी (ग्राम देड़तलाई) वालों के यहाँ से आएगा।",
        en: "Arrives from Mamaji Shri Pravin ji, Shri Sanjeev ji & Shri Sachin ji (village Dedtalai).",
      },
    },
    {
      day: "d2",
      icon: "🍛",
      title: { hi: "स्नेहभोज", en: "Sneh Bhoj (Dinner)" },
      time: { hi: "शाम 6:00 बजे से आपके आगमन तक", en: "From 6:00 PM until your arrival" },
      note: { hi: "निज निवास, कुम्हार मोहल्ला, पुनासा", en: "Our home, Kumhar Mohalla, Punasa" },
    },

    {
      day: "d3",
      icon: "🐎",
      title: { hi: "बारात प्रस्थान", en: "Baraat Departure" },
      time: { hi: "सुबह 7:00 बजे", en: "7:00 AM" },
      note: {
        hi: "श्री कैलाश जी प्रजापति, इंदौर वालों के यहाँ जाएगी।",
        en: "Leaves for the home of Shri Kailash ji Prajapati, Indore.",
      },
    },
    {
      day: "d3",
      icon: "💍",
      title: { hi: "सगाई रस्म", en: "Sagai Ceremony" },
      time: { hi: "दोपहर 1:00 बजे", en: "1:00 PM" },
      note: { hi: "इंदौर में", en: "At Indore" },
    },
    {
      day: "d3",
      icon: "🔥",
      title: { hi: "शुभ लग्न", en: "Shubh Lagna (Wedding)" },
      time: { hi: "गोरज बेला", en: "Goraj Bela (dusk)" },
      note: { hi: "इंदौर में", en: "At Indore" },
      main: true,
    },
  ],
  feast: {
    title: { hi: "स्नेहभोज", en: "Sneh Bhoj" },
    date: { hi: "गुरुवार, 10 दिसंबर 2026", en: "Thursday, 10 December 2026" },
    time: { hi: "शाम 6:00 बजे से आपके आगमन तक", en: "From 6:00 PM until your arrival" },
  },
  venue: {
    name: { hi: "निज निवास, कुम्हार मोहल्ला, पुनासा", en: "Our home, Kumhar Mohalla, Punasa" },
    address: { hi: "तह. पुनासा, जिला खंडवा (म.प्र.)", en: "Tehsil Punasa, District Khandwa, Madhya Pradesh" },
    map: "",
    // "Kumhar Mohalla" alone matches one in Khandwa city, so search the town
    mapQuery: "Punasa, Khandwa, Madhya Pradesh",
  },

  families: [
    {
      title: { hi: "दर्शनाभिलाषी", en: "Eager to Welcome You" },
      parts: [
        {
          names: [
            "गं.तु. शांता बाई",
            "दयाराम जी प्रजापति",
            "मयाराम जी प्रजापति",
            "शुभम जी प्रजापति",
            "मोहित, समीर, सनी",
            "एवं समस्त प्रजापति परिवार",
          ],
        },
      ],
    },
    {
      title: { hi: "स्वागतातुर", en: "Awaiting Your Arrival" },
      parts: [
        {
          label: { hi: "फूफाजी", en: "Phoophaji" },
          names: [
            "स्व. लक्ष्मण जी – श्रीमती कला बाई",
            "स्व. राजाराम जी – श्रीमती राधा बाई",
            "भैयालाल जी – सौ. कृष्णा बाई",
            "गोपाल जी – सौ. शारदा बाई",
            "उमाशंकर जी – सौ. मीरा बाई",
          ],
        },
        {
          label: { hi: "जीजाजी", en: "Jijaji" },
          names: ["दीपक जी – सौ. पूजा बाई", "अमित जी – सौ. आरती बाई"],
        },
      ],
    },
    {
      title: { hi: "विनीत", en: "With Warm Regards" },
      parts: [
        {
          names: [
            "रामकरण जी – स्व. मरु बाई",
            "कृपाराम जी – सौ. गंगा बाई",
            "महेश जी – सौ. सीमा बाई",
            "प्रदीप जी – सौ. शीतल बाई",
            "कुणाल जी प्रजापति",
            "राजकुमारी, निशा",
            "एवं समस्त प्रजापति परिवार",
          ],
        },
      ],
    },
    {
      title: { hi: "ननिहाल पक्ष", en: "Maternal Family" },
      parts: [
        {
          names: [
            "स्व. रामचरण जी – शांति बाई प्रजापति",
            "भागवत जी – सौ. कृष्णा बाई",
            "हरिराम जी – श्रीमती स्व. रूपलता बाई",
            "विष्णु जी – सौ. उर्मिला बाई",
            "प्रवीण जी – सौ. रुक्मणी बाई",
            "संजीव जी – सौ. उर्मिला बाई",
            "सचिन जी – सौ. किरण बाई",
            "दिनेश जी – सौ. उर्मिला",
            "मोनू जी – सौ. पूनम",
            "सुमित जी – सौ. शिवानी",
            "तुषार, आयुष, दीपांशु, मोहित, भारती, वंशिका",
          ],
        },
      ],
    },
  ],
  kidsRequest: {
    title: { hi: "बाल आग्रह", en: "A Request From The Kids" },
    text: {
      hi: "शिकायत हमें मंज़ूर नहीं, ना कोई बहाना होगा।\nहमारी खुशियों की खातिर आपको हर हाल में\nहमारे चाचा / मामा की शादी में आना होगा।",
      en: "No complaints, no excuses!\nFor the sake of our happiness, you simply must\ncome to our Chacha / Mama's wedding.",
    },
    names: "पूर्वांश, सान्वी, सार्थिक, हितांश, शिवांशी",
  },
  senders: {
    names: [
      { hi: "श्री रामकरण जी प्रजापति", en: "Shri Ramkaran ji Prajapati" },
      { hi: "श्री महेश जी प्रजापति", en: "Shri Mahesh ji Prajapati" },
    ],
    address: { hi: "ग्राम पुनासा, जिला खंडवा (म.प्र.)", en: "Punasa, District Khandwa (M.P.)" },
    phones: ["9630216115", "7000842735"],
  },
  familyLine: { hi: "समस्त प्रजापति परिवार · पुनासा", en: "The Prajapati Family · Punasa" },

  heroPhotos: ["/photos/ring.jpg", "/photos/haath-pakad.jpg"],
  moments: [
    { photo: "/photos/dulha-dulhan.jpg", cap: { hi: "दूल्हा-दुल्हन", en: "The Bride & Groom" } },
    { photo: "/photos/vivah-look.jpg", cap: { hi: "शुभ विवाह", en: "Wedding" } },
    { photo: "/photos/haldi-look.jpg", cap: { hi: "हल्दी", en: "Haldi" } },
    { photo: "/photos/mehndi-look.jpg", cap: { hi: "मेहंदी", en: "Mehndi" } },
    { photo: "/photos/sagai-look.jpg", cap: { hi: "सगाई", en: "Engagement" } },
    { photo: "/photos/reception-look.jpg", cap: { hi: "स्नेहभोज", en: "Reception" } },
    { photo: "/photos/couple.jpg", cap: { hi: "हम दोनों", en: "Together Forever" } },
    { photo: "/photos/pheras.jpg", cap: { hi: "सात फेरे", en: "Saat Phere" } },
    { photo: "/photos/ring.jpg", cap: { hi: "अंगूठी रस्म", en: "Ring Ceremony" } },
  ],

  siteUrl: "",
};

/** वधू पक्ष — the bride's family card (Indore), as printed. */
export const brideSide: WeddingData = {
  side: "bride",
  groom: {
    prefix: { hi: "चि.", en: "Chi." },
    name: { hi: "रितेश", en: "Ritesh" },
    photo: "/photos/groom-back.jpg",
    lines: [
      { label: { hi: "सुपौत्र", en: "Grandson of" }, name: { hi: "श्री रामकरण जी – स्व. मरुबाई", en: "Shri Ramkaran ji – Late Marubai" } },
      { label: { hi: "सुपुत्र", en: "Son of" }, name: { hi: "श्री महेश जी – सौ. सीमा प्रजापत", en: "Shri Mahesh ji – Smt. Seema Prajapat" } },
      { label: { hi: "निवास", en: "From" }, name: { hi: "पुनासा (जिला – खंडवा)", en: "Punasa (District Khandwa)" } },
    ],
  },
  bride: {
    prefix: { hi: "सौ.का.", en: "Sau.Ka." },
    name: { hi: "सिमरन", en: "Simran" },
    photo: "/photos/bride-back.jpg",
    lines: [
      { label: { hi: "सुपौत्री", en: "Granddaughter of" }, name: { hi: "श्री सन्नूलाल जी – श्रीमती मोहनबाई प्रजापत", en: "Shri Sannulal ji – Smt. Mohanbai Prajapat" } },
      { label: { hi: "सुपुत्री", en: "Daughter of" }, name: { hi: "कैलाश जी – सौ. नीरू प्रजापत", en: "Kailash ji – Smt. Neeru Prajapat" } },
      { label: { hi: "निवास", en: "From" }, name: { hi: "इन्दौर (म.प्र.)", en: "Indore (M.P.)" } },
    ],
  },

  // Countdown to the आशीर्वाद समारोह एवं प्रीतिभोज (from 7 PM); the baraat also arrives at 7 PM
  datetime: "2026-12-11T19:00",
  dateText: { hi: "शुक्रवार, 11 दिसम्बर 2026", en: "Friday, 11 December 2026" },
  lagnaText: { hi: "आशीर्वाद समारोह · शाम 7 बजे से", en: "Blessing Ceremony · From 7 PM" },
  countdownLabel: { hi: "मंगल परिणय में शेष समय", en: "Counting Down To The Wedding" },

  invocation: groomSide.invocation,
  intro: {
    hi: "स्नेही स्वजन, कुलदेवी देव की असीम कृपा से हमारे परिवार में खुशी का पल आया है, प्रसंग है – हमारी लाड़ली…",
    en: "Dear loved ones, by the boundless grace of our Kuldevi, a joyous moment has come to our family – our beloved daughter…",
  },
  invite: {
    hi: "के मंगल परिणय में हर्षोल्लास के मधुर पलों में पधारकर नवयुगल को शुभाशीष प्रदान करें।",
    en: "Please join us in these sweet, joyful moments of their sacred wedding and bless the newly-wed couple.",
  },
  blessing: { hi: "आप सपरिवार सादर आमंत्रित हैं।", en: "You and your family are warmly invited." },

  days: [
    { id: "d1", date: "09.12.2026", label: { hi: "बुधवार, 9 दिसम्बर 2026", en: "Wednesday, 9 December 2026" } },
    { id: "d2", date: "10.12.2026", label: { hi: "गुरुवार, 10 दिसम्बर 2026", en: "Thursday, 10 December 2026" } },
    { id: "d3", date: "11.12.2026", label: { hi: "शुक्रवार, 11 दिसम्बर 2026", en: "Friday, 11 December 2026" } },
  ],
  events: [
    {
      day: "d1",
      icon: "🪔",
      title: { hi: "गणेश पूजन / माता पूजन", en: "Ganesh Pujan / Mata Pujan" },
      time: { hi: "प्रातः 9:00 बजे", en: "9:00 AM" },
      note: { hi: "निज निवास", en: "At our home" },
    },
    {
      day: "d1",
      icon: "🌿",
      title: { hi: "मण्डप एवं चाकभात", en: "Mandap & Chaak Bhaat" },
      time: { hi: "दोपहर 3:00 बजे", en: "3:00 PM" },
      note: { hi: "निज निवास", en: "At our home" },
    },
    {
      day: "d1",
      icon: "🌼",
      title: { hi: "हल्दी / मेंहदी", en: "Haldi / Mehndi" },
      time: { hi: "शाम 6:00 बजे", en: "6:00 PM" },
      note: { hi: "निज निवास", en: "At our home" },
    },

    {
      day: "d2",
      icon: "🌊",
      title: { hi: "गंगा माता पूजन", en: "Ganga Mata Pujan" },
      time: { hi: "प्रातः 8:30 बजे", en: "8:30 AM" },
      note: { hi: "निज निवास", en: "At our home" },
    },
    { day: "d2", icon: "🎁", title: { hi: "मामेरा", en: "Mamera" }, time: { hi: "दोपहर 12:00 बजे", en: "12:00 PM" } },
    { day: "d2", icon: "🎶", title: { hi: "महिला संगीत", en: "Mahila Sangeet" }, time: { hi: "शाम 7:00 बजे", en: "7:00 PM" } },

    { day: "d3", icon: "💍", title: { hi: "सगाई", en: "Sagai (Engagement)" }, time: { hi: "दोपहर 1:00 बजे", en: "1:00 PM" } },
    {
      day: "d3",
      icon: "🐎",
      title: { hi: "बारात आगमन", en: "Baraat Arrival" },
      time: { hi: "शाम 7:00 बजे", en: "7:00 PM" },
      note: {
        hi: "बारात श्री महेश जी (पुनासा) वालों के यहाँ से हिम्मत नगर आवेगी।",
        en: "The baraat arrives at Himmat Nagar from Shri Mahesh ji's family (Punasa).",
      },
    },
    {
      day: "d3",
      icon: "🍛",
      title: { hi: "आशीर्वाद समारोह एवं प्रीतिभोज", en: "Blessing Ceremony & Dinner" },
      time: { hi: "शाम 7 बजे से आपके आगमन तक", en: "From 7:00 PM until your arrival" },
      note: { hi: "हिम्मत नगर, पालदा, इन्दौर", en: "Himmat Nagar, Palda, Indore" },
      main: true,
    },
  ],
  feast: {
    title: { hi: "आशीर्वाद समारोह एवं प्रीतिभोज", en: "Blessing Ceremony & Dinner" },
    date: { hi: "शुक्रवार, 11 दिसम्बर 2026", en: "Friday, 11 December 2026" },
    time: { hi: "शाम 7 बजे से आपके आगमन तक", en: "From 7:00 PM until your arrival" },
  },
  venue: {
    name: { hi: "हिम्मत नगर, राधास्वामी 9 नं. गेट के आगे", en: "Himmat Nagar, past Radhaswami Gate No. 9" },
    address: { hi: "पालदा, इन्दौर (म.प्र.)", en: "Palda, Indore, Madhya Pradesh" },
    map: "",
    mapQuery: "Himmat Nagar, Palda, Indore, Madhya Pradesh",
  },

  families: [
    {
      title: { hi: "दर्शनाभिलाषी", en: "Eager to Welcome You" },
      parts: [
        {
          label: { hi: "भैया – भाभी", en: "Bhaiya – Bhabhi" },
          names: [
            "विकास – सौ. आरती प्रजापत",
            "धर्मेन्द्र – सौ. आरती प्रजापत",
            "दिनेश – सौ. तनु प्रजापत",
            "प्रद – सौ. सौरभ प्रजापत",
            "गोपी प्रजापत",
          ],
        },
      ],
    },
    {
      title: { hi: "स्वागतातुर", en: "Awaiting Your Arrival" },
      parts: [
        {
          label: { hi: "बुआ – फूफाजी", en: "Bua – Phoophaji" },
          names: ["स्व. देवीराम – श्रीमती देवीबाई", "श्रीनिवास जी – सौ. गीता प्रजापत"],
        },
        {
          label: { hi: "जीजी – जीजाजी", en: "Jiji – Jijaji" },
          names: [
            "स्व. हेकराज – सौ. हेमलता प्रजापत",
            "अनिल – शिवानी प्रजापत",
            "हरिसिंह – नीतू प्रजापत",
            "रामभरोसा – पायल प्रजापत",
            "महेश – सौ. रानू प्रजापत",
            "उमेश – सौ. पूजा प्रजापत",
            "संदीप – सौ. पायल",
          ],
        },
      ],
    },
    {
      title: { hi: "विनीत", en: "With Warm Regards" },
      parts: [
        {
          names: [
            "श्री स्व. सन्नूलाल जी – श्रीमती मोहनबाई",
            "कैलाश जी – सौ. नीरू प्रजापत",
            "स्व. गोपाल – रामबाई प्रजापत",
            "स्व. मानकचंद जी – जानकी",
            "लक्ष्मण जी – मालती",
          ],
        },
      ],
    },
    {
      title: { hi: "भतीजा – भतीजी", en: "Nephews & Nieces" },
      parts: [{ names: ["संतोष – सौ. मीराबाई", "कन्हैया – सौ. गुंजाबाई", "लखन – सौ. किरण"] }],
    },
    {
      title: { hi: "ननिहाल पक्ष", en: "Maternal Family" },
      parts: [
        {
          label: { hi: "नाना – नानी", en: "Nana – Nani" },
          names: [
            "रामलाल जी – सौ. रामप्यारी प्रजापत",
            "प्रेम जी – सौ. मेम बाई प्रजापत",
            "चिरोंजी – सौ. सिमा प्रजापत",
            "हरवल प्रसाद – सौ. गौरी बाई",
          ],
        },
        {
          label: { hi: "मामा – मामी", en: "Mama – Mami" },
          names: [
            "स्व. रामनारायण जी – स्व. श्रीमती गीता प्रजापति",
            "रवि – सौ. आशा प्रजापत",
            "अरुण – सौ. सरिता प्रजापत",
            "नारायण – सौ. नीलम",
            "पप्पू – सौ. सोनम",
          ],
        },
      ],
    },
  ],
  kidsRequest: {
    title: { hi: "बाल मनुहार", en: "A Request From The Kids" },
    text: {
      hi: "शिकायत हमें मंज़ूर नहीं, ना कोई बहाना होगा।\nहमारी खुशियों की खातिर आपको हर हाल में\nहमारी दीदी / बुआ की शादी में आना होगा।",
      en: "No complaints, no excuses!\nFor the sake of our happiness, you simply must\ncome to our Didi / Bua's wedding.",
    },
    names: "रुद्र, हिमांशी, वेदांस, प्रियांक्षी, अर्थव, रोहित, कलापिथ, रौनक, कायरव, आर्यमन, रिशभ",
  },
  senders: {
    names: [
      { hi: "स्व. सन्नूलाल जी", en: "Late Shri Sannulal ji" },
      { hi: "श्रीमती मोहनबाई प्रजापत", en: "Smt. Mohanbai Prajapat" },
      { hi: "कैलाश – सौ. नीरू प्रजापत", en: "Kailash – Smt. Neeru Prajapat" },
    ],
    address: { hi: "निवास – हिम्मत नगर, पालदा, इन्दौर", en: "Himmat Nagar, Palda, Indore" },
    phones: ["7869348831", "9575129747"],
  },
  familyLine: { hi: "समस्त प्रजापत परिवार · इन्दौर", en: "The Prajapat Family · Indore" },

  heroPhotos: groomSide.heroPhotos,
  moments: groomSide.moments,
  siteUrl: groomSide.siteUrl,
};

export const sides: Record<Side, WeddingData> = { groom: groomSide, bride: brideSide };
