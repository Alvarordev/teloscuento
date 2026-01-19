import { notFound } from "next/navigation";
import { getTeloBySlug, getTelos } from "@/lib/db/telos";
import { TeloBreadcrumbs } from "./components/telo-breadcrumbs";
import { TeloHeader } from "./components/telo-header";
import { ImageCarousel } from "./components/image-carousel";
import { TeloDescription } from "./components/telo-description";
import { TeloAmenities } from "./components/telo-amenities";
import { TeloRates } from "./components/telo-rates";
import { TeloLocation } from "./components/telo-location";
import { BookingCard } from "./components/booking-card";
import { Recommendations } from "./components/recommendations";

interface TeloPageProps {
  params: Promise<{
    distrito: string;
    telo_slug: string;
  }>;
}

export default async function TeloPage({ params }: TeloPageProps) {
  const { distrito, telo_slug } = await params;

  const telo = await getTeloBySlug(telo_slug);

  if (!telo) {
    notFound();
  }

  const allTelos = await getTelos();

  const distritTelos = telo.distrito_id
    ? allTelos.filter((t) => t.distrito_id === telo.distrito_id)
    : allTelos;

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Lima", href: "/alojamientos" },
    {
      label: telo.distrito?.nombre || distrito,
      href: `/alojamientos?districts=${distrito}`,
    },
    { label: telo.nombre },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <TeloBreadcrumbs items={breadcrumbItems} />

      <TeloHeader
        nombre={telo.nombre}
        stars={telo.stars}
        ubicacion={telo.ubicacion}
        distrito={telo.distrito?.nombre}
      />

      <div className="mb-10">
        <ImageCarousel images={telo.fotos || []} alt={telo.nombre} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        <div className="space-y-10">
          <TeloDescription nombre={telo.nombre} descripcion={telo.descripcion} />

          <TeloAmenities servicios={telo.servicios || []} />

          <TeloRates turnos={telo.turnos} />

          <TeloLocation
            ubicacion={telo.ubicacion}
            distrito={telo.distrito?.nombre}
          />
        </div>

        <BookingCard
          stars={telo.stars}
          turnos={telo.turnos}
        />
      </div>

      <Recommendations
        telos={distritTelos}
        currentTeloId={telo.id}
        distritoNombre={telo.distrito?.nombre}
      />
    </main>
  );
}
