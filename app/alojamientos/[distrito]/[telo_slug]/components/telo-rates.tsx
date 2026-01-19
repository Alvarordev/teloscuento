"use client";

import { useState } from "react";

interface Turno {
  tipo: string;
  horas: number;
  precio: number;
}

interface TeloRatesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  turnos: Record<string, any> | null;
}

export function TeloRates({ turnos }: TeloRatesProps) {
  const [selectedTurno, setSelectedTurno] = useState<string | null>(null);

  const turnosArray: Turno[] = turnos
    ? Object.entries(turnos).map(([key, value]) => ({
        tipo: key,
        horas: value.horas || parseInt(key) || 0,
        precio: value.precio || 0,
      }))
    : [];

  if (turnosArray.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-gray-100 pb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Habitaciones y Tarifas
      </h2>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">Tarifas disponibles</h3>
            <p className="text-sm text-gray-500 mt-1">
              Selecciona el tiempo de estadía que prefieras
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {turnosArray.map((turno) => (
              <label
                key={turno.tipo}
                className="cursor-pointer group relative"
              >
                <input
                  type="radio"
                  name="turno"
                  className="peer sr-only"
                  checked={selectedTurno === turno.tipo}
                  onChange={() => setSelectedTurno(turno.tipo)}
                />
                <div className="p-4 border border-gray-200 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 hover:border-gray-300 transition-all">
                  <div className="text-center">
                    <span className="block text-lg font-bold text-gray-900">
                      {turno.horas} Horas
                    </span>
                    <span className="block text-xl font-bold text-primary mt-1">
                      S/ {turno.precio}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
