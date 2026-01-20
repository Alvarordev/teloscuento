"use client";

import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useFilters } from "../hooks/use-filters";
import { useState } from "react";
import { Distrito, Servicio } from "@/types/database";

interface SearchBarProps {
  totalResults: number;
  location: string;
  servicios: Servicio[];
  distritos: Distrito[];
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

export function SearchBar({
  totalResults,
  location,
  servicios,
  distritos,
}: SearchBarProps) {
  const {
    filters,
    updateFilters,
    removeFilter,
    toggleDistrict,
    toggleAmenity,
    clearAllFilters,
  } = useFilters();
  const [searchValue, setSearchValue] = useState(filters.search || "");
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

  const handleSearch = () => {
    updateFilters({ search: searchValue || undefined });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
      <div className="bg-background rounded-xl shadow-sm border border-border p-2 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              className="text-muted-foreground w-5 h-5"
              strokeWidth={1.5}
            />
          </div>
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg text-sm text-foreground placeholder-muted-foreground focus-visible:ring-0 shadow-none"
            placeholder="Buscar por nombre, distrito o calle..."
          />
        </div>

        <div className="h-8 w-px bg-border hidden md:block" />

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end px-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
              <SheetHeader className="pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-semibold text-foreground">
                    Filtros
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-sm text-muted-foreground hover:text-primary underline underline-offset-2"
                  >
                    Borrar todo
                  </Button>
                </div>
              </SheetHeader>

              <div className="overflow-y-auto flex-1 py-6 space-y-6 px-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    Rango de Precio (S/)
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs text-muted-foreground">
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
                      <div className="border border-border rounded-lg px-3 py-2 w-full focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                        <Label className="block text-[10px] uppercase tracking-wide text-muted-foreground">
                          Mínimo
                        </Label>
                        <Input
                          type="number"
                          value={minPrice}
                          onChange={(e) =>
                            handlePriceChange("min", e.target.value)
                          }
                          onBlur={handlePriceBlur}
                          className="w-full text-sm border-none p-0 h-auto outline-none text-foreground font-medium focus-visible:ring-0 shadow-none"
                        />
                      </div>
                      <div className="border border-border rounded-lg px-3 py-2 w-full focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                        <Label className="block text-[10px] uppercase tracking-wide text-muted-foreground">
                          Máximo
                        </Label>
                        <Input
                          type="number"
                          value={maxPrice}
                          onChange={(e) =>
                            handlePriceChange("max", e.target.value)
                          }
                          onBlur={handlePriceBlur}
                          className="w-full text-sm border-none p-0 h-auto outline-none text-foreground font-medium focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    Distritos
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {distritos.map((district) => (
                      <label
                        key={district.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          id={`mobile-${district.id}`}
                          checked={filters.districts.includes(district.slug)}
                          onCheckedChange={() => toggleDistrict(district.slug)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          {district.nombre}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    Comodidades
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {servicios.map((servicio) => (
                      <label
                        key={servicio.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          id={`mobile-${servicio.slug}`}
                          checked={filters.amenities.includes(servicio.slug)}
                          onCheckedChange={() => toggleAmenity(servicio.slug)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          {servicio.nombre}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter className="pt-4 border-t border-border">
                <SheetClose asChild>
                  <Button className="w-full">
                    Ver {totalResults} resultados
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Ordenar:
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
            >
              Recomendados
              <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
            </Button>
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
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalResults}</span>{" "}
          alojamientos en {location}
        </p>
        <div className="flex gap-2 flex-wrap">
          {activeFilters.map((filter) => (
            <Badge
              key={`${filter.type}-${filter.value}`}
              variant="secondary"
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground"
            >
              {filter.label}
              <button
                onClick={() => removeFilter(filter.type, filter.value)}
                className="ml-1.5 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
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
