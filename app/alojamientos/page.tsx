import { Breadcrumbs } from "./components/breadcrumbs";
import { FiltersSidebar } from "./components/filters-sidebar";
import { AccommodationsGrid } from "./components/accommodations-grid";
import { type Accommodation } from "./components/accommodation-card";
import { Suspense } from "react";

const accommodations: Accommodation[] = [
  {
    id: "1",
    name: "Hotel Suites Blue",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop",
    district: "Lince",
    city: "Lima",
    distance: "A 2km de ti",
    rating: 4.8,
    price: 50,
    hours: 6,
    tags: ["Jacuzzi"],
    amenities: [
      { icon: "wifi", label: "Wifi" },
      { icon: "car", label: "Cochera" },
    ],
  },
  {
    id: "2",
    name: "Wimbledon Hotel",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop",
    district: "San Miguel",
    city: "Lima",
    rating: 4.5,
    price: 75,
    hours: 4,
    tags: ["Temático"],
    amenities: [
      { icon: "tv", label: "Smart TV" },
      { icon: "coffee", label: "Bar" },
    ],
  },
  {
    id: "3",
    name: "Hostal Los Pinos",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop",
    district: "Miraflores",
    city: "Lima",
    rating: 4.2,
    price: 40,
    hours: 3,
    amenities: [{ icon: "wifi", label: "Wifi" }],
  },
  {
    id: "4",
    name: "Astoria Plaza",
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
    district: "San Isidro",
    city: "Lima",
    rating: 4.9,
    price: 90,
    hours: 6,
    tags: ["Sillón Tántrico"],
    amenities: [
      { icon: "shield", label: "Seguro" },
      { icon: "coffee", label: "Room Service" },
    ],
  },
  {
    id: "5",
    name: "Urban Hall",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop",
    district: "Barranco",
    city: "Lima",
    rating: 4.6,
    price: 65,
    hours: 5,
    tags: ["Sauna"],
    amenities: [{ icon: "car", label: "Privado" }],
  },
  {
    id: "6",
    name: "The Point",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop",
    district: "Los Olivos",
    city: "Lima",
    rating: 4.3,
    price: 35,
    hours: 3,
    amenities: [
      { icon: "tv", label: "Cable" },
      { icon: "wifi", label: "Wifi 5G" },
    ],
  },
];

const breadcrumbItems = [
  { label: "Inicio", href: "/" },
  { label: "Lima", href: "#" },
  { label: "Alojamientos" },
];

export default function AlojamientosPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <Breadcrumbs items={breadcrumbItems} />

      <Suspense fallback={<div>Cargando...</div>}>
        <div className="lg:grid lg:grid-cols-[280px_1fr] gap-10">
          <FiltersSidebar />
          <AccommodationsGrid accommodations={accommodations} />
        </div>
      </Suspense>
    </main>
  );
}
