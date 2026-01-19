import { getServicioIcon } from "@/lib/servicio-icons";
import { Servicio } from "@/types/database";

interface AmenitiesSectionProps {
  servicios: Servicio[];
}

export function AmenitiesSection({ servicios }: AmenitiesSectionProps) {
  return (
    <section className="pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-8">
          Busca por comodidades
        </h2>
        <div className="flex flex-wrap gap-3">
          {servicios.map((servicio) => {
            const Icon = getServicioIcon(servicio.slug);
            return (
              <a
                key={servicio.id}
                href={`/alojamientos?amenities=${servicio.slug}`}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 bg-white hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                {Icon && <Icon className="w-4.5 h-4.5" />}
                <span className="text-sm font-medium">{servicio.nombre}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
