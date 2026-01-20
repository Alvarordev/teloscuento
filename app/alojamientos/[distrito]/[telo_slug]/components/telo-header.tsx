import { Star, MapPin } from "lucide-react";

interface TeloHeaderProps {
  nombre: string;
  stars: number | null;
  ubicacion: string | null;
  distrito?: string;
}

export function TeloHeader({
  nombre,
  stars,
  ubicacion,
  distrito,
}: TeloHeaderProps) {
  const displayLocation =
    ubicacion || (distrito ? `${distrito}, Lima` : "Lima, Perú");

  return (
    <div className="flex  mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-2">
          {nombre}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {stars && (
            <>
              <div className="flex items-center gap-1 font-medium">
                <Star
                  className="w-4 h-4 text-primary fill-current"
                  strokeWidth={1.5}
                />
                <span className="text-gray-900">{stars.toFixed(1)}</span>
              </div>
              <span className="hidden sm:inline text-gray-300">•</span>
            </>
          )}
          <div className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            <span className="underline decoration-gray-300 underline-offset-2">
              {displayLocation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
