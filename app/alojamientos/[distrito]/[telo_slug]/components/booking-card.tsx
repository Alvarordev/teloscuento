"use client";

import { useState, useMemo } from "react";
import { Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Turno {
  tipo: string;
  horas: number;
  precio: number;
}

interface BookingCardProps {
  stars: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  turnos: Record<string, any> | null;
}

export function BookingCard({ stars, turnos }: BookingCardProps) {
  // Convertir turnos a array
  const turnosArray: Turno[] = useMemo(() => {
    if (!turnos) return [];
    return Object.entries(turnos).map(([key, value]) => ({
      tipo: key,
      horas: value.horas || parseInt(key) || 0,
      precio: value.precio || 0,
    }));
  }, [turnos]);

  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(
    turnosArray[0] || null
  );

  const basePrice = turnosArray.length > 0 
    ? Math.min(...turnosArray.map(t => t.precio))
    : 0;

  const serviceFee = selectedTurno ? Math.round(selectedTurno.precio * 0.05) : 0;
  const total = selectedTurno ? selectedTurno.precio + serviceFee : 0;

  return (
    <div className="hidden lg:block">
      <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg shadow-gray-200/50">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              S/ {basePrice}
            </span>
            <span className="text-gray-500 text-sm"> / base</span>
          </div>
          {stars && (
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Star
                className="w-3.5 h-3.5 text-primary fill-current"
                strokeWidth={1.5}
              />
              <span className="font-medium">{stars.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Selector de turno */}
          {turnosArray.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">
                Tiempo de estadía
              </label>
              <div className="relative">
                <select
                  value={selectedTurno?.tipo || ""}
                  onChange={(e) => {
                    const turno = turnosArray.find((t) => t.tipo === e.target.value);
                    setSelectedTurno(turno || null);
                  }}
                  className="w-full text-sm text-gray-900 outline-none font-medium bg-transparent appearance-none py-1 pr-8"
                >
                  {turnosArray.map((turno) => (
                    <option key={turno.tipo} value={turno.tipo}>
                      {turno.horas} Horas - S/ {turno.precio}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 rounded-lg transition-all shadow-md shadow-primary/20"
          >
            Reservar ahora
          </Button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          No se te cobrará nada todavía
        </p>

        {selectedTurno && (
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="underline decoration-gray-300">
                S/ {selectedTurno.precio} x {selectedTurno.horas} horas
              </span>
              <span>S/ {selectedTurno.precio}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="underline decoration-gray-300">
                Tarifa de servicio
              </span>
              <span>S/ {serviceFee}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-gray-900 pt-3 border-t border-gray-100">
              <span>Total</span>
              <span>S/ {total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
