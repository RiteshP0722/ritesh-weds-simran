import { wedding } from "@/data/wedding";
import Gate from "@/components/Gate";
import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Events from "@/components/Events";
import Venue from "@/components/Venue";
import Families from "@/components/Families";
import Moments from "@/components/Moments";
import ShareJoy from "@/components/ShareJoy";
import Footer from "@/components/Footer";
import MusicButton from "@/components/MusicButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import TopControls from "@/components/TopControls";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function Home() {
  const d = wedding;
  return (
    <LanguageProvider>
      <Gate data={d} />
      <TopControls />

      <Hero data={d} />
      <main className="wrap">
        <Invitation data={d} />
        <Events days={d.days} events={d.events} />
        <Families data={d} />
        <Moments moments={d.moments} />
        <Venue data={d} />
        <ShareJoy data={d} />
      </main>
      <Footer data={d} />

      <MusicButton />
      <RevealOnScroll />
    </LanguageProvider>
  );
}
