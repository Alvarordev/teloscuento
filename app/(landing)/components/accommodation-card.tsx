/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";
import Link from "next/link";
import { Telo } from "@/types/database";

interface AccommodationCardProps {
  telo: Telo;
}

export function AccommodationCard({ telo }: AccommodationCardProps) {
  const firstPrice = telo.precios && telo.precios.length > 0 
    ? Math.min(...telo.precios.map((p) => p.precio))
    : 0;
  
  const firstTurno = telo.turnos && telo.turnos.length > 0
    ? telo.turnos[0].duracion_horas
    : 0;

  const image = telo.fotos && telo.fotos.length > 0 
    ? telo.fotos[0]
    : "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop";

  const location = telo.distrito?.nombre ? `${telo.distrito.nombre}, Lima` : "Lima";
  const href = `/alojamientos/${telo.distrito?.slug || 'lima'}/${telo.slug}`;

  return (
    <Link href={href} className="snap-center shrink-0 w-[85%] md:w-[320px] lg:w-95 group cursor-pointer">
      <article >
        <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-muted mb-4">
          <img
            src={image}
            alt={telo.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {telo.stars && (
            <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-foreground shadow-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span>{telo.stars.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {telo.nombre}
            </h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">S/ {firstPrice}</p>
            <p className="text-xs text-muted-foreground">/ {firstTurno} horas</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
