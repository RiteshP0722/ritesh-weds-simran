import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "शुभ विवाह · रितेश संग सिमरन";
const description = "स्नेहभोज 10 दिसंबर 2026 · शुभ लग्न 11 दिसंबर 2026 · प्रजापति परिवार, पुनासा";

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
  themeColor: "#fbf6f1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Great+Vibes&family=Playfair+Display:wght@500;600&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
