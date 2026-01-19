/* eslint-disable @next/next/no-img-element */
import { Heart, Star, Wifi, Car, Tv, Coffee, Shield } from "lucide-react";

export interface Accommodation {
  id: string;
  name: string;
  image: string;
  district: string;
  city: string;
  distance?: string;
  rating: number;
  price: number;
  hours: number;
  tags?: string[];
  amenities: { icon: string; label: string }[];
}

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const iconMap: Record<string, React.ElementType> = {
  wifi: Wifi,
  car: Car,
  tv: Tv,
  coffee: Coffee,
  shield: Shield,
};

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  return (
    <article className="group relative flex flex-col gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-4/3 overflow-hidden rounded-t-2xl">
        <img
          src={accommodation.image}
          alt={accommodation.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/60 hover:bg-white text-gray-700 backdrop-blur-sm transition-colors z-10">
          <Heart className="w-4.5 h-4.5" strokeWidth={1.5} />
        </button>
        {accommodation.tags && accommodation.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-2">
            {accommodation.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-900 rounded-md shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 pt-1 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate pr-2 group-hover:text-primary transition-colors">
            {accommodation.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-900 text-sm font-medium">
            <Star
              className="w-3.5 h-3.5 text-primary fill-current"
              strokeWidth={1.5}
            />
            {accommodation.rating}
          </div>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {accommodation.district}, {accommodation.city}
          {accommodation.distance && ` • ${accommodation.distance}`}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
          {accommodation.amenities.map((amenity) => {
            const Icon = iconMap[amenity.icon] || Wifi;
            return (
              <span key={amenity.label} className="flex items-center gap-1">
                <Icon className="w-3 h-3" />
                {amenity.label}
              </span>
            );
          })}
        </div>
        <div className="mt-4 flex items-baseline gap-1 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-primary">
            S/ {accommodation.price}
          </span>
          <span className="text-sm text-gray-500">
            / {accommodation.hours} horas
          </span>
        </div>
      </div>
    </article>
  );
}
