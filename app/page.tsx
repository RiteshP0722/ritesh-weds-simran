import Site from "@/components/Site";
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
        <RevealOnScroll />
      </SideProvider>
    </LanguageProvider>
  );
}
