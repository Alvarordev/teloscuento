"use client";

import { useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { AccommodationCard, type Accommodation } from "./accommodation-card";
import { useFilters } from "../hooks/use-filters";

interface AccommodationsGridProps {
  accommodations: Accommodation[];
}

const amenityTagMap: Record<string, string> = {
  jacuzzi: "Jacuzzi",
  sauna: "Sauna",
};

const districtNormalizeMap: Record<string, string> = {
  lince: "Lince",
  miraflores: "Miraflores",
  barranco: "Barranco",
  "los-olivos": "Los Olivos",
  "san-miguel": "San Miguel",
  "san-isidro": "San Isidro",
};

export function AccommodationsGrid({ accommodations }: AccommodationsGridProps) {
  const { filters } = useFilters();

  const filteredAccommodations = useMemo(() => {
    let result = [...accommodations];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (acc) =>
          acc.name.toLowerCase().includes(searchLower) ||
          acc.district.toLowerCase().includes(searchLower) ||
          acc.city.toLowerCase().includes(searchLower)
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
        const normalizedDistrict = acc.district.toLowerCase().replace(/\s+/g, "-");
        return filters.districts.some(
          (d) => d === normalizedDistrict || 
                 districtNormalizeMap[d]?.toLowerCase() === acc.district.toLowerCase()
        );
      });
    }

    if (filters.amenities.length > 0) {
      result = result.filter((acc) => {
        return filters.amenities.every((filterAmenity) => {
          if (acc.tags) {
            const hasTag = acc.tags.some(
              (tag) => tag.toLowerCase() === amenityTagMap[filterAmenity]?.toLowerCase()
            );
            if (hasTag) return true;
          }

          return acc.amenities.some((amenity) => {
            const amenityLabel = amenity.label.toLowerCase();
            const amenityIcon = amenity.icon.toLowerCase();
            
            if (filterAmenity === "jacuzzi" && amenityLabel.includes("jacuzzi")) return true;
            if (filterAmenity === "cochera" && (amenityLabel.includes("cochera") || amenityIcon === "car")) return true;
            if (filterAmenity === "smart-tv" && (amenityLabel.includes("tv") || amenityIcon === "tv")) return true;
            
            return false;
          });
        });
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
  }, [accommodations, filters]);

  return (
    <div className="flex-1">
      <SearchBar
        totalResults={filteredAccommodations.length}
        location="Lima"
      />

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
