import { Precio, Turno } from "@/types/database";

interface CostAsideProps {
  turnos: Turno[] | null;
  precios: Precio[] | null;
}

export function CostAside({ turnos, precios }: CostAsideProps) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-28 bg-background border border-gray-200 rounded-2xl p-6 shadow-lg shadow-gray-200/50">
        {turnos && turnos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Turnos
            </h3>
            <div className="space-y-3">
              {turnos.map((turno, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-700">{turno.descripcion}</span>
                  <span className="font-semibold text-foreground">
                    {turno.duracion_horas} hr
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {precios && precios.length > 0 && (
          <div className="mb-6 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Precios
            </h3>
            <div className="space-y-3">
              {precios.map((precio, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-700">{precio.tipo}</span>
                  <span className="font-semibold text-foreground">
                    S/ {precio.precio}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Las tarifas mostradas son orientativas y pueden variar según el
            hotel. Confirma los precios directamente con el establecimiento.
          </p>
        </div>
      </div>
    </div>
  );
}
