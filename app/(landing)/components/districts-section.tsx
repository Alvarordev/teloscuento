import { DistrictCard } from "./district-card";
import { Carousel } from "./carousel";
import { Distrito } from "@/types/database";

interface DistrictsSectionProps {
  distritos: Distrito[];
}

export function DistrictsSection({ distritos }: DistrictsSectionProps) {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel title="Explora por distrito">
          {distritos.map((distrito) => (
            <DistrictCard
              key={distrito.id}
              name={distrito.nombre}
              hotelCount={distrito.telos || 0}
              image={distrito.foto}
              href={`/alojamientos?districts=${distrito.slug}`}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
