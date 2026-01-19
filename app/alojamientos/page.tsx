import { Breadcrumbs } from "./components/breadcrumbs";
import { FiltersSidebar } from "./components/filters-sidebar";
import { AccommodationsGrid } from "./components/accommodations-grid";
import { Suspense } from "react";
import { getServicios } from "@/lib/db/servicios";
import { getDistritos } from "@/lib/db/distritos";
import { getTelos } from "@/lib/db/telos";

const breadcrumbItems = [
  { label: "Inicio", href: "/" },
  { label: "Lima", href: "#" },
  { label: "Alojamientos" },
];

export default async function AlojamientosPage() {
  const [servicios, distritos, telos] = await Promise.all([
    getServicios(),
    getDistritos(),
    getTelos(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <Breadcrumbs items={breadcrumbItems} />

      <Suspense fallback={<div>Cargando...</div>}>
        <div className="lg:grid lg:grid-cols-[280px_1fr] gap-10">
          <FiltersSidebar servicios={servicios} distritos={distritos} />
          <AccommodationsGrid telos={telos} distritos={distritos} />
        </div>
      </Suspense>
    </main>
  );
}
