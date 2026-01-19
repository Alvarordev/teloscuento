"use client";

import { useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { AccommodationCard, type Accommodation } from "./accommodation-card";
import { useFilters } from "../hooks/use-filters";
import { Telo } from "@/types/database";

interface AccommodationsGridProps {
  telos: Telo[];
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop";

export function AccommodationsGrid({ telos }: AccommodationsGridProps) {
  const { filters } = useFilters();

  const accommodations: Accommodation[] = useMemo(() => {
    return telos.map((telo) => {
      const distrito = telo.distrito?.nombre || "Lima";

      const precios = telo.precios || {};
      const firstPriceObj = Object.values(precios)[0];

      let firstPrice = 0;
      if (
        firstPriceObj &&
        typeof firstPriceObj === "object" &&
        "precio" in firstPriceObj
      ) {
        firstPrice = Number(firstPriceObj.precio) || 0;
      } else if (typeof firstPriceObj === "number") {
        firstPrice = firstPriceObj;
      }

      const image =
        telo.fotos && telo.fotos.length > 0 ? telo.fotos[0] : DEFAULT_IMAGE;

      const amenities = (telo.servicios || []).map((servicio) => ({
        icon: servicio.slug,
        label: servicio.nombre,
      }));

      return {
        id: telo.id,
        name: telo.nombre,
        image,
        district: distrito,
        city: "Lima",
        rating: telo.stars || 0,
        price: firstPrice,
        hours: 3,
        amenities,
      };
    });
  }, [telos]);

  const filteredAccommodations = useMemo(() => {
    let result = [...accommodations];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (acc) =>
          acc.name.toLowerCase().includes(searchLower) ||
          acc.district.toLowerCase().includes(searchLower) ||
          acc.city.toLowerCase().includes(searchLower),
      );
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((acc) => acc.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((acc) => acc.price <= filters.maxPrice!);
    }

    if (filters.districts.length > 0) {
      result = result.filter((acc) => {
        const teloOriginal = telos.find((t) => t.id === acc.id);
        if (!teloOriginal?.distrito) return false;

        return filters.districts.includes(teloOriginal.distrito.slug);
      });
    }

    if (filters.amenities.length > 0) {
      result = result.filter((acc) => {
        return filters.amenities.some((amenitySlug) =>
          acc.amenities.some((a) => a.icon === amenitySlug),
        );
      });
    }

    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [accommodations, filters, telos]);

  return (
    <div className="flex-1">
      <SearchBar totalResults={filteredAccommodations.length} location="Lima" />

      {filteredAccommodations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron alojamientos con los filtros seleccionados.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Intenta ajustar tus filtros de búsqueda.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAccommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
              />
            ))}
          </div>

          {filteredAccommodations.length >= 6 && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                Mostrar más resultados
                <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
