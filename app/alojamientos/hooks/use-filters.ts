"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export interface Filters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  districts: string[];
  amenities: string[];
  sortBy?: string;
}

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: Filters = {
    search: searchParams.get("search") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    districts: searchParams.get("districts")?.split(",").filter(Boolean) || [],
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
    sortBy: searchParams.get("sortBy") || undefined,
  };

  const updateFilters = useCallback(
    (updates: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.search !== undefined) {
        if (updates.search) {
          params.set("search", updates.search);
        } else {
          params.delete("search");
        }
      }

      if (updates.minPrice !== undefined) {
        if (updates.minPrice) {
          params.set("minPrice", updates.minPrice.toString());
        } else {
          params.delete("minPrice");
        }
      }

      if (updates.maxPrice !== undefined) {
        if (updates.maxPrice) {
          params.set("maxPrice", updates.maxPrice.toString());
        } else {
          params.delete("maxPrice");
        }
      }

      if (updates.districts !== undefined) {
        if (updates.districts.length > 0) {
          params.set("districts", updates.districts.join(","));
        } else {
          params.delete("districts");
        }
      }

      if (updates.amenities !== undefined) {
        if (updates.amenities.length > 0) {
          params.set("amenities", updates.amenities.join(","));
        } else {
          params.delete("amenities");
        }
      }

      if (updates.sortBy !== undefined) {
        if (updates.sortBy) {
          params.set("sortBy", updates.sortBy);
        } else {
          params.delete("sortBy");
        }
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const toggleDistrict = useCallback(
    (districtId: string) => {
      const newDistricts = filters.districts.includes(districtId)
        ? filters.districts.filter((d) => d !== districtId)
        : [...filters.districts, districtId];
      updateFilters({ districts: newDistricts });
    },
    [filters.districts, updateFilters]
  );

  const toggleAmenity = useCallback(
    (amenityId: string) => {
      const newAmenities = filters.amenities.includes(amenityId)
        ? filters.amenities.filter((a) => a !== amenityId)
        : [...filters.amenities, amenityId];
      updateFilters({ amenities: newAmenities });
    },
    [filters.amenities, updateFilters]
  );

  const clearAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const removeFilter = useCallback(
    (type: "district" | "amenity", value: string) => {
      if (type === "district") {
        updateFilters({
          districts: filters.districts.filter((d) => d !== value),
        });
      } else {
        updateFilters({
          amenities: filters.amenities.filter((a) => a !== value),
        });
      }
    },
    [filters.districts, filters.amenities, updateFilters]
  );

  return {
    filters,
    updateFilters,
    toggleDistrict,
    toggleAmenity,
    clearAllFilters,
    removeFilter,
  };
}
