import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";
import BrokenSystem from "@/components/BrokenSystem";
import CalendarSection from "@/components/CalendarSection";
import MetaphorSection from "@/components/MetaphorSection";
import ProductReveal from "@/components/ProductReveal";
import PhilosophySection from "@/components/PhilosophySection";
import AudienceSplit from "@/components/AudienceSplit";
import ProofSection from "@/components/ProofSection";
import ChallengeSection from "@/components/ChallengeSection";
import CloseSection from "@/components/CloseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <SmoothScroll />

      {/* Hero stays on top */}
      <div className="relative z-10">
        <Hero />
      </div>

      <BrokenSystem />

      <CalendarSection />

      {/* Metaphor Section Removed as per request */}

      <PhilosophySection />

      <ProductReveal />

      <AudienceSplit />

      <ProofSection />

      <ChallengeSection />

      <CloseSection />

      <Footer />
    </main>
  );
}
