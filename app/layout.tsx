import type { Metadata, Viewport } from "next";
import { wedding } from "@/data/wedding";
import "./globals.css";

const title = `${wedding.groom.name} Weds ${wedding.bride.name}`;
const description = `${wedding.dateLong} · ${wedding.venue.address}. ${wedding.tagline}`;

export const metadata: Metadata = {
  title,
  description,
  // Shown in the WhatsApp / social link preview
  openGraph: { title, description, type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b3326",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Clean, readable and attractive Google Fonts for Hindi and English */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Marcellus&family=Montserrat:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
