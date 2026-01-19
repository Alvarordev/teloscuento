import { AmenitiesSection } from "./components/amenities-section";
import { DistrictsSection } from "./components/districts-section";
import { FaqSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { MostViewedSection } from "./components/most-viewed-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen font-sans overflow-x-hidden">
      <HeroSection />
      <MostViewedSection />
      <DistrictsSection />
      <AmenitiesSection />
      <FaqSection />
    </main>
  );
}
