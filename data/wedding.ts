import type { WeddingData } from "@/types/wedding";

/**
 * All website content lives here, written as printed on the invitation card.
 * Every text has { hi, en }. Family names are shown in Hindi in both languages.
 *
 * - Photos: put images in /public/photos and set photo: "/photos/name.jpg"
 * - Events are grouped under the day whose id matches `day`.
 * - siteUrl: your deployed link (goes into the WhatsApp invite message).
 */
export const wedding: WeddingData = {
  groom: {
    prefix: { hi: "चि.", en: "Chi." },
    name: { hi: "जग्गु", en: "Jaggu" },
    alias: { hi: "रितेश", en: "Ritesh" },
    photo: "/photos/dulha.jpg",
    lines: [
      { label: { hi: "सुपौत्र", en: "Grandson of" }, name: { hi: "श्री रामकरण जी प्रजापति", en: "Shri Ramkaran ji Prajapati" } },
      { label: { hi: "सुपुत्र", en: "Son of" }, name: { hi: "श्री महेश जी प्रजापति, पुनासा", en: "Shri Mahesh ji Prajapati, Punasa" } },
    ],
  },
  bride: {
    prefix: { hi: "सौ.कां.", en: "Sau.Kan." },
    name: { hi: "सिमरन", en: "Simran" },
    photo: "/photos/dulhan.jpg",
    lines: [
      { label: { hi: "सुपौत्री", en: "Granddaughter of" }, name: { hi: "स्व. श्री सन्नुलाल जी प्रजापति", en: "Late Shri Sannulal ji Prajapati" } },
      { label: { hi: "सुपुत्री", en: "Daughter of" }, name: { hi: "श्री कैलाश जी प्रजापति, इंदौर", en: "Shri Kailash ji Prajapati, Indore" } },
    ],
  },

  // शुभ लग्न — गोरज बेला (around sunset)
  datetime: "2026-12-11T17:45",
  dateText: { hi: "शुक्रवार, 11 दिसंबर 2026", en: "Friday, 11 December 2026" },
  lagnaText: { hi: "शुभ लग्न · गोरज बेला", en: "Shubh Lagna · Goraj Bela (dusk)" },

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
            "स्व. लक्ष्मण जी – सौ. कला बाई",
            "स्व. राजाराम जी – सौ. राधा बाई",
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
            "हरिराम जी – सौ. स्व. रूपलता बाई",
            "विष्णु जी – सौ. उर्मिला बाई",
            "प्रवीण जी – सौ. रुक्मणी बाई",
            "संजीव जी – सौ. उर्मिला बाई",
            "सचिन जी – सौ. किरण बाई",
            "दिनेश जी – सौ. उर्मिला",
            "मोनू जी – सौ. पूनम",
            "सुमित जी – सौ. शिवानी",
            "तुषार, आयुष, दीपांशु, मोहित",
          ],
        },
      ],
    },
  ],
  kidsRequest: {
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
      { hi: "श्री कृपाराम जी प्रजापति", en: "Shri Kriparam ji Prajapati" },
    ],
    address: { hi: "ग्राम पुनासा, जिला खंडवा (म.प्र.)", en: "Punasa, District Khandwa (M.P.)" },
    phones: ["9630216115", "7000842735"],
  },

  heroPhotos: ["/photos/pheras.jpg", "/photos/ring.jpg"],
  moments: [
    { photo: "/photos/dulha-dulhan.jpg", cap: { hi: "दूल्हा-दुल्हन", en: "The Bride & Groom" } },
    { photo: "/photos/vivah-look.jpg", cap: { hi: "शुभ विवाह", en: "Wedding" } },
    { photo: "/photos/haldi-look.jpg", cap: { hi: "हल्दी", en: "Haldi" } },
    { photo: "/photos/mehndi-look.jpg", cap: { hi: "मेहंदी", en: "Mehndi" } },
    { photo: "/photos/sagai-look.jpg", cap: { hi: "सगाई", en: "Engagement" } },
    { photo: "/photos/reception-look.jpg", cap: { hi: "स्नेहभोज", en: "Reception" } },
    { photo: "/photos/groom-sherwani.jpg", cap: { hi: "दूल्हे राजा", en: "The Groom" } },
    { photo: "/photos/groom-jodhpuri.jpg", cap: { hi: "शाही अंदाज़", en: "Royal Look" } },
    { photo: "/photos/groom-bandi.jpg", cap: { hi: "रितेश", en: "Ritesh" } },
    { photo: "/photos/couple.jpg", cap: { hi: "हम दोनों", en: "Together Forever" } },
    { photo: "/photos/simran-closeup.jpg", cap: { hi: "सिमरन", en: "Simran" } },
  ],

  siteUrl: "",
};
