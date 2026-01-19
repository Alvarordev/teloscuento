import { Waves, Car, Tv, Utensils, ThermometerSun } from "lucide-react";

export function AmenitiesSection() {
  const amenities = [
    {
      name: "Jacuzzi",
      icon: Waves,
      href: "#",
    },
    {
      name: "Cochera Privada",
      icon: Car,
      href: "#",
    },
    {
      name: "Smart TV + Netflix",
      icon: Tv,
      href: "#",
    },
    {
      name: "Room Service",
      icon: Utensils,
      href: "#",
    },
    {
      name: "Sauna",
      icon: ThermometerSun,
      href: "#",
    },
  ];

  return (
    <section className="pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-8">
          Busca por comodidades
        </h2>
        <div className="flex flex-wrap gap-3">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <a
                key={amenity.name}
                href={amenity.href}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 bg-white hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                <Icon className="w-4.5 h-4.5" />
                <span className="text-sm font-medium">{amenity.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
