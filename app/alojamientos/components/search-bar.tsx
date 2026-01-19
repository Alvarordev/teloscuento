"use client";

import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFilters } from "../hooks/use-filters";
import { useState } from "react";

interface SearchBarProps {
  totalResults: number;
  location: string;
}

const districtLabels: Record<string, string> = {
  lince: "Lince",
  miraflores: "Miraflores",
  barranco: "Barranco",
  "los-olivos": "Los Olivos",
};

const amenityLabels: Record<string, string> = {
  jacuzzi: "Jacuzzi",
  cochera: "Cochera Privada",
  "sillon-tantrico": "Sillón Tántrico",
  "smart-tv": "Smart TV",
};

export function SearchBar({ totalResults, location }: SearchBarProps) {
  const { filters, updateFilters, removeFilter } = useFilters();
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearch = () => {
    updateFilters({ search: searchValue || undefined });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const activeFilters = [
    ...filters.districts.map((d) => ({
      type: "district" as const,
      value: d,
      label: districtLabels[d] || d,
    })),
    ...filters.amenities.map((a) => ({
      type: "amenity" as const,
      value: a,
      label: amenityLabels[a] || a,
    })),
  ];

  return (
    <div className="sticky lg:static w-auto top-20 z-30 backdrop-blur py-2 mb-6 bg-background">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400 w-5 h-5" strokeWidth={1.5} />
          </div>
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg text-sm text-gray-900 placeholder-gray-500 focus-visible:ring-0 shadow-none"
            placeholder="Buscar por nombre, distrito o calle..."
          />
        </div>

        <div className="h-8 w-px bg-gray-200 hidden md:block" />

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end px-2">
          <button className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary">
            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
            Filtros
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline">
              Ordenar:
            </span>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-primary">
              Recomendados
              <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="hidden md:flex px-6 py-2.5 text-sm font-medium shadow-md"
        >
          Buscar
        </Button>
      </div>

      <div className="mt-4 flex justify-between items-center px-1">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{totalResults}</span>{" "}
          alojamientos en {location}
        </p>
        <div className="flex gap-2 flex-wrap">
          {activeFilters.map((filter) => (
            <Badge
              key={`${filter.type}-${filter.value}`}
              variant="secondary"
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {filter.label}
              <button
                onClick={() => removeFilter(filter.type, filter.value)}
                className="ml-1.5 inline-flex items-center justify-center text-gray-400 hover:text-gray-900"
              >
                <X className="w-3 h-3" strokeWidth={2} />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
