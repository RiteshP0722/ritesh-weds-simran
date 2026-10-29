/** Text in both languages. */
export interface L {
  hi: string;
  en: string;
}

export interface LineageLine {
  /** e.g. सुपौत्र / सुपुत्र */
  label: L;
  name: L;
}

export interface Person {
  /** Honorific shown before the name: चि. / सौ.कां. */
  prefix: L;
  /** Name as printed on the card (e.g. जग्गु) */
  name: L;
  /** Optional name in brackets (e.g. रितेश) */
  alias?: L;
  photo: string;
  lines: LineageLine[];
}

export interface WeddingEvent {
  /** Must match a `days[].id` */
  day: string;
  icon: string;
  title: L;
  time: L;
  /** Optional extra line, e.g. where / from whom */
  note?: L;
  /** Highlighted as the main ceremony */
  main?: boolean;
}

export interface Day {
  id: string;
  label: L;
  /** dd.mm.yyyy */
  date: string;
}

export interface FamilyGroup {
  title: L;
  /** Optional sub-headings inside one group (e.g. फूफाजी / जीजाजी) */
  parts: { label?: L; names: string[] }[];
}

export interface Moment {
  photo: string;
  cap: L;
}

export interface Venue {
  name: L;
  address: L;
  /** Optional Google Maps link; falls back to a search for the address */
  map: string;
}

export interface WeddingData {
  groom: Person;
  bride: Person;
  /** ISO local date-time in IST of the शुभ लग्न, used by the countdown */
  datetime: string;
  dateText: L;
  lagnaText: L;
  invocation: L;
  intro: L;
  invite: L;
  blessing: L;
  days: Day[];
  events: WeddingEvent[];
  feast: { title: L; date: L; time: L };
  venue: Venue;
  families: FamilyGroup[];
  kidsRequest: { text: L; names: string };
  senders: { names: L[]; address: L; phones: string[] };
  /** Full-screen slideshow photos on the front page */
  heroPhotos: string[];
  moments: Moment[];
  /** Deployed link for the WhatsApp invite; "" uses the current page URL */
  siteUrl: string;
}
