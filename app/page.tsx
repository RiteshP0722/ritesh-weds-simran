import Site from "@/components/Site";
import MusicButton from "@/components/MusicButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import TopControls from "@/components/TopControls";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SideProvider } from "@/lib/SideContext";

export default function Home() {
  return (
    <LanguageProvider>
      <SideProvider>
        <TopControls />
        <Site />
        <MusicButton />
        <RevealOnScroll />
      </SideProvider>
    </LanguageProvider>
  );
}
