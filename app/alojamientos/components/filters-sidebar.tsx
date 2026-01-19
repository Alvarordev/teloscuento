"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilters } from "../hooks/use-filters";
import { useState } from "react";
import { Distrito, Servicio } from "@/types/database";

interface FiltersSidebarProps {
  servicios: Servicio[];
  distritos: Distrito[];
}

export function FiltersSidebar({ servicios, distritos }: FiltersSidebarProps) {
  const {
    filters,
    updateFilters,
    toggleDistrict,
    toggleAmenity,
    clearAllFilters,
  } = useFilters();

  const [minPrice, setMinPrice] = useState(
    filters.minPrice?.toString() || "20",
  );
  const [maxPrice, setMaxPrice] = useState(
    filters.maxPrice?.toString() || "200",
  );

  const [prevFilters, setPrevFilters] = useState({
    min: filters.minPrice,
    max: filters.maxPrice,
  });
  if (
    filters.minPrice !== prevFilters.min ||
    filters.maxPrice !== prevFilters.max
  ) {
    setPrevFilters({ min: filters.minPrice, max: filters.maxPrice });
    setMinPrice(filters.minPrice?.toString() || "20");
    setMaxPrice(filters.maxPrice?.toString() || "200");
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    if (type === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handlePriceBlur = () => {
    const min = minPrice ? parseInt(minPrice) : undefined;
    const max = maxPrice ? parseInt(maxPrice) : undefined;
    updateFilters({ minPrice: min, maxPrice: max });
  };

  return (
    <aside className="hidden lg:block space-y-8 sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Filtros
        </h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-primary underline underline-offset-2 transition-colors cursor-pointer"
        >
          Borrar todo
        </button>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Rango de Precio (S/)
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Mín: S/ 20</span>
            <span>Máx: S/ 200+</span>
          </div>
          <Slider
            value={[parseInt(maxPrice) || 100]}
            onValueChange={(value) => {
              setMaxPrice(value[0].toString());
            }}
            onValueCommit={(value) => {
              updateFilters({ maxPrice: value[0] });
            }}
            max={200}
            min={20}
            step={5}
            className="w-full"
          />
          <div className="flex gap-4 mt-4">
            <div className="border border-gray-200 rounded-lg px-3 py-2 w-full focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
              <Label className="block text-[10px] uppercase tracking-wide text-gray-500">
                Mínimo
              </Label>
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                onBlur={handlePriceBlur}
                className="w-full text-sm border-none p-0 h-auto outline-none text-gray-900 font-medium focus-visible:ring-0 shadow-none"
              />
            </div>
            <div className="border border-gray-200 rounded-lg px-3 py-2 w-full focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
              <Label className="block text-[10px] uppercase tracking-wide text-gray-500">
                Máximo
              </Label>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                onBlur={handlePriceBlur}
                className="w-full text-sm border-none p-0 h-auto outline-none text-gray-900 font-medium focus-visible:ring-0 shadow-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Distritos</h3>
        <div className="space-y-3">
          {distritos.map((district) => (
            <label
              key={district.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                id={district.id}
                checked={filters.districts.includes(district.slug)}
                onCheckedChange={() => toggleDistrict(district.slug)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                {district.nombre}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Comodidades</h3>
        <div className="space-y-3">
          {servicios.map((servicio) => (
            <label
              key={servicio.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                id={servicio.slug}
                checked={filters.amenities.includes(servicio.slug)}
                onCheckedChange={() => toggleAmenity(servicio.slug)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                {servicio.nombre}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
