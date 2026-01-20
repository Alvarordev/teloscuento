import { AmenitiesSection } from "./components/amenities-section";
import { DistrictsSection } from "./components/districts-section";
import { FaqSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { MostViewedSection } from "./components/most-viewed-section";
import { getServicios } from "@/lib/db/servicios";
import { getDistritos } from "@/lib/db/distritos";
import { getTelos } from "@/lib/db/telos";

export default async function Home() {
  const [servicios, distritos, telos] = await Promise.all([
    getServicios(),
    getDistritos(),
    getTelos(),
  ]);

  const mostViewedTelos = telos.slice(0, 4);

  return (
    <main className="flex flex-col min-h-screen font-sans overflow-x-hidden">
      <HeroSection distritos={distritos} />
      <MostViewedSection telos={mostViewedTelos} />
      <DistrictsSection distritos={distritos} />
      <AmenitiesSection servicios={servicios} />
      <FaqSection />
    </main>
  );
}
