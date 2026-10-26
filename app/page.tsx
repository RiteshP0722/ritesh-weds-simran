import { wedding } from "@/data/wedding";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Couple from "@/components/Couple";
import SaveTheDate from "@/components/SaveTheDate";
import Events from "@/components/Events";
import Families from "@/components/Families";
import Story from "@/components/Story";
import Moments from "@/components/Moments";
import Venue from "@/components/Venue";
import ShareJoy from "@/components/ShareJoy";
import Footer from "@/components/Footer";
import Petals from "@/components/Petals";
import MusicButton from "@/components/MusicButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import TopControls from "@/components/TopControls";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function Home() {
  const d = wedding;
  return (
    <LanguageProvider>
      {/* Top Controls: Language Switcher (हिन्दी | English) & Theme Switcher */}
      <TopControls />

      {/* Decorative Top Toran Garland */}
      <div className="royal-toran" aria-hidden="true">
        <div className="toran-rope" />
        <div className="toran-garland">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="toran-cluster">
              <span className="marigold orange" />
              <span className="marigold yellow" />
              <span className="mango-leaf" />
              <span className="bell">🔔</span>
            </div>
          ))}
        </div>
      </div>

      <main className="wrap">
        <Hero data={d} />
        <Welcome data={d} />
        <Couple data={d} />
        <SaveTheDate data={d} />
        <Events events={d.events} />
        <Families families={d.families} />
        <Story data={d} />
        <Moments moments={d.moments} />
        <Venue data={d} />
        <ShareJoy data={d} />
        <Footer data={d} />
      </main>

      <Petals />
      <MusicButton />
      <RevealOnScroll />
    </LanguageProvider>
  );
}
