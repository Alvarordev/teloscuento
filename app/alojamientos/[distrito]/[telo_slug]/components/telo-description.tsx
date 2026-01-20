interface TeloDescriptionProps {
  nombre: string;
  descripcion: string | null;
}

export function TeloDescription({ nombre, descripcion }: TeloDescriptionProps) {
  const defaultDescription = `Disfruta de una experiencia única en ${nombre}, diseñado para parejas que buscan privacidad, confort y lujo. Nuestras habitaciones están equipadas con tecnología de punta y mobiliario de alta gama para asegurar tu comodidad.`;

  return (
    <section className="border-b border-gray-100 pb-8">
      <h2 className="text-base lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-4">
        Sobre este alojamiento
      </h2>
      <div className="text-sm max-w-none text-gray-600 leading-relaxed">
        <p>{descripcion || defaultDescription}</p>
      </div>
    </section>
  );
}
