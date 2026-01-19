/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";

interface AccommodationCardProps {
  name: string;
  location: string;
  price: number;
  hours: number;
  rating: number;
  image: string;
}

export function AccommodationCard({
  name,
  location,
  price,
  hours,
  rating,
  image,
}: AccommodationCardProps) {
  return (
    <article className="snap-center shrink-0 w-[85%] md:w-[320px] lg:w-95 group cursor-pointer">
      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-gray-200 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-gray-900 shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-primary-600 text-primary-600" />
          <span>{rating}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">S/ {price}</p>
          <p className="text-xs text-gray-500">/ {hours} horas</p>
        </div>
      </div>
    </article>
  );
}
