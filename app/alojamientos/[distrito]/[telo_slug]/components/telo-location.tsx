interface TeloLocationProps {
  ubicacion: string | null;
  distrito?: string;
}

export function TeloLocation({ ubicacion }: TeloLocationProps) {
  const encodedAddress = encodeURIComponent(ubicacion!);
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Ubicación</h2>
      <p className="text-gray-500 mb-6 text-sm">{ubicacion}</p>

      <div className="relative w-full h-80 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${ubicacion}`}
        ></iframe>
      </div>
    </section>
  );
}
