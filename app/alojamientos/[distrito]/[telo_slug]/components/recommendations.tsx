/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { Telo } from "@/types/database";

interface RecommendationsProps {
  telos: Telo[];
  currentTeloId: string;
  distritoNombre?: string;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop";

export function Recommendations({
  telos,
  currentTeloId,
  distritoNombre,
}: RecommendationsProps) {
  const recommendations = telos
    .filter((telo) => telo.id !== currentTeloId)
    .slice(0, 3);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Otros alojamientos cerca de {distritoNombre || "tu zona"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((telo) => {
          const image =
            telo.fotos && telo.fotos.length > 0 ? telo.fotos[0] : DEFAULT_IMAGE;

          const turnos = telo.turnos || {};
          const firstTurno = Object.values(turnos)[0] as { precio?: number; horas?: number } | undefined;
          const precio = firstTurno?.precio || 0;
          const horas = firstTurno?.horas || 3;

          return (
            <Link
              key={telo.id}
              href={`/alojamientos/${telo.distrito?.slug || "lima"}/${telo.slug}`}
            >
              <article className="group relative flex flex-col gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="relative aspect-4/3 overflow-hidden rounded-t-2xl">
                  <img
                    src={image}
                    alt={telo.nombre}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-white/60 text-gray-700 backdrop-blur-sm hover:bg-white transition-colors">
                    <Heart className="w-4.5 h-4.5" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-4 pt-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {telo.nombre}
                    </h3>
                    {telo.stars && (
                      <div className="flex items-center gap-1 text-gray-900 text-sm font-medium">
                        <Star
                          className="w-3.5 h-3.5 text-primary fill-current"
                          strokeWidth={1.5}
                        />
                        {telo.stars.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {telo.distrito?.nombre || "Lima"}, Lima
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-900">
                      S/ {precio}
                    </span>
                    <span className="text-sm text-gray-500">/ {horas} horas</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
