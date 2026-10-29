import type { Day, WeddingData, WeddingEvent } from "@/types/wedding";

export const GRADIENTS = [
  "#f3c35a,#c2410c",
  "#f0c3a8,#a31d2b",
  "#efe1c4,#bf9a5e",
  "#d7e3c8,#4f7a3a",
  "#e9c7c7,#8c1c2a",
  "#f3dfb0,#c99a52",
];

export const placeholderBg = (i: number) => `linear-gradient(160deg,${GRADIENTS[i % GRADIENTS.length]})`;

/** Map search text for the venue (Punasa town; "Kumhar Mohalla" alone matches one in Khandwa city) */
export const MAP_QUERY = "Punasa, Khandwa, Madhya Pradesh";

export function mapUrl(d: WeddingData): string {
  return d.venue.map || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(MAP_QUERY);
}

export const mapEmbedUrl = () => `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;

export function groupEventsByDay(days: Day[], events: WeddingEvent[]) {
  return days.map((day) => ({ day, items: events.filter((e) => e.day === day.id) })).filter((g) => g.items.length);
}

export function inviteMessage(d: WeddingData, siteUrl: string): string {
  return (
    `॥ श्री गणेशाय नमः ॥\n\n*शुभ विवाह*\n` +
    `चि. ${d.groom.name.hi} (${d.groom.alias?.hi}) संग सौ.कां. ${d.bride.name.hi}\n\n` +
    `स्नेहभोज: ${d.feast.date.hi}, ${d.feast.time.hi}\n` +
    `स्थान: ${d.venue.name.hi}, ${d.venue.address.hi}\n` +
    `शुभ लग्न: ${d.dateText.hi}, गोरज बेला\n\nआप सपरिवार सादर आमंत्रित हैं।` +
    (siteUrl ? `\n\nनिमंत्रण पत्रिका देखें:\n${siteUrl}` : "") +
    `\n\n— समस्त प्रजापति परिवार, पुनासा`
  );
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
