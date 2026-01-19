import { DistrictCard } from "./district-card";
import { Carousel } from "./carousel";

// Simulación de datos del servidor
async function getDistricts() {
  // En producción, esto sería una llamada a tu API/base de datos
  return [
    {
      id: 1,
      name: "Miraflores",
      hotelCount: 45,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop",
      slug: "miraflores",
    },
    {
      id: 2,
      name: "Lince",
      hotelCount: 32,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop",
      slug: "lince",
    },
    {
      id: 3,
      name: "San Miguel",
      hotelCount: 28,
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2649&auto=format&fit=crop",
      slug: "san-miguel",
    },
    {
      id: 4,
      name: "Barranco",
      hotelCount: 15,
      image:
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2670&auto=format&fit=crop",
      slug: "barranco",
    },
    {
      id: 5,
      name: "Santiago de Surco",
      hotelCount: 22,
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop",
      slug: "surco",
    },
    {
      id: 6,
      name: "San Isidro",
      hotelCount: 38,
      image:
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
      slug: "san-isidro",
    },
  ];
}

export async function DistrictsSection() {
  const districts = await getDistricts();

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel title="Explora por distrito">
          {districts.map((district) => (
            <DistrictCard
              key={district.id}
              name={district.name}
              hotelCount={district.hotelCount}
              image={district.image}
              href={`/districts/${district.slug}`}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
