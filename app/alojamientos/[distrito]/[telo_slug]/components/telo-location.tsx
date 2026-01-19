import { MapPin, ExternalLink } from "lucide-react";

interface TeloLocationProps {
  ubicacion: string | null;
  distrito?: string;
}

export function TeloLocation({ ubicacion, distrito }: TeloLocationProps) {
  const displayLocation =
    ubicacion || (distrito ? `${distrito}, Lima, Perú` : "Lima, Perú");

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayLocation)}`;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Ubicación</h2>
      <p className="text-gray-500 mb-6 text-sm">{displayLocation}</p>

      <div className="relative w-full h-80 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div
            className="w-full h-full opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #d1d5db 0, #d1d5db 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl text-white animate-bounce">
              <MapPin className="w-6 h-6" strokeWidth={2} />
            </div>
            <div className="w-4 h-2 bg-black/20 rounded-full blur-sm mt-1" />
          </div>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2.5 rounded-full shadow-lg font-medium text-sm hover:scale-105 transition-transform flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Ver en Google Maps
        </a>
      </div>
    </section>
  );
}
