/* eslint-disable @next/next/no-img-element */

interface DistrictCardProps {
  name: string;
  hotelCount: number;
  image: string;
  href?: string;
}

export function DistrictCard({
  name,
  hotelCount,
  image,
  href = "#",
}: DistrictCardProps) {
  return (
    <a
      href={href}
      className="group relative h-48 w-[calc(50%-8px)] md:w-[calc(25%-12px)] shrink-0 snap-start rounded-xl overflow-hidden"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white font-semibold">{name}</h3>
        <p className="text-gray-200 text-xs font-medium">{hotelCount} hoteles</p>
      </div>
    </a>
  );
}
