import type { WeddingData, WeddingEvent } from "@/types/wedding";

export const GRADIENTS = [
  "#e7c98f,#b88a35",
  "#f0c3a8,#c97a7a",
  "#efe1c4,#bf9a5e",
  "#d7e3c8,#8eaa78",
  "#e9c7c7,#b86f6f",
  "#f3dfb0,#c99a52",
];

export const placeholderBg = (i: number) => `linear-gradient(160deg,${GRADIENTS[i % GRADIENTS.length]})`;

export function mapUrl(d: WeddingData): string {
  return (
    d.venue.map ||
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${d.venue.name}, ${d.venue.address}`)
  );
}

/** api.whatsapp.com directly — the wa.me redirect breaks emoji */
export function whatsappBase(phone: string): string {
  const n = (phone || "").replace(/\D/g, "");
  const p = n ? `phone=${n.length === 10 ? "91" + n : n}&` : "";
  return `https://api.whatsapp.com/send?${p}text=`;
}

export function groupEventsByDay(events: WeddingEvent[]) {
  const days: { day: string; items: WeddingEvent[] }[] = [];
  for (const e of events) {
    let g = days.find((d) => d.day === e.day);
    if (!g) days.push((g = { day: e.day, items: [] }));
    g.items.push(e);
  }
  return days;
}

export function inviteMessage(d: WeddingData, siteUrl: string): string {
  return (
    `॥ श्री गणेशाय नमः ॥\n\n*${d.groom.name} संग ${d.bride.name}*\n` +
    `शुभ विवाह: ${d.dateLong}, ${d.timeText} (${d.timeNote})\n` +
    `स्थान: ${d.venue.name}, ${d.venue.address}\n\nआप सपरिवार सादर आमंत्रित हैं।` +
    (siteUrl ? `\n\nनिमंत्रण पत्रिका देखें:\n${siteUrl}` : "") +
    `\n\n— ${d.footer}`
  );
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
