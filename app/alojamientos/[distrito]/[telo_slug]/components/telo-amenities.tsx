import { Servicio } from "@/types/database";
import { servicioIcons } from "@/lib/servicio-icons";
import { Wifi } from "lucide-react";

interface TeloAmenitiesProps {
  servicios: Servicio[];
}

export function TeloAmenities({ servicios }: TeloAmenitiesProps) {
  if (!servicios || servicios.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-gray-100 pb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Lo que ofrece este lugar
      </h2>
      <div className="grid grid-cols-2 gap-y-4">
        {servicios.map((servicio) => {
          const Icon = servicioIcons[servicio.slug] || Wifi;
          return (
            <div
              key={servicio.id}
              className="flex items-center gap-3 text-gray-600"
            >
              <Icon className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <span>{servicio.nombre}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
