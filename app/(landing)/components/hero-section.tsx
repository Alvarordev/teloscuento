/* eslint-disable @next/next/no-img-element */
import { BedDouble, MapPin, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-semibold text-foreground leading-[1.1] my-6">
              Encuentra alojamientos transitorios  en Lima
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Encuentra y reserva habitaciones por horas en los mejores hoteles
              de Lima. Sin complicaciones, discreto y seguro.
            </p>

            <div className="bg-white p-2 rounded-xl shadow-md border border-gray-200">
              <form className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                <div className="flex-1 px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg group cursor-pointer">
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Distrito
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin
                      className="text-gray-400 group-hover:text-primary-600"
                      width={16}
                    />
                    <input
                      type="text"
                      placeholder="¿A dónde vas?"
                      className="w-full text-sm bg-transparent border-none p-0 focus:ring-0 placeholder-gray-400 text-gray-700"
                    ></input>
                  </div>
                </div>

                <div className="flex-1 px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg group cursor-pointer">
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Tipo
                  </label>
                  <div className="flex items-center gap-2">
                    <BedDouble
                      className="text-gray-400 group-hover:text-primary-600"
                      width={16}
                    />
                    <select className="w-full text-sm bg-transparent border-none p-0 focus:ring-0 text-gray-700 cursor-pointer appearance-none">
                      <option>Habitación Simple</option>
                      <option>Suite con Jacuzzi</option>
                      <option>Temática</option>
                    </select>
                  </div>
                </div>

                <div className="p-2 md:pl-4 flex items-center">
                  <button
                    type="button"
                    className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary-800 text-white rounded-lg transition-all shadow-md shadow-primary-200 flex items-center justify-center gap-2 group"
                  >
                    <Search
                      width={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="md:hidden">Buscar</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
              <span>Tendencias:</span>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="px-2 py-1 bg-white border border-gray-200 rounded-md hover:border-primary-600 hover:text-primary transition-colors text-xs"
                >
                  Jacuzzi
                </a>
                <a
                  href="#"
                  className="px-2 py-1 bg-white border border-gray-200 rounded-md hover:border-primary-600 hover:text-primary transition-colors text-xs"
                >
                  Lince
                </a>
                <a
                  href="#"
                  className="px-2 py-1 bg-white border border-gray-200 rounded-md hover:border-primary-600 hover:text-primary transition-colors text-xs"
                >
                  Temático
                </a>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop"
                className="rounded-2xl object-cover h-64 w-full shadow-lg transform translate-y-8"
                alt="Hotel room"
              ></img>
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop"
                className="rounded-2xl object-cover h-64 w-full shadow-lg"
                alt="Jacuzzi suite"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
