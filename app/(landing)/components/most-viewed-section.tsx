import { AccommodationCard } from "./accommodation-card";
import { Carousel } from "./carousel";
import { Telo } from "@/types/database";

interface MostViewedSectionProps {
  telos: Telo[];
}

export function MostViewedSection({ telos }: MostViewedSectionProps) {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          title="Alojamientos más vistos"
          subtitle="Alojamientos destacados por nuestra comunidad esta semana."
        >
          {telos.map((telo) => (
            <AccommodationCard key={telo.id} telo={telo} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
