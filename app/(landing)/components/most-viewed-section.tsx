import { AccommodationCard } from "./accommodation-card";
import { Carousel } from "./carousel";

async function getMostViewedAccommodations() {
  return [
    {
      id: 1,
      name: "Hotel Suites Blue",
      location: "Lince, Lima",
      price: 50,
      hours: 6,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop",
      badge: undefined,
    },
    {
      id: 2,
      name: "Astoria Plaza",
      location: "San Isidro, Lima",
      price: 90,
      hours: 6,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
      badge: "Sillón Tántrico",
    },
    {
      id: 3,
      name: "Wimbledon Hotel",
      location: "San Miguel, Lima",
      price: 75,
      hours: 4,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop",
      badge: undefined,
    },
    {
      id: 4,
      name: "Hostal Los Pinos",
      location: "Miraflores, Lima",
      price: 40,
      hours: 3,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop",
      badge: undefined,
    },
  ];
}

export async function MostViewedSection() {
  const accommodations = await getMostViewedAccommodations();

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          title="Los favoritos de Lima"
          subtitle="Alojamientos destacados por nuestra comunidad esta semana."
        >
          {accommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} {...accommodation} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
