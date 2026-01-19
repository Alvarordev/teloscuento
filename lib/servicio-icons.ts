import {
  Wine,
  Wifi,
  Car,
  Waves,
  ThermometerSun,
  Wind,
  type LucideIcon,
} from "lucide-react";

export const servicioIcons: Record<string, LucideIcon> = {
  tragos: Wine,
  wifi: Wifi,
  cochera: Car,
  jacuzzi: Waves,
  sauna: ThermometerSun,
  "aire-acondicionado": Wind,
};

export function getServicioIcon(slug: string): LucideIcon | undefined {
  return servicioIcons[slug];
}

export function getServicioSlugs(): string[] {
  return Object.keys(servicioIcons);
}
