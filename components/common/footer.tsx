import { Moon } from "lucide-react";

export function Footer() {
  const locations = [
    { name: "Miraflores", href: "#" },
    { name: "San Isidro", href: "#" },
    { name: "Barranco", href: "#" },
    { name: "La Molina", href: "#" },
  ];

  const popular = [
    { name: "Con Jacuzzi", href: "#" },
    { name: "Con Piscina", href: "#" },
    { name: "Suites Ejecutivas", href: "#" },
    { name: "Habitaciones Temáticas", href: "#" },
  ];

  const amenities = [
    { name: "WiFi Gratis", href: "#" },
    { name: "Estacionamiento", href: "#" },
    { name: "Desayuno Incluido", href: "#" },
    { name: "Servicio a la Habitación", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <Moon className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold text-white">
                TelosCuento
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Encuentra los mejores alojamientos por horas en Lima. Comodidad,
              privacidad y precios accesibles para cada ocasión.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ubicaciones</h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.name}>
                  <a
                    href={location.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {location.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Más Vistos</h3>
            <ul className="space-y-2">
              {popular.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Comodidades</h3>
            <ul className="space-y-2">
              {amenities.map((amenity) => (
                <li key={amenity.name}>
                  <a
                    href={amenity.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {amenity.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} TelosCuento. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
