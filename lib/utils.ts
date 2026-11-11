import type { Day, Person, WeddingData, WeddingEvent } from "@/types/wedding";

export const GRADIENTS = [
  "#f3c35a,#c2410c",
  "#f0c3a8,#a31d2b",
  "#efe1c4,#bf9a5e",
  "#d7e3c8,#4f7a3a",
  "#e9c7c7,#8c1c2a",
  "#f3dfb0,#c99a52",
];

export const placeholderBg = (i: number) => `linear-gradient(160deg,${GRADIENTS[i % GRADIENTS.length]})`;

export function mapUrl(d: WeddingData): string {
  return d.venue.map || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(d.venue.mapQuery);
}

export const mapEmbedUrl = (d: WeddingData) =>
  `https://www.google.com/maps?q=${encodeURIComponent(d.venue.mapQuery)}&z=15&output=embed`;

/** The couple in card order: the family whose card it is comes first. */
export function couple(d: WeddingData): [Person, Person] {
  return d.side === "bride" ? [d.bride, d.groom] : [d.groom, d.bride];
}

/** Short name in one language: the alias in brackets if there is one (रितेश), else the name. */
export const shortName = (person: Person, lang: "hi" | "en") => (person.alias ?? person.name)[lang];

/** URL param that picks the bride's card (?side=bride); without it the groom's card is shown */
export const SIDE_PARAM = "side";

export function groupEventsByDay(days: Day[], events: WeddingEvent[]) {
  return days.map((day) => ({ day, items: events.filter((e) => e.day === day.id) })).filter((g) => g.items.length);
}

/** URL param that carries the guest's name in a personalised invitation link */
export const GUEST_PARAM = "to";

/** Invitation link that greets one guest by name when opened. */
export function guestLink(siteUrl: string, guest: string): string {
  const name = guest.trim();
  if (!name) return siteUrl;
  return `${siteUrl}${siteUrl.includes("?") ? "&" : "?"}${GUEST_PARAM}=${encodeURIComponent(name)}`;
}

export function inviteMessage(d: WeddingData, siteUrl: string, guest = ""): string {
  const full = (x: Person) => `${x.prefix.hi} ${x.name.hi}${x.alias ? ` (${x.alias.hi})` : ""}`;
  const [a, b] = couple(d);
  return (
    `॥ श्री गणेशाय नमः ॥\n\n` +
    (guest.trim() ? `आदरणीय *${guest.trim()}*,\n\n` : "") +
    `*शुभ विवाह*\n` +
    `${full(a)} संग ${full(b)}\n\n` +
    `${d.feast.title.hi}: ${d.feast.date.hi}, ${d.feast.time.hi}\n` +
    `स्थान: ${d.venue.name.hi}, ${d.venue.address.hi}\n` +
    `${d.lagnaText.hi}: ${d.dateText.hi}\n\nआप सपरिवार सादर आमंत्रित हैं।` +
    (siteUrl ? `\n\nनिमंत्रण पत्रिका देखें:\n${siteUrl}` : "") +
    `\n\n— ${d.familyLine.hi.replace(" · ", ", ")}`
  );
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
