export interface Person {
  name: string;
  full: string;
  photo: string;
  /** Family lines; prefix with "*" to highlight */
  lines: string[];
  place: string;
}

export interface WeddingEvent {
  day: string;
  icon: string;
  title: string;
  en: string;
  date: string;
  time: string;
  note: string;
  quote: string;
}

export interface FamilyGroup {
  title: string;
  sub: string;
  names: string[];
}

export interface StoryItem {
  photo: string;
  en: string;
  hi: string;
}

export interface Moment {
  photo: string;
  cap: string;
}

export interface Venue {
  name: string;
  address: string;
  /** Optional Google Maps link; falls back to a search for name + address */
  map: string;
}

export interface WeddingData {
  groom: Person;
  bride: Person;
  /** ISO local date-time in IST, e.g. "2026-12-11T18:00" */
  datetime: string;
  dateDots: string;
  dateLong: string;
  datePill: string;
  timeText: string;
  timeNote: string;
  tagline: string;
  lead: string;
  venue: Venue;
  whatsapp: string;
  siteUrl: string;
  events: WeddingEvent[];
  families: FamilyGroup[];
  storyQuote: string;
  story: StoryItem[];
  moments: Moment[];
  footer: string;
}
