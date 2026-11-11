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
  /** Optional Google Maps link; falls back to a search for `mapQuery` */
  map: string;
  /** Text searched on Google Maps for the embedded map and the directions button */
  mapQuery: string;
}

/** Whose invitation card this is: the groom's family (वर पक्ष) or the bride's family (वधू पक्ष). */
export type Side = "groom" | "bride";

export interface WeddingData {
  /** Whose card this is; that person's name is shown first everywhere */
  side: Side;
  groom: Person;
  bride: Person;
  /** ISO local date-time in IST of the शुभ लग्न, used by the countdown */
  datetime: string;
  dateText: L;
  lagnaText: L;
  /** Heading above the countdown, e.g. शुभ लग्न में शेष समय */
  countdownLabel: L;
  invocation: L;
  intro: L;
  invite: L;
  blessing: L;
  days: Day[];
  events: WeddingEvent[];
  feast: { title: L; date: L; time: L };
  venue: Venue;
  families: FamilyGroup[];
  kidsRequest: { title: L; text: L; names: string };
  senders: { names: L[]; address: L; phones: string[] };
  /** Family line in the footer and at the end of the WhatsApp message */
  familyLine: L;
  /**
   * Full-screen slideshow photos on the front page.
   * Use { src, fit: "whole" } for a small or wide photo: it is shown complete over a blurred copy
   * of itself instead of being zoomed to fill the screen (which crops and blurs it on phones).
   */
  heroPhotos: (string | { src: string; fit: "whole" })[];
  moments: Moment[];
  /** Deployed link for the WhatsApp invite; "" uses the current page URL */
  siteUrl: string;
}
